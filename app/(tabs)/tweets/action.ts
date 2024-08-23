"use server";

import db from "@/lib/db";
import { tweetSchema } from "@/lib/schema";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export default async function addTweet(_: any, formData: FormData) {
	const data = {
		newTweet: formData.get("newTweet"),
	};
	const result = await tweetSchema.safeParseAsync(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		const session = await getSession();
		if (session.id) {
			const tweet = await db.tweet.create({
				data: {
					context: result.data.newTweet,
					user: {
						connect: {
							id: session.id,
						},
					},
				},
				select: {
					id: true,
					context: true,
				},
			});
			await new Promise(resolve => setTimeout(resolve, 1 * 1000)); // pending 동작 확인용
			redirect(`/tweets/${tweet.id}`);
		}
	}
}
