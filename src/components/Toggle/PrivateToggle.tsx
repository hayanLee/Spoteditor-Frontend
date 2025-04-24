import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useFormContext } from 'react-hook-form';

const PrivateToggle = () => {
  const { watch, setValue } = useFormContext();

  const status = watch('status');
  const isPrivate = status === 'private';
  const handleToggle = (checked: boolean) =>
    setValue('status', checked ? 'private' : 'public', { shouldDirty: true });

  return (
    <div className="flex items-center space-x-4">
      <Switch checked={isPrivate} onCheckedChange={handleToggle} />
      <Label className="min-w-10 !text-light-300 text-text-sm">
        {isPrivate ? '비공개' : '공개'}
      </Label>
    </div>
  );
};

export default PrivateToggle;
