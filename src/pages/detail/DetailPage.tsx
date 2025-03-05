import coverImg from '@/assets/detailPage/coverImg.png';
// import coverImg from '@/assets/mock/1.png';
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
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { Bookmark } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
const DetailPage = () => {
  const { placeLogId } = useParams();
  const navi = useNavigate();
  const { data, isLoading } = useLog(Number(placeLogId));
  const { isMobile } = useResponsive();
  const name = data?.name ?? '';
  const description = data?.description ?? '';
  const places = data?.places ?? [];

  const isDataReady = isLoading || !data;
  // const isDataReady = true;
  return (
    <div>
      {/* 커버 이미지 */}
      <div className="relative w-full aspect-[3/4] web:aspect-[4/1]">
        {isDataReady ? (
          <LogCoverSkeleton />
        ) : (
          <>
            <img src={coverImg} alt="coverImage" className="w-full h-full object-cover" />
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
        >
          <Bookmark className="!size-6 web:!size-8" />
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
    </div>
  );
};

export default DetailPage;
