export default function LoadingEditUserProfile() {
	return (
		<div className="container-basic mb-20 animate-pulse px-5">
			<div className="bg-gray-500 w-20 h-5 rounded-md mb-5" />
			<div className="size-44 mb-5 mx-auto rounded-full bg-gray-500 " />
			<ul className="flex flex-col gap-3 *:flex *:gap-2">
				{[...Array(5)].map((_, index) => (
					<li key={index} className="*:h-5 *:bg-gray-500 *:rounded-md">
						<span className="inline-block w-1/5" />
						<div className="w-4/5" />
					</li>
				))}
			</ul>
		</div>
	);
}