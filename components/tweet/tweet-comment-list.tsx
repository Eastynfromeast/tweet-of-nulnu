"use client";

import { useOptimistic } from "react";
import addComment from "@/app/(tabs)/tweets/[id]/action";
import TweetCommentItem from "./tweet-comment-item";
import TextArea from "../form/text-area";
import FormButton from "../form/form-button";

export interface Comment {
	id: number;
	payload: string;
	created_at: Date;
	updated_at: Date;
	userId: number;
	tweetId: number;
	user: {
		username: string;
	};
}

export interface TweetCommentListProps {
	comments: Comment[];
	commentsCount: number;
	tweetId: number;
	sessionId?: number;
}

export default function TweetCommentList({ comments, commentsCount, tweetId, sessionId }: TweetCommentListProps) {
	const [state, reducerFn] = useOptimistic({ comments, commentsCount }, (prevState, newComment: Comment) => ({
		comments: [...prevState.comments, newComment],
		commentsCount: prevState.commentsCount + 1,
	}));

	const onClikcUploadComment = async (formData: FormData) => {
		const newComment = {
			id: Date.now(),
			payload: "댓글이 달릴 예정입니다.",
			userId: sessionId!,
			tweetId,
			created_at: new Date(),
			updated_at: new Date(),
			user: {
				username: "current user",
			},
		};
		reducerFn(newComment);
		await addComment(formData);
	};
	return (
		<section>
			<ul className="flex flex-col gap-5 mt-3">
				{comments.map(comment => (
					<TweetCommentItem
						key={comment.id}
						id={comment.id}
						context={comment.payload}
						created_at={comment.created_at}
						updated_at={comment.updated_at}
						user={comment.user}
					/>
				))}
				{commentsCount === 0 && <li className="mt-2"> 표시할 댓글이 존재하지 않습니다.</li>}
			</ul>
			<div className="grid grid-cols-[126px_1fr] gap-5 my-5 mb-10 w-full">
				<div className="bg-gray-500 size-28 rounded-md"></div>
				<form action={onClikcUploadComment} className="flex flex-col gap-2 w-full">
					<input name="tweetId" value={Number(tweetId)} hidden readOnly />
					<TextArea name="newComment" placeholder="댓글을 적어주세요" errors={[]} />
					<FormButton text="Add comment!" />
				</form>
			</div>
		</section>
	);
}
