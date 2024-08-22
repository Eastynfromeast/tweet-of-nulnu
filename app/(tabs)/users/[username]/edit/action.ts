"use server";

export async function getUploadUrl() {
	const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_ACCOUNT_ID}/images/v2/direct_upload`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.CLOUD_API_KEY},`,
		},
	});
	const data = await response.json();
	return data;
}
