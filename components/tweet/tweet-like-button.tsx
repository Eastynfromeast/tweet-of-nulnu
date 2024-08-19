"use client";

import { dislikeTweet, likeTweet } from "@/app/(tabs)/tweets/[id]/action";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface TweetLikeButtonProps {
	likeCount: number;
	isLiked: boolean;
	tweetId: number;
}

export default function TweetLikeButton({ likeCount, isLiked, tweetId }: TweetLikeButtonProps) {
	const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (prevState, payload) => ({
		isLiked: !prevState.isLiked,
		likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1,
	}));
	const dispatch = async () => {
		reducerFn(undefined);
		if (isLiked) {
			await dislikeTweet(tweetId);
		} else {
			await likeTweet(tweetId);
		}
	};
	return (
		<form action={dispatch}>
			<button className={`flex gap-1 items-center ${state.isLiked ? "text-rose-600" : "text-white"}`}>
				<HeartIcon className={`size-5`} />
				<span>{state.likeCount}</span>
			</button>
		</form>
	);
}
