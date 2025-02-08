import { BellIcon } from 'lucide-react';
import UserProfileButton from './UserProfileButton';
import { useLoginMoalStore } from '@/store/loginStore';

function LoginStatusButtons() {
  const { openLoginModal } = useLoginMoalStore();

  return (
    <>
      {/* 추후 로그인 상태에 따라 버튼이 다르게 보임 */}
      <button>
        <BellIcon />
      </button>
      <UserProfileButton />
      <button onClick={openLoginModal} className="font-bold text-14">
        회원가입/로그인
      </button>
    </>
  );
}

export default LoginStatusButtons;
