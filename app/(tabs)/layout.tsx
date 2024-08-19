import TabBar from "@/components/layout/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			{children}
			<TabBar />
		</div>
	);
}
