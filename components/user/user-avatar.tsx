import Image from "next/image";

interface UserAvatarProps {
	username: string;
	avatar?: string | null;
}

export default function UserAvatar({ username, avatar }: UserAvatarProps) {
	return (
		<div className="size-20 md:size-28 border-[1.5px] border-neutral-400 border-dashed p-2 overflow-hidden  *:w-full *:h-full">
			{avatar ? (
				<Image src={`${avatar}/avatar`} alt={username} width={128} height={128} className="w-full h-full" />
			) : (
				<div className="bg-gray-500 w-full h-full" />
			)}
		</div>
	);
}
