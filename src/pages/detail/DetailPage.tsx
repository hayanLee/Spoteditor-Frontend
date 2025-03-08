import { SpotIcon, SubtractIcon, TableIcon } from '@/components/Icons';
import LogCoverSkeleton from '@/components/Skeleton/LogCoverSkeleton';
import PlaceItemSkeleton from '@/components/Skeleton/PlaceItemSkeleton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import PlaceItem from '@/features/detailpage/PlaceItem';
import LogCard from '@/features/homepage/LogCard';
import useLog from '@/hooks/queries/log/useLog';
import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import api from '@/services/apis/api';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { Bookmark, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const DetailPage = () => {
  const navi = useNavigate();
  const { placeLogId } = useParams();
  const { data, isPending } = useLog(Number(placeLogId));
  const { isMobile } = useResponsive();
  const [isChecked, setIsChecked] = useState(false);

  const name = data?.name ?? '';
  const description = data?.description ?? '';
  const places = data?.places ?? [];
  const isDataReady = isPending || !data;

  const onClickLogBookMark = async () => {
    setIsChecked((prev) => !prev);
    await api.log.addLogBookMark(Number(placeLogId));
    // await api.log.deleteLogBookMark(Number(placeLogId));
    console.log('북마크 추가');
  };

  return (
    <>
      {/* 커버 이미지 */}
      <div className="relative w-full aspect-[3/4] web:aspect-[4/1]">
        {isDataReady ? (
          <LogCoverSkeleton />
        ) : (
          <>
            <img
              src={getImgFromCloudFront(data.image.storedFile)}
              alt="coverImage"
              className="w-full h-full object-cover"
            />
            <div className="bg-white/70 border border-primary-100 rounded-full absolute p-2.5 top-[14px] right-2.5 cursor-pointer web:top-4 web:right-4">
              <Share2 />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-cover-gradient"></div>
            <div className="flex flex-col absolute bottom-0 px-4 py-6 gap-2 web:px-[50px] web:py-8">
              <h3 className="text-lg web:text-2xl font-bold text-white">{name}</h3>

              <div className="flex items-center gap-1 text-text-xs web:text-text-sm ">
                <span className="text-white bg-white/30 px-4 py-1.5 rounded-full gap-1 flex items-center">
                  <SpotIcon className="stroke-white" />
                  <span>{places.length}</span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col px-4 py-2.5 gap-[15px] web:px-[50px] web:py-5">
        <div className="web:grid web:grid-cols-[1fr_3fr] gap-5">
          {/* 프로필  */}
          <div className="flex items-center gap-2 py-[15px]">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="user Avatar" />
            </Avatar>
            <p className="text-text-sm font-semibold">Teamspoteditor</p>
            <SubtractIcon />
            <Button variant={'ghost'} fullRounded size={'s'}>
              팔로잉
            </Button>
          </div>

          {/* 설명 */}
          {isDataReady ? (
            <Skeleton className="h-5 w-[400px]" />
          ) : (
            <p className="text-primary-400 text-text-sm web:grow web:text-text-lg web:py-1.5">
              {description}
            </p>
          )}
        </div>

        {/* 컨텐츠 */}
        {isDataReady
          ? [...Array(3)].map((_, idx) => <PlaceItemSkeleton key={idx} />)
          : places.map((place: PlaceInLog, idx: number) => (
              <PlaceItem place={place} key={place.placeId} idx={idx + 1} />
            ))}
      </div>

      <div className="fixed bottom-12 right-2.5 web:right-5 flex flex-col gap-2 web:gap-[15px]">
        {/* 북마크 버튼 */}
        <Button
          variant={'outline'}
          className="w-[45px] h-[45px] web:w-[60px] web:h-[60px] border-gray-200 rounded-full"
          onClick={onClickLogBookMark}
        >
          <Bookmark className={cn('!size-6 web:!size-8', isChecked && 'fill-black')} />
        </Button>
        {/* 장소 모아 보기 버튼 */}

        {isMobile ? (
          <Button
            variant={'outline'}
            className="w-[45px] h-[45px] web:w-[60px] web:h-[60px] border-gray-200 rounded-full"
            onClick={() => navi(`/log/${placeLogId}/placesCollection`)}
          >
            <TableIcon className="!size-5 web:!size-7" />
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'outline'}
                className="w-[45px] h-[45px] web:w-[60px] web:h-[60px] border-gray-200 rounded-full"
              >
                <TableIcon className="!size-7" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-start">
                <DialogTitle className="text-text-2xl">소개된 장소</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-x-[5px] gap-y-5 w-full h-[680px] overflow-y-auto scrollbar-hide py-[18px]">
                {places.map((place: PlaceInLog) => (
                  <LogCard key={place.placeId} place={place} vertical isModal />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default DetailPage;
