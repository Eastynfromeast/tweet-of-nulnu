"use server";

import db from "@/lib/db";
import fs from "fs/promises";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { userSchema } from "./schema";

export async function getUploadUrl() {
	const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_ACCOUNT_ID}/images/v2/direct_upload`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.CLOUD_API_KEY}`,
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
		newPassword: formData.get("newPassword") ?? "",
		confirmNewPassword: formData.get("confirmNewPassword") ?? "",
	};
	console.log("받아온 폼 데이터", data);
	if (data.avatar instanceof File) {
		const avatarData = await data.avatar.arrayBuffer();
		await fs.appendFile(`./public/images/${data.avatar.name}`, Buffer.from(avatarData));
		data.avatar = `/images/${data.avatar.name}`;
	}
	const result = await userSchema.safeParseAsync(data);

	console.log("폼 검증 성공 결과 ", result);
	if (!result.success) {
		console.log(result.error.flatten());
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
			console.log("prevUserId", prevUserInfo);
			const ok = await bcrypt.compare(result.data.password, prevUserInfo!.password ?? "xxxx");
			console.log(ok);
			if (ok) {
				console.log(result.data.newPassword);
				const newPassword = result.data.newPassword === undefined ? result.data.password : result.data.newPassword;
				const hashedPassword = await bcrypt.hash(newPassword, 12);
				const user = await db.user.update({
					where: {
						id: session.id,
					},
					data: {
						email: result.data.email,
						username: result.data.username,
						password: hashedPassword,
						bio: result.data.bio,
						avatar: result.data.avatar,
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
						password: ["기존 비밀번호와 일치하지 않습니다"],
						newPassword: [],
						confirmNewPassword: [],
					},
				};
			}

			// redirect(`/users`)
		}
	}
}
