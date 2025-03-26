import { create } from 'zustand';

type RegisterStoreState = {
  experience: {
    selectedWhom: string[];
    selectedMoods: string[];
  };

  selectedPlaces: kakao.maps.services.PlacesSearchResult; // 선택한 장소
  recentSearchPlaces: kakao.maps.services.PlacesSearchResult; // 최근 검색 장소
};

type RegisterStoreActions = {
  setWhom: (whom: string | string[]) => void;
  setMood: (feeling: string | string[]) => void;

  addSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  removeSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  clearAllSelections: () => void;
  moveUpSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  moveDownSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
};

type RegisterStore = RegisterStoreState & RegisterStoreActions;

export const useRegisterStore = create<RegisterStore>()((set) => ({
  // States
  experience: {
    selectedWhom: [],
    selectedMoods: [],
  },
  selectedPlaces: [],
  recentSearchPlaces: [],

  // Actions
  setWhom: (whom: string | string[]) =>
    set((state) => {
      const updatedWhom = Array.isArray(whom) ? whom : [whom];
      const newSelectedWhom = updatedWhom.reduce(
        (acc, item) => {
          if (acc.includes(item)) return acc.filter((i) => i !== item);
          else return [...acc, item]; // 없으면 추가
        },
        [...state.experience.selectedWhom]
      );

      return {
        experience: {
          ...state.experience,
          selectedWhom: newSelectedWhom,
        },
      };
    }),

  setMood: (feeling: string | string[]) =>
    set((state) => {
      const updatedMoods = Array.isArray(feeling) ? feeling : [feeling];
      const newSelectedMoods = updatedMoods.reduce(
        (acc, item) => {
          if (acc.includes(item)) return acc.filter((i) => i !== item);
          else return [...acc, item];
        },
        [...state.experience.selectedMoods]
      );

      return {
        experience: {
          ...state.experience,
          selectedMoods: newSelectedMoods,
        },
      };
    }),

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

  clearAllSelections: () =>
    set(() => ({
      selectedPlaces: [],
      experience: {
        selectedWhom: [],
        selectedMoods: [],
      },
    })),

  moveUpSelectedPlace: (place) =>
    set((state) => {
      const index = state.selectedPlaces.findIndex((item) => item.id === place.id);
      if (index > 0) {
        const newSelectedPlaces = [...state.selectedPlaces];
        const target = newSelectedPlaces[index];

        newSelectedPlaces.splice(index, 1);
        newSelectedPlaces.splice(index - 1, 0, target);
        return { selectedPlaces: newSelectedPlaces };
      }
      return state;
    }),

  moveDownSelectedPlace: (place) =>
    set((state) => {
      const index = state.selectedPlaces.findIndex((item) => item.id === place.id);
      if (index < state.selectedPlaces.length - 1) {
        const newSelectedPlaces = [...state.selectedPlaces];
        const target = newSelectedPlaces[index];

        newSelectedPlaces.splice(index, 1);
        newSelectedPlaces.splice(index + 1, 0, target);
        return { selectedPlaces: newSelectedPlaces };
      }
      return state;
    }),
}));
