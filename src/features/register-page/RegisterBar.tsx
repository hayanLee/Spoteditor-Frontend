import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

const RegisterBar = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={cn('flex items-center w-full py-[7px]')}>
      <Button
        type="button"
        className="p-0 [&_svg]:size-auto"
        variant={'transparent'}
        onClick={onClick}
      >
        <ArrowLeft size={24} />
      </Button>
    </div>
  );
};

export default RegisterBar;
