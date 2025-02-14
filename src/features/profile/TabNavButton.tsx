import { cn } from '@/lib/utils';
import { useMatch, useNavigate } from 'react-router-dom';

interface TabNavButtonProps {
  params: string;
  navText: string;
}

function TabNavButton({ params, navText }: TabNavButtonProps) {
  const nav = useNavigate();
  const match = useMatch(`/profile/:userId/${params}`);

  return (
    <button
      onClick={() => nav(params)}
      className={cn(
        'web:py-3 mobile:py-2',
        match ? 'text-black border-black border-b-[3px]' : 'text-[#CDCFD4]'
      )}
    >
      {navText}
    </button>
  );
}

export default TabNavButton;
