import { create } from "zustand"

interface Doctype {
	doctypeid: number
	doctypename: string
}

interface DoctypeStore {
	selectedDoctype: Doctype | null
	setSelectedDoctype: (doctype: Doctype | null) => void
}

export const useDoctypeStore = create<DoctypeStore>((set) => ({
	selectedDoctype: null,
	setSelectedDoctype: (doctype) => set({ selectedDoctype: doctype }),
}))
