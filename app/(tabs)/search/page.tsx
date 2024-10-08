import { getSearchedTweet } from "./action";
import { notFound } from "next/navigation";
import TweetSearchList from "@/components/tweet/tweet-search-list";

// export const dynamicParams = true;

export default async function SearchPage({ searchParams }: { searchParams: { keyword: string } }) {
	const keyword = searchParams.keyword;
	if (!keyword) {
		notFound();
	}

	const tweets = await getSearchedTweet(keyword);

	return (
		<div className={`flex flex-col items-center min-h-screen px-5 pt-6`}>
			<h1 className="mt-5 mb-10 font-semibold text-lg text-green-400">
				"{keyword}"(으)로 검색한 결과 : {tweets.length}건
			</h1>
			<TweetSearchList initialTweets={tweets} keyword={keyword} />
		</div>
	);
}
