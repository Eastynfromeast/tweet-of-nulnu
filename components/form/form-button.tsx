"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
	text: string;
}

export default function FormButton({ text }: FormButtonProps) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={pending}
			className="w-full p-3 rounded-3xl mt-3 bg-blue-500 text-white font-medium hover:bg-green-500 transition disabled:bg-neutral-400 disabled:text-neutral-100"
		>
			{pending ? "loading..." : text}
		</button>
	);
}
