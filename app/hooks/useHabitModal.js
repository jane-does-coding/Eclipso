import { create } from "zustand";

const useHabitModal = create((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useHabitModal;
