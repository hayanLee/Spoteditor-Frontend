import FloatingButton from '@/components/Button/FloatingButton';
import { TableIcon } from '@/components/Icons';
import ModalLogCard from '@/components/LogCard/ModalLogCard';
import PlaceItemSkeleton from '@/components/Skeleton/PlaceItemSkeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import LogAuthorInfo from '@/features/profile/LogAuthorInfo';
import useLogBookmarkMutation from '@/hooks/mutations/log/useLogBookmarkMutation';
import useLog from '@/hooks/queries/log/useLog';
import useLogBookMark from '@/hooks/queries/log/useLogBookMark';
import usePlaceBookMark from '@/hooks/queries/log/usePlaceBookMark';
import useUser from '@/hooks/queries/user/useUser';
import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import PlaceItem from '@/pages/detail-page/components/PlaceItem';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { useLoginModalStore } from '@/store/loginStore';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Bookmark } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import DetailBanner from './components/DetailBanner';
const DetailPage = () => {
  const { placeLogId } = useParams();
  const { isMobile } = useResponsive();

  /* query */
  const numericPlaceLogId = Number(placeLogId);
  const { data: logData, isPending: isLogPending } = useLog(numericPlaceLogId);
  const { data: LogBookmark } = useLogBookMark(numericPlaceLogId);
  const { data: placeBookmark } = usePlaceBookMark(numericPlaceLogId);
  const { data: user } = useUser();
  const { openLoginModal } = useLoginModalStore();

  /* state */
  const { description = '', places = [], userId } = logData ?? {};
  const placebookmark = LogBookmark?.isBookmarked ?? false;
  const isOwner = user?.userId === userId;

  /* mutatation */
  const { mutate: logBookmarkMutation } = useLogBookmarkMutation({
    isBookMark: placebookmark,
    placeLogId: numericPlaceLogId,
  });

  /* handlers */
  const onClickLogBookmark = () => {
    if (!user) {
      openLoginModal();
      return;
    }
    logBookmarkMutation();
  };

  return (
    <>
      {/* 커버 */}
      <DetailBanner logData={logData} isOwner={isOwner} />

      <main className="flex flex-col px-4 py-2.5 gap-[15px] web:px-[50px] web:py-5">
        <div className="web:grid web:grid-cols-[1fr_3fr] gap-5">
          {/* 프로필  */}
          <LogAuthorInfo authorId={Number(userId)} isOwner={isOwner} />

          {/* 설명 */}
          {isLogPending ? (
            <Skeleton className="h-5 w-[400px]" />
          ) : (
            <p className="text-light-400 text-text-sm web:grow web:text-text-lg flex items-center">
              {description}
            </p>
          )}
        </div>

        {/* 컨텐츠 */}
        {isLogPending
          ? [...Array(3)].map((_, idx) => <PlaceItemSkeleton key={idx} />)
          : places.map((place: PlaceInLog, idx: number) => (
              <PlaceItem
                place={place}
                key={place.placeId}
                idx={idx + 1}
                isBookMark={placeBookmark?.[idx]?.isBookmarked ?? undefined}
              />
            ))}
      </main>

      <div className="fixed bottom-12 right-2.5 web:right-5 flex flex-col gap-2 web:gap-[15px]">
        {/* 로그 북마크 버튼 */}
        <FloatingButton onClick={onClickLogBookmark}>
          <Bookmark className={cn('!size-6 web:!size-8', placebookmark && 'fill-black')} />
        </FloatingButton>

        {/* 장소 모아 보기 버튼 */}
        {isMobile ? (
          <FloatingButton asChild>
            <Link to={`/log/${placeLogId}/placesCollection`}>
              <TableIcon className="!size-5 web:!size-7" />
            </Link>
          </FloatingButton>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <FloatingButton>
                <TableIcon className="!size-5 web:!size-7" />
              </FloatingButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-start">
                <DialogTitle className="text-text-2xl">소개된 장소</DialogTitle>
                <DialogDescription hidden>소개된 장소 모달</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-x-[5px] gap-y-5 w-full max-h-[calc(90vh-100px)] overflow-y-auto scrollbar-hide py-[18px]">
                {places.map((place: PlaceInLog, idx) => (
                  <ModalLogCard
                    key={place.placeId}
                    place={place}
                    isPlaceBookMark={placeBookmark?.[idx]?.isBookmarked}
                    placeLogId={Number(logData?.placeLogId)}
                  />
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
