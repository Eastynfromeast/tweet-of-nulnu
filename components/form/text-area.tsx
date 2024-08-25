import { nanumGothicCoding } from "@/styles/fonts";
import { TextareaHTMLAttributes } from "react";

interface TextAreaProps {
	name: string;
	placeholder: string;
	errors?: string[];
}

export default function TextArea({ name, placeholder, errors = [], ...rest }: TextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<div className="flex flex-col gap-2">
			<textarea
				name={name}
				placeholder={placeholder}
				className={`${nanumGothicCoding.className} w-full min-w-full min-h-24 md:min-h-48  p-5 placeholder:text-neutral-400 bg-transparent font-medium text-neutral-200  resize-none outline-dashed outline-neutral-400 outline-2 ring-none focus:outline-green-400 focus:text-green-400 focus:bg-transparent active:bg-transparent peer autofill:bg-transparent default:bg-transparent invalid:ring-red-400`}
			/>
			{errors?.map((error, index) => (
				<p key={index} className="text-red-500 font-medium px-2">
					{error}
				</p>
			))}
		</div>
	);
}
