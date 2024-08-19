"use client";

import FormButton from "@/components/form/form-button";
import FormHeader from "@/components/form/form-header";
import FormInput from "@/components/form/form-input";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
	const [state, dispatch] = useFormState(createAccount, null);
	return (
		<div className="flex flex-col pt-20 px-10">
			<FormHeader title="Join Us" />
			<form action={dispatch} className="flex flex-col gap-3">
				<FormInput name="email" icon="💌" type="email" placeholder="Email" required errors={state?.fieldErrors.email} />
				<FormInput name="username" icon="👤" type="text" placeholder="Username" required errors={state?.fieldErrors.username} />
				<FormInput name="password" icon="🔑" type="password" placeholder="Password" required errors={state?.fieldErrors.password} />
				<FormInput name="confirmPassword" icon="✔️" type="password" placeholder="Confirm Password" required errors={state?.fieldErrors.confirmPassword} />
				<FormButton text="Create Account!" />
			</form>
		</div>
	);
}
