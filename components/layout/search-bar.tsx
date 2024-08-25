"use client";

import { validateSearchKeyword } from "@/app/(tabs)/action";
import { pressStart2p, sourceCodePro } from "@/styles/fonts";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function SearchBar() {
	const [state, dispatch] = useFormState(validateSearchKeyword, null);
	const [keywordValue, setKeywordValue] = useState("");
	const params = useParams();
	useEffect(() => {
		setKeywordValue("");
	}, [params]);
	return (
		<header className="bg-neutral-950 text-neutral-100 py-4 px-3 md:px-5 flex items-center justify-between border-b-2 border-dashed border-neutral-400">
			<h1 className={`${pressStart2p.className} font-bold text-lg h-full flex items-center`}>
				<Link href="/" className="h-full uppercase text-green-400 hover:text-neutral-950 hover:bg-green-400 ">
					Tweet of Nulnu
				</Link>
			</h1>
			<div>
				<form action={dispatch} className="flex flex-col gap-1.5 relative ">
					<button className="absolute top-1 left-1 text-neutral-400 peer-active:text-green-400">
						<MagnifyingGlassIcon className="size-5 text-inherit" />
					</button>
					<input
						name="keyword"
						value={keywordValue}
						onChange={e => setKeywordValue(e.currentTarget.value)}
						type="text"
						placeholder="Wanna find a tweet?"
						className={`${sourceCodePro.className} pl-8 text-xs md:text-sm py-1 bg-transparent border-dashed border-b-[1px] border-b-neutral-400 outline-none placeholder:text-gray-400 focus:outline-dashed focus:outline-2 focus:outline-green-400 focus:bg-transparent active:bg-transparent peer autofill:bg-transparent default:bg-transparent`}
					/>
					{state?.fieldErrors.keyword && <p className="text-red-500 text-xs">{state?.fieldErrors.keyword}</p>}
				</form>
			</div>
		</header>
	);
}
