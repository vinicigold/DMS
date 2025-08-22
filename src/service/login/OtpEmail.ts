export async function OtpEmail(): Promise<string | null> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const res = await fetch(`${API_BASE}/dms/verify-otp-email`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})

		if (!res.ok) {
			console.error("Failed to fetch QR:", res.statusText)
			return null
		}

		const blob = await res.blob()
		return URL.createObjectURL(blob)
	} catch (err) {
		console.error("Error fetching QR:", err)
		return null
	}
}
