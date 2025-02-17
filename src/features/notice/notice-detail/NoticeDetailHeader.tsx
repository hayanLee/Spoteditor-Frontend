import LeftArrowIcon from '@/components/Icons/LeftArrowIcon';
import { useNavigate } from 'react-router-dom';

interface NoticeDetailHeaderProps {
  title: string;
  time: string;
}

function NoticeDetailHeader({ title, time }: NoticeDetailHeaderProps) {
  const nav = useNavigate();

  return (
    <header className="w-full bg-white sticky web:top-[60px] mobile:top-12 border-b-[1px] border-b-primary-50 flex flex-col">
      <div className="flex w-full pt-3 border-b-[1px] border-b-primary-50 flex-start ">
        <button onClick={() => nav(-1)}>
          <LeftArrowIcon className="ml-4 my-3.5" />
        </button>
      </div>
      <div className="w-full pt-[15px] px-4 flex flex-col justify-center items-start gap-1">
        <h2 className="font-bold text-text-2xl">{title}</h2>
        <time className="text-text-xs text-primary-400">{time}</time>
      </div>
    </header>
  );
}

export default NoticeDetailHeader;
