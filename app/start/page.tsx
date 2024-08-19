import Link from "next/link";

export default function StartPage() {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen px-5">
			<h1 className="text-white drop-shadow-xl font-bold text-4xl text-center mb-10">Welcome to Nulnu's assignement repository </h1>
			<Link className="btn block text-center max-w-sm" href="/login">
				Go to log in
			</Link>
			<Link className="mt-5 text-white font-medium hover:underline hover:text-green-500" href="/create-account">
				No account? JOIN US!
			</Link>
		</div>
	);
}
