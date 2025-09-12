// accessMatrixStore.ts
import { create } from "zustand"
import {
	Role,
	RolePermissions,
	getRoles,
	getRolePermissions,
	updateRolePermission,
	Menu,
	editRole,
	EditRolePayload,
} from "@/service/systemutilities/accessmatrix/AccessMatrixApi"

interface AccessMatrixState {
	roles: Role[]
	selectedRole: Role | null
	permissions: RolePermissions | null
	loading: boolean
	isLoadingRoles: boolean
	isLoadingPermissions: boolean
	error: string | null
	currentEditRole: Role | null

	setCurrentEditRole: (role: Role | null) => void
	toggleRoleStatus: (roleId: number) => Promise<void>
	fetchRoles: () => Promise<void>
	selectRole: (role: Role) => Promise<void>
	updatePermission: (
		roleId: number,
		permissionId: number,
		granted: boolean,
	) => Promise<void>
	editRoleAccessMatrix: (payload: EditRolePayload) => Promise<void>
}

function updatePermissionsInMenu(
	menu: Menu,
	permissionId: number,
	granted: boolean,
): Menu {
	return {
		...menu,
		permissions: menu.permissions.map((perm) =>
			perm.accessObjectId === permissionId ? { ...perm, granted } : perm,
		),
	}
}

function updateMenus(
	menus: Menu[],
	permissionId: number,
	granted: boolean,
): Menu[] {
	return menus.map((menu) =>
		updatePermissionsInMenu(menu, permissionId, granted),
	)
}

export const useAccessMatrixStore = create<AccessMatrixState>((set, get) => ({
	roles: [],
	selectedRole: null,
	permissions: null,
	loading: false,
	isLoadingRoles: false,
	isLoadingPermissions: false,
	error: null,
	currentEditRole: null,

	setCurrentEditRole: (role) => set({ currentEditRole: role }),

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
			console.log("Fetched permissions:", permissions)
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

	editRoleAccessMatrix: async (payload) => {
		set({ loading: true, error: null })
		try {
			const response = await editRole(payload)
			set((state) => ({
				roles: state.roles.map((r) =>
					r.roleid === response.results.RoleID
						? {
								roleid: response.results.RoleID,
								code: response.results.Code,
								name: response.results.Name,
								description: response.results.Description,
								isactive: response.results.IsActive,
							}
						: r,
				),
				loading: false,
			}))
		} catch (err) {
			set({
				loading: false,
				error: err instanceof Error ? err.message : "Failed to edit role",
			})
		}
	},

	toggleRoleStatus: async (roleId: number) => {
		const role = get().roles.find((r) => r.roleid === roleId)
		if (!role) return

		const updatedPayload: EditRolePayload = {
			roleid: role.roleid,
			accessname: role.name,
			description: role.description,
			status: !role.isactive, // toggle status
		}

		set({ loading: true, error: null })
		try {
			const res = await editRole(updatedPayload)
			set((state) => ({
				roles: state.roles.map((r) =>
					r.roleid === roleId
						? {
								roleid: res.results.RoleID,
								code: res.results.Code,
								name: res.results.Name,
								description: res.results.Description,
								isactive: res.results.IsActive,
							}
						: r,
				),
				loading: false,
			}))
		} catch (error) {
			set({
				loading: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to toggle role status",
			})
		}
	},
}))
