export interface Role {
	roleid: number
	code: string
	name: string
	description: string
	status: boolean
	usercount?: number
}

export interface Permission {
	permissionId: number
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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getRoles(): Promise<Role[]> {
	const token = localStorage.getItem("authToken")
	const response = await fetch(`${API_BASE}/dms/access-role/get-role`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `${token}`,
		},
		credentials: "include",
	})

	if (!response.ok) throw new Error("Failed to fetch roles.")
	const data = await response.json()
	return data.results.data
}

export async function getRolePermissions(
	roleId: number
): Promise<RolePermissions> {
	const token = localStorage.getItem("authToken")
	const response = await fetch(
		`${API_BASE}/dms/access-matrix/roles/${roleId}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			credentials: "include",
		}
	)

	if (!response.ok) throw new Error("Failed to fetch permissions.")
	return response.json()
}

export async function updateRolePermission(
	roleId: number,
	permissionId: number,
	granted: boolean
): Promise<void> {
	const token = localStorage.getItem("authToken")
	const response = await fetch(`${API_BASE}/dms/access-matrix/update-access`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `${token}`,
		},
		body: JSON.stringify({ roleId, permissionId, grant: granted }),
		credentials: "include",
	})
	if (!response.ok) throw new Error("Failed to update permission.")
}
