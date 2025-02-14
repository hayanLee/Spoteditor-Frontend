import NotificationButton from '@/features/notification/NotificationButton';
import UserProfileButton from './UserProfileButton';
import { useLoginMoalStore } from '@/store/loginStore';

function LoginStatusButtons() {
  const { openLoginModal } = useLoginMoalStore();

  return (
    <>
      {/* 추후 로그인 상태에 따라 버튼이 다르게 보임 */}
      <NotificationButton />
      <UserProfileButton />
      <button onClick={openLoginModal} className="font-bold text-text-sm">
        회원가입/로그인
      </button>
    </>
  );
}

export default LoginStatusButtons;
