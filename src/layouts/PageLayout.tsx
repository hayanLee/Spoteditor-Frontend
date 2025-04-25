import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function PageLayout({ className, children }: PageLayoutProps) {
  return (
    <main
      className={cn(
        'flex flex-col items-center px-4 web:px-[50px] py-10 web:py-[60px] w-full',
        className
      )}
    >
      {children}
    </main>
  );
}

export default PageLayout;
