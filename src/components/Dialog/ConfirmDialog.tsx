import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

interface ConfirmDialogProps {
  title: string;
  description?: ReactNode;
  onConfirm: () => void;
  trigger?: ReactNode;
  triggerText?: string;
  buttonClassName?: string;
  showCheckbox?: boolean;
  checkboxLabel?: string;
}

export const ConfirmDialog = ({
  title,
  description,
  onConfirm,
  trigger,
  triggerText = '선택',
  buttonClassName = 'w-full',
  showCheckbox = false,
  checkboxLabel = '비공개',
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button className={buttonClassName} size="xl">
            {triggerText}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[400px] min-w-[300px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-2xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className="hidden">alertDialog 설명란</AlertDialogDescription>
          {description && (
            <AlertDialogDescription className="text-text-xs">{description}</AlertDialogDescription>
          )}
          {showCheckbox && (
            <Label htmlFor="secret" className="flex items-center gap-3 h-fit">
              <Input
                type="checkbox"
                id="secret"
                className="w-5 h-5 border rounded-sm bg-white cursor-pointer checked:text-white checked:accent-black"
              />
              <span className="text-black text-text-sm">{checkboxLabel}</span>
            </Label>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
