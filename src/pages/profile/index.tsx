import ProfileHeader from '@/features/profile/ProfileHeader';
import TapNavigation from '@/features/profile/TapNavigation';
import PageLayout from '@/layouts/PageLayout';
import { Outlet } from 'react-router-dom';

function Profile() {
  return (
    <div className="flex w-full flex-col gap-[50px] items-center">
      <PageLayout>
        <ProfileHeader />
        <TapNavigation />
        <Outlet />
      </PageLayout>
    </div>
  );
}

export default Profile;
