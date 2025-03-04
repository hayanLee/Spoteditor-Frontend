import { cn } from '@/lib/utils';
import { memo } from 'react';

interface TextCounterProps {
  length: number;
  maxLength: number;
}

export default memo(function TextCounter({ length, maxLength }: TextCounterProps) {
  return (
    <span className={cn('text-text-2xs', length > 30 ? 'text-red-500' : 'text-primarySlate')}>
      {length}/{maxLength}
    </span>
  );
});

/* export default memo(function TextCounter({ length, maxLength }: TextCounterProps) {
  const textClass = useMemo(
    () => cn('text-text-2xs', length > maxLength ? 'text-red-500' : 'text-primarySlate'),
    [length, maxLength]
  );

  return (
    <span className={textClass}>
      {length}/{maxLength}
    </span>
  );
}); */
