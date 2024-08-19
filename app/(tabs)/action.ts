"use server";

import db from "@/lib/db";

export async function getMoreTweet(page: number) {
	const anotherTweet = await db.tweet.findMany({
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
		skip: page * 1,
		take: 1,
		orderBy: { created_at: "desc" },
	});
	return anotherTweet;
}

export async function getTotalTweetCount() {
	return await db.tweet.count();
}
