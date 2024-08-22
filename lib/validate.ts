"use server";

import db from "./db";
import getSession from "./session";

export async function hasUserNameTaken(username: string) {
	const user = await db.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
		},
	});
	return Boolean(user);
}

export async function hasUserEmailTaken(email: string) {
	const user = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});
	return Boolean(user);
}

export async function validateUserName(username: string) {
	const session = await getSession();
	const user = await db.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
		},
	});

	if (session.id === user?.id) return Boolean(user);

	return !Boolean(user);
}

export async function validateUserEmail(email: string) {
	const session = await getSession();
	const user = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});
	console.log(user?.id);
	if (session.id === user?.id) return Boolean(user);

	return !Boolean(user);
}
