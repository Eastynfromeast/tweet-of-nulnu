import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getUser(username: string) {
	/* 	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
		if (user) {
			console.log(user);
			return user;
		}
	} */
	const user = await db.user.findUnique({
		where: {
			username,
		},
		include: {
			tweets: {
				select: {
					id: true,
					created_at: true,
					updated_at: true,
					context: true,
					views: true,
					_count: {
						select: {
							likes: true,
						},
					},
				},
			},
		},
	});
	if (user) {
		return user;
	}
}
