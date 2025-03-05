import { useLoginMoalStore } from '@/store/loginStore';

export default function LoginButton() {
  const { openLoginModal } = useLoginMoalStore();
  return (
    <button onClick={openLoginModal} className="font-bold text-text-sm">
      회원가입/로그인
    </button>
  );
}
