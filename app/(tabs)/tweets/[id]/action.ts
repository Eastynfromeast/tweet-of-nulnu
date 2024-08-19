"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function likeTweet(tweetId: number) {
	try {
		const session = await getSession();
		await db.like.create({
			data: {
				tweetId,
				userId: session.id!,
			},
		});
		revalidateTag(`like-status-${tweetId}`);
	} catch (e) {}
}

export async function dislikeTweet(tweetId: number) {
	try {
		const session = await getSession();
		await db.like.delete({
			where: {
				id: {
					tweetId,
					userId: session.id!,
				},
			},
		});
		revalidateTag(`like-status-${tweetId}`);
	} catch (e) {}
}

const commentSchema = z.object({
	newComment: z
		.string({
			required_error: "답글을 적어주세요.",
		})
		.min(10, "10자 이상 적어주세요")
		.max(280, "280자까지 작성 가능합니다."),
	tweetId: z.coerce.number(),
});

export default async function addComment(formData: FormData) {
	const data = {
		newComment: formData.get("newComment"),
		tweetId: formData.get("tweetId"),
	};
	const tweetId = formData.get("tweetId");
	const result = await commentSchema.spa(data);

	if (!result.success) {
		console.log(result.error.flatten());
		return result.error.flatten();
	} else {
		console.log(result.success);
		const session = await getSession();
		try {
			if (session.id) {
				const comment = await db.comment.create({
					data: {
						payload: result.data.newComment,
						user: {
							connect: {
								id: session.id,
							},
						},
						tweet: {
							connect: {
								id: result.data.tweetId,
							},
						},
					},
					select: {
						id: true,
						payload: true,
					},
				});
				console.log(comment);
			}
		} catch (e) {}
		revalidateTag(`tweet-comments-${tweetId}`);
	}
}
