import { pressStart2p } from "@/styles/fonts";

interface FormHeaderProps {
	title: string;
	extraText?: string;
	additionalStyle?: string;
}

export default function FormHeader({ title, extraText, additionalStyle }: FormHeaderProps) {
	return (
		<header className={`${pressStart2p.className} text-center mb-10 ${additionalStyle}`}>
			<h1 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h1>
			{extraText && <p className="text-orange-500 font-semibold">{extraText}</p>}
		</header>
	);
}
