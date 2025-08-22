interface VerifyRegisterOtpPayload {
	username: string
	otp: string
}

export async function VerifyRegisterOtp(payload: VerifyRegisterOtpPayload) {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const res = await fetch(`${API_BASE}/dms/verify-register-2fa-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
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
