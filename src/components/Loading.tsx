import loadingAnimation from '@/assets/loadingAnimation.json';
import Lottie from 'lottie-react';
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
