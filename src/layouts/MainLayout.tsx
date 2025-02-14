import MainFooter from '@/components/Footer/MainFooter';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Header/MainHeader/MainHeader';
import SearchBar from '@/features/search/SearchBar';

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen min-w-[480px] mx-auto web:w-[1440px]">
      <MainHeader />
      <SearchBar />
      <div className="w-full grow">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
