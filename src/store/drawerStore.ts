import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { create } from 'zustand';

interface DrawerState {
  isOpen: boolean;
  targetPlace: kakao.maps.services.PlacesSearchResultItem | PlaceInLog | null;
  openDrawer: (place: kakao.maps.services.PlacesSearchResultItem | PlaceInLog) => void;
  closeDrawer: () => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  targetPlace: null,
  openDrawer: (place) => set({ isOpen: true, targetPlace: place }),
  closeDrawer: () => set({ isOpen: false, targetPlace: null }),
}));

export default useDrawerStore;
