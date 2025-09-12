import { create } from "zustand"

interface EditDoctypePayload {
	doctypeID: number
	docTypeName: string
}

interface EditDoctypeResponse {
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

interface DoctypeEditStore {
	isLoading: boolean
	error: string | null
	successMessage: string | null
	editDoctype: (payload: EditDoctypePayload) => Promise<void>
}

export const EditDoctype = create<DoctypeEditStore>((set) => ({
	isLoading: false,
	error: null,
	successMessage: null,

	editDoctype: async (payload: EditDoctypePayload) => {
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		set({ isLoading: true, error: null, successMessage: null })

		try {
			const res = await fetch(`${API_BASE}/dms/document-type/update-document`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
				credentials: "include",
			})

			if (!res.ok) throw new Error("Failed to edit document type")

			const data: EditDoctypeResponse = await res.json()

			set({ isLoading: false, successMessage: data.message })
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : String(err),
				isLoading: false,
			})
		}
	},
}))
