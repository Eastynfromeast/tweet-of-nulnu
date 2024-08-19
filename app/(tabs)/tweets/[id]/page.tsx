import TweetCommentList from "@/components/tweet/tweet-comment-list";
import TweetDetailItem from "@/components/tweet/tweet-detail-item";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
	try {
		const tweet = await db.tweet.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				created_at: true,
				updated_at: true,
				context: true,
				likes: true,
				user: {
					select: {
						id: true,
						username: true,
					},
				},
			},
		});
		return tweet;
	} catch (e) {}
}

async function getCachedTweet(id: number) {
	const session = await getSession();
	const userId = session.id;
	const cachedOperation = nextCache(getTweet, ["tweet-detail"], {
		tags: [`tweet-detail-${id}`],
	});
	return cachedOperation(id);
}

export type TweetDetail = Prisma.PromiseReturnType<typeof getTweet>;
export type TweetComment = Prisma.PromiseReturnType<typeof getComments>;

async function getLikeStatus(tweetId: number, userId: number) {
	const isLiked = await db.like.findUnique({
		where: {
			id: {
				tweetId,
				userId,
			},
		},
	});
	const likeCount = await db.like.count({
		where: {
			tweetId,
		},
	});

	return {
		likeCount,
		isLiked: Boolean(isLiked),
	};
}

async function getCachedLikeStatus(tweetId: number) {
	const session = await getSession();
	const userId = session.id;
	const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
		tags: [`like-status-${tweetId}`],
	});
	return cachedOperation(tweetId, userId!);
}

async function getComments(tweetId: number) {
	const comments = await db.comment.findMany({
		where: {
			tweetId,
		},
		include: {
			user: {
				select: {
					username: true,
				},
			},
		},
	});
	const commentsCount = await db.comment.count({
		where: {
			tweetId,
		},
	});
	return { comments, commentsCount };
}

async function getCachedComments(tweetId: number) {
	const session = await getSession();
	const cachedOperation = nextCache(getComments, ["tweet-comments"], {
		tags: [`tweet-comments-${tweetId}`],
	});
	return cachedOperation(tweetId);
}

export default async function TweetDetail({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	const tweet = await getCachedTweet(id);
	if (isNaN(id)) {
		return notFound();
	}
	if (!tweet) {
		return notFound();
	}

	const { comments, commentsCount } = await getCachedComments(id);
	const { likeCount, isLiked } = await getCachedLikeStatus(id);
	const session = await getSession();
	const sessionId = session.id;
	return (
		<div className="flex flex-col gap-5 px-5 pt-6 pb-10 *:w-full">
			<TweetDetailItem tweet={tweet} likeCount={likeCount} isLiked={isLiked} />
			<section className=" border-t-[1px] border-dashed border-neutral-500 mt-10 py-4">
				<h4 className="font-semibold text-lg">
					Replies
					<span className="text-sm inline-block ml-1 ">
						(<i className="not-italic inline-block px-[2px]">{commentsCount}</i>)
					</span>
				</h4>
				<TweetCommentList tweetId={id} comments={comments} commentsCount={commentsCount} sessionId={sessionId} />
			</section>
		</div>
	);
}
