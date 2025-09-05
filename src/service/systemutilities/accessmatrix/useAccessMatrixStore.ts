// accessMatrixStore.ts
import { create } from "zustand"
import {
	Role,
	Permission,
	fetchRoles,
	updatePermission as apiUpdatePermission,
} from "./AccessMatrixApi"

interface AccessMatrixStore {
	roles: Role[]
	selectedRole: Role | null
	isLoading: boolean
	error: string | null

	fetchRoles: () => Promise<void>
	selectRole: (role: Role) => void
	updatePermission: (
		roleId: number,
		permissionId: number,
		granted: boolean
	) => Promise<void>
}

export const useAccessMatrixStore = create<AccessMatrixStore>((set, get) => ({
	roles: [],
	selectedRole: null,
	isLoading: false,
	error: null,

	fetchRoles: async () => {
		set({ isLoading: true, error: null })
		try {
			const roles = await fetchRoles()
			set({ roles, isLoading: false })
		} catch (err: any) {
			set({ error: err.message, isLoading: false })
		}
	},

	selectRole: (role) => {
		set({ selectedRole: role })
	},

	updatePermission: async (roleId, permissionId, granted) => {
		try {
			// Optimistically update local state
			const roles = get().roles.map((role) => {
				if (role.roleId === roleId) {
					return {
						...role,
						menus: role.menus.map((menu) => ({
							...menu,
							permissions: menu.permissions.map((p) =>
								p.permissionId === permissionId ? { ...p, granted } : p
							),
						})),
					}
				}
				return role
			})

			set({ roles })

			// Update selectedRole if currently selected
			const selectedRole = get().selectedRole
			if (selectedRole?.roleId === roleId) {
				set({ selectedRole: roles.find((r) => r.roleId === roleId) || null })
			}

			// Call API
			await apiUpdatePermission(roleId, permissionId, granted)
		} catch (err: any) {
			console.error(err)
			// Optional: revert change if API fails
		}
	},
}))
