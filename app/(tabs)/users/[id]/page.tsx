import TweetList from "@/components/tweet/tweet-list";
import { getUser } from "./action";
import TweetListItem from "@/components/tweet/tweet-list-item";
import FormButton from "@/components/form/form-button";

export default async function User({ params }: { params: { id: string } }) {
	console.log(params.id);
	const user = await getUser(params.id);
	return (
		<div className="container-basic mb-20 *:w-full">
			<h2 className="mb-5 text-lg font-bold text-neutral-400">Profile</h2>
			<section className="mb-10 md:grid grid-flow-col items-center">
				<div className="flex flex-col items-center gap-3">
					<h1 className="text-2xl font-bold text-green-400 uppercase">{user?.username}</h1>
					<div className="size-28 rounded-full bg-neutral-100" />
				</div>
				<ul className="w-full flex flex-col gap-3 px-5 *:flex *:flex-row *:gap-3">
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
						<form className="w-full">
							<FormButton text="Edit Profile" />
						</form>
					</li>
				</ul>
			</section>

			<section>
				<h2 className="mb-5 text-lg font-bold text-neutral-400">Tweets</h2>
				<ul className="flex flex-col gap-5 last:border-b-0">
					{user?.tweets?.map(tweet => (
						<TweetListItem key={tweet.id} user={user} {...tweet} />
					))}
				</ul>
			</section>
		</div>
	);
}
