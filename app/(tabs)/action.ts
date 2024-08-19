"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

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

const searhSchema = z.object({
	keyword: z.string({
		required_error: "검색할 키워드를 입력해주세요",
	}),
});

export async function validateSearchKeyword(_: any, formData: FormData) {
	const data = {
		keyword: formData.get("keyword"),
	};
	const result = await searhSchema.safeParseAsync(data);
	console.log(result);
	if (!result.success) {
		return result.error.flatten();
	} else {
		// const tweets = await db.tweet.findMany({
		// 	where: {
		// 		OR: [
		// 			{
		// 				context: {
		// 					contains: result.data.keyword,
		// 				},
		// 			},
		// 		],
		// 	},
		// });
		// console.log(tweets);
		const encodedKeyword = encodeURI(result.data.keyword);
		redirect(`/search?keyword=${encodedKeyword}`);
	}
}
