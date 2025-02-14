import mockImg from '@/assets/mock/1.png';
import SubstractIcon from '@/components/Icons/SubstractIcon';

const PlaceCard = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <img src={mockImg} alt="장소 이미지" className={`object-cover w-full h-full`} />
        <span className="flex items-center gap-1 p-2.5 text-white text-text-md font-semibold absolute bottom-0">
          teamluddy <SubstractIcon />
        </span>
      </div>
      <div>
        <h5 className="text-text-sm font-bold">친구랑 하루</h5>
        <h6 className="text-text-sm text-primary-300">서울 | 위치 세부정보</h6>
      </div>
    </div>
  );
};

export default PlaceCard;
