import PageContentLayout from '@/components/Layout/PageContentLayout';
import ProfileHeader from '@/features/profile/ProfileHeader';
import TapNavigation from '@/features/profile/TapNavigation';
import { Outlet } from 'react-router-dom';

function Profile() {
  return (
    <div className="flex w-full flex-col gap-[50px] items-center">
      <PageContentLayout>
        <ProfileHeader />
        <TapNavigation />
        <Outlet />
      </PageContentLayout>
    </div>
  );
}

export default Profile;
