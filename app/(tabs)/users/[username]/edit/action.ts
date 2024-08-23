"use server";

import db from "@/lib/db";
import fs from "fs/promises";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { checkNewPassword, userSchema } from "./schema";
import { redirect } from "next/navigation";

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
		newPassword: formData.get("newPassword"),
		confirmNewPassword: formData.get("confirmNewPassword"),
	};
	console.log("받아온 폼 데이터", data);

	if (data.avatar instanceof File) {
		const avatarData = await data.avatar.arrayBuffer();
		await fs.appendFile(`./public/images/${data.avatar.name}`, Buffer.from(avatarData));
		data.avatar = `/images/${data.avatar.name}`;
	}

	// .refine(checkNewPassword, { message: "Both passwords should be the same", path: ["confirmNewPassword"] });

	const result = await userSchema.safeParseAsync(data);
	console.log("폼 검증 성공 결과 ", result);

	if (result.data?.confirmNewPassword && result.data.newPassword) {
		const isNewPasswordConfirmed = checkNewPassword(result.data?.newPassword, result.data?.confirmNewPassword);
		if (!isNewPasswordConfirmed) return { fieldErrors: { confirmPassword: ["새로운 비밀번호를 확인해주세요."] } };
	}

	if (!result.success) {
		console.log(result.error.flatten());
		return result.error.flatten();
	} else {
		console.log(result.data);
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

			const isValidPassword = await bcrypt.compare(result.data.password, prevUserInfo!.password ?? "xxxx");
			if (!isValidPassword) {
				return { fieldErrors: { password: ["비밀번호를 확인해주세요."] } };
			}
			console.log("bcrypt result is", isValidPassword);
			console.log("새로운 비밀번호 : ", result.data.newPassword);
			if (result.data && result.data.newPassword) {
				console.log(result.data.newPassword);
				const newHashedPassword = await bcrypt.hash(result.data?.newPassword, 12);
				console.log(newHashedPassword);

				const user = await db.user.update({
					where: {
						id: session.id,
					},
					data: {
						email: result.data.email,
						username: result.data.username,
						password: newHashedPassword,
						bio: result.data.bio,
						avatar: result.data.avatar,
					},
				});
				console.log(user);
				return redirect(`/users/${data.username}`);
			}

			const user = await db.user.update({
				where: {
					id: session.id,
				},
				data: {
					email: result.data.email,
					username: result.data.username,
					bio: result.data.bio,
					avatar: result.data.avatar,
				},
			});
			console.log(user);
			return redirect(`/users/${data.username}`);
		}
	}
}
