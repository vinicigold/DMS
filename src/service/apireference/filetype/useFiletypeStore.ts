import { create } from "zustand"

interface Filetype {
	id: number
	mimeType: string
	description: string
	status: boolean
}

interface SelectedFileTypeStore {
	selectedFileType: Filetype | null
	setSelectedFileType: (fileType: Filetype | null) => void
}

export const useFileTypeStore = create<SelectedFileTypeStore>((set) => ({
	selectedFileType: null,
	setSelectedFileType: (fileType) => set({ selectedFileType: fileType }),
}))
