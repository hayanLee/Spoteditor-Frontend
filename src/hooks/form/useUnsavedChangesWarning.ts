import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function useUnsavedChangesWarning(form: UseFormReturn<any>) {
  const [isFormDirty, setIsFormDirty] = useState(false);

  // 1. 폼이 변경될 때 감지
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsFormDirty(true);
    });

    return () => subscription.unsubscribe(); //올바르게 구독 해제
  }, [form]);

  //2. 페이지 이탈 감지
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = ''; // 크롬에서는 빈 문자열 필요
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]);

  // 3. form.reset()이 호출될 때 isFormDirty 초기화
  useEffect(() => {
    const resetListener = () => setIsFormDirty(false);
    form.reset();
    form.setValue('resetListener', resetListener);
  }, [form]);

  return { isFormDirty, setIsFormDirty };
}
