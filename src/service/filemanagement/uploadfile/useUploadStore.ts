import { create } from "zustand"
import { UploadFileApi } from "./UploadFileApi"

export interface FileWithValid {
	file: File
	status: "pending" | "uploading" | "success" | "error"
	progress: number
	valid?: boolean
	reason?: string
}

interface UploadState {
	files: FileWithValid[]
	addFiles: (selected: FileList) => void
	removeFile: (file: FileWithValid) => void
	resetFiles: () => void
	uploadFile: (file: FileWithValid, doctypeId: string) => Promise<void>
	uploadAllFiles: (doctypeId: string) => Promise<void>
}

function markFileAs(
	files: FileWithValid[],
	file: File,
	updates: Partial<FileWithValid>
): FileWithValid[] {
	return files.map((f) =>
		f.file.name === file.name && f.file.size === file.size
			? { ...f, ...updates }
			: f
	)
}

function mapUploadResults(
	files: FileWithValid[],
	results: { file: string; size: number; valid: boolean; reason?: string }[]
): FileWithValid[] {
	return files.map((f) => {
		const result = results.find(
			(r) => r.file === f.file.name && r.size === f.file.size
		)
		if (!result) return f

		return result.valid
			? { ...f, status: "success", progress: 100, valid: true }
			: {
					...f,
					status: "error",
					progress: 100,
					valid: false,
					reason: result.reason || "Unknown error",
			  }
	})
}

export const useUploadStore = create<UploadState>((set, get) => ({
	files: [],

	addFiles: (selected) => {
		const newFiles: FileWithValid[] = Array.from(selected)
			.filter(
				(file) =>
					!get().files.some(
						(f) => f.file.name === file.name && f.file.size === file.size
					)
			)
			.map((file) => ({ file, status: "pending", progress: 0 }))

		set((state) => ({ files: [...state.files, ...newFiles] }))
	},

	removeFile: (fileToRemove) => {
		set((state) => ({
			files: state.files.filter((f) => f !== fileToRemove),
		}))
	},

	resetFiles: () => set({ files: [] }),

	uploadFile: async (fileToUpload, doctypeId) => {
		const realFile = fileToUpload.file
		set((state) => ({
			files: markFileAs(state.files, realFile, {
				status: "uploading",
				progress: 0,
			}),
			error: null,
		}))

		try {
			const response = await UploadFileApi([realFile], doctypeId)
			const updated = mapUploadResults(get().files, response.results)
			set({ files: updated })
		} catch (error) {
			set((state) => ({
				files: markFileAs(state.files, realFile, {
					status: "error",
					progress: 100,
					valid: false,
					reason: "Upload failed",
				}),
				error: error instanceof Error ? error.message : String(error),
			}))
			throw error
		}
	},
	uploadAllFiles: async (doctypeId) => {
		const pending = get().files.filter((f) => f.status === "pending")

		set((state) => ({
			files: state.files.map((f) =>
				f.status === "pending" ? { ...f, status: "uploading", progress: 0 } : f
			),
			error: null,
		}))

		try {
			const response = await UploadFileApi(
				pending.map((f) => f.file),
				doctypeId
			)
			set((state) => ({
				files: mapUploadResults(state.files, response.results),
			}))
		} catch (error) {
			set((state) => ({
				files: state.files.map((f) =>
					f.status === "uploading"
						? {
								...f,
								status: "error",
								progress: 100,
								valid: false,
								reason: "Batch upload failed",
						  }
						: f
				),
				error: error instanceof Error ? error.message : String(error),
			}))
			throw error
		}
	},
}))
