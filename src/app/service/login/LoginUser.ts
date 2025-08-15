interface LoginUserPayload {
	UserName: string
	UserPassword: string
}

export async function LoginUser(login: LoginUserPayload): Promise<boolean> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(login),
			credentials: "include",
		})

		if (!res.ok) {
			console.error("failed to login")
			return false
		}

		console.log("Login Successful")
		return true
	} catch (err) {
		console.error("Error login", err)
		return false
	}
}
