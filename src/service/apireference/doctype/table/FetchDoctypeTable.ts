import { create } from "zustand"

interface Doctype {
	doctypeid: number
	doctypename: string
	createdat: string
}

interface DoctypeApiResponse {
	page: number
	limit: number
	total: number
	totalpages: number
	data: Doctype[]
}

interface DoctypeStore {
	data: Doctype[]
	page: number
	limit: number
	total: number
	totalPages: number
	isLoading: boolean
	error: string | null
	setPage: (page: number) => void
	setLimit: (limit: number) => void
	fetchDoctypes: (page?: number, limit?: number) => Promise<void>
}

export const FetchDoctypeTable = create<DoctypeStore>((set, get) => ({
	data: [],
	page: 1,
	limit: 10,
	total: 0,
	totalPages: 0,
	isLoading: false,
	error: null,

	setPage: (page) => set({ page }),
	setLimit: (limit) => set({ limit }),

	fetchDoctypes: async (page?: number, limit?: number) => {
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
				`${API_BASE}/dms/document-type/alldocument-type?${query.toString()}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
					credentials: "include",
				}
			)

			if (!res.ok) throw new Error("Failed to fetch document types")

			const json = await res.json()

			const results: DoctypeApiResponse = json.results

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
