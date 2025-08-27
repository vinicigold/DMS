interface ApiUser {
	username: string
	staffID: string
	fullName: string
	institution: string
	rolename: string
	email: string
	mobileNumber: string
	status: string
	passwordExpirationDate?: string
	dateLocked: string
	functions: string
}

interface UserAccountApiResponse {
	page: number
	limit: number
	total: number
	totalpages: number
	data: ApiUser[]
}

export async function UserAccountsTable(
	params: { page?: number; limit?: number } = {}
): Promise<UserAccountApiResponse | null> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const query = new URLSearchParams()
		if (params.page) query.set("page", String(params.page))
		if (params.limit) query.set("limit", String(params.limit))

		const res = await fetch(
			`${API_BASE}/dms/usersaccount/user-list?${query.toString()}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}` || "",
				},
				credentials: "include",
			}
		)

		if (!res.ok) {
			console.error("Failed to fetch user accounts")
			return null
		}

		const data: UserAccountApiResponse = await res.json()
		return data
	} catch (err) {
		console.error("Error fetching user accounts", err)
		return null
	}
}
