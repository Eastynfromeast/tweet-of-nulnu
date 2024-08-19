"use client";

import { InitialTweet } from "@/app/(tabs)/page";
import { useEffect, useState } from "react";
import TweetListItem from "./tweet-list-item";

interface TweetListProps {
	initialTweets: InitialTweet;
}

export default function TweetSearchList({ initialTweets }: TweetListProps) {
	const [tweets, setTweets] = useState(initialTweets);

	return (
		<div className="flex flex-col gap-5 w-full px-2">
			<ul className="w-full flex flex-col gap-5">
				{tweets.map(tweet => (
					<TweetListItem key={tweet.id} {...tweet} />
				))}
			</ul>
		</div>
	);
}
