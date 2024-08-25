"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
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
					avatar: true,
				},
			},
			_count: {
				select: {
					likes: true,
				},
			},
		},
		skip: page * 3,
		take: 3,
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

	if (!result.success) {
		return result.error.flatten();
	} else {
		const encodedKeyword = encodeURI(result.data.keyword);
		revalidatePath(`/search?keyword=${encodedKeyword}`);
		redirect(`/search?keyword=${encodedKeyword}`);
	}
}

export async function logOut() {
	const session = await getSession();
	await session.destroy();
	redirect("/start");
}
