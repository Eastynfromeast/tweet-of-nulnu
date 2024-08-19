export default function Loading() {
	return (
		<div className="px-4 py-6 animate-pulse">
			<ul className="flex flex-col gap-5 w-full">
				{[...Array(10)].map((_, index) => (
					<li key={index} className="flex gap-5 *:rounded-md ">
						<div className="bg-gray-500 size-28" />
						<ul className="flex flex-col gap-2 *:rounded-md *:bg-gray-500 *:h-5">
							<li className="w-40" />
							<li className="w-20" />
							<li className="w-10" />
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
}
