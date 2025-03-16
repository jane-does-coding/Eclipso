import { create } from "zustand";

const useLoginModal = create((set) => ({
	isOpen: true,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
