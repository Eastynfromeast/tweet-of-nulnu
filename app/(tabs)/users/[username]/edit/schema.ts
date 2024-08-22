"use server";

import { z } from "zod";
import { EMAIL_REGEX, NAME_MIN_LENGTH, PW_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";

const checkNewPassword = ({ newPassword, confirmNewPassword }: { newPassword: string; confirmNewPassword: string }) => newPassword === confirmNewPassword;

export const userSchema = z
	.object({
		avatar: z.string(),
		username: z
			.string({
				required_error: "Username is required",
			})
			.min(NAME_MIN_LENGTH, `Username should be at least ${NAME_MIN_LENGTH} characters long`)
			.trim()
			.toLowerCase(),
		email: z
			.string({
				required_error: "Email is required",
			})
			.email()
			.trim()
			.regex(EMAIL_REGEX, "Email must be ended with @zod.com"),
		password: z.string({
			required_error: "Password is required",
		}),
		newPassword: z.string().min(PW_MIN_LENGTH, `Password should be more than ${PW_MIN_LENGTH} letters`),
		confirmNewPassword: z.string().min(PW_MIN_LENGTH),
		bio: z.string(),
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
	.refine(checkNewPassword, { message: "Both passwords should be the same", path: ["confirmPassword"] });

export type UserFormType = z.infer<typeof userSchema>;

const mb = 1024 * 1024;
const sizeLimit = mb * 2;

export const fileSchema = z.object({
	type: z.string().refine(value => value.includes("image"), { message: "이미지 파일만 업로드 가능합니다" }),
	size: z.number().max(sizeLimit, "2MB 이하 파일만 업로드 가능합니다"),
});
