interface VerifyRegisterOtpPayload {
	username: string
	otp: string
}

interface VerifyRegisterOtpResponse {
	message: string
}

export async function VerifyRegisterOtp(
	payload: VerifyRegisterOtpPayload
): Promise<VerifyRegisterOtpResponse | false> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const res = await fetch(`${API_BASE}/dms/auth/verify-register-2fa-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			credentials: "include",
		})

		console.log(payload)

		if (!res.ok) {
			return false
		}

		const data: VerifyRegisterOtpResponse = await res.json()
		localStorage.setItem("authToken", data.message)

		return data
	} catch (error) {
		console.error("Error verifying OTP:", error)
		return false
	}
}
