import { Notification } from '@/services/apis/types/notificationAPI';
import { create } from 'zustand';

interface NotificationState {
  notifications: Notification[]; // 알림 리스트
  isNotiCount: number; // 읽지 않은 알림 개수
  addNotification: (noti: Notification) => void; // 새 알림 추가
  readAsRead: (id: number) => void; // 특정 알림 읽음 처리
  readAllAsRead: () => void; // 전체 알림 읽음 처리
}

export const notificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isNotiCount: 0,

  // 새 알림 추가 (상단에 추가)
  addNotification: (noti) =>
    set((state) => {
      const alreadyExists = state.notifications.some((n) => n.id === noti.id);

      if (alreadyExists) {
        return state; // 아무 변경도 하지 않음
      }

      return {
        notifications: [noti, ...state.notifications],
        isNotiCount: state.isNotiCount + (noti.isRead ? 0 : 1),
      };
    }),

  // 특정 알림 읽음 처리
  readAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((noti) =>
        noti.id === id ? { ...noti, isRead: true } : noti
      ),
      isNotiCount: state.notifications.filter((noti) => !noti.isRead && noti.id !== id).length,
    })),

  // 전체 알림 읽음 처리
  readAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((noti) => ({ ...noti, isRead: true })),
      isNotiCount: 0, // 읽지 않은 알림 개수 초기화
    })),
}));
