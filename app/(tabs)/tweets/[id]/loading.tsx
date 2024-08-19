export default function TweetDetailLoading() {
	return (
		<div className="flex flex-col gap-5 px-5 pt-6 animate-pulse *:w-full">
			<article className="flex gap-5 ">
				<div className="bg-gray-500 size-28 rounded-md" />
				<div className="flex flex-col gap-3 w-4/5 ">
					<div className="flex flex-row justify-between *:h-5 *:bg-gray-500 *:rounded-md">
						<span className="w-20" />
						<span className="w-20" />
					</div>
					<div className="h-20 w-full bg-gray-500 rounded-md" />
				</div>
			</article>
		</div>
	);
}
