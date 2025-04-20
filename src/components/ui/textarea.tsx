import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const textareaVariants = cva('flex w-full rounded-md resize-none', {
  variants: {
    variant: {
      default:
        'border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400',
      ghost:
        'bg-light-50 px-[18px] py-2.5 text-light-300 text-text-sm placeholder:text-light-300 border-none focus-visible:ring-0 focus-visible:outline-none',
    },
    size: {
      base: 'min-h-[80px]',
      lg: 'min-h-[105px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
  },
});

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
