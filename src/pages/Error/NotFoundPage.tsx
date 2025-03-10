import notFound from '@/assets/NotFound.png';
import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full grow">
      <img src={notFound} />
      <div className="flex flex-col mt-[50px] mb-5">
        <h4 className="text-text-xl font-bold">찾으시는 페이지를 찾을 수 없습니다.</h4>
        <h5 className="text-center">URL 주소를 확인해주세요.</h5>
      </div>
      <Button size={'xl'} fullRounded>
        <Link to={HOME}>홈으로 이동</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
