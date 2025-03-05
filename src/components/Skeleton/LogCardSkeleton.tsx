import { Skeleton } from '../ui/skeleton';

const LogCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[425px] w-full rounded-xl" />
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default LogCardSkeleton;
