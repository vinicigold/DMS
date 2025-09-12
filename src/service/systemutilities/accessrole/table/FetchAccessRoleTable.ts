interface ApiRole {
	roleid: number
	code: string
	accessname: string
	description: string
	status: boolean
}

interface AccessRoleResults {
	page: number
	limit: number
	total: number
	totalpages: number
	data: ApiRole[]
}

interface AccessRoleApiResponse {
	responseCode: number
	message: string
	results: AccessRoleResults
}

export async function FetchAccessRoleTable(
	params: { page?: number; limit?: number } = {},
): Promise<AccessRoleApiResponse | null> {
	try {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
		const query = new URLSearchParams()
		if (params.page) query.set("page", String(params.page))
		if (params.limit) query.set("limit", String(params.limit))
		const res = await fetch(
			`${API_BASE}/dms/access-role/get-role?${query.toString()}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			},
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
