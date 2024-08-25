"use client";

import { useFormState } from "react-dom";
import addTweet from "@/app/(tabs)/tweets/action";
import TextArea from "../form/text-area";
import FormButton from "../form/form-button";
import { TweetUserInfo } from "@/app/(tabs)/page";
import Image from "next/image";
import UserAvatar from "../user/user-avatar";
import { sourceCodePro } from "@/styles/fonts";

interface AddTweetProps {
	user: TweetUserInfo;
}

export default function AddTweet({ user }: AddTweetProps) {
	const [state, dispatch] = useFormState(addTweet, null);

	return (
		<div className="grid-item my-5 mb-10 w-full">
			<div>
				<UserAvatar username={user?.username!} avatar={user?.avatar} />
				<h3 className={`${sourceCodePro.className} text-center font-semibold mt-2 text-neutral-300`}>{user?.username}</h3>
			</div>
			<form action={dispatch} className="flex flex-col gap-2 w-full">
				<TextArea name="newTweet" placeholder="Let's tweet!" errors={state?.fieldErrors.newTweet} />
				<FormButton text="Add tweet!" />
			</form>
		</div>
	);
}
