import Image from "next/image";

interface UserAvatarProps {
	username: string;
	avatar?: string | null;
}

export default function UserAvatar({ username, avatar }: UserAvatarProps) {
	return (
		<div className="size-28 rounded-full overflow-hidden *:w-full *:h-full">
			{avatar ? (
				<Image src={`${avatar}/avatar`} alt={username} width={128} height={128} className="w-full h-full" />
			) : (
				<div className="bg-gray-500 w-full h-full" />
			)}
		</div>
	);
}