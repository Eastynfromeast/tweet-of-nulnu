import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			keyframes: {
				floatting: {
					from: { transform: "translateY(60px)", opacity: "0" },
					to: { transform: "translateY(0px)", opacity: "1" },
				},
			},
			animation: {
				floatting: "floatting 2s ease-in-out",
			},
		},
	},
	plugins: [],
};
export default config;
