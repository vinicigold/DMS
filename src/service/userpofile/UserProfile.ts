interface UserProfileResponse {
	name: string
	role: string
	permissions: string[]
}

export async function UserProfile(): Promise<UserProfileResponse | null> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const res = await fetch(`${API_BASE}/dms/user-profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}` || "",
			},
			credentials: "include",
		})

		if (!res.ok) {
			console.error("Failed to fetch user name & role")
			return null
		}
		const data = await res.json()

		// Map only the fields you need
		const userProfile: UserProfileResponse = {
			name: data.name,
			role: data.role,
			permissions: Array.isArray(data.permissions) ? data.permissions : [],
		}

		return userProfile
	} catch (err) {
		console.error("Error fetching user name & role", err)
		return null
	}
}
