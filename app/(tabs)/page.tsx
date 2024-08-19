import AddTweet from "@/components/tweet/add-tweet";
import TweetList from "@/components/tweet/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
	const tweets = await db.tweet.findMany({
		select: {
			id: true,
			created_at: true,
			updated_at: true,
			context: true,
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
		take: 1,
		orderBy: { created_at: "desc" },
	});
	return tweets;
}

export type InitialTweet = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
	const initialTweets = await getInitialTweets();

	return (
		<div className="flex flex-col items-center min-h-screen px-5 pt-6  text-white">
			<AddTweet />
			<TweetList initialTweets={initialTweets} />
		</div>
	);
}
