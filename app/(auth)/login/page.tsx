"use client";

import { useFormState } from "react-dom";
import { onSubmit } from "./action";
import Link from "next/link";
import FormHeader from "@/components/form/form-header";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";

export default function FormsAndActions() {
	const [state, dispatch] = useFormState(onSubmit, null);
	console.log("state changes into", state);
	return (
		<div className="flex flex-col pt-20 px-10">
			<FormHeader additionalStyle="mb-10" title="Authentication" />
			<form action={dispatch} className="flex flex-col gap-3">
				<FormInput name="email" icon="💌" type="email" placeholder="Email" required errors={state?.fieldErrors.email ?? []} />
				<FormInput name="password" icon="🔑" type="password" placeholder="Password" required errors={state?.fieldErrors.password ?? []} />
				<FormButton text="Log In" />
			</form>
			{state === undefined && (
				<div className="flex flex-row justify-center items-center gap-2 text-center mt-8 font-medium text-lg bg-green-500 text-white rounded-3xl py-4 px-5">
					<span className="inline-block size-6">
						<svg className="fill-none stroke-2 stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
						</svg>
					</span>
					<p>Welcome Back!</p>
				</div>
			)}
			<Link className="mt-5 text-center text-white font-medium hover:underline hover:text-green-500" href="/create-account">
				No account? JOIN US!
			</Link>
		</div>
	);
}
