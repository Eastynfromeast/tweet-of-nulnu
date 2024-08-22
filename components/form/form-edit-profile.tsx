"use client";

import { UserInfo } from "@/app/(tabs)/users/[username]/edit/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormButton from "./form-button";
import { fileSchema, userSchema } from "@/app/(tabs)/users/[username]/edit/schema";
import { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getUploadUrl, updateUserProfile } from "@/app/(tabs)/users/[username]/edit/action";
import RhfInput from "./rhf-input";

interface FormEditProfileProps {
	userInfo: UserInfo;
}

interface UserFormType {
	avatar: string;
	username: string;
	email: string;
	password: string;
	newPassword: string;
	confirmNewPassword: string;
	bio: string;
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
	} = useForm<UserFormType>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: userInfo?.username,
			email: userInfo?.email,
			bio: userInfo?.bio ? userInfo.bio : "",
			avatar: userInfo?.avatar ? userInfo.avatar : "",
		},
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
		} else {
			const url = URL.createObjectURL(file);
			setPreview(url);
			setFile(file);
			setFileError([]);
			// 여기가 안된다!
			const { success, result } = await getUploadUrl();
			if (success) {
				const { id, uploadURL } = result;
				console.log("Result is ", result);
				setUploadUrl(uploadURL);
				setValue("avatar", `https://imagedelivery.net/q-lAPPNo8Q6bxo1lIjEnjA/${id}`);
			}
		}
	};

	const onSubmit = handleSubmit(async (data: UserFormType) => {
		if (file) {
			const cloudflareForm = new FormData();
			cloudflareForm.append("file", file);
			const response = await fetch(uploadUrl, {
				method: "POST",
				body: cloudflareForm,
			});
			if (response.status !== 200) {
				return;
			}
		}
		console.log("기존 데이터", data);
		console.log("폼 제출 시 : ", uploadUrl);
		const formData = new FormData();
		formData.append("avatar", data.avatar);
		formData.append("username", data.username);
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("password", data.newPassword ?? "");
		formData.append("confirmPassword", data.confirmNewPassword ?? "");
		formData.append("bio", data.bio);

		return updateUserProfile(formData);
	});

	const onValid = async () => {
		await onSubmit();
	};
	console.log(errors);
	return (
		<form action={onValid} className="flex flex-col gap-3 md:px-5">
			<label
				htmlFor="avatar"
				className={`self-center size-44 rounded-full flex flex-col justify-center items-center gap-1 cursor-pointer transition hover:text-green-400 hover:border-green-400 bg-cover`}
				style={{
					backgroundImage: `url(${preview})`,
				}}
			>
				{userInfo?.avatar && <Image src={userInfo.avatar} alt={userInfo.username} />}
				{preview === "" && (
					<div className="w-full h-full text-neutral-100 border-2 border-neutral-100 border-dashed rounded-full flex flex-col justify-center items-center gap-1">
						<PhotoIcon className="size-12" />
						<span className="px-5 text-xs text-center font-semibold">
							프로필 이미지
							<br />
							추가하기
						</span>
					</div>
				)}
			</label>
			<input onChange={onImageChange} type="file" id="avatar" name="avatar" accept="image/*" className="hidden" />
			{fileError !== null && <p className="text-red-600">{fileError[0]}</p>}
			{errors.avatar?.message && <p className="text-red-600">{errors.avatar.message}</p>}

			<RhfInput placeholder={userInfo?.username} icon="👤" type="text" required {...register("username")} errors={[errors?.username?.message ?? ""]} />
			<RhfInput placeholder={userInfo?.email} icon="💌" type="email" required {...register("email")} errors={[errors?.email?.message ?? ""]} />
			<RhfInput
				placeholder="정보 수정을 위해 기존 비밀번호를 입력해주세요"
				icon="🔑"
				type="password"
				required
				{...register("password")}
				errors={[errors?.password?.message ?? ""]}
			/>
			<RhfInput
				placeholder="새로운 비밀번호를 입력해주세요"
				icon="🆕"
				type="password"
				{...register("newPassword")}
				errors={[errors?.newPassword?.message ?? ""]}
			/>
			<RhfInput
				placeholder="새로운 비밀번호를 확인해주세요"
				icon="✔️"
				type="password"
				{...register("confirmNewPassword")}
				errors={[errors?.confirmNewPassword?.message ?? ""]}
			/>
			<RhfInput
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
