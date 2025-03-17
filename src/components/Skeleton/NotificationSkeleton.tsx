import { Skeleton } from "../ui/skeleton"

export default function NotificationSkeleton() {
    return (
        <section>
            {Array.from({length: 10}).map((_, idx) => (
                <article key={idx} className="'w-full px-4 web:px-5 py-2.5 flex justify-start gap-3 items-center border-y border-white">
            <figure>
                <Skeleton className="rounded-full w-9 h-9" />
            </figure>
            <figcaption className="flex web:max-w-[342px] gap-1">
                <Skeleton className="w-[190px] h-[18px]" />
              <Skeleton className="w-10 h-[18px]" />
            </figcaption>
          </article>
            ))}
        </section>
    )
}