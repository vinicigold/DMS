interface VerifyOtpPayload {
	username: string
	otp: string
}

interface VerifyOtpResponse {
	qrCode: string
}

export async function VerifyOtp(
	payload: VerifyOtpPayload
): Promise<VerifyOtpResponse | false> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const res = await fetch(`${API_BASE}/dms/auth/2fa/verify-email-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			credentials: "include",
		})

		if (!res.ok) {
			return false
		}

		const data: VerifyOtpResponse = await res.json()
		console.log("display qr", data)

		return data
	} catch (error) {
		console.error("Error verifying OTP:", error)
		return false
	}
}
