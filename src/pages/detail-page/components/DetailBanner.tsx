import { SpotIcon } from '@/components/Icons';
import LogCoverSkeleton from '@/components/Skeleton/LogCoverSkeleton';
import { LogResponse, Tag } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import BannerActionButtons from './BannerActionButtons';

interface BannerProps {
  logData?: LogResponse;
  isOwner: boolean;
}

const DetailBanner = ({ logData, isOwner }: BannerProps) => {
  if (!logData) return <LogCoverSkeleton />;

  const { name, placeLogId, tags, status } = logData;
  return (
    <div className="relative w-full aspect-[3/4] web:aspect-[4/1]">
      <img
        src={getImgFromCloudFront(logData.image.storedFile)}
        alt="coverImage"
        className="w-full h-full object-cover"
      />

      {/* 배너에 있는 버튼 */}
      <BannerActionButtons placeLogId={placeLogId} isOwner={isOwner} />

      <div className="absolute top-0 left-0 w-full h-full bg-cover-gradient"></div>
      <div className="flex flex-col absolute bottom-0 px-4 py-6 gap-2 web:px-[50px] web:py-8">
        {status === 'private' && (
          <span className="py-2 px-[14.5px] rounded-full bg-error-500 w-fit text-text-sm font-medium text-white my-1.5">
            비공개
          </span>
        )}
        <h3 className="text-lg web:text-2xl font-bold text-white">{name}</h3>
        <div className="flex gap-1 flex-wrap">
          {tags?.map((item: Tag) => (
            <div className="flex items-center gap-1 text-text-xs web:text-text-sm" key={item.name}>
              <span className="text-white bg-white/30 px-4 py-1.5 rounded-full gap-1 flex items-center">
                <span>{item.name}</span>
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1 text-text-xs web:text-text-sm ">
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full gap-1 flex items-center">
              <SpotIcon className="stroke-white" />
              <span>{placeLogId}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBanner;
