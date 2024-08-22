"use client";

import { UserInfo } from "@/app/(tabs)/users/[username]/edit/page";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormButton from "./form-button";
import FormInput from "./form-input";
import { UserSchema, fileSchema, userSchema } from "@/app/(tabs)/users/[username]/edit/schema";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface FormEditProfileProps {
	userInfo: UserInfo;
}

export default function FormEditProfile({ userInfo }: FormEditProfileProps) {
	const [preview, setPreview] = useState("");
	const [fileError, setFileError] = useState<string[]>([]);
	const [uploadUrl, setUploadUrl] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm<UserSchema>({
		resolver: zodResolver(userSchema),
	});

	const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;
		if (!files) {
			return;
		}
		const file = files[0];
		const result = fileSchema.safeParse(file);
		if (!result.success) {
			setFileError(result.error.flatten().fieldErrors.size || ["이미지 파일만 업로드 가능합니다."]);
		}
	};

	return (
		<form className="flex flex-col gap-3 md:px-5">
			<div className="flex flex-col justify-center items-center gap-3 mb-5">
				<label
					htmlFor="avatar"
					className={`size-44 rounded-full text-neutral-100 border-2 border-neutral-100 border-dashed flex flex-col justify-center items-center gap-1 cursor-pointer transition hover:text-green-400 hover:border-green-400`}
				>
					{userInfo?.avatar ? (
						<Image src={userInfo.avatar} alt={userInfo.username} />
					) : (
						<>
							<PhotoIcon className="size-12" />
							<span className="px-5 text-xs text-center font-semibold">
								프로필 이미지
								<br />
								추가하기
							</span>
						</>
					)}
				</label>
				<input onChange={onImageChange} type="file" id="avatar" name="avatar" accept="image/*" className="hidden" />
				{fileError !== null && <p className="text-red-600">{fileError[0]}</p>}
				{errors.avatar?.message && <p className="text-red-600">{errors.avatar.message}</p>}
			</div>
			<FormInput placeholder={userInfo?.username} icon="👤" type="text" required {...register("username")} errors={[errors?.username?.message ?? ""]} />
			<FormInput placeholder={userInfo?.email} icon="💌" type="email" required {...register("email")} errors={[errors?.email?.message ?? ""]} />
			<FormInput
				placeholder="비밀번호를 입력해주세요"
				icon="🔑"
				type="password"
				required
				{...register("password")}
				errors={[errors?.password?.message ?? ""]}
			/>
			<FormInput
				placeholder="비밀번호를 입력해주세요"
				icon="✔️"
				type="password"
				required
				{...register("confirmPassword")}
				errors={[errors?.confirmPassword?.message ?? ""]}
			/>
			<FormInput
				placeholder={userInfo?.bio ? userInfo.bio : "멋진 이력을 적어주세요"}
				icon="😎"
				type="text"
				{...register("bio")}
				errors={[errors?.bio?.message ?? ""]}
			/>
			<FormButton text="Submit New Profile" />
		</form>
	);
}
