"use client";

import { InitialTweet } from "@/app/(tabs)/page";
import { useEffect, useState } from "react";
import TweetListItem from "./tweet-list-item";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getMoreTweet, getTotalTweetCount } from "@/app/(tabs)/action";

interface TweetListProps {
	initialTweets: InitialTweet;
}

export default function TweetList({ initialTweets }: TweetListProps) {
	const [tweets, setTweets] = useState(initialTweets);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);

	const onClickPagination = async (event: React.MouseEvent<HTMLButtonElement>) => {
		const btnName = event.currentTarget.name;
		setIsLoading(true);
		let newTweets;
		if (btnName === "next") {
			newTweets = await getMoreTweet(page + 1);
			if (newTweets.length !== 0) {
				setPage(prev => prev + 1);
				setTweets(newTweets);
			}
		} else {
			newTweets = await getMoreTweet(page - 1);
			if (newTweets.length !== 0) {
				setPage(prev => prev - 1);
				setTweets(newTweets);
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const fetchTotalCount = async () => {
			const totalCountNumber = await getTotalTweetCount();
			setTotalCount(totalCountNumber);
		};
		fetchTotalCount();
	}, []);

	return (
		<div className="flex flex-col gap-5 w-full px-2">
			<ul className="w-full">
				{tweets.map(tweet => (
					<TweetListItem key={tweet.id} {...tweet} />
				))}
			</ul>
			<ul className="mt-10 flex flex-row gap-5 justify-center items-center">
				<li>
					<button
						name="prev"
						onClick={onClickPagination}
						className="block p-1.5 rounded-md bg-green-500 hover:bg-blue-500 disabled:bg-neutral-700 disabled:text-neutral-400"
						disabled={isLoading || page === 0}
					>
						<ArrowLeftIcon className="size-5 " />
					</button>
				</li>
				<li>
					<span>{page + 1}</span>
				</li>
				<li>
					<button
						name="next"
						onClick={onClickPagination}
						className="block p-1.5 rounded-md bg-green-500 hover:bg-blue-500 disabled:bg-neutral-700 disabled:text-neutral-400"
						disabled={isLoading || page + 1 >= totalCount}
					>
						<ArrowRightIcon className="size-5" />
					</button>
				</li>
			</ul>
		</div>
	);
}
