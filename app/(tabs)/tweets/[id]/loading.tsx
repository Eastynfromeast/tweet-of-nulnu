import LoadingListItem from "@/components/loading/loading-list-item";

export default function TweetDetailLoading() {
	return (
		<div className="container-basic flex flex-col gap-5 px-5 pt-6 animate-pulse *:w-full">
			<article className="flex gap-5 mb-5 ">
				<div className="bg-neutral-500 size-28" />
				<div className="flex flex-col gap-3 w-4/5 ">
					<div className="flex flex-row justify-between *:h-5 *:bg-neutral-500">
						<span className="w-20" />
						<span className="w-20" />
					</div>
					<div className="h-20 w-full bg-neutral-500" />
				</div>
			</article>
			<LoadingListItem />
		</div>
	);
}
