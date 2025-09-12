interface ResetPayload {
	username: string
}

interface ResetResponse {
	message: string
}

export async function ResetTwoFA(
	reset: ResetPayload
): Promise<ResetResponse | null> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/auth/2fa/reset`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reset),
			credentials: "include",
		})
		if (!res.ok) {
			throw new Error("Failed to reset 2FA")
		}

		const data: ResetResponse = await res.json()
		console.log("data in login", data)
		return data
	} catch (err) {
		console.error("Error resetting 2FA", err)
		return null
	}
}
