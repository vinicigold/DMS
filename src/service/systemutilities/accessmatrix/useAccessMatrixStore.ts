// accessMatrixStore.ts
import { create } from "zustand"
import {
	Role,
	RolePermissions,
	getRoles,
	getRolePermissions,
	updateRolePermission,
	Menu,
} from "@/service/systemutilities/accessmatrix/AccessMatrixApi"

interface AccessMatrixState {
	roles: Role[]
	selectedRole: Role | null
	permissions: RolePermissions | null
	isLoadingRoles: boolean
	isLoadingPermissions: boolean
	error: string | null

	fetchRoles: () => Promise<void>
	selectRole: (role: Role) => Promise<void>
	updatePermission: (
		roleId: number,
		permissionId: number,
		granted: boolean
	) => Promise<void>
}

function updatePermissionsInMenu(
	menu: Menu,
	permissionId: number,
	granted: boolean
): Menu {
	return {
		...menu,
		permissions: menu.permissions.map((perm) =>
			perm.permissionId === permissionId ? { ...perm, granted } : perm
		),
	}
}

// ✅ Helper function: update all menus
function updateMenus(
	menus: Menu[],
	permissionId: number,
	granted: boolean
): Menu[] {
	return menus.map((menu) =>
		updatePermissionsInMenu(menu, permissionId, granted)
	)
}

export const useAccessMatrixStore = create<AccessMatrixState>((set) => ({
	roles: [],
	selectedRole: null,
	permissions: null,
	isLoadingRoles: false,
	isLoadingPermissions: false,
	error: null,

	fetchRoles: async () => {
		set({ isLoadingRoles: true, error: null })
		try {
			const roles = await getRoles()
			set({ roles, isLoadingRoles: false })
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, isLoadingRoles: false })
			} else {
				set({ error: String(error), isLoadingRoles: false })
			}
		}
	},

	selectRole: async (role) => {
		set({ selectedRole: role, isLoadingPermissions: true, error: null })
		try {
			const permissions = await getRolePermissions(role.roleid)
			set({ permissions, isLoadingPermissions: false })
		} catch (error) {
			if (error instanceof Error) {
				set({ error: error.message, isLoadingPermissions: false })
			} else {
				set({ error: String(error), isLoadingPermissions: false })
			}
		}
	},

	updatePermission: async (roleId, permissionId, granted) => {
		try {
			await updateRolePermission(roleId, permissionId, granted)

			set((state) => {
				if (!state.permissions) return {}

				return {
					permissions: {
						...state.permissions,
						menus: updateMenus(state.permissions.menus, permissionId, granted),
					},
				}
			})
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : String(error),
				isLoadingPermissions: false,
			})
		}
	},
}))
