import { cn } from '@/lib/utils';
import VerifiedLabelIcon from '../../../components/Icons/VerifiedLabelIcon';
import { Bookmark } from 'lucide-react';
import useUser from '@/hooks/queries/user/useUser';
import { useParams } from 'react-router-dom';

interface PostCardImageProps {
  imageUrl?: string;
  lable?: boolean;
  className?: string;
}

function PostCardImage({ imageUrl, lable, className }: PostCardImageProps) {
  const { userId } = useParams();
  const { user } = useUser();
  return (
    <div
      className={cn(
        'relative flex-1 w-full web:mb-[10px] mobile:mb-[6px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_74.97%,rgba(0,0,0,0.7)_94.58%)]',
        className,
        'aspect-[324/218]'
      )}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post Thumbnail"
          className="object-cover w-full h-full rounded-md"
        />
      )}
      {lable && (
        <div className="flex items-center gap-[3px] absolute left-[10px] bottom-[10px] text-white">
          <span className="text-[11px] font-semibold leading-[130%] tracking-[-0.22px]">
            teamluddy
          </span>
          <VerifiedLabelIcon className="w-[10.474px] h-[10.378px] fill-white" />
        </div>
      )}
      <div className="absolute inset-0 transition-colors hover:bg-black/25" />
      {Number(userId) !== user?.userId && (
        <div className="bg-white absolute top-[15px] right-[15px] p-[11px] z-20">
          <Bookmark />
        </div>
      )}
    </div>
  );
}

export default PostCardImage;
