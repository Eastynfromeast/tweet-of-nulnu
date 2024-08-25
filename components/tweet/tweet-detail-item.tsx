import { TweetDetail } from "@/app/(tabs)/tweets/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import TweetLikeButton from "./tweet-like-button";
import UserAvatar from "../user/user-avatar";
import { sourceCodePro } from "@/styles/fonts";

interface TweetDetailItemProps {
	tweet: TweetDetail;
	likeCount: number;
	isLiked: boolean;
}

export default function TweetDetailItem({ tweet, likeCount, isLiked }: TweetDetailItemProps) {
	return (
		<article className="flex gap-5 text-neutral-300 ">
			<UserAvatar username={tweet?.user.username!} avatar={tweet?.user.avatar} />
			<div className="flex flex-col justify-between gap-3 w-[calc(100%-80px)] md:w-[calc(100%-126px)]">
				<div className={`${sourceCodePro.className} flex flex-row justify-between`}>
					<h4 className="font-semibold text-lg text-neutral-100">{tweet?.user.username}</h4>
					<span className="text-sm">{tweet ? formatToTimeAgo(tweet.created_at.toString()) : "unknown date"}</span>
				</div>
				<p className="w-full min-h-10">{tweet?.context}</p>
				<TweetLikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweet!.id} />
			</div>
		</article>
	);
}
