import LeftArrowIcon from '@/components/Icons/LeftArrowIcon';
import { useNavigate } from 'react-router-dom';

interface NoticeHeaderProps {
  title: string;
}

function NoticeHeader({ title }: NoticeHeaderProps) {
  const nav = useNavigate();
  return (
    <header className="w-full sticky top-0 bg-white flex justify-start items-center pt-3 gap-2.5 pb-0.5 border-b-[1px] border-b-primary-50">
      <button onClick={() => nav(-1)} className="pl-4 py-3.5">
        <LeftArrowIcon />
      </button>
      <h2 className="font-bold text-text-2xl">{title}</h2>
    </header>
  );
}

export default NoticeHeader;
