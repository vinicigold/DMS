interface ResendPayload {
	username: string
}

interface ResendResponse {
	message: string
}

export async function ResendTwoFA(
	reset: ResendPayload
): Promise<ResendResponse | null> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/auth/resend-otp-email`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reset),
		})
		if (!res.ok) {
			throw new Error("Failed to resend 2FA")
		}

		const data: ResendResponse = await res.json()
		console.log("resend", data)
		return data
	} catch (err) {
		console.error("Error resending 2FA", err)
		return null
	}
}
