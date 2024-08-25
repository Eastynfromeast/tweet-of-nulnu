import FormEditProfile from "@/components/form/form-edit-profile";
import db from "@/lib/db";
import { sourceCodePro } from "@/styles/fonts";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getUserInfo(username: string) {
	const user = await db.user.findUnique({
		where: {
			username,
		},
	});
	return user;
}

export type UserInfo = Prisma.PromiseReturnType<typeof getUserInfo>;

export default async function EditUserProfile({ params }: { params: { username: string } }) {
	const username = params.username;
	if (!username) {
		notFound();
	}
	const user = await getUserInfo(username);

	return (
		<div className="container-basic mb-20 *:w-full">
			<h2 className={`${sourceCodePro.className} mb-5 text-xl font-bold text-neutral-300`}>Edit Profile</h2>
			<section className="mb-10 md:grid grid-flow-col items-center">
				<FormEditProfile userInfo={user} />
			</section>
		</div>
	);
}
