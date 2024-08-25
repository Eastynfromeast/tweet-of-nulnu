export function formatToTimeAgo(date: string) {
	const dayInMs = 1000 * 60 * 60 * 24;
	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const diff = Math.round((time - now) / dayInMs);
	const formatter = new Intl.RelativeTimeFormat("en");
	return formatter.format(diff, "days");
}

export const checkPassword = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => password === confirmPassword;
