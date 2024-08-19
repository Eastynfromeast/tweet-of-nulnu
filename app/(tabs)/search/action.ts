import db from "@/lib/db";

export async function searchTweet(keyword: string) {
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
	});
	console.log(tweets);
}
