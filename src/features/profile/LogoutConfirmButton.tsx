import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/mutations/user/useLogout';

export default function LogoutConfirmButton() {
  const { mutate } = useLogout();

  const onLogoutClick = () => {
    mutate();
  };
  return (
    <Button onClick={onLogoutClick} size="sm" className="w-[100px]">
      확인
    </Button>
  );
}
