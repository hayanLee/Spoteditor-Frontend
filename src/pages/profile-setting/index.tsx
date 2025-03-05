import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AccountSettings from '@/features/profile-setting/AccountSettings';
import ProfileSettingAvatar from '@/features/profile-setting/ProfileSettingAvatar';
import ProfileSettingForm from '@/features/profile-setting/ProfileSettingForm/ProfileSettingForm';
import SaveProfileButton from '@/features/profile-setting/SaveProfileButton';
import useUnsavedChangesWarning from '@/hooks/form/useUnsavedChangesWarning';
import { useUpdateUser } from '@/hooks/mutations/user/useUpdateUser';
import useUser from '@/hooks/queries/user/useUser';
import PageLayout from '@/layouts/PageLayout';
import { profileSettingSchema } from '@/services/schemas/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

function ProfileSetting() {
  const nav = useNavigate();
  const { user } = useUser('userOnly');

  const form = useForm({
    resolver: zodResolver(profileSettingSchema),
    defaultValues: {
      name: user?.name ?? '',
      imageUrl: user?.imageUrl ?? 'https://github.com/shadcn.png',
      description: user?.description ?? '',
      instagramId: user?.instagramId ?? '',
    },
  });

  const { mutate } = useUpdateUser();
  const { isFormDirty, setIsFormDirty } = useUnsavedChangesWarning(form);

  const onSubmit = (data: z.infer<typeof profileSettingSchema>) => {
    mutate(data);
    setIsFormDirty(false);
  };

  const handleSaveClick = useCallback(() => {
    //즉시실행함수를 이용해 검증을 마치고 바로 제출
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  const handleNavigation = () => {
    if (isFormDirty) {
      const confirmLeave = window.confirm('저장하지 않고 나가시겠습니까?');
      if (!confirmLeave) return;
    }
    nav(-1); // 이전 페이지로 이동
  };
  return (
    <PageLayout>
      <div className="w-screen web:w-[661px] flex flex-col px-4 web:px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full">
            <ProfileSettingAvatar imageUrl={String(user?.imageUrl)} />
            <p className="mt-8 mb-4 font-bold text-text-lg web:text-text-2xl">프로필 편집</p>
            <ProfileSettingForm />
            <AccountSettings />
            <section className="flex justify-between mt-[50px]">
              <Button
                onClick={handleNavigation}
                variant="outline"
                className="rounded-[6px] w-[120px] h-[42px]"
              >
                취소
              </Button>
              <SaveProfileButton userId={user?.userId!} onTrigger={handleSaveClick} />
            </section>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default ProfileSetting;
