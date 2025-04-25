import { copyUrlToClipboard } from '@/utils/copyUrlToClipboard';
import { ArrowLeft, PencilLine, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BannerActionButtons = ({ placeLogId, isOwner }: { placeLogId: number; isOwner: boolean }) => {
  const navi = useNavigate();
  const onClickBack = () => navi(-1);
  const onClickShare = () => copyUrlToClipboard();
  const onClickPencil = () => navi(`/edit/${placeLogId}`);
  return (
    <div>
      <div className="absolute flex flex-col top-4 left-2.5 web:left-4 space-y-2">
        <button className="icon-button top-0 left-2.5 " onClick={onClickBack}>
          <ArrowLeft size={20} />
        </button>
      </div>
      <div className="absolute flex flex-col top-4 right-2.5 web:right-4 space-y-2">
        <button className="icon-button top-[14px] right-2.5" onClick={onClickShare}>
          <Share2 size={20} />
        </button>
        {isOwner && (
          <button className="icon-button top-[14px] right-2.5" onClick={onClickPencil}>
            <PencilLine size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BannerActionButtons;
