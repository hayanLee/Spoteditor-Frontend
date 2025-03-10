import { Skeleton } from '../ui/skeleton';

export default function PostCardSkeleton() {
  return (
    <section className="grid w-full grid-cols-1 web:grid-cols-4 gap-[34px] web:gap-x-[15px] web:gap-y-[40px] mb-[50px]">
      {Array.from({ length: 12 }).map((_, idx) => (
        <article key={idx} className="flex flex-col w-full gap-1.5">
          <Skeleton className="w-full  aspect-[324/218]" />
          <div className="flex flex-col h-[42px]">
            <section className="py-[1px] h-full">
              <Skeleton className="w-[90px] h-full" />
            </section>
            <section className="py-[1px] h-full flex">
              <Skeleton className="w-16 h-full" />
              <div className="h-full mx-2">
                <Skeleton className="w-[1px] h-full" />
              </div>
              <Skeleton className="w-48 h-full" />
            </section>
          </div>
        </article>
      ))}
    </section>
  );
}
