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
  isSidoDropBox: boolean;
  isBnameDropBox: boolean;
  sido: string;
  bname: string;
  openDropBox: () => void;
  closeDropBox: () => void;
  toggleSidoDropBox: () => void;
  toggleBnameDropBox: () => void;
  setSido: (sido: string) => void;
  setBname: (bname: string) => void;
}

export const useCitySearchStore = create<CitySearchState>((set) => ({
  isDropBox: false,
  isSidoDropBox: false,
  isBnameDropBox: false,
  sido: '서울',
  bname: '송파구',

  openDropBox: () => set(() => ({ isDropBox: true, sido: '', bname: '' })),
  closeDropBox: () =>
    set(() => ({ isDropBox: false, isBnameDropBox: false, isSidoDropBox: false })),
  toggleSidoDropBox: () =>
    set((state) => ({ isSidoDropBox: !state.isSidoDropBox, isDropBox: !state.isDropBox })),
  toggleBnameDropBox: () =>
    set((state) => ({ isBnameDropBox: !state.isBnameDropBox, isDropBox: !state.isDropBox })),
  setSido: (sido) => set(() => ({ sido })),
  setBname: (bname) => set(() => ({ bname })),
}));
