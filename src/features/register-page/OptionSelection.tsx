import { Button } from '@/components/ui/button';
import { MOOD, WITH_WHOM } from '@/constants/selections';
import { useRegisterStore } from '@/store/registerStore';
import { useCallback } from 'react';

interface OptionSectionProps {
  title: string;
  storeKey: 'selectedWhom' | 'selectedMoods';
}

const OptionSelection = ({ title, storeKey }: OptionSectionProps) => {
  const selectedTargetOptions = useRegisterStore((state) => state.experience[storeKey]);
  const setStoreTarget = useRegisterStore((state) =>
    storeKey === 'selectedWhom' ? state.setWhom : state.setMood
  );
  const options = storeKey === 'selectedWhom' ? WITH_WHOM : MOOD;
  const handleClick = useCallback((option: string) => {
    setStoreTarget(option);
  }, []);

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

export default OptionSelection;
