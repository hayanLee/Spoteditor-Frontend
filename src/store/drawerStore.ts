import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { create } from 'zustand';

/*
 * 등록 페이지 - PlacesSearchResultItem
 * 수정 페이지 - PlaceInLog
 */
type DrawerStates = {
  isOpen: boolean;
  newLogTargetPlace: kakao.maps.services.PlacesSearchResultItem | null;
  editTargetPlace: PlaceInLog | null;
};
type DrawerActions = {
  openNewLogDrawer: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  openLogDrawer: (place: PlaceInLog) => void;
  closeDrawer: () => void;
};

type DrawerStores = DrawerStates & DrawerActions;

const useDrawerStore = create<DrawerStores>((set) => ({
  isOpen: false,
  editTargetPlace: null,
  newLogTargetPlace: null,
  openNewLogDrawer: (place) => set({ isOpen: true, newLogTargetPlace: place }),
  openLogDrawer: (place) => set({ isOpen: true, editTargetPlace: place }),
  closeDrawer: () => set({ isOpen: false, newLogTargetPlace: null, editTargetPlace: null }),
}));

export default useDrawerStore;
