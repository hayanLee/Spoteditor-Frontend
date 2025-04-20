import { Button } from '@/components/ui/button';
import { MAPS, REGISTER_SEARCH } from '@/constants/pathname';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LogWriteBarProps {
  sido?: string;
  bname?: string;
}

const LogWriteBar = ({ sido = '', bname = '' }: LogWriteBarProps) => {
  const navi = useNavigate();
  const handleBack = () => navi(MAPS);
  return (
    <div className="flex items-center w-full py-[7px] px-4 justify-between">
      <div className="flex items-center gap-2.5 ">
        <Button
          type="button"
          className="p-0 [&_svg]:size-auto"
          variant="transparent"
          onClick={handleBack}
        >
          <ArrowLeft size={24} />
        </Button>
        <p className="text-text-2xl font-bold ">
          {sido} · {bname}
        </p>
      </div>
      <Button
        variant={'transparent'}
        className="p-0 h-fit text-light-300 !text-text-md font-medium"
        onClick={() => navi(REGISTER_SEARCH)}
      >
        장소 추가
      </Button>
    </div>
  );
};

export default LogWriteBar;
