import { Button } from '@/components/ui/button';

interface SocialLoginButtonProps {
  socialName: string;
  socialButtonImg: string;
  handleLogin: (socialName: string) => void;
}

export default function SocialLoginButton({
  socialName,
  socialButtonImg,
  handleLogin,
}: SocialLoginButtonProps) {
  return (
    <Button variant={null} onClick={() => handleLogin(socialName)} className="w-auto px-1 py-0">
      <img className="object-contain" src={socialButtonImg} alt={`${socialName} 로그인 버튼`} />
    </Button>
  );
}
