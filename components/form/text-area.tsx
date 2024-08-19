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
				className="w-full min-w-full min-h-48 rounded-lg  p-5 placeholder:text-gray-700 bg-gray-50 bg-opacity-75 font-medium text-black  resize-none outline-none ring ring-transparent focus:ring-blue-500 focus:outline-blue-300 invalid:ring-red-400"
			/>
			{errors?.map((error, index) => (
				<p key={index} className="text-red-500 font-medium px-2">
					{error}
				</p>
			))}
		</div>
	);
}
