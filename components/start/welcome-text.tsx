"use client";

import Typewriter from "typewriter-effect";

const welcomeText = `Hello, there? <br/> New to here?`;

export default function WelcomeText() {
	return (
		<div className="mb-10 text-green-400 font-lg">
			<Typewriter
				onInit={typewriter => {
					typewriter.typeString(welcomeText).pauseFor(2000).start();
				}}
			/>
		</div>
	);
}
