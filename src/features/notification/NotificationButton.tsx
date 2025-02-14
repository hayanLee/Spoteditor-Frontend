import BellIcon from '@/components/Icons/BellIconIcon';
import XIcon from '@/components/Icons/XIcon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AvatarFallback } from '@radix-ui/react-avatar';

function NotificationButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <BellIcon />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0 mobile:w-screen">
        <SheetHeader className="flex flex-row items-center justify-between w-full py-3 space-y-0 web:px-6 mobile:px-4">
          <SheetTitle className="text-sm font-medium">알림</SheetTitle>
          <SheetClose>
            <XIcon className="w-[34px] h-[34px]" />
          </SheetClose>
        </SheetHeader>
        {/* 알림이 없을 경우
        <NotNotification /> */}
        <section>
          {Array.from({ length: 7 }).map((_, idx) => (
            <article
              key={idx}
              className={cn(
                'w-full web:px-5 mobile:px-4 py-2.5 flex justify-start gap-3 items-center border-y border-white',
                idx % 2 === 0 ? 'bg-[#EFF6FF]' : ''
              )}
            >
              <figure>
                <Avatar className="w-9 h-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </figure>
              <figcaption className="flex text-text-xs web:max-w-[342px]">
                <span className="font-semibold">EDITOR_H</span>
                <p>님이 팔로우 했습니다.</p>
                <time className="ml-1 text-text-xs font-medium text-[#81858F]">5분 전</time>
              </figcaption>
            </article>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationButton;
