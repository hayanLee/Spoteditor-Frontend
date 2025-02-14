import mockImg from '@/assets/mock/2.png';
import SubstractIcon from '@/components/Icons/SubstractIcon';
import { cn } from '@/lib/utils';
const LogCard = ({ isLarge }: { isLarge?: boolean }) => {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <div className="relative w-full h-full ">
        <img
          src={mockImg}
          alt="장소 이미지"
          className={cn('object-cover aspect-video', isLarge && 'w-full h-full')}
        />
        <span className="flex items-center gap-1 p-2.5 text-white text-text-md font-semibold absolute bottom-0">
          teamluddy <SubstractIcon />
        </span>
      </div>
      <div>
        <h5 className="text-text-sm font-bold">
          혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
        </h5>
        <h6 className="text-text-sm text-primary-300">서울 | 위치 세부정보</h6>
      </div>
    </div>
  );
};

export default LogCard;
