import XIcon from '@/components/Icons/XIcon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AvatarImage } from '@radix-ui/react-avatar';

interface FollowButtonProps {
  label: '팔로잉' | '팔로워';
  count: number;
}

function FollowButton({ label, count }: FollowButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="outline-none">
        <button className="flex items-center space-x-1">
          <DialogDescription className="text-black text-[18px]">{label}</DialogDescription>
          <span className="font-bold text-center text-[18px]">{count}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="web:w-[348px] mobile:w-[340px] h-420 p-0 overflow-hidden">
        <DialogTitle className="grid grid-cols-3 w-full mb-2 section-heading h-[50px] px-2.5">
          <div />
          <div className="flex items-center justify-center">
            <span className="text-center">{label}</span>
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
        <article className="w-full px-[19px] h-[370px] flex flex-col overflow-y-scroll">
          {Array.from({ length: count }).map((_, idx) => (
            <article
              key={idx}
              className={cn(
                'flex items-center w-full py-[6px]',
                label === '팔로잉' ? 'justify-between' : 'justify-start'
              )}
            >
              <figure className="flex items-center gap-[6px]">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <figcaption className="font-bold text-text-xs">user name</figcaption>
              </figure>
              {label === '팔로잉' && (
                <Button variant="secondary" className="font-medium h-7 w-[62px] rounded-[60px]">
                  팔로잉
                </Button>
              )}
            </article>
          ))}
        </article>
      </DialogContent>
    </Dialog>
  );
}

export default FollowButton;
