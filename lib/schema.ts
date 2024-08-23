import { z } from "zod";
import { EMAIL_REGEX, NAME_MIN_LENGTH, PW_MIN_LENGTH, PW_REGEX, PW_REGEX_ERROR } from "@/lib/constants";
import { hasUserEmailTaken, hasUserNameTaken, isEmailExits, validateUserEmail, validateUserName } from "@/lib/validate";
import { checkPassword } from "./utils";

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
			.toLowerCase()
			.transform(value => value.replaceAll(" ", "")),
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

// 유저 가입 & 로그인
export const accountSchema = z
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
		const isUserNameTaken = await hasUserNameTaken(username);
		if (isUserNameTaken) {
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
		const isUserEmailTaken = await hasUserEmailTaken(email);
		if (isUserEmailTaken) {
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

export const loginSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
		})
		.email()
		.trim()
		.regex(EMAIL_REGEX, "Email must be ended with @zod.com")
		.refine(isEmailExits, "There is no account with the email"),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(PW_MIN_LENGTH, "Password should be more than 10 letters")
		.regex(PW_REGEX, PW_REGEX_ERROR),
});

export const tweetSchema = z.object({
	newTweet: z
		.string({
			required_error: "트윗 내용을 적어주세요.",
		})
		.min(10, "10자 이상 적어주세요")
		.max(280, "280자까지 작성 가능합니다."),
});

export const commentSchema = z.object({
	newComment: z
		.string({
			required_error: "답글을 적어주세요.",
		})
		.min(10, "10자 이상 적어주세요")
		.max(280, "280자까지 작성 가능합니다."),
	tweetId: z.coerce.number(),
});
