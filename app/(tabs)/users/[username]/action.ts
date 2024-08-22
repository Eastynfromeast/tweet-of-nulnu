import db from "@/lib/db";

export async function getUser(username: string) {
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
