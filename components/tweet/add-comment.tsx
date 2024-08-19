"use client";

import { useFormState } from "react-dom";
import addComment from "@/app/(tabs)/tweets/[id]/action";
import TextArea from "../form/text-area";
import FormButton from "../form/form-button";

export default function AddComment({ tweetId }: { tweetId: number }) {
	const [state, dispatch] = useFormState(addComment, null);

	return (
		<div className="grid grid-cols-[126px_1fr] gap-5 my-5 mb-10 w-full">
			<div className="bg-gray-500 size-28 rounded-md"></div>
			<form action={dispatch} className="flex flex-col gap-2 w-full">
				<input name="tweetId" value={Number(tweetId)} hidden readOnly />
				<TextArea name="newComment" placeholder="댓글을 적어주세요" errors={state?.fieldErrors.newComment} />
				<FormButton text="Add comment!" />
			</form>
		</div>
	);
}
