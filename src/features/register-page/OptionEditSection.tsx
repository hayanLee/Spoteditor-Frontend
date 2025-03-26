import { Button } from '@/components/ui/button';
import { MOOD, WITH_WHOM } from '@/constants/selections';
import { LogEditFormData } from '@/pages/edit-page';
import { Tag } from '@/services/apis/types/registerAPI.type';
import { useRegisterStore } from '@/store/registerStore';
import { useCallback } from 'react';
import { useController, UseFormReturn } from 'react-hook-form';

interface OptionEditSectionProps {
  title: string;
  storeKey: 'selectedWhom' | 'selectedMoods';
  form: UseFormReturn<LogEditFormData>;
}

const OptionEditSection = ({ title, storeKey, form }: OptionEditSectionProps) => {
  const { field } = useController({ name: 'tags' });
  const selectedTargetOptions = useRegisterStore((state) => state.experience[storeKey]);
  const setStoreTarget = useRegisterStore((state) =>
    storeKey === 'selectedWhom' ? state.setWhom : state.setMood
  );
  const options = storeKey === 'selectedWhom' ? WITH_WHOM : MOOD;
  const category = storeKey === 'selectedWhom' ? 'WITH_WHOM' : 'MOOD';
  const handleClick = useCallback(
    (option: string) => {
      setStoreTarget(option);
      if (form) {
        const { defaultTags = [], addTags = [], deleteTags = [] } = field.value || {};
        // defaultTags에 option이 있으면 제거
        if (defaultTags.includes(option)) {
          const updatedDeleteTags = deleteTags.some((tag: Tag) => tag.name === option)
            ? deleteTags.filter((tag: Tag) => tag.name !== option) // 있다면 제거
            : [...deleteTags, { name: option, category }]; // 없으면 추가
          form.setValue(
            'tags',
            { ...field.value, deleteTags: updatedDeleteTags },
            { shouldDirty: true }
          );
        } else {
          // 새로 추가
          const updatedAddTags = addTags.some((tag: Tag) => tag.name === option)
            ? addTags.filter((tag: Tag) => tag.name !== option)
            : [...addTags, { name: option, category }];
          form.setValue('tags', { ...field.value, addTags: updatedAddTags }, { shouldDirty: true });
        }
      }
    },
    [category, field.value, form, setStoreTarget]
  );

  return (
    <div className="w-full">
      <h5 className="text-text-sm font-bold py-2.5">{title}</h5>
      <div className="flex gap-2 flex-wrap">
        {options.map((option, idx) => (
          <Button
            type="button"
            key={idx}
            variant={selectedTargetOptions.includes(option) ? 'default' : 'muted'}
            size={'m'}
            className="font-bold"
            onClick={() => handleClick(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OptionEditSection;
