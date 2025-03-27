import { create } from 'zustand';

interface ProfileState {
  file: File | null;
  setFile: (file: File) => void;
  clearFile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  clearFile: () => set({ file: null }),
}));
