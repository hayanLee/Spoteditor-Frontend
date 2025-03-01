import { BookMarkIcon, SubtractIcon } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { LogContent } from '@/services/apis/types/logAPI.type';
import { useNavigate } from 'react-router-dom';

type LogCardProps = {
  isLarge?: boolean;
  vertical?: boolean;
  isModal?: boolean;
  log?: LogContent;
};

const LogCard = ({ isLarge, vertical, isModal, log }: LogCardProps) => {
  const navi = useNavigate();
  const handleCardClick = () => navi(`/log/${log?.placeLogId}`);
  return (
    <div
      className={cn(
        'grid gap-1.5 h-full grid-rows-[auto_1fr]',
        isLarge && 'web:grid-rows-[8.5fr_1fr]'
      )}
      onClick={handleCardClick}
    >
      {/* 이미지 */}
      <div className={cn('relative grow')}>
        <img
          src={log?.image.storedFile}
          alt="장소 이미지"
          className={cn(
            'object-cover w-full h-full aspect-[3/2] bg-blue-100',
            vertical && 'aspect-[3/4]'
          )}
        />
        {!isModal && (
          <span className="flex items-center gap-1 p-2.5 text-white text-text-2xs font-semibold absolute bottom-0">
            teamluddy <SubtractIcon />
          </span>
        )}

        {isModal && (
          <div className="w-8 h-8 bg-white absolute top-1 right-1 p-1.5 flex items-center justify-center">
            <BookMarkIcon />
          </div>
        )}
      </div>

      {/* 설명 */}
      <div className="text-text-sm web:text-text-md">
        <h5 className="font-bold">{log?.name}</h5>
        <h6 className="text-primary-300 font-normal">
          {log?.address.sido} | {log?.address.sigungu}
        </h6>
      </div>
    </div>
  );
};

export default LogCard;
