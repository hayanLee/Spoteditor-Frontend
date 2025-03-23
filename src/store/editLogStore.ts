import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { create } from 'zustand';

type EditLogStoreStates = {
  places: PlaceInLog[];
  deletePlaceIds: number[];
};

type EditLogStoreActions = {
  setInitialPlaces: (places: PlaceInLog[]) => void;
  removeSelectedPlace: (place: PlaceInLog) => void;
  moveUpSelectedPlace: (place: PlaceInLog) => void;
  moveDownSelectedPlace: (place: PlaceInLog) => void;
};

type EditLogStore = EditLogStoreStates & EditLogStoreActions;

export const useEditLogStore = create<EditLogStore>()((set) => ({
  places: [],
  deletePlaceIds: [],

  setInitialPlaces: (places) => set(() => ({ places })),

  removeSelectedPlace: (place) =>
    set((state) => ({
      places: state.places.filter((p) => p.placeId !== place.placeId),
      deletePlaceIds: [...state.deletePlaceIds, place.placeId],
    })),

  moveUpSelectedPlace: (place) =>
    set((state) => {
      const index = state.places.findIndex((p) => p.placeId === place.placeId);
      if (index > 0) {
        const newSelectedPlaces = [...state.places];
        const target = newSelectedPlaces[index];

        newSelectedPlaces.splice(index, 1);
        newSelectedPlaces.splice(index - 1, 0, target);
        return { places: newSelectedPlaces };
      }
      return state;
    }),

  moveDownSelectedPlace: (place) =>
    set((state) => {
      const index = state.places.findIndex((p) => p.placeId === place.placeId);
      if (index < state.places.length - 1) {
        const newSelectedPlaces = [...state.places];
        const target = newSelectedPlaces[index];

        newSelectedPlaces.splice(index, 1);
        newSelectedPlaces.splice(index + 1, 0, target);
        return { places: newSelectedPlaces };
      }
      return state;
    }),
}));
