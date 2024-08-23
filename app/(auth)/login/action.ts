"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/schema";

export async function onSubmit(prevState: any, formData: FormData) {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};
	const result = await loginSchema.safeParseAsync(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		const user = await db.user.findUnique({
			where: {
				email: result.data.email,
			},
			select: {
				id: true,
				password: true,
			},
		});
		const ok = await bcrypt.compare(result.data.password, user!.password ?? "xxxx");

		if (ok) {
			const session = await getSession();
			session.id = user!.id;
			await session.save();
			redirect("/");
		} else {
			return {
				fieldErrors: {
					email: [],
					password: ["Wrong password"],
				},
			};
		}
	}
}
