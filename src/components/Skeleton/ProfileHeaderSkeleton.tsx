import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export default function ProfileHeaderSkeleton({ isMe }: { isMe: boolean }) {
  return (
    <section className="flex flex-col items-center justify-start w-full h-[278px] web:h-[325px] pb-5 web:pb-[40px]">
      <Skeleton className="w-[60px] h-[60px] rounded-full" />
      <div className="py-3 pl-3 flex gap-1.5 items-center">
        <Skeleton className="w-[155px] web:w-[197px] h-[18px] web:h-[36px]" />
        <Skeleton className="w-4 h-4 rounded-full" />
      </div>
      <section className="flex py-0.5 px-3 justify-center items-center h-[22px] web:h-[26px] w-[243px] web:w-[274px]">
        <div className="flex gap-0.5 items-center h-full">
          <Skeleton className="w-[41px] web:w-[46px] h-full" />
          <Skeleton className="w-[30px] web:w-[34px] h-full" />
        </div>
        <div className="mx-[15px] flex items-center h-full">
          <Separator className="h-3 w-[1px]" />
        </div>
        <div className="flex gap-0.5 items-center h-full">
          <Skeleton className="w-[41px] web:w-[46px] h-full" />
          <Skeleton className="w-[30px] web:w-[34px] h-full" />
        </div>
      </section>
      <section className="px-3 py-0.5 w-[241px] web:w-[250px] flex flex-col items-center gap-2.5 web:gap-[15px]">
        <Skeleton className="h-[36px] w-full" />
        <Skeleton className="h-[18px] w-[102px] web:w-[116px]" />
      </section>
      {isMe && (
        <Skeleton className="w-[50px] web:w-[60px] h-6 web:h-[28px] rounded-[60px] mt-2.5" />
      )}
    </section>
  );
}
