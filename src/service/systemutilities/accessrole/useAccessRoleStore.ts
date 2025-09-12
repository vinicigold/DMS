import { create } from "zustand"

import {
	fetchAccessRole,
	addAccessRole,
	AccessRole,
	AddAccessRolePayload,
	editAccessRole,
	EditAccessRolePayload,
} from "./AccessRoleApi"

interface AccessRoleState {
	roles: AccessRole[]
	page: number
	limit: number
	total: number
	totalPages: number
	loading: boolean
	error: string | null

	currentEditRole: AccessRole | null
	setCurrentEditRole: (accessRole: AccessRole | null) => void

	fetchRoles: (page?: number, limit?: number) => Promise<void>
	addRole: (payload: AddAccessRolePayload) => Promise<void>
	editRole: (payload: EditAccessRolePayload) => Promise<void>
	setPage: (page: number) => void
	setLimit: (limit: number) => void
}

export const useAccessRoleStore = create<AccessRoleState>((set, get) => ({
	roles: [],
	page: 1,
	limit: 10,
	total: 0,
	totalPages: 0,
	loading: false,
	error: null,

	currentEditRole: null,
	setCurrentEditRole: (accessRole) => set({ currentEditRole: accessRole }),

	setPage: (page: number) => set({ page }),
	setLimit: (limit: number) => set({ limit }),

	fetchRoles: async (page = get().page, limit = get().limit) => {
		set({ loading: true, error: null })
		try {
			const response = await fetchAccessRole(page, limit)
			set({
				roles: response.results.data,
				page: response.results.page,
				limit: response.results.limit,
				total: response.results.total,
				totalPages: response.results.totalpages,
				loading: false,
			})
		} catch (error) {
			set({
				loading: false,
				error: error instanceof Error ? error.message : "Failed to fetch data",
			})
		}
	},

	addRole: async (payload) => {
		set({ loading: true, error: null })
		try {
			await addAccessRole(payload)
			await get().fetchRoles()
			set({ loading: false })
		} catch (error) {
			set({
				loading: false,
				error: error instanceof Error ? error.message : "Failed to fetch data",
			})
		}
	},

	editRole: async (payload: EditAccessRolePayload) => {
		set({ loading: true, error: null })
		try {
			const res = await editAccessRole(payload)

			const updatedRole: AccessRole = {
				roleid: res.results.RoleID,
				code: res.results.Code,
				name: res.results.Name,
				description: res.results.Description,
				isactive: res.results.IsActive,
				usercount: 0,
				totalcount: 0,
			}

			set((state) => ({
				roles: state.roles.map((r) =>
					r.roleid === updatedRole.roleid ? updatedRole : r,
				),
				loading: false,
			}))
		} catch (error) {
			set({
				loading: false,
				error: error instanceof Error ? error.message : "Failed to update role",
			})
		}
	},
}))
