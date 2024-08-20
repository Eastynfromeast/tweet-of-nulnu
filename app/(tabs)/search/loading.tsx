import LoadingListItem from "@/components/loading/loading-list-item";

export default function SearchLoading() {
	return (
		<div className="container-basic">
			<div className="mb-5 bg-gray-500 h-5 w-40 rounded-md mx-auto" />
			<LoadingListItem />
		</div>
	);
}
