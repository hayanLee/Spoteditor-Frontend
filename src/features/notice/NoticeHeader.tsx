import LeftArrowIcon from '@/components/Icons/LeftArrowIcon';
import { useNavigate } from 'react-router-dom';

interface NoticeHeaderProps {
  title: string;
}

function NoticeHeader({ title }: NoticeHeaderProps) {
  const nav = useNavigate();
  return (
    <header className="w-full bg-white flex justify-start items-center sticky web:top-[60px] mobile:top-12 gap-2.5 pt-3 pb-2.5 border-b-[1px] border-b-primary-50">
      <button onClick={() => nav(-1)}>
        <LeftArrowIcon className="ml-4" />
      </button>
      <h2 className="font-bold text-text-2xl">{title}</h2>
    </header>
  );
}

export default NoticeHeader;
