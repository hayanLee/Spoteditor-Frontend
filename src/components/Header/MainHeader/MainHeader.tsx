import global from '@/assets/homepage/global.png';
import search from '@/assets/homepage/search.png';
import LogoIcon from '@/components/Icons/LogoIcon';
import LoginModal from '@/feature/login/LoginModal';
import { useSearchStore } from '@/store/searchStore';
import { Link } from 'react-router-dom';
import LoginStatusButtons from './LoginStatusButtons';
const MainHeader = () => {
  const { toggleSearchBar } = useSearchStore();

  return (
    <header className="w-full bg-black px-4 py-5 web:px-[50px] flex justify-between items-center">
      <Link to="/">
        <LogoIcon className="text-white w-[120px] h-5 cursor-pointer" fill="white" />
      </Link>

      <section className="flex web:gap-[46px] mobile:gap-[20px] items-center justify-between text-white">
        <button onClick={toggleSearchBar}>
          <img src={search} alt="search_logo" className="object-contain w-[20px] h-[20px]" />
        </button>
        <button>
          <img src={global} alt="global_logo" className="object-contain w-[20px] h-[20px]" />
        </button>
        <LoginStatusButtons />
      </section>

      <LoginModal />
    </header>
  );
};

export default MainHeader;
