import { Button } from '@/components/ui/button';
import { useFollowingMutation } from '@/hooks/mutations/follow/useFollowingMutation';
import { useUnfollowMutation } from '@/hooks/mutations/follow/useUnfollowMutation';

interface LogFollowingButtonProps {
  userId: number;
  userName: string;
  userImage: string;
  isFollowing: boolean;
}

export default function LogFollowingButton({
  userId,
  userName,
  userImage,
  isFollowing,
}: LogFollowingButtonProps) {
  const { mutate: onMutate } = useFollowingMutation({
    otherUserName: userName,
    otherUserImage: userImage,
  });
  const { mutate: unMutate } = useUnfollowMutation();

  const mutate = isFollowing ? unMutate : onMutate;

  const onFollowClick = () => {
    mutate(userId);
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={isFollowing ? 'ghost' : 'outline'}
      size="s"
      className="font-medium"
      fullRounded
    >
      {isFollowing ? '팔로잉' : '팔로워'}
    </Button>
  );
}
