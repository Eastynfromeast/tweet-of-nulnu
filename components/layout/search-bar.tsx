"use client";

import { validateSearchKeyword } from "@/app/(tabs)/action";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function SearchBar() {
	const [state, dispatch] = useFormState(validateSearchKeyword, null);
	return (
		<header className="bg-gray-950 text-gray-100 py-4 px-5 flex items-center justify-between">
			<h1 className="font-bold">
				<Link href="/" className="hover:text-green-400">
					Tweet of Nulnu
				</Link>
			</h1>
			<div>
				<form action={dispatch} className="flex flex-col gap-1.5 relative">
					<button className="absolute top-1 left-1">
						<MagnifyingGlassIcon className="size-5" />
					</button>
					<input
						name="keyword"
						type="text"
						placeholder="찾고 싶은 트윗이 있나요?"
						className="pl-8 text-sm py-1 bg-transparent border-b-[1px] border-b-gray-100 outline-none placeholder:text-gray-400 focus:outline-dashed focus:outline-2 focus:outline-green-400 focus:bg-neutral-900 "
					/>
					{state?.fieldErrors.keyword && <p className="text-red-500 text-xs">{state?.fieldErrors.keyword}</p>}
				</form>
			</div>
		</header>
	);
}
