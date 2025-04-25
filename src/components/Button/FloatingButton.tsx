import { Button } from '@/components/ui/button';
import { PropsWithChildren } from 'react';

interface FloatingButtonProps extends PropsWithChildren {
  onClick?: () => void;
  asChild?: boolean;
}

const FloatingButton = ({ children, onClick, asChild = false }: FloatingButtonProps) => (
  <Button
    variant="outline"
    fullRounded
    onClick={onClick}
    className="w-[45px] h-[45px] web:w-[60px] web:h-[60px] border-gray-200 rounded-full"
    asChild={asChild}
  >
    {children}
  </Button>
);

export default FloatingButton;
