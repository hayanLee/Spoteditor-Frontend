import MainFooter from '@/components/Footer/MainFooter';
import MainHeader from '@/components/Header/MainHeader/MainHeader';
import { useLocation } from 'react-router-dom';

interface ContentLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  const { pathname } = useLocation();
  const isNoticePage = pathname.startsWith('/notice');
  return (
    <>
      {!isNoticePage && <MainHeader />}
      {children}
      {!isNoticePage && <MainFooter />}
    </>
  );
}
