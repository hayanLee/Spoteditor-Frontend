import loadingAnimation from '@/assets/loadingAnimation.json';
import { cn } from '@/lib/utils';
import Lottie from 'lottie-react';

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={cn('flex items-center justify-center h-full', className)}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
