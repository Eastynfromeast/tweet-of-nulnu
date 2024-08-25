"use client";

import { pressStart2p } from "@/styles/fonts";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { HomeIcon as SolidHomeIcon, UserIcon as SolidUserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

export default function TabBar({ username }: { username: string }) {
	const pathname = usePathname();
	return (
		<div className="fixed bottom-0 bg-neutral-950 text-neutral-400   w-full max-w-screen-lg ">
			<ul className="flex justify-between font-semibold *:py-3 *:md:py-4  *:px-6 *:transition">
				<li
					className={`w-full border-t-2 border-r-2 border-dashed border-neutral-400 hover:bg-green-500 hover:text-neutral-950 hover:border-white ${
						pathname === "/" ? `bg-neutral-300 text-neutral-950` : `bg-neutral-950`
					}`}
				>
					<Link href="/" className="flex gap-3 items-center justify-center h-full">
						{pathname === "/" ? <SolidHomeIcon className="size-6" /> : <HomeIcon className="size-6" />}
						<span className={`${pressStart2p.className} text-sm uppercase`}>Home</span>
					</Link>
				</li>
				<li
					className={`w-full border-t-2 border-dashed border-neutral-400 hover:bg-green-500 hover:text-neutral-950 hover:border-white ${
						pathname === `/users/${username}` ? `bg-neutral-300 text-neutral-950` : `bg-neutral-950`
					}`}
				>
					<Link href={`/users/${username}`} className="flex gap-3 items-center justify-center h-full">
						{pathname === `/users/${username}` ? <SolidUserIcon className="size-6" /> : <UserIcon className="size-6" />}
						<span className={`${pressStart2p.className} text-sm uppercase`}>User</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}
