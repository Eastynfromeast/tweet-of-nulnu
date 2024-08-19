"use server";

import { EMAIL_REGEX, NAME_MIN_LENGTH, PW_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkPassword = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => password === confirmPassword;

const formSchema = z
	.object({
		email: z
			.string({
				required_error: "Email is required",
			})
			.email()
			.trim()
			.regex(EMAIL_REGEX, "Email must be ended with @zod.com"),
		username: z
			.string({
				required_error: "Username is required",
			})
			.min(NAME_MIN_LENGTH, `Username should be at least ${NAME_MIN_LENGTH} characters long`)
			.trim()
			.toLowerCase(),
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(PW_MIN_LENGTH, `Password should be more than ${PW_MIN_LENGTH} letters`),
		confirmPassword: z.string().min(PW_MIN_LENGTH),
	})
	.superRefine(async ({ username }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				path: ["username"],
				message: "This username is already taken",
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.superRefine(async ({ email }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				path: ["email"],
				message: "This email is already taken",
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.refine(checkPassword, { message: "Both passwords should be the same", path: ["confirmPassword"] });

export async function createAccount(prevState: any, formData: FormData) {
	const data = {
		email: formData.get("email"),
		username: formData.get("username"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	};
	const result = await formSchema.safeParseAsync(data);
	console.log(result);
	if (!result.success) {
		return result.error.flatten();
	} else {
		const hasedPassword = await bcrypt.hash(result.data.password, 12);
		const user = await db.user.create({
			data: {
				email: result.data.email,
				username: result.data.username,
				password: hasedPassword,
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
