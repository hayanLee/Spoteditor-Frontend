import { Button } from '@/components/ui/button';
import useUser from '@/hooks/queries/user/useUser';
import { useNavigate } from 'react-router-dom';

export default function MyProfileButton() {
  const nav = useNavigate();
  const { user } = useUser();

  const onProfileClick = () => {
    const params = user?.userId;
    nav(`/profile/${params}/my-logs`);
  };
  return (
    <Button
      onClick={onProfileClick}
      className="w-full h-full rounded-[60px] bg-[#F7F7F7] hover:bg-[#F7F7F7]"
    >
      <span className="font-medium text-black text-text-sm">프로필 보기</span>
    </Button>
  );
}

//<Link to="/profile/12/my-logs">
