export interface Role {
	RoleID: number
	Code: string
	Name: string
	Description: string
	IsActive: boolean
}

export async function UserRole(): Promise<Role[]> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/usersaccount/roles`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			credentials: "include",
			cache: "no-cache",
		})
		if (!res.ok) throw new Error("failed to fetch user account status")
		const data: Role[] = await res.json()
		return data
	} catch (error) {
		console.error("error fetching user account status", error)
		return []
	}
}
