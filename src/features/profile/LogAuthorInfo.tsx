import userDefaultAvatar from '@/assets/profile/user-default-avatar.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useOtherUser from '@/hooks/queries/user/useOtherUser';
import useUser from '@/hooks/queries/user/useUser';
import { Link } from 'react-router-dom';
import LogFollowingButton from '../follow/LogFollowingButton';

interface LogAuthorInfoProps {
  userId: number;
}

export default function LogAuthorInfo({ userId }: LogAuthorInfoProps) {
  const { data: userData } = useUser();
  const isMe = userData?.userId === userId;
  const { data: otherUserData } = useOtherUser(userId, { enabled: !!userId && !isMe });

  const data = isMe ? userData : otherUserData;
  return (
    <div className="flex items-center gap-2 min-h-10">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${userId}`} className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={data?.profileImage.imageUrl || userDefaultAvatar} alt="user Avatar" />
          </Avatar>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-text-sm">{data?.name}</p>
          </div>
        </Link>
        {userData && userData?.userId && !isMe && (
          <LogFollowingButton
            otherUserId={userId}
            isFollowing={Boolean(otherUserData?.isFollowing)}
          />
        )}
      </div>
    </div>
  );
}
