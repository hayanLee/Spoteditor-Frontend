import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { REGISTER_SELECT } from '@/constants/pathname';
import useUser from '@/hooks/queries/user/useUser';
import { useNavigate } from 'react-router-dom';
import TabNavButton from './TabNavButton';

function TapNavigation() {
  const { data: user } = useUser();
  const navi = useNavigate();
  const handleGotoRegisterPage = () =>
    navi(REGISTER_SELECT, {
      state: { from: location.pathname },
    });
  return (
    <nav className="w-full flex web:justify-start mobile:justify-center items-center web:gap-[30px] mobile:gap-[21px] web:mb-[30px] mobile:mb-[20px]">
      <TabNavButton params="my-logs" navText="나의 로그" />
      <TabNavButton params="saved-spaces" navText="저장된 공간" />
      <TabNavButton params="saved-logs" navText="저장된 로그" />
      {user && (
        <>
          <div>
            <Separator orientation="vertical" className="web:h-[20px] mobile:h-[18px]" />
          </div>
          <Button
            size="s"
            className="rounded-[60px] px-4 py-[11px] h-7 web:h-9 web:text-text-sm font-untitled"
            onClick={handleGotoRegisterPage}
          >
            Upload
          </Button>
        </>
      )}
    </nav>
  );
}

export default TapNavigation;
