import { create } from "zustand"
import {
	fetchAccessObjects,
	fetchParentObjects,
	AccessObject,
	ParentObject,
	editAccessObject,
	EditAccessObjectPayload,
	addAccessObject,
} from "./AccessObjectApi"

interface AccessObjectState {
	accessObjects: AccessObject[]
	parentObjects: ParentObject[]
	page: number
	limit: number
	total: number
	totalPages: number
	loading: boolean
	error: string | null

	currentEditObj: AccessObject | null
	setCurrentEditObj: (config: AccessObject | null) => void

	fetchObjects: (page?: number, limit?: number) => Promise<void>
	fetchParents: () => Promise<void>
	addObject: (payload: Omit<AccessObject, "accessObjectId">) => Promise<void>
	editAccObj: (payload: EditAccessObjectPayload) => Promise<void>
	setPage: (page: number) => void
	setLimit: (limit: number) => void
}

export const useAccessObjectStore = create<AccessObjectState>((set, get) => ({
	accessObjects: [],
	parentObjects: [],
	page: 1,
	limit: 10,
	total: 0,
	totalPages: 0,
	loading: false,
	error: null,

	currentEditObj: null,
	setCurrentEditObj: (obj) => set({ currentEditObj: obj }),

	setPage: (page) => set({ page }),
	setLimit: (limit) => set({ limit }),

	fetchObjects: async (page = get().page, limit = get().limit) => {
		set({ loading: true, error: null })
		try {
			const res = await fetchAccessObjects(page, limit)
			set({
				accessObjects: res.results.data,
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

	fetchParents: async () => {
		set({ loading: true, error: null })
		try {
			const res = await fetchParentObjects()
			console.log("Parent API response:", res)
			set({ parentObjects: res.results ?? [], loading: false })
		} catch (error) {
			set({
				loading: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to fetch parent objects",
			})
		}
	},

	addObject: async (payload) => {
		set({ loading: true, error: null })
		try {
			await addAccessObject(payload)
			await get().fetchObjects()
			set({ loading: false })
		} catch (error) {
			set({
				loading: false,
				error: error instanceof Error ? error.message : "Failed to fetch data",
			})
		}
	},

	editAccObj: async (payload) => {
		set({ loading: true, error: null })
		try {
			const res = await editAccessObject(payload)
			set((state) => ({
				accessObjects: state.accessObjects.map((obj) =>
					obj.accessObjectId === res.results.accessObjectId ? res.results : obj,
				),
				loading: false,
			}))
		} catch (error) {
			set({
				loading: false,
				error:
					error instanceof Error ? error.message : "Failed to update object",
			})
		}
	},
}))
