import WelcomeText from "@/components/start/welcome-text";
import { pressStart2p, sourceCodePro } from "@/styles/fonts";
import Link from "next/link";

export default function StartPage() {
	return (
		<div className={`flex flex-col justify-center items-center min-h-screen px-5 ${sourceCodePro.className}`}>
			<WelcomeText />
			<section className="animate-[floatting_2s_ease-in-out_2000ms_forwards] opacity-0 min-h-52 flex flex-col items-center gap-3">
				<h1
					className={`${pressStart2p.className} font-bold text-2xl h-full flex items-center uppercase mb-5 text-green-400 hover:text-neutral-950 hover:bg-green-400`}
				>
					Tweet of Nulnu
				</h1>
				<Link className={`${pressStart2p.className} text-sm btn block text-center max-w-sm`} href="/login">
					Go to log in
				</Link>
				<Link className="mt-5 text-white font-medium hover:underline hover:text-green-500" href="/create-account">
					No account? JOIN US!
				</Link>
			</section>
		</div>
	);
}
