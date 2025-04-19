import kakaoLoginButton from '@/assets/login/kakao-login-button.png';
import googleLoginButton from '@/assets/login/google-login-button.png';
import SocialLoginButton from './SocialLoginButton';

export default function SocialLoginButtons() {
  const handleLogin = (socialName: string) => {
    const BASE_PATH = window.location.origin;
    window.location.href = `${
      import.meta.env.VITE_SOCIAL_LOGIN_URL
    }/${socialName}?redirect=${BASE_PATH}`;
  };
  return (
    <section className="flex flex-col w-full gap-2.5 py-5">
      <SocialLoginButton
        socialName="kakao"
        socialButtonImg={kakaoLoginButton}
        handleLogin={handleLogin}
      />
      <SocialLoginButton
        socialName="google"
        socialButtonImg={googleLoginButton}
        handleLogin={handleLogin}
      />
    </section>
  );
}
