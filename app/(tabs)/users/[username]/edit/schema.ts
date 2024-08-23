import { z } from "zod";
import { EMAIL_REGEX, NAME_MIN_LENGTH, PW_MIN_LENGTH, PW_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import { validateUserEmail, validateUserName } from "@/lib/validate";

const mb = 1024 * 1024;
const sizeLimit = mb * 2;

export const fileSchema = z.object({
	type: z.string().refine(value => value.includes("image"), { message: "이미지 파일만 업로드 가능합니다" }),
	size: z.number().max(sizeLimit, "2MB 이하 파일만 업로드 가능합니다"),
});

export const checkNewPassword = (newPassword: string, confirmNewPassword: string) => newPassword === confirmNewPassword;

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
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(PW_MIN_LENGTH, `Password should be more than ${PW_MIN_LENGTH} letters`),
		newPassword: z
			.string()
			.optional()
			.refine(value => !value || (value.length >= PW_MIN_LENGTH && PW_REGEX.test(value)), {
				message: "비밀번호는 10글자 이상이어야 하며, 1개 이상의 숫자를 포함해야 합니다.",
			}),
		confirmNewPassword: z.string().optional(),
		bio: z.string().optional(),
	})
	.superRefine(async ({ username }, ctx) => {
		const isValidatedUserName = await validateUserName(username);
		if (!isValidatedUserName) {
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
		const isValidatedEmail = await validateUserEmail(email);
		if (!isValidatedEmail) {
			ctx.addIssue({
				code: "custom",
				path: ["email"],
				message: "This email is already taken",
				fatal: true,
			});
			return z.NEVER;
		}
	});
