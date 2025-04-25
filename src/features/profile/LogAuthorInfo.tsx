import userDefaultAvatar from '@/assets/profile/user-default-avatar.webp';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useOtherUser from '@/hooks/queries/user/useOtherUser';
import useUser from '@/hooks/queries/user/useUser';
import { Link } from 'react-router-dom';
import LogFollowingButton from '../follow/LogFollowingButton';

interface LogAuthorInfoProps {
  authorId: number; // 작성자 아이디
  isOwner: boolean;
}

export default function LogAuthorInfo({ authorId, isOwner }: LogAuthorInfoProps) {
  const { data: userData } = useUser();
  const { data: otherUserData } = useOtherUser(authorId, { enabled: !!authorId && !isOwner });
  const data = isOwner ? userData : otherUserData;

  return (
    <div className="flex items-center gap-2 min-h-10">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${authorId}`} className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={data?.profileImage.imageUrl || userDefaultAvatar} alt="user Avatar" />
          </Avatar>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-text-sm">{data?.name}</p>
          </div>
        </Link>
        {userData && !isOwner && (
          <LogFollowingButton
            otherUserId={authorId}
            isFollowing={Boolean(otherUserData?.isFollowing)}
          />
        )}
      </div>
    </div>
  );
}
