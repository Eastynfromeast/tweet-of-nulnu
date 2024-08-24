import { TweetDetail } from "@/app/(tabs)/tweets/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import TweetLikeButton from "./tweet-like-button";
import Image from "next/image";
import UserAvatar from "../user/user-avatar";

interface TweetDetailItemProps {
	tweet: TweetDetail;
	likeCount: number;
	isLiked: boolean;
}

export default function TweetDetailItem({ tweet, likeCount, isLiked }: TweetDetailItemProps) {
	return (
		<article className="flex gap-5 ">
			{tweet?.user.avatar ? (
				<Image src={`${tweet?.user?.avatar}/avatar`} alt={tweet?.user?.username} width={128} height={128} className="rounded-full" />
			) : (
				<div className="bg-gray-500 size-28 rounded-full" />
			)}
			<UserAvatar username={tweet?.user.username!} avatar={tweet?.user.avatar} />
			<div className="flex flex-col gap-3  w-4/5 ">
				<div className="flex flex-row justify-between *:text-sm">
					<h4 className="font-semibold">{tweet?.user.username}</h4>
					<span>{tweet ? formatToTimeAgo(tweet.created_at.toString()) : "unknown date"}</span>
				</div>
				<p className="w-full">{tweet?.context}</p>
				<TweetLikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweet!.id} />
			</div>
		</article>
	);
}
