import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function PageLayout({ className, children }: PageLayoutProps) {
  return (
    <main
      className={cn(
        'flex flex-col items-center self-stretch p-[40px_16px_50px_16px] web:p-[60px_50px_140px_50px]',
        className
      )}
    >
      {children}
    </main>
  );
}

export default PageLayout;
