import { Outlet } from 'react-router-dom';
import ContentLayout from '@/layouts/ContentLayout';

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center web:min-w-[1440px] w-full">
      <ContentLayout>
        <div className="w-full grow">
          <Outlet />
        </div>
      </ContentLayout>
    </div>
  );
};

export default MainLayout;
