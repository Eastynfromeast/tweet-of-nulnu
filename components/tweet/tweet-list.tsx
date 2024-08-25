"use client";

import { InitialTweet } from "@/app/(tabs)/page";
import { useEffect, useState } from "react";
import TweetListItem from "./tweet-list-item";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getMoreTweet, getTotalTweetCount } from "@/app/(tabs)/action";
import { sourceCodePro } from "@/styles/fonts";

interface TweetListProps {
	initialTweets: InitialTweet;
}

export default function TweetList({ initialTweets }: TweetListProps) {
	const pageSize = 3;
	const [tweets, setTweets] = useState(initialTweets);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [isLastPage, setIsLastPage] = useState({ prev: true, next: false });

	const totalPages = Math.ceil(totalCount / pageSize);

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
		console.log(page);
	};

	const onClickPageNumber = async (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { value },
		} = event;

		const pageNumber = Number(value);
		setIsLoading(true);
		let newTweets;
		// 현재 페이지에서는 따로 불러올 게 없다
		if (pageNumber === page) {
			return;
		}
		if (pageNumber === totalPages) {
			setIsLastPage(prevState => ({
				...prevState,
				next: !prevState.next,
			}));
		}

		// pageNumber와 현재 page의 차이를 구해서 그 만큼의 pageSize를 불러온다는 것 같은데 말이 안되는데
		newTweets = await getMoreTweet(pageNumber - 1);
		setPage(pageNumber);

		if (newTweets.length !== 0) {
			setTweets(newTweets);
			setIsLastPage(prevState => ({
				...prevState,
				prev: !prevState.prev,
			}));
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

	useEffect(() => {
		if (page === 1) {
			setIsLastPage({ prev: true, next: false });
		}
		console.log(page);
	}, [page]);

	return (
		<div className="flex flex-col gap-5 w-full px-2">
			<ul className="w-full flex flex-col gap-4">
				{tweets.map(tweet => (
					<TweetListItem key={tweet.id} {...tweet} />
				))}
			</ul>
			<ul className="mt-10 flex flex-row gap-5 justify-center items-center">
				<li>
					<button
						name="prev"
						onClick={onClickPagination}
						className="block p-1.5 border-dashed border-0 border-neutral-400 text-neutral-100 hover:bg-green-500 disabled:bg-transparent disabled:text-neutral-400 disabled:border-[1px]"
						disabled={isLoading || isLastPage.prev}
					>
						<ArrowLeftIcon className="size-5 " />
					</button>
				</li>
				<li>
					<ol className="flex flex-row">
						{[...Array(totalPages)].map((_, index) => (
							<li key={index}>
								<button
									onClick={onClickPageNumber}
									value={index + 1}
									className={`${sourceCodePro.className} py-1.5 px-2 ${page === index + 1 ? "text-green-500" : "bg-transparent text-neutral-500"}`}
								>
									{index + 1}
								</button>
							</li>
						))}
					</ol>
				</li>
				<li>
					<button
						name="next"
						onClick={onClickPagination}
						className="block p-1.5 border-dashed border-0 border-neutral-400 text-neutral-100 hover:bg-green-500 disabled:bg-transparent disabled:text-neutral-400 disabled:border-[1px]"
						disabled={isLoading || isLastPage.next}
					>
						<ArrowRightIcon className="size-5" />
					</button>
				</li>
			</ul>
		</div>
	);
}
