import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type CompareFn<T> = (current: T) => boolean;

export default function useUnsavedChangesWarning<T extends FieldValues>(
  form: UseFormReturn<T>,
  isChanged: CompareFn<T>
) {
  const [proceedNavigation, setProceedNavigation] = useState(false);

  // 1. 새로고침 또는 브라우저 닫기 경고
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isChanged(form.getValues())) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form, isChanged]);

  // 2. 페이지 이동 경고
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      isChanged(form.getValues()) &&
      currentLocation.pathname !== nextLocation.pathname &&
      !proceedNavigation
    ) {
      const confirmLeave = window.confirm('저장하지 않고 나가시겠습니까?');
      if (confirmLeave) {
        setProceedNavigation(true);
        return false;
      }
      return true;
    }
    return false;
  });

  // 3. 유저가 확인 누르면 진행
  useEffect(() => {
    if (blocker.state === 'blocked' && proceedNavigation) {
      blocker.proceed();
    }
  }, [blocker, proceedNavigation]);
}
