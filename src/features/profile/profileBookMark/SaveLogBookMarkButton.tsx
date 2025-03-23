import useLogBookmarkMutation from '@/hooks/mutations/log/useLogBookmarkMutation';
import useLogBookMark from '@/hooks/queries/log/useLogBookMark';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

interface SaveLogBookMarkButtonProps {
  placeLogId: number;
}

export default function SaveLogBookMarkButton({ placeLogId }: SaveLogBookMarkButtonProps) {
  const { data } = useLogBookMark(placeLogId);
  const { mutate } = useLogBookmarkMutation({
    isBookMark: data?.isBookmarked,
    placeLogId,
  });

  const onBookMarkClick = () => {
    mutate();
  };
  return (
    <button
      onClick={onBookMarkClick}
      className="w-[42px] h-[42px] bg-white flex p-[6px] justify-center items-center absolute top-[15px] right-[15px]"
    >
      <Bookmark className={cn('w-5 h-5', data?.isBookmarked && 'fill-black')} />
    </button>
  );
}
