export interface AccountStatus {
	AccountStatusID: number
	Code: string
	Name: string
	IsActive: boolean
}

export async function UserStatus(): Promise<AccountStatus[]> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const res = await fetch(`${API_BASE}/dms/useraccount/accountstatus`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}` || "",
			},
			credentials: "include",
			cache: "no-cache",
		})
		if (!res.ok) throw new Error("failed to fetch user account status")
		return await res.json()
	} catch (error) {
		console.error("error fetching user account status", error)
		return []
	}
}
