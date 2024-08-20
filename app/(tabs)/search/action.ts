"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getSearchedTweet(keyword: string) {
	const tweets = await db.tweet.findMany({
		where: {
			OR: [
				{
					context: {
						contains: keyword,
					},
				},
			],
		},
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
	});
	return tweets;
}
