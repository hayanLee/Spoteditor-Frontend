import { KakaoPlace } from '@/pages/register/types/place.type';
import { create } from 'zustand';

type RegisterStoreState = {
  experience: {
    selectedCompanions: string[];
    selectedFeelings: string[];
  };

  selectedPlaces: KakaoPlace[]; // 선택한 장소
  recentSearchPlaces: KakaoPlace[]; // 최근 검색 장소
};

type RegisterStoreActions = {
  addSelectedPlace: (place: KakaoPlace) => void;
  removeSelectedPlace: (place: KakaoPlace) => void;
  setCompanions: (whom: string) => void;
  setFeelings: (feeling: string) => void;
};

type RegisterStore = RegisterStoreState & RegisterStoreActions;

export const useRegisterStore = create<RegisterStore>()((set) => ({
  // States
  experience: {
    selectedCompanions: [],
    selectedFeelings: [],
  },
  selectedPlaces: [],
  recentSearchPlaces: [],

  // Actions
  setCompanions: (whom) =>
    set((state) => ({
      experience: {
        ...state.experience,
        selectedCompanions: state.experience.selectedCompanions.includes(whom)
          ? state.experience.selectedCompanions.filter((item) => item !== whom)
          : [...state.experience.selectedCompanions, whom],
      },
    })),

  setFeelings: (feeling) =>
    set((state) => ({
      experience: {
        ...state.experience,
        selectedFeelings: state.experience.selectedFeelings.includes(feeling)
          ? state.experience.selectedFeelings.filter((item) => item !== feeling)
          : [...state.experience.selectedFeelings, feeling],
      },
    })),

  addSelectedPlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.some((item) => item.id === place.id)
        ? state.selectedPlaces
        : [...state.selectedPlaces, place],
      recentSearchPlaces: state.recentSearchPlaces.some((item) => item.id === place.id)
        ? state.recentSearchPlaces
        : [...state.recentSearchPlaces, place],
    })),
  removeSelectedPlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter((item) => item.id !== place.id),
    })),
}));
