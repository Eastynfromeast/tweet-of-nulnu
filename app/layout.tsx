import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "tweet-of-nulnu",
	description: "by Nulnu",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} max-w-screen-sm min-h-screen mx-auto bg-gradient  bg-gradient-to-br from-neutral-100 to-blue-500 text-white`}>
				{children}
			</body>
		</html>
	);
}
