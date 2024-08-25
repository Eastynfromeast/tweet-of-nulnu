"use client";

import { useOptimistic } from "react";
import addComment from "@/app/(tabs)/tweets/[id]/action";
import TweetCommentItem from "./tweet-comment-item";
import TextArea from "../form/text-area";
import FormButton from "../form/form-button";
import { UserType } from "@/lib/user";
import UserAvatar from "../user/user-avatar";
import { nanumGothicCoding, sourceCodePro } from "@/styles/fonts";

export interface Comment {
	id: number;
	payload: string;
	created_at: Date;
	updated_at: Date;
	userId: number;
	tweetId: number;
	user: {
		username: string;
		avatar?: string | null;
	};
}

export interface TweetCommentListProps {
	comments: Comment[];
	commentsCount: number;
	tweetId: number;
	user: UserType;
}

export default function TweetCommentList({ comments, commentsCount, tweetId, user }: TweetCommentListProps) {
	const [state, reducerFn] = useOptimistic({ comments, commentsCount }, (prevState, newComment: Comment) => ({
		comments: [...prevState.comments, newComment],
		commentsCount: prevState.commentsCount + 1,
	}));

	const onClikcUploadComment = async (formData: FormData) => {
		const newComment = {
			id: Date.now(),
			payload: "댓글이 달릴 예정입니다.",
			userId: user?.id!,
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
				{commentsCount === 0 && <li className={`${nanumGothicCoding.className}  my-2 text-neutral-400`}> 댓글을 기다리는 중입니다... </li>}
			</ul>
			<div className="grid-item my-5 mb-10 w-full">
				<div>
					<UserAvatar username={user?.username!} avatar={user?.avatar} />
					<h3 className={`${sourceCodePro.className} text-center font-semibold mt-2 text-neutral-300`}>{user?.username}</h3>
				</div>
				<form action={onClikcUploadComment} className="flex flex-col gap-2 w-full">
					<input name="tweetId" value={Number(tweetId)} hidden readOnly />
					<TextArea name="newComment" placeholder="10자 이상의 댓글을 적어주세요" errors={[]} />
					<FormButton text="Add comment!" />
				</form>
			</div>
		</section>
	);
}
