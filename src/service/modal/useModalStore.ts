import { create } from "zustand"

interface ModalStore {
	currentModal: string | null
	openModal: (name: string) => void
	closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
	currentModal: null,
	openModal: (name) => set({ currentModal: name }),
	closeModal: () => set({ currentModal: null }),
}))
