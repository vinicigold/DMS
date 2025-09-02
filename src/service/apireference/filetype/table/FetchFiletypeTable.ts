import { create } from "zustand"

interface Filetype {
	id: number
	mimeType: string
	description: string
	status: boolean
}

interface FiletypeApiResponse {
	page: number
	limit: number
	total: number
	totalpages: number
	data: Filetype[]
}

interface FiletypeStore {
	data: Filetype[]
	page: number
	limit: number
	total: number
	totalPages: number
	isLoading: boolean
	error: string | null
	setPage: (page: number) => void
	fetchFiletypes: (page?: number, limit?: number) => Promise<void>
}

export const FetchFiletypeTable = create<FiletypeStore>((set, get) => ({
	data: [],
	page: 1,
	limit: 10,
	total: 0,
	totalPages: 0,
	isLoading: false,
	error: null,

	setPage: (page) => set({ page }),

	fetchFiletypes: async (page?: number, limit?: number) => {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		const currentPage = page ?? get().page
		const currentLimit = limit ?? get().limit

		const query = new URLSearchParams()
		query.set("page", String(currentPage))
		query.set("limit", String(currentLimit))

		set({ isLoading: true, error: null })

		try {
			const res = await fetch(
				`${API_BASE}/dms/file-type/listall-filetype?${query.toString()}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
					credentials: "include",
				}
			)

			if (!res.ok) throw new Error("Failed to fetch file types")

			const json = await res.json()

			const results: FiletypeApiResponse = json.results

			set({
				data: results.data ?? [],
				page: results.page,
				limit: results.limit,
				total: results.total,
				totalPages: results.totalpages,
				isLoading: false,
			})
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : String(err),
				isLoading: false,
				data: [],
			})
		}
	},
}))
