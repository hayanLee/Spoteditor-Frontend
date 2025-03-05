import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  labelText?: string;
  queryText?: string;
  bottomLine?: boolean;
  className: string;
  labelClassName?: string;
  queryClassName?: string;
}

function SectionHeader({
  labelText = 'Sort by',
  queryText = 'Popularity',
  className,
  labelClassName,
  queryClassName,
}: SectionHeaderProps) {
  return (
    <header className={cn('flex flex-col', className)}>
      <h2
        className={cn(
          'text-[24px] web:text-[32px] leading-[120%] tracking-[-0.48px] web:tracking-[-0.64px] text-primary-400 font-medium',
          labelClassName
        )}
      >
        {labelText}
      </h2>
      <h2
        className={cn(
          'text-[24px] web:text-[32px] leading-[120%] tracking-[-0.48px] web:tracking-[-0.64px] text-primary-950 font-medium',
          queryClassName
        )}
      >
        {queryText}
      </h2>
    </header>
  );
}

export default SectionHeader;
