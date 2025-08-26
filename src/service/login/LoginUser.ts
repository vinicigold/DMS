interface LoginUserPayload {
	UserName: string
	UserPassword: string
}

interface LoginUserResponse {
	email: string
	message: string
	otp: string
}

export async function LoginUser(
	login: LoginUserPayload
): Promise<{ status: number; data: LoginUserResponse } | null> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(login),
		})
		if (!res.ok) {
			throw new Error("Invalid Username or Password")
		}

		const data: LoginUserResponse = await res.json()

		console.log("data in login", data)

		return {
			status: res.status,
			data,
		}
	} catch (err) {
		console.error("Error login", err)
		return null
	}
}
