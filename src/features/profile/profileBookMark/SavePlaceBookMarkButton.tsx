import usePlaceBookMarkMutation from '@/hooks/mutations/log/usePlaceBookMarkMutation';
import usePlaceBookMarkCheck from '@/hooks/queries/log/usePlaceBookMarkCheck';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

interface SavePlaceBookMarkButtonProps {
  placeId: number;
}

export default function SavePlaceBookMarkButton({ placeId }: SavePlaceBookMarkButtonProps) {
  const { data } = usePlaceBookMarkCheck(placeId);
  const { mutate } = usePlaceBookMarkMutation({
    isBookMark: data?.isBookmarked ?? false,
    placeId,
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
