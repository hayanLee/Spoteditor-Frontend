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
          'text-lg web:text-2xl !leading-[120%] text-primary-400 font-untitled font-medium',
          labelClassName
        )}
      >
        {labelText}
      </h2>
      <h2
        className={cn(
          'text-lg web:text-2xl !leading-[120%] text-primary-950 font-untitled font-medium',
          queryClassName
        )}
      >
        {queryText}
      </h2>
    </header>
  );
}

export default SectionHeader;
