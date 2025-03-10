import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

export default function useUnsavedChangesWarning(form: UseFormReturn<any>) {
  const [isFormDirty, setIsFormDirty] = useState(false);

  // 1. 폼 변경 감지
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsFormDirty(true);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // 2. 페이지 이탈 감지 (beforeunload)
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

  // 3. 뒤로가기 및 페이지 이동 감지 (useBlocker 활용)
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isFormDirty && currentLocation.pathname !== nextLocation.pathname) {
      const confirmLeave = window.confirm('저장하지 않고 나가시겠습니까?');
      return !confirmLeave;
    }
    return false;
  });

  useEffect(() => {
    if (blocker.state === 'blocked') {
      blocker.proceed(); // 사용자 선택에 따라 이동 결정
    }
  }, [blocker]);

  // 4. form.reset()이 호출될 때 isFormDirty 초기화
  useEffect(() => {
    const resetListener = () => setIsFormDirty(false);
    form.reset();
    form.setValue('resetListener', resetListener);
  }, [form]);

  return { isFormDirty, setIsFormDirty };
}
