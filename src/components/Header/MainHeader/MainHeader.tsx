import LoginStatusButtons from '@/components/Header/MainHeader/components/LoginStatusButtons';
import { EarthIcon } from '@/components/Icons';
import LogoIcon from '@/components/Icons/LogoIcon';
import LoginModal from '@/features/login/LoginModal';
import SearchBar from '@/features/search/SearchBar';
import { Link } from 'react-router-dom';
import SearchBarButton from './components/SearchBarButton';
const MainHeader = () => {
  return (
    <header className="sticky w-full z-50 bg-black px-4 web:px-[50px] py-[14px] web:py-5 web:min-w-[1440px] flex justify-center flex-col left-0 top-0">
      <section className="flex justify-between w-full">
        <Link to="/">
          <LogoIcon className="text-white w-[120px] h-5 cursor-pointer" fill="white" />
        </Link>
        <section className="flex web:gap-[46px] mobile:gap-[20px] items-center justify-between text-white">
          <SearchBarButton />
          <button>
            <EarthIcon />
          </button>
          <LoginStatusButtons />
        </section>
      </section>
      <SearchBar />
      <LoginModal />
    </header>
  );
};

export default MainHeader;
