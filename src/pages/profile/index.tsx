import ProfileHeader from '@/features/profile/ProfileHeader';
import TapNavigation from '@/features/profile/TapNavigation';
import PageLayout from '@/layouts/PageLayout';
import { copyUrlToClipboard } from '@/utils/copyUrlToClipboard';
import { Share2 } from 'lucide-react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

function Profile() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { userId } = useParams();

  useEffect(() => {
    /* 현재 경로가 정확히 `/profile/:userId`일 경우에만 리다이렉트 */
    if (pathname === `/profile/${userId}`) {
      nav(`/profile/${userId}/my-logs`, { replace: true });
    }
  }, [userId, pathname]);
  return (
    <div className="flex w-full flex-col gap-[50px] items-center">
      <PageLayout className="relative">
        <button
          className=" bg-white/70 border border-primary-100 rounded-full absolute top-[30px] web:top-[59.6px] right-4 web:right-[50px] cursor-pointer z-10 hover:bg-white"
          onClick={() => copyUrlToClipboard()}
        >
          <Share2 className="w-[36px] h-[36px] p-2" />
        </button>
        <ProfileHeader />
        <TapNavigation />
        <Outlet />
      </PageLayout>
    </div>
  );
}

export default Profile;
