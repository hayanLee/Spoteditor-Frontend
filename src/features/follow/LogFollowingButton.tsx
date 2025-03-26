import { Button } from '@/components/ui/button';
import { useFollowingMutation } from '@/hooks/mutations/follow/useFollowingMutation';
import { useUnfollowMutation } from '@/hooks/mutations/follow/useUnfollowMutation';

interface LogFollowingButtonProps {
  otherUserId: number;
  isFollowing: boolean;
}

export default function LogFollowingButton({ otherUserId, isFollowing }: LogFollowingButtonProps) {
  const { mutate: onMutate, status: onStatus } = useFollowingMutation();
  const { mutate: unMutate, status: unStatus } = useUnfollowMutation();

  const mutate = isFollowing ? unMutate : onMutate;
  const status = onStatus || unStatus;
  const onFollowClick = () => {
    if (status === 'pending') return;
    mutate(otherUserId);
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={isFollowing ? 'ghost' : 'outline'}
      size="s"
      className="font-medium"
      fullRounded
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}
