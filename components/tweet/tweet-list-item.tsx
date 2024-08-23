import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface TweetListProps {
	id: number;
	context: string;
	created_at: Date;
	user: {
		username: string;
		avatar?: string | null;
	};
	updated_at: Date;
}

export default function TweetListItem({ context, id, created_at, user }: TweetListProps) {
	return (
		<li className="w-full border-b-gray-500 border-b-[1px] pb-4">
			<Link href={`/tweets/${id}`} className="grid grid-cols-[126px_1fr] gap-5 ">
				{user.avatar ? (
					<Image src={`${user.avatar}/avatar`} alt={user.username} width={128} height={128} className="rounded-full" />
				) : (
					<div className="bg-gray-500 size-28 rounded-full" />
				)}

				<div className="flex flex-col gap-3  w-full ">
					<div className="flex flex-row justify-between *:text-sm">
						<h4 className="font-semibold">{user.username}</h4>
						<span>{formatToTimeAgo(created_at.toString())}</span>
					</div>
					<p className="w-full">{context}</p>
				</div>
			</Link>
		</li>
	);
}
