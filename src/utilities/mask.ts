export function maskEmail(email: string): string {
	const [local, domain] = email.split("@")
	if (local.length <= 2) return email
	const firstChar = local[0]
	const lastChar = local[local.length - 1]
	const masked = firstChar + "*".repeat(local.length - 2) + lastChar
	return masked + "@" + domain
}
