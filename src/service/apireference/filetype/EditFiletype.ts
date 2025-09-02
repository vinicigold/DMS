import { create } from "zustand"

interface EditFileTypePayload {
	fileTypeId: number
	mimeType: string
	description: string
	status: boolean
}

interface EditFileTypeResponse {
	responseCode: number
	message: string
	results: {
		id: number
		mimeType: string
		description: string
		status: boolean
	}
}

interface FileTypeEditStore {
	isLoading: boolean
	error: string | null
	successMessage: string | null
	editFileType: (payload: EditFileTypePayload) => Promise<void>
}

export const EditFileType = create<FileTypeEditStore>((set) => ({
	isLoading: false,
	error: null,
	successMessage: null,

	editFileType: async (payload: EditFileTypePayload) => {
		const token = localStorage.getItem("authToken")
		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

		set({ isLoading: true, error: null, successMessage: null })

		try {
			const res = await fetch(`${API_BASE}/dms/file-type/update-filetype`, {
				method: "POST", // keep POST if your API expects it
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				body: JSON.stringify(payload),
			})

			if (!res.ok) throw new Error("Failed to edit file type")

			const data: EditFileTypeResponse = await res.json()

			set({
				isLoading: false,
				successMessage: data.message,
			})
		} catch (err) {
			set({
				error: err instanceof Error ? err.message : String(err),
				isLoading: false,
			})
		}
	},
}))
