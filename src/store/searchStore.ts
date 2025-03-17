import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  toggleSearchBar: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  toggleSearchBar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface CitySearchState {
  isDropBox: boolean;
  sido: string;
  bname: string;
  openDropBox: () => void;
  closeDropBox: () => void;
  setSido: (sido: string) => void;
  setBname: (bname: string) => void;
}

export const useCitySearchStore = create<CitySearchState>((set) => ({
  isDropBox: false,
  sido: '',
  bname: '',

  openDropBox: () => set(() => ({ isDropBox: true })),
  closeDropBox: () => set(() => ({ isDropBox: false })),
  setSido: (sido) => set(() => ({ sido })),
  setBname: (bname) => set(() => ({ bname })),
  /* setSigungus: () =>
    set((state) => ({
      sigungus: state.sigungus.includes(state.sigungu)
        ? state.sigungus // 이미 존재하면 변경하지 않음
        : [...state.sigungus, state.sigungu], // 새로운 값 추가
    })), */
}));
