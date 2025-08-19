interface VerifyOtpPayload {
	username: string
	otp: string
}

export async function VerifyOtp(payload: VerifyOtpPayload) {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const res = await fetch(`${API_BASE}/dms/verify-otp-email`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token || "",
			},
			body: JSON.stringify(payload),
			credentials: "include",
		})

		console.log(payload)

		if (!res.ok) {
			return false
		}

		const data = await res.json()

		return data
	} catch (error) {
		console.error("Error verifying OTP:", error)
		return false
	}
}
