import { cityDistricts } from '@/services/data/cityData';
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
  resetCityState: () => void;
}

export const useCitySearchStore = create<CitySearchState>((set, get) => ({
  isDropBox: false,
  sido: '',
  bname: '',

  openDropBox: () => set(() => ({ isDropBox: true, sido: '', bname: '' })),
  closeDropBox: () => {
    const { sido, bname, setBname } = get();
    if (sido && !bname && cityDistricts[sido]?.length > 0) {
      setBname(cityDistricts[sido][0]); // sido가 있고 bname이 없으면 첫 번째 bname 자동 설정
    }
    set(() => ({ isDropBox: false }));
  },
  setSido: (sido) => set(() => ({ sido })),
  setBname: (bname) => set(() => ({ bname })),
  resetCityState: () =>
    set(() => ({
      isDropBox: false,
      sido: '',
      bname: '',
    })),
}));
