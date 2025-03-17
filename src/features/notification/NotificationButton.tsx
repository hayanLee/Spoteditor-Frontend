import BellIcon from '@/components/Icons/BellIconIcon';
import XIcon from '@/components/Icons/XIcon';
import NotificationSkeleton from '@/components/Skeleton/NotificationSkeleton';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useNotificationList from '@/hooks/queries/notification/useNotificationList';
import NotNotification from './NotNotification';
import NotificationItem from './NotificationItem';
import { useEffect } from 'react';
import { notificationStore } from '@/store/notificationStore';

function NotificationButton() {
  //useNotificationWebSocket(); //추후 웹소켓 훅 사용해서 실시간 알림 받기
  const { data: notisData, isLoading: isNotiLoading } = useNotificationList();
  const { notifications, isNotiCount, readAsRead } = notificationStore();

  useEffect(() => {
    if (notisData) {
      notisData.forEach((noti) => notificationStore.getState().addNotification(noti));
    }
  }, [notisData]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <BellIcon />
          {isNotiCount > 0 && (
            <div className="absolute flex items-center justify-center w-5 h-5 bg-red-500 rounded-full left-3 bottom-3">
              <span className="text-text-xs">{isNotiCount}</span>
            </div>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="p-0 mobile:w-screen">
        <SheetHeader className="flex flex-row items-center justify-between w-full py-3 space-y-0 web:px-6 mobile:px-4">
          <SheetTitle className="text-sm font-medium">알림</SheetTitle>
          <SheetClose>
            <XIcon className="w-[34px] h-[34px]" />
          </SheetClose>
        </SheetHeader>
        <section>
          {isNotiLoading ? (
            <NotificationSkeleton />
          ) : notifications?.length === 0 ? (
            <NotNotification />
          ) : (
            notisData?.map((noti) => (
              <NotificationItem {...noti} readAsReadClick={() => readAsRead(noti.id)} />
            ))
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationButton;
