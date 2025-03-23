import { create } from 'zustand';

type GeolocationPermissionState = 'granted' | 'denied' | 'prompt' | null;

interface GeolocationStore {
  permission: GeolocationPermissionState;
  open: boolean;
  position: { latitude: number; longitude: number } | null;
  setPermission: (permission: GeolocationPermissionState) => void;
  setOpen: (open: boolean) => void;
  setPosition: (position: { latitude: number; longitude: number } | null) => void;
}

export const useGeolocationStore = create<GeolocationStore>((set) => ({
  permission: null,
  open: false,
  position: null,
  setPermission: (permission) => set({ permission }),
  setOpen: (open) => set({ open }),
  setPosition: (position) => set({ position }),
}));
