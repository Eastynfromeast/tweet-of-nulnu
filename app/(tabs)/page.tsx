import AddTweet from "@/components/tweet/add-tweet";
import TweetList from "@/components/tweet/tweet-list";
import db from "@/lib/db";
import { getUserBySession } from "@/lib/user";
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
					avatar: true,
				},
			},
			_count: {
				select: {
					likes: true,
				},
			},
		},
		take: 3,
		orderBy: { created_at: "desc" },
	});
	return tweets;
}

async function getUserInfo() {
	const user = await getUserBySession();
	return user;
}

export type InitialTweet = Prisma.PromiseReturnType<typeof getInitialTweets>;
export type TweetUserInfo = Prisma.PromiseReturnType<typeof getUserInfo>;

export const metadata = {
	title: "Home",
};

export default async function Home() {
	const initialTweets = await getInitialTweets();
	const user = await getUserInfo();

	return (
		<div className="container-basic">
			<AddTweet user={user} />
			<TweetList initialTweets={initialTweets} />
		</div>
	);
}
