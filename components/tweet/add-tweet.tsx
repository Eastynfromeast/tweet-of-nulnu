"use client";

import { useFormState } from "react-dom";
import addTweet from "@/app/(tabs)/tweets/action";
import TextArea from "../form/text-area";
import FormButton from "../form/form-button";
import { TweetUserInfo } from "@/app/(tabs)/page";
import Image from "next/image";

interface AddTweetProps {
	user: TweetUserInfo;
}

export default function AddTweet({ user }: AddTweetProps) {
	const [state, dispatch] = useFormState(addTweet, null);
	return (
		<div className="grid grid-cols-[126px_1fr] gap-5 my-5 mb-10 w-full">
			{user?.avatar ? (
				<Image src={`${user.avatar}/avatar`} alt={user.username} width={128} height={128} className="rounded-full" />
			) : (
				<div className="bg-gray-500 size-28 rounded-full" />
			)}
			<form action={dispatch} className="flex flex-col gap-2 w-full">
				<TextArea name="newTweet" placeholder="어떤 일이 있었나요?" errors={state?.fieldErrors.newTweet} />
				<FormButton text="Add tweet!" />
			</form>
		</div>
	);
}
