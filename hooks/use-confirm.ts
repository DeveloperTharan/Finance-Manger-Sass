import { create } from "zustand";

type Confirm = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useConfirm = create<Confirm>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
