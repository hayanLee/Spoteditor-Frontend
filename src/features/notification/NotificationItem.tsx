import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useReadNotification from '@/hooks/mutations/notification/useReadNotification';
import { cn } from '@/lib/utils';
import { Notification } from '@/services/apis/types/notificationAPI';
import { formatNotificationJSX } from '@/utils/notificationUtils';
import { formatRelativeTime } from '@/utils/timeUtils';
import { Link } from 'react-router-dom';

interface NotificationItemProps extends Notification {
  readAsReadClick: () => void;
}

export default function NotificationItem({
  id,
  userId,
  imageUrl,
  message,
  createdAt,
  isRead,
  readAsReadClick,
}: NotificationItemProps) {
  const { mutate } = useReadNotification();
  const onReadClick = () => {
    mutate(id);
    readAsReadClick();
  };
  console.log('userId', userId);

  return (
    <Link
      to={`/profile/${userId}`}
      key={id}
      onClick={onReadClick}
      className={cn(
        'w-full web:px-5 mobile:px-4 py-2.5 flex justify-start gap-3 items-center border-y border-white transition',
        isRead ? '' : 'bg-[#EFF6FF]'
      )}
    >
      <figure>
        <Avatar className="w-9 h-9">
          <AvatarImage src={imageUrl} alt="userAvatar" />
        </Avatar>
      </figure>
      <figcaption className="flex text-text-xs web:max-w-[342px]">
        <span>
          {formatNotificationJSX(message)}
          <time className="ml-1 whitespace-nowrap text-text-xs font-medium text-[#81858F]">
            {formatRelativeTime(createdAt)}
          </time>
        </span>
      </figcaption>
    </Link>
  );
}
