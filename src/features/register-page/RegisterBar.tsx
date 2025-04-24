import { HomeIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RegisterBar = () => {
  const navi = useNavigate();
  const location = useLocation();
  return (
    <div className={cn('flex items-center w-full gap-2 py-[7px] px-4 web:px-0')}>
      <Button
        type="button"
        className="p-0 [&_svg]:size-auto"
        variant="transparent"
        onClick={() => navi(location.state?.from || HOME)}
      >
        <ArrowLeft size={24} />
      </Button>
      <Link to={HOME} className="p-0 [&_svg]:size-auto">
        <HomeIcon />
      </Link>
    </div>
  );
};

export default RegisterBar;
