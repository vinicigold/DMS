interface ApiRole {
	code: string
	roleid: number
	accessname: string
	description: string
	status: boolean
}

interface AccessRoleApiResponse {
	roles: ApiRole[]
	limit: number
	offset: number
	total: number
}

interface UserRoleQuery {
	limit?: number
	offset?: number
}

export async function FetchAccessRoleTable(
	params: UserRoleQuery = { limit: 10, offset: 0 }
): Promise<AccessRoleApiResponse | null> {
	try {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const query = new URLSearchParams({
			limit: String(params.limit ?? 10),
			offset: String(params.offset ?? 0),
		})
		const res = await fetch(
			`${API_BASE}/dms/access-role/get-role?${query.toString()}`,
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
			console.error("failed to fetch user role")
			return null
		}

		const data: AccessRoleApiResponse = await res.json()
		return data
	} catch (err) {
		console.error("Error fetching user role", err)
		return null
	}
}
