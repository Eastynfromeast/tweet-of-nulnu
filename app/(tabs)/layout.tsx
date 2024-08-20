import SearchBar from "@/components/layout/search-bar";
import TabBar from "@/components/layout/tab-bar";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

async function getUserName() {
	const session = await getSession();
	if (!session.id) {
		notFound();
	} else {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
			select: {
				username: true,
			},
		});
		return user?.username;
	}
}

export default async function TabLayout({ children }: { children: React.ReactNode }) {
	const username = await getUserName();
	return (
		<div>
			<SearchBar />
			{children}
			<TabBar username={username!} />
		</div>
	);
}
