import { Skeleton } from '../ui/skeleton';

const LogCoverSkeleton = () => {
  return (
    <div className="relative w-full aspect-[3/4] web:aspect-[4/1]">
      <Skeleton className="w-full h-full bg-neutral-200" />
      <div className="absolute bottom-0 px-4 py-6 web:px-[50px] web:py-8 space-y-2">
        <Skeleton className="h-8 w-52 web:w-96 bg-neutral-300" />
        <Skeleton className="h-6 w-32 web:w-52 bg-neutral-300" />
      </div>
    </div>
  );
};

export default LogCoverSkeleton;
