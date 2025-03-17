import { SubtractIcon } from '@/components/Icons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import useUser from '@/hooks/queries/user/useUser';
import LogFollowingButton from '../follow/LogFollowingButton';

interface OtherUserProfileSectionProps {
  userId: number;
  userName: string;
  userImage: string;
  isFollowing: boolean;
}

export default function OtherUserProfileSection({
  userId,
  userName,
  userImage,
  isFollowing,
}: OtherUserProfileSectionProps) {
  const { user } = useUser();

  const isMe = user?.userId === userId;
  return (
    <div className="flex items-center gap-2 py-[15px]">
      <Link to={`/profile/${userId}`} className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={userImage} alt="user Avatar" />
        </Avatar>
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-text-sm">{userName}</p>
          <SubtractIcon />
        </div>
      </Link>
      {!isMe && (
        <LogFollowingButton
          userId={userId}
          userName={userName}
          userImage={userImage}
          isFollowing={isFollowing}
        />
      )}
    </div>
  );
}
