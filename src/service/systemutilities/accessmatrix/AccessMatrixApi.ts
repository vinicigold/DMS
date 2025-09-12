export interface Role {
	roleid: number
	code: string
	name: string
	description: string
	isactive: boolean
	usercount?: number
}

export interface Permission {
	accessObjectId: number
	action: string
	description: string
	granted: boolean
}

export interface Menu {
	menuId: number
	menuName: string
	menuDescription: string
	permissions: Permission[]
}

export interface RolePermissions {
	roleId: number
	roleName: string
	menus: Menu[]
}

export interface EditRole {
	RoleID: number
	Code: string
	Name: string
	Description: string
	IsActive: boolean
	CreatedAt: string
	CreatedByID: number
	ModifiedAt: string
	ModifiedByID: number
	CreatedBy: string | null
	ModifiedBy: string | null
	RolePermissions: string | null
}

export interface EditRolePayload {
	roleid: number
	accessname: string
	description: string
	status: boolean
}

export interface EditRoleResponse {
	responseCode: number
	message: string
	results: EditRole
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getRoles(): Promise<Role[]> {
	const response = await fetch(`${API_BASE}/dms/access-role/get-role`, {
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})

	if (!response.ok) throw new Error("Failed to fetch roles.")
	const data = await response.json()
	return data.results.data
}

export async function getRolePermissions(
	roleId: number,
): Promise<RolePermissions> {
	const response = await fetch(
		`${API_BASE}/dms/access-matrix/roles/${roleId}`,
		{ headers: { "Content-Type": "application/json" }, credentials: "include" },
	)

	if (!response.ok) throw new Error("Failed to fetch permissions.")
	return response.json()
}

export async function updateRolePermission(
	roleId: number,
	permissionId: number,
	granted: boolean,
): Promise<void> {
	const response = await fetch(`${API_BASE}/dms/access-matrix/update-access`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ roleId, permissionId, grant: granted }),
		credentials: "include",
	})
	if (!response.ok) {
		throw new Error("Failed to update permission.")
	}
	return response.json()
}

export async function editRole(
	payload: EditRolePayload,
): Promise<EditRoleResponse> {
	const response = await fetch(`${API_BASE}/dms/access-role/update-role`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		credentials: "include",
	})
	if (!response.ok) {
		throw new Error("Failed to edit role.")
	}
	return response.json()
}
