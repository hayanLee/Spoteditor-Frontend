import XIcon from '@/components/Icons/XIcon';
import Loading from '@/components/Loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useFollowing from '@/hooks/queries/follow/useFollowing';
import useOtherFollowing from '@/hooks/queries/follow/useOtherFollowing';
import useBottomScrollTrigger from '@/hooks/useBottomScrollTrigger';
import FollowingButton from './FollowingButton';

interface FollowingListButtonProps {
  isMe: boolean;
  otherUserId: number;
  count: number;
}

export default function FollowingListButton({
  isMe,
  otherUserId,
  count,
}: FollowingListButtonProps) {
  const {
    data: meFollowing,
    isLoading: meFollowingLoading,
    fetchNextPage: meFollowingFetchNextPage,
    isFetchingNextPage: meFollowingIsFetchingNextPage,
  } = useFollowing(isMe);
  const {
    data: otherFollowing,
    isLoading: otherFollowingLoading,
    fetchNextPage: otherFollowingFetchNextPage,
    isFetchingNextPage: otherFollowingIsFetchingNextPage,
  } = useOtherFollowing(isMe, otherUserId);

  const isLoading = isMe ? meFollowingLoading : otherFollowingLoading;
  const data = isMe ? meFollowing : otherFollowing;
  const fetchNextPage = isMe ? meFollowingFetchNextPage : otherFollowingFetchNextPage;
  const isFetchingNextPage = isMe
    ? meFollowingIsFetchingNextPage
    : otherFollowingIsFetchingNextPage;

  const scrollRef = useBottomScrollTrigger(fetchNextPage, isFetchingNextPage, 20);
  return (
    <Dialog>
      <DialogTrigger asChild className="outline-none">
        <button className="flex items-center space-x-1">
          <DialogDescription className="text-black text-[18px]">팔로잉</DialogDescription>
          <span className="font-bold text-center text-[18px]">{count}</span>
        </button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="w-[340px] web:w-[348px] h-420 p-0 overflow-hidden">
        <DialogTitle className="grid grid-cols-3 w-full mb-2 section-heading h-[50px] px-2.5">
          <div />
          <div className="flex items-center justify-center">
            <span className="text-center">팔로잉</span>
          </div>
          <DialogClose
            asChild
            className="flex items-center justify-end w-full web:py-2 mobile:py-[13px]"
          >
            <button>
              <XIcon className="w-[34px] h-[34px]" />
            </button>
          </DialogClose>
        </DialogTitle>
        <div ref={scrollRef} className="pr-[5px] w-full">
          <article className="w-full px-[19px] h-[370px] flex flex-col overflow-y-scroll">
            {isLoading ? (
              <Loading className="w-full pl-[5px]" />
            ) : (
              <>
                {data?.pages.map((folloingList) =>
                  folloingList.content.map((folloing) => (
                    <article
                      key={folloing.userId}
                      className="flex items-center w-full py-[6px] between justify-between"
                    >
                      <figure className="flex items-center gap-[6px]">
                        <Avatar className="w-11 h-11">
                          <AvatarImage
                            src={folloing.imageUrl}
                            alt={`${folloing.name}님의 프로필`}
                          />
                          <AvatarFallback>{folloing.name}</AvatarFallback>
                        </Avatar>
                        <figcaption className="font-bold text-text-xs">{folloing.name}</figcaption>
                      </figure>
                      {isMe && <FollowingButton otherUserId={folloing.userId} />}
                    </article>
                  ))
                )}
                {isFetchingNextPage && <Loading className="w-full" />}
              </>
            )}
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
}
