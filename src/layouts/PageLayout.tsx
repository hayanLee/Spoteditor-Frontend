import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function PageLayout({ className, children }: PageLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center self-stretch web:p-[60px_50px_140px_50px] mobile:p-[40px_16px_50px_16px]',
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageLayout;
