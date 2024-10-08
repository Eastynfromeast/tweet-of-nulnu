"use server";

import { Prisma } from "@prisma/client";
import db from "./db";
import getSession from "./session";

export async function getUserBySession() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
			select: {
				id: true,
				username: true,
				email: true,
				avatar: true,
			},
		});
		return user;
	}
}

export type UserType = Prisma.PromiseReturnType<typeof getUserBySession>;
