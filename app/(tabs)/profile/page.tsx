import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
		if (user) {
			console.log(user);
			return user;
		}
	}
	notFound();
}

export default async function Profile() {
	const user = await getUser();
	const logOut = async () => {
		"use server";
		const session = await getSession();
		await session.destroy();
		redirect("/");
	};
	return (
		<div className="flex flex-col pt-20 px-5">
			<h1 className="text-center text-white">
				Welcome!
				<br />
				{user?.username}
			</h1>
			<form action={logOut}>
				<button className="btn mt-10">Log out</button>
			</form>
		</div>
	);
}
