// accessMatrixApi.ts
export interface Permission {
	permissionId: number
	action: string
	granted: boolean
}

export interface Menu {
	menuId: number
	menuName: string
	permissions: Permission[]
}

export interface Role {
	roleId: number
	roleName: string
	description?: string
	menus: Menu[]
}

export async function fetchRoles(): Promise<Role[]> {
	const res = await fetch("/api/accessmatrix") // replace with your endpoint
	if (!res.ok) throw new Error("Failed to fetch roles")
	const data = await res.json()
	return data
}

export async function updatePermission(
	roleId: number,
	permissionId: number,
	granted: boolean
): Promise<Role> {
	const res = await fetch(`/api/accessmatrix/${roleId}/permission`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ permissionId, granted }),
	})
	if (!res.ok) throw new Error("Failed to update permission")
	return res.json()
}
