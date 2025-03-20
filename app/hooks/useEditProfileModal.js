import { create } from "zustand";

const useEditProfileModal = create((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useEditProfileModal;
