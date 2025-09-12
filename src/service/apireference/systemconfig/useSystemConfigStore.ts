import { create } from "zustand"
import {
	fetchSystemConfigs,
	SystemConfig,
	addSystemConfig,
	editSystemConfig,
	EditSystemConfigPayload,
} from "./SystemConfigApi"

interface SystemConfigState {
	configs: SystemConfig[]
	page: number
	limit: number
	total: number
	totalPages: number
	loading: boolean
	error: string | null

	currentEditConfig: SystemConfig | null
	setCurrentEditConfig: (config: SystemConfig | null) => void

	fetchConfigs: (page?: number, limit?: number) => Promise<void>
	addConfig: (payload: Omit<SystemConfig, "systemconfigid">) => Promise<void>
	editConfig: (payload: EditSystemConfigPayload) => Promise<void>
	toggleConfigStatus: (systemconfigid: number) => Promise<void>
	setPage: (page: number) => void
	setLimit: (limit: number) => void
}

export const useSystemConfigStore = create<SystemConfigState>((set, get) => ({
	configs: [],
	page: 1,
	limit: 10,
	total: 0,
	totalPages: 0,
	loading: false,
	error: null,

	currentEditConfig: null,
	setCurrentEditConfig: (config) => set({ currentEditConfig: config }),

	setPage: (page) => set({ page }),
	setLimit: (limit) => set({ limit }),

	fetchConfigs: async (page = get().page, limit = get().limit) => {
		set({ loading: true, error: null })
		try {
			const res = await fetchSystemConfigs(page, limit)
			set({
				configs: res.results.data,
				page: res.results.page,
				limit: res.results.limit,
				total: res.results.total,
				totalPages: res.results.totalpages,
				loading: false,
			})
		} catch (error) {
			set({
				loading: false,
				error: error instanceof Error ? error.message : "Failed to fetch data",
			})
		}
	},

	addConfig: async (payload) => {
		set({ loading: true, error: null })
		try {
			await addSystemConfig(payload)
			// refresh table after add
			await get().fetchConfigs()
			set({ loading: false })
		} catch (error) {
			set({
				loading: false,
				error: error instanceof Error ? error.message : "Failed to fetch data",
			})
		}
	},

	editConfig: async (payload) => {
		set({ loading: true, error: null })
		try {
			const res = await editSystemConfig(payload)
			set((state) => ({
				configs: state.configs.map((cfg) =>
					cfg.systemconfigid === res.results.systemconfigid ? res.results : cfg,
				),
				loading: false,
			}))
		} catch (error) {
			set({
				loading: false,
				error:
					error instanceof Error ? error.message : "Failed to update config",
			})
		}
	},

	toggleConfigStatus: async (systemconfigid: number) => {
		const config = get().configs.find(
			(c) => c.systemconfigid === systemconfigid,
		)
		if (!config) return

		const updatedPayload: EditSystemConfigPayload = {
			...config,
			status: !config.status, // toggle status
		}

		set({ loading: true, error: null })
		try {
			const res = await editSystemConfig(updatedPayload)
			set((state) => ({
				configs: state.configs.map((c) =>
					c.systemconfigid === systemconfigid ? res.results : c,
				),
				loading: false,
			}))
		} catch (error) {
			set({
				loading: false,
				error:
					error instanceof Error ? error.message : "Failed to toggle status",
			})
		}
	},
}))
