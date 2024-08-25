import Link from "next/link";
import { getUser } from "./action";
import TweetListItem from "@/components/tweet/tweet-list-item";
import ButtonLogout from "@/components/form/button-logout";
import UserAvatar from "@/components/user/user-avatar";
import { notFound } from "next/navigation";
import { sourceCodePro } from "@/styles/fonts";

export default async function User({ params }: { params: { username: string } }) {
	const user = await getUser(params.username);

	if (!user) {
		notFound();
	}

	return (
		<div className="container-basic mb-20 *:w-full">
			<h2 className={`${sourceCodePro.className} mb-5 text-lg font-bold text-neutral-300`}>Profile</h2>
			<section className={`${sourceCodePro.className} mb-10 md:grid grid-flow-col items-center`}>
				<div className="flex flex-col items-center gap-3 min-w-48">
					<h1 className={`${sourceCodePro.className} text-2xl font-bold text-green-400 uppercase`}>{user?.username}</h1>
					<UserAvatar username={user?.username!} avatar={user?.avatar} />
				</div>
				<ul className="w-full flex flex-col gap-3 px-5 text-neutral-200 *:flex *:flex-row *:gap-3">
					<li>
						<span className="opacity-80">name</span>
						<p>{user?.username}</p>
					</li>
					<li>
						<span className="opacity-80">email</span>
						<p>{user?.email}</p>
					</li>
					<li>
						<span className="opacity-80">bio</span>
						<p>{user?.bio ? user.bio : "자기 소개를 적어주세요"}</p>
					</li>
					<li className="w-full">
						<Link
							href={`/users/${user?.username}/edit`}
							className="text-center w-full p-1.5 md:p-3 mt-3 bg-neutral-300 text-neutral-950 font-bold md:text-lg hover:bg-green-400 transition disabled:bg-neutral-400 disabled:text-neutral-100"
						>
							Edit Profile
						</Link>
					</li>
				</ul>
			</section>
			<section>
				<h2 className={`${sourceCodePro.className} mb-5 text-lg font-bold text-neutral-300`}>Tweets</h2>
				<ul className="flex flex-col gap-5 last:border-b-0">
					{user?.tweets?.map(tweet => (
						<TweetListItem key={tweet.id} user={user} {...tweet} />
					))}
				</ul>
			</section>
			<ButtonLogout />
		</div>
	);
}
