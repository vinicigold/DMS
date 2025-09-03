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
	uploadFile: (file: FileWithValid) => Promise<void>
}

export const useUploadStore = create<UploadState>((set) => ({
	files: [],

	addFiles: (selected) => {
		const newFiles: FileWithValid[] = Array.from(selected).map((file) => ({
			file,
			status: "pending",
			progress: 0,
		}))
		set((state) => ({ files: [...state.files, ...newFiles] }))
	},

	removeFile: (fileToRemove) => {
		set((state) => ({
			files: state.files.filter((f) => f !== fileToRemove),
		}))
	},

	resetFiles: () => set({ files: [] }),

	uploadFile: async (fileToUpload) => {
		const realFile = fileToUpload.file

		// mark as uploading
		set((state) => ({
			files: state.files.map((f) =>
				f.file.name === realFile.name && f.file.size === realFile.size
					? { ...f, status: "uploading", progress: 0 }
					: f
			),
		}))

		try {
			const response = await UploadFileApi(realFile)

			const fileResult = response.results.find(
				(r) => r.file === realFile.name && r.size === realFile.size
			)

			if (fileResult?.valid) {
				set((state) => ({
					files: state.files.map((f) =>
						f.file.name === realFile.name && f.file.size === realFile.size
							? { ...f, status: "success", progress: 100, valid: true }
							: f
					),
				}))
			} else {
				set((state) => ({
					files: state.files.map((f) =>
						f.file.name === realFile.name && f.file.size === realFile.size
							? {
									...f,
									status: "error",
									progress: 100,
									valid: false,
									reason: fileResult?.reason || "Unknown error",
							  }
							: f
					),
				}))
			}
		} catch (error) {
			set((state) => ({
				files: state.files.map((f) =>
					f.file.name === realFile.name && f.file.size === realFile.size
						? {
								...f,
								status: "error",
								progress: 100,
								valid: false,
								reason: "Upload failed",
						  }
						: f
				),
			}))
			throw error
		}
	},
}))
