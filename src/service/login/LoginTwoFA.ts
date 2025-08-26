interface LoginOtpPayload {
	username: string
	otp: string
}

interface LoginOtpResponse {
	message: string
}

export async function LoginTwoFA(
	payload: LoginOtpPayload
): Promise<LoginOtpResponse | false> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const res = await fetch(`${API_BASE}/dms/verify-login-2fa-otp`, {
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

		const data: LoginOtpResponse = await res.json()
		localStorage.setItem("authToken", data.message)

		return data
	} catch (error) {
		console.error("Error verifying OTP:", error)
		return false
	}
}
