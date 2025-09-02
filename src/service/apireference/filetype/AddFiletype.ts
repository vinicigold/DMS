import { create } from "zustand"

interface AddFiletypePayload {
	mimeType: string
	description: string
	status: boolean
}

interface AddFiletypeResponse {
	responseCode: number
	message: string
	results: {
		id: number
		mimeType: string
		description: string
		status: boolean
	}
}

interface FiletypeAddStore {
	isLoading: boolean
	error: string | null
	successMessage: string | null
	addFiletype: (payload: AddFiletypePayload) => Promise<void>
}

export const AddFiletype = create<FiletypeAddStore>((set) => ({
	isLoading: false,
	error: null,
	successMessage: null,

	addFiletype: async (payload: AddFiletypePayload) => {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		set({ isLoading: true, error: null, successMessage: null })

		try {
			const res = await fetch(`${API_BASE}/dms/file-type/create-filetype`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				body: JSON.stringify(payload),
			})

			if (!res.ok) throw new Error("Failed to add file type")

			const data: AddFiletypeResponse = await res.json()

			set({
				isLoading: false,
				successMessage: data.message, // "File type created"
			})
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : String(err),
				isLoading: false,
			})
		}
	},
}))
