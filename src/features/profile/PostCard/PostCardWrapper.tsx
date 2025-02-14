import { cn } from '@/lib/utils';

interface PostCardWrapperProps {
  className?: string;
  children: React.ReactNode;
}

function PostCardWrapper({ className, children }: PostCardWrapperProps) {
  return (
    <section
      className={cn(
        'grid w-full web:grid-cols-4 mobile:grid-cols-1 web:gap-x-[15px] web:gap-y-[40px] mobile:gap-[34px]',
        className
      )}
    >
      {children}
    </section>
  );
}

export default PostCardWrapper;
