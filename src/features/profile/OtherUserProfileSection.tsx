import { SubtractIcon } from '@/components/Icons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import FollowingButton from '../follow/FollowingButton';
import useOtherUser from '@/hooks/queries/user/useOtherUser';
import { Link } from 'react-router-dom';
import useUser from '@/hooks/queries/user/useUser';

interface OtherUserProfileSectionProps {
  userId: number;
}

export default function OtherUserProfileSection({ userId }: OtherUserProfileSectionProps) {
  const { data: otherUser } = useOtherUser(userId);
  const { user } = useUser();
  return (
    <div className="flex items-center gap-2 py-[15px]">
      <Link to={`/profile/${userId}`} className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={otherUser?.imageUrl} alt="user Avatar" />
        </Avatar>
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-text-sm">{otherUser?.name}</p>
          <SubtractIcon />
        </div>
      </Link>
      {user?.userId !== userId && <FollowingButton otherUserId={userId} />}
    </div>
  );
}
