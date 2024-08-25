import { formatToTimeAgo } from "@/lib/utils";
import UserAvatar from "../user/user-avatar";
import { sourceCodePro } from "@/styles/fonts";

interface TweetCommentProps {
	id: number;
	context: string;
	created_at: Date;
	user: {
		username: string;
		avatar?: string | null;
	};
	updated_at: Date;
}

export default function TweetCommentItem({ context, created_at, user }: TweetCommentProps) {
	return (
		<li className="w-full">
			<article className="flex gap-5 border-b-neutral-500 border-b-[1px] pb-4 border-dashed text-neutral-300">
				<UserAvatar username={user.username} avatar={user.avatar} />
				<div className="flex flex-col gap-3 w-[calc(100%-80px)] md:w-[calc(100%-126px)] ">
					<div className={`${sourceCodePro.className} flex flex-row justify-between`}>
						<h4 className="font-semibold text-lg">{user.username}</h4>
						<span className="text-sm">{formatToTimeAgo(created_at.toString())}</span>
					</div>
					<p className="w-full min-h-10">{context}</p>
				</div>
			</article>
		</li>
	);
}
