import { InputHTMLAttributes } from "react";

interface FormInputProps {
	name: string;
	errors?: string[];
	icon?: string;
}

export default function FormInput({ name, errors = [], icon, ...rest }: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="flex flex-col gap-2 text-sm">
			<div className="w-full relative text-black">
				<span className="size-4 block absolute top-1/2 -translate-y-1/2 -mt-[2px] left-4 text-gray-400 ">
					{icon ? (
						icon
					) : (
						<svg className="w-full fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path
								clipRule="evenodd"
								fillRule="evenodd"
								d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
							/>
						</svg>
					)}
				</span>
				<input
					className="py-3 pr-3 pl-10 w-full rounded-3xl outline-none ring ring-transparent bg-white focus:ring-orange-500 focus:outline-orange-300 invalid:ring-red-400 empty:ring-gray-300 empty:ring-1"
					name={name}
					{...rest}
				/>
			</div>
			{errors?.map((error, index) => (
				<p key={index} className="text-red-500 font-medium px-2">
					{error}
				</p>
			))}
		</div>
	);
}
