import { Button } from '@/components/ui/button';
import { useFollowingMutation } from '@/hooks/mutations/follow/useFollowingMutation';
import useOtherUser from '@/hooks/queries/user/useOtherUser';

interface FollowingButtonProps {
  otherUserId: number;
}

export default function FollowingButton({ otherUserId }: FollowingButtonProps) {
  const { data: otherUser } = useOtherUser(otherUserId);
  const { mutate } = useFollowingMutation({
    otherUserName: otherUser?.name!,
    otherUserImage: otherUser?.imageUrl!,
  });

  const onFollowClick = () => {
    mutate(otherUserId);
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={otherUser?.isFollowing ? 'ghost' : 'outline'}
      size="s"
      className="font-medium"
      fullRounded
    >
      {otherUser?.isFollowing ? '팔로잉' : '팔로워'}
    </Button>
  );
}
