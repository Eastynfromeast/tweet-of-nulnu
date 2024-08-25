import { logOut } from "@/app/(tabs)/action";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { sourceCodePro } from "@/styles/fonts";
import { notFound } from "next/navigation";

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

export default async function ButtonLogout() {
	const user = await getUser();

	return (
		<form action={logOut} className="my-5 px-8 pt-8 pb-16 ">
			<button className="text-center w-full p-1.5 md:p-3 mt-3 bg-neutral-300 text-neutral-950 font-bold md:text-lg hover:bg-green-400 transition disabled:bg-neutral-400 disabled:text-neutral-100 flex items-center justify-center">
				<span className={`${sourceCodePro.className} text-lg`}>Log Out</span>
			</button>
		</form>
	);
}
