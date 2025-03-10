import ContentLayout from '@/layouts/ContentLayout';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center web:min-w-[1440px] w-full h-dvh">
      <ContentLayout>
        <div className="w-full grow">
          <Outlet />
        </div>
      </ContentLayout>
    </div>
  );
};

export default MainLayout;
