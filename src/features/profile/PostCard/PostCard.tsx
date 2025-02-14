import { cn } from '@/lib/utils';

interface PostCardProps {
  className?: string;
  children: React.ReactNode;
}

function PostCard({ className, children }: PostCardProps) {
  return <article className={cn('w-full flex flex-col', className)}>{children}</article>;
}

export default PostCard;
