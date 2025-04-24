import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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

export const useEditLogStore = create<EditLogStore>()(
  immer((set) => ({
    places: [],
    deletePlaceIds: [],

    setInitialPlaces: (places) => set(() => ({ places })),
    removeSelectedPlace: (place) =>
      set((state) => {
        state.places = state.places.filter((p) => p.placeId !== place.placeId);
        if (!state.deletePlaceIds.includes(place.placeId)) state.deletePlaceIds.push(place.placeId); // 중복 제거
      }),
    moveUpSelectedPlace: (place) =>
      set((state) => {
        const index = state.places.findIndex((p) => p.placeId === place.placeId);
        if (index > 0) {
          const tmp = state.places[index - 1];
          state.places[index - 1] = state.places[index];
          state.places[index] = tmp;
        }
      }),
    moveDownSelectedPlace: (place) =>
      set((state) => {
        const index = state.places.findIndex((p) => p.placeId === place.placeId);
        if (index < state.places.length - 1) {
          const temp = state.places[index + 1];
          state.places[index + 1] = state.places[index];
          state.places[index] = temp;
        }
      }),
  }))
);
