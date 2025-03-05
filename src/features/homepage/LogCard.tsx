import mockImg from '@/assets/mock/1.png';
import { cn } from '@/lib/utils';
import { LogContent, PlaceInLog } from '@/services/apis/types/logAPI.type';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
type LogCardProps = {
  isLarge?: boolean;
  vertical?: boolean;
  log?: LogContent;
  place?: PlaceInLog;
  isModal?: boolean;
};

const LogCard = ({ isLarge, vertical, log, place, isModal }: LogCardProps) => {
  const navi = useNavigate();
  const handleCardClick = () => navi(`/log/${log?.placeLogId}`);
  return (
    <div
      className={cn('h-full gap-1.5', isLarge ? 'flex flex-col' : 'grid grid-rows-[auto_1fr]')}
      onClick={handleCardClick}
    >
      {/* 이미지 */}
      <div className={cn('relative grow')}>
        <img
          src={mockImg}
          alt="장소 이미지"
          className={cn('object-cover w-full h-full aspect-[3/2]', vertical && 'aspect-[3/4]')}
        />
        <div className="absolute inset-0 card-id-gradient"></div>
        <div className="absolute inset-0 hover:bg-black/25 transition-colors"></div>
        {!isModal && (
          <span className="flex items-center gap-1 p-2.5 text-white text-text-2xs font-semibold absolute bottom-0">
            teamluddy
          </span>
        )}

        <div className={cn('bg-white absolute top-4 right-4 p-[11px]', isModal && 'top-1 right-1')}>
          <Bookmark />
        </div>
      </div>

      {/* 설명 */}
      <div className="text-text-sm web:text-text-md">
        <h5 className="font-bold">{log?.name || place?.name} </h5>
        <h6 className="text-primary-300 font-normal">
          {log && `${log.address.sido} | ${log.address.sigungu}`}
          {place && `${place.address.sido} | ${place.address.sigungu}`}
        </h6>
      </div>
    </div>
  );
};

export default LogCard;
