"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { accountSchema } from "@/lib/schema";

export async function createAccount(prevState: any, formData: FormData) {
	const data = {
		email: formData.get("email"),
		username: formData.get("username"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	};
	const result = await accountSchema.safeParseAsync(data);
	console.log(result);
	if (!result.success) {
		console.log(result.error.flatten());
		return result.error.flatten();
	} else {
		const hashedPassword = await bcrypt.hash(result.data.password, 12);
		const user = await db.user.create({
			data: {
				email: result.data.email,
				username: result.data.username,
				password: hashedPassword,
			},
			select: {
				id: true,
			},
		});
		console.log(user);
		const session = await getSession();
		session.id = user.id;
		await session.save();
		redirect("/");
	}
}
