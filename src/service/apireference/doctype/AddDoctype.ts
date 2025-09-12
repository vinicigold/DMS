import { create } from "zustand"

interface AddDoctypePayload {
	docTypeName: string
}

interface AddDoctypeReponse {
	responseCode: number
	message: string
	results: {
		doctypeId: number
		doctypeName: string
		createdAt: string
		createdBy: number
		modifiedAt: string
		modifiedBy: number | null
	}
}

interface DoctypeAddStore {
	isLoading: boolean
	error: string | null
	successMessage: string | null
	addDoctype: (payload: AddDoctypePayload) => Promise<void>
}

export const AddDoctype = create<DoctypeAddStore>((set) => ({
	isLoading: false,
	error: null,
	successMessage: null,

	addDoctype: async (payload: AddDoctypePayload) => {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		set({ isLoading: true, error: null, successMessage: null })

		try {
			const res = await fetch(`${API_BASE}/dms/document-type/create-document`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
				credentials: "include",
			})

			if (!res.ok) throw new Error("Failed to add document type")

			const data: AddDoctypeReponse = await res.json()

			set({ isLoading: false, successMessage: data.message })
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : String(err),
				isLoading: false,
			})
		}
	},
	reset: () => set({ isLoading: false, error: null, successMessage: null }),
}))
