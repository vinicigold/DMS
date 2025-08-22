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
	users: ApiUser[]
	limit: number
	offset: number
	total: number
}

interface UserAccountQuery {
	limit?: number
	offset?: number
}

export async function UserAccountsTable(
	params: UserAccountQuery = { limit: 10, offset: 0 }
): Promise<UserAccountApiResponse | null> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const query = new URLSearchParams({
			limit: String(params.limit ?? 10),
			offset: String(params.offset ?? 0),
		})
		const res = await fetch(
			`${API_BASE}/dms/useraccount/useraccountlist?${query.toString()}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				credentials: "include",
			}
		)

		if (!res.ok) {
			console.error("failed to fetch user accounts")
			return null
		}

		return (await res.json()) as UserAccountApiResponse
	} catch (err) {
		console.error("Error fetching user accounts", err)
		return null
	}
}
