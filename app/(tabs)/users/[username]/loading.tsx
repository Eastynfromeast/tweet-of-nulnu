import LoadingListItem from "@/components/loading/loading-list-item";

export default function LoadingProfile() {
	return (
		<div className="container-basic justify-start animate-pulse">
			<div className="bg-neutral-400 w-20 h-5  my-5" />
			<section className="mb-10 md:grid grid-flow-col items-center">
				<div className="flex flex-col items-center gap-3">
					<div className="bg-neutral-400 w-14 h-5  mb-3 " />
					<div className="size-28 rounded-full bg-neutral-400" />
				</div>
				<ul className="w-full flex flex-col gap-3 *:flex *:flex-row *:gap-3">
					<li className="*:bg-neutral-400 *:h-5 *:inline-block">
						<span className="w-1/5" />
						<span className="w-4/5" />
					</li>
					<li className="*:bg-neutral-400 *:h-5 *:inline-block">
						<span className="w-1/5" />
						<span className="w-4/5" />
					</li>
					<li className="*:bg-neutral-400 *:h-5 *:inline-block">
						<span className="w-1/5" />
						<span className="w-4/5" />
					</li>
				</ul>
			</section>
			<div className="bg-neutral-400 w-20 h-5 my-5" />
			<LoadingListItem />
		</div>
	);
}
