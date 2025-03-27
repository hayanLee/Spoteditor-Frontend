import { Button } from '@/components/ui/button';
import { useFollowingMutation } from '@/hooks/mutations/follow/useFollowingMutation';
import { useUnfollowMutation } from '@/hooks/mutations/follow/useUnfollowMutation';
import useOtherUser from '@/hooks/queries/user/useOtherUser';
import { cn } from '@/lib/utils';

interface ProfileFollowingButtonProps {
  otherUserId: number;
  className?: string;
}

export default function ProfileFollowingButton({
  otherUserId,
  className = '',
}: ProfileFollowingButtonProps) {
  const { data: userData } = useOtherUser(otherUserId);
  const { mutate: onMutate, status: onStatus } = useFollowingMutation();
  const { mutate: unMutate, status: unStatus } = useUnfollowMutation();

  const mutate = userData && userData?.isFollowing ? unMutate : onMutate;
  const status = onStatus || unStatus;
  const onFollowClick = () => {
    if (status === 'pending') return;
    mutate(otherUserId);
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={userData && userData?.isFollowing ? 'ghost' : 'outline'}
      size="s"
      className={cn('font-medium', ...className)}
      fullRounded
    >
      {userData && userData?.isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}
