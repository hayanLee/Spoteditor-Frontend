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
import useFollower from '@/hooks/queries/follow/useFollower';
import useOtherFollower from '@/hooks/queries/follow/useOtherFollower';
import useBottomScrollTrigger from '@/hooks/useBottomScrollTrigger';

interface FollowerListButtonProps {
  isMe: boolean;
  otherUserId: number;
  count: number;
}

export default function FollowerListButton({ isMe, otherUserId, count }: FollowerListButtonProps) {
  const {
    data: meFollower,
    isLoading: meFollowerLoading,
    fetchNextPage: meFollowerFetchNextPage,
    isFetchingNextPage: meFollowerIsFetchingNextPage,
  } = useFollower(isMe);
  const {
    data: otherFollower,
    isLoading: otherFollowerLoading,
    fetchNextPage: otherFollowerFetchNextPage,
    isFetchingNextPage: otherFollowerIsFetchingNextPage,
  } = useOtherFollower(isMe, otherUserId);

  const isLoading = isMe ? meFollowerLoading : otherFollowerLoading;
  const data = isMe ? meFollower : otherFollower;
  const fetchNextPage = isMe ? meFollowerFetchNextPage : otherFollowerFetchNextPage;
  const isFetchingNextPage = isMe ? meFollowerIsFetchingNextPage : otherFollowerIsFetchingNextPage;

  const scrollRef = useBottomScrollTrigger(fetchNextPage, isFetchingNextPage, 20);
  return (
    <Dialog>
      <DialogTrigger asChild className="outline-none">
        <button className="flex items-center space-x-1">
          <DialogDescription className="text-black text-[18px]">팔로워</DialogDescription>
          <span className="font-bold text-center text-[18px]">{count}</span>
        </button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="w-[340px] web:w-[348px] h-420 p-0 overflow-hidden">
        <DialogTitle className="grid grid-cols-3 w-full mb-2 section-heading h-[50px] px-2.5">
          <div />
          <div className="flex items-center justify-center">
            <span className="text-center">팔로워</span>
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
                {data?.pages.map((followerList) =>
                  followerList.content.map((follower) => (
                    <article
                      key={follower.userId}
                      className="flex items-center w-full py-[6px] between justify-start"
                    >
                      <figure className="flex items-center gap-[6px]">
                        <Avatar className="w-11 h-11">
                          <AvatarImage
                            src={follower.imageUrl}
                            alt={`${follower.name}님의 프로필`}
                          />
                          <AvatarFallback>{follower.name}</AvatarFallback>
                        </Avatar>
                        <figcaption className="font-bold text-text-xs">{follower.name}</figcaption>
                      </figure>
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
