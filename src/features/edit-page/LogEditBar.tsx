import { ConfirmDialog } from '@/components/Dialog/ConfirmDialog';
import { Button } from '@/components/ui/button';
import useDeleteLog from '@/hooks/mutations/log/useDeleteLogMutation';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface LogEditBarProps {
  logTitle: string;
}

const LogEditBar = ({ logTitle }: LogEditBarProps) => {
  const navi = useNavigate();
  const { placeLogId } = useParams();
  const { mutate: deleteLog } = useDeleteLog(Number(placeLogId));
  const handleBack = () => navi(-1);

  const handleClickDelete = () => deleteLog();
  return (
    <div className="flex items-center w-full py-[7px] px-4 justify-between">
      <div className="flex items-center gap-2.5">
        <Button
          type="button"
          className="p-0 [&_svg]:size-auto"
          variant={'transparent'}
          onClick={handleBack}
        >
          <ArrowLeft size={24} />
        </Button>
        <p className="text-text-2xl font-bold">로그 수정</p>
      </div>

      <ConfirmDialog
        title={logTitle}
        description="로그를 삭제하시겠습니까?"
        onConfirm={handleClickDelete}
        trigger={
          <Button
            variant={'transparent'}
            className="p-0 h-fit text-error-500 !text-text-md font-medium"
          >
            삭제
          </Button>
        }
      />
    </div>
  );
};

export default LogEditBar;
