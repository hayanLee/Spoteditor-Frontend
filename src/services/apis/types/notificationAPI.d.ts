export interface Notification {
  id: number;
  userId: number;
  imageUrl: string;
  message: string;
  type: string;
  createdAt: string;
  isRead: boolean;
}

export type NotificationResponse = Notification[];

//페이지네이션 적용 후 교체할 알림타입
//export NotificationQueryParams = LogsQueryParams
//export type NotificationResponse = PageNation<Notification[]>;
