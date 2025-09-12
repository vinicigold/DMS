export interface AccessRole {
	roleid: number
	code: string
	name: string
	description: string
	isactive: boolean
	usercount: number
	totalcount: number
}

export interface AccessRoleResponse {
	responseCode: number
	message: string
	results: {
		page: number
		limit: number
		total: number
		totalpages: number
		data: AccessRole[]
	}
}

export interface AddAccessRolePayload {
	code: string
	name: string
	description: string
	isactive: boolean
}

export interface AddAccessRoleResponse {
	roleid: number
	code: string
	accessname: string
	description: string
	status: boolean
}

export interface EditAccessRolePayload {
	roleid: number
	accessname: string
	description: string
	status: boolean
}

export interface EditAccessRoleResponse {
	responseCode: number
	message: string
	results: {
		RoleID: number
		Code: string
		Name: string
		Description: string
		IsActive: boolean
	}
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchAccessRole(
	page: number,
	limit: number,
): Promise<AccessRoleResponse> {
	const res = await fetch(
		`${API_BASE}/dms/access-role/get-role?page=${page}&limit=${limit}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch system configs")
	}

	return res.json()
}

export async function addAccessRole(
	payload: AddAccessRolePayload,
): Promise<AddAccessRoleResponse> {
	const res = await fetch(`${API_BASE}/dms/access-role/add-role`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	})

	if (!res.ok) {
		throw new Error("Failed to create role")
	}

	return res.json()
}

export async function editAccessRole(
	payload: EditAccessRolePayload,
): Promise<EditAccessRoleResponse> {
	const res = await fetch(`${API_BASE}/dms/access-role/update-role`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	})
	if (!res.ok) {
		throw new Error("Failed to create role")
	}

	return res.json()
}
