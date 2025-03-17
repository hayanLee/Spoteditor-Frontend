import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { create } from 'zustand';

type EditLogStoreStates = {
  selectedPlaces: PlaceInLog[];
};

type EditLogStoreActions = {
  setInitialPlaces: (places: PlaceInLog[]) => void;
  removeSelectedPlace: (place: PlaceInLog) => void;
  moveUpSelectedPlace: (place: PlaceInLog) => void;
  moveDownSelectedPlace: (place: PlaceInLog) => void;
};

type EditLogStore = EditLogStoreStates & EditLogStoreActions;

export const useEditLogStore = create<EditLogStore>()((set) => ({
  selectedPlaces: [],

  setInitialPlaces: (places) => set(() => ({ selectedPlaces: places })),

  removeSelectedPlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter((p) => p.placeId !== place.placeId),
    })),

  moveUpSelectedPlace: (place) =>
    set((state) => {
      const index = state.selectedPlaces.findIndex((p) => p.placeId === place.placeId);
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
      const index = state.selectedPlaces.findIndex((p) => p.placeId === place.placeId);
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
