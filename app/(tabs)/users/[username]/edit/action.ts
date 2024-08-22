"use server";

import getSession from "@/lib/session";
import { userSchema } from "./schema";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function getUploadUrl() {
	const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_ACCOUNT_ID}/images/v2/direct_upload`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.CLOUD_API_KEY},`,
		},
	});
	const data = await response.json();
	return data;
}

export async function updateUserProfile(formData: FormData) {
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		bio: formData.get("bio"),
		avatar: formData.get("avatar"),
		password: formData.get("password"),
		newPassword: formData.get("newPassword"),
		confirmNewPassword: formData.get("confirmNewPassword"),
	};
	const result = userSchema.safeParse(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		const session = await getSession();
		if (session.id) {
			const prevUserInfo = await db.user.findUnique({
				where: {
					id: session.id,
				},
				select: {
					id: true,
					password: true,
				},
			});
			const ok = await bcrypt.compare(result.data.password, prevUserInfo!.password ?? "xxxx");
			if (ok) {
				const newPassword = result.data.newPassword === "" ? result.data.password : result.data.newPassword;
				const hasedPassword = await bcrypt.hash(newPassword, 12);
				const user = await db.user.update({
					where: {
						id: session.id,
					},
					data: {
						email: result.data.email,
						username: result.data.username,
						password: hasedPassword,
						bio: result.data.bio,
						avatar: result.data.avatar,
					},
					select: {
						id: true,
					},
				});
				console.log(user);
			} else {
				return {
					fieldErrors: {
						email: [],
						username: [],
						bio: [],
						avatar: formData.get("avatar"),
						prevPassword: ["기존 비밀번호와 일치하지 않습니다"],
						password: [],
						confirmPassword: [],
					},
				};
			}

			// redirect(`/users`)
		}
	}
}
