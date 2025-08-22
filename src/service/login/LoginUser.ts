interface LoginUserPayload {
	UserName: string
	UserPassword: string
}

export async function LoginUser(login: LoginUserPayload) {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(login),
		})

		const data = await res.json()

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
