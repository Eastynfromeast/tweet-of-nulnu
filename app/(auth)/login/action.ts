"use server";

import { EMAIL_REGEX, PW_MIN_LENGTH, PW_REGEX, PW_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExits = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});
	return Boolean(user);
};

const formSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
		})
		.email()
		.trim()
		.regex(EMAIL_REGEX, "Email must be ended with @zod.com")
		.refine(checkEmailExits, "There is no account with the email"),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(PW_MIN_LENGTH, "Password should be more than 10 letters")
		.regex(PW_REGEX, PW_REGEX_ERROR),
});

export async function onSubmit(prevState: any, formData: FormData) {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};
	const result = await formSchema.safeParseAsync(data);
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
