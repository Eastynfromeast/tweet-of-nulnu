"use client";

import { pressStart2p, sourceCodePro } from "@/styles/fonts";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
	text: string;
}

export default function FormButton({ text }: FormButtonProps) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={pending}
			className={`${sourceCodePro.className} w-full p-1.5 md:p-3 mt-3 bg-neutral-200 text-neutral-950 font-bold md:text-lg hover:bg-green-400 transition disabled:bg-neutral-400 disabled:text-neutral-100`}
		>
			{pending ? "loading..." : text}
		</button>
	);
}
