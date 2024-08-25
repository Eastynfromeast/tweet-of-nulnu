import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../user/user-avatar";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as LinedHeartIcon } from "@heroicons/react/24/outline";
import { sourceCodePro } from "@/styles/fonts";

interface TweetListProps {
	id: number;
	context: string;
	created_at: Date;
	updated_at: Date;
	user: {
		username: string;
		avatar?: string | null;
	};
	_count: { likes: number };
}

export default function TweetListItem({ context, id, created_at, user, _count }: TweetListProps) {
	return (
		<li className="w-full border-t-neutral-400 border-t-[2px] border-dashed pt-4 text-neutral-300">
			<Link href={`/tweets/${id}`} className="grid-item">
				<UserAvatar username={user.username} avatar={user.avatar} />
				<div className="flex flex-col gap-3  w-full ">
					<div className={`${sourceCodePro.className} flex flex-row justify-between`}>
						<h4 className={`font-semibold text-lg text-neutral-100`}>{user.username}</h4>
						<span className="text-sm">{formatToTimeAgo(created_at.toString())}</span>
					</div>
					<p className="w-full min-h-10">{context}</p>
					<div className={`flex gap-1 items-center justify-start ${sourceCodePro.className}`}>
						{_count.likes === 0 ? <LinedHeartIcon className="size-5" /> : <SolidHeartIcon className="size-5" />}
						<span>{_count.likes}</span>
					</div>
				</div>
			</Link>
		</li>
	);
}
