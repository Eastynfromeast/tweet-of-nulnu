import FormButton from "@/components/form/form-button";

export default function EditUserProfile() {
	return (
		<div className="container-basic mb-20 *:w-full">
			<h2 className="mb-5 text-lg font-bold text-white">Edit Profile</h2>
			<section className="mb-10 md:grid grid-flow-col items-center">
				<form>
					<FormButton text="Submit New Profile" />
				</form>
			</section>
		</div>
	);
}
