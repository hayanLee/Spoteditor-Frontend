import LoginButton from '@/components/Header/MainHeader/components/LoginButton';
import UserProfileButton from '@/components/Header/MainHeader/components/UserProfileButton/UserProfileButton';
import NotificationButton from '@/features/notification/NotificationButton';
import useUser from '@/hooks/queries/user/useUser';

function LoginStatusButtons() {
  const { data: user } = useUser();
  return (
    <>
      {user ? (
        <>
          <NotificationButton />
          <UserProfileButton />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default LoginStatusButtons;
