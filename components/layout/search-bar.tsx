import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
	return (
		<header className="bg-gray-950 text-gray-100 py-4 px-5 flex items-center justify-between">
			<h1 className="font-bold">Tweet of Nulnu</h1>
			<div>
				<form className="flex gap-1 relative">
					<button className="absolute top-1 left-1">
						<MagnifyingGlassIcon className="size-5" />
					</button>
					<input
						type="text"
						placeholder="찾고 싶은 트윗이 있나요?"
						className="pl-8 text-sm py-1 bg-transparent border-b-[1px] border-b-gray-100 outline-none placeholder:text-gray-400 focus:outline-dashed focus:outline-2 focus:outline-green-400 "
					/>
				</form>
			</div>
		</header>
	);
}
