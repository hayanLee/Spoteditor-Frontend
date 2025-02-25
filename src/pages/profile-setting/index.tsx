import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AccountSettings from '@/features/profile-setting/AccountSettings';
import ProfileSettingAvatar from '@/features/profile-setting/ProfileSettingAvatar';
import ProfileSettingForm from '@/features/profile-setting/ProfileSettingForm';
import SaveProfileButton from '@/features/profile-setting/SaveProfileButton';
import PageLayout from '@/layouts/PageLayout';
import { profileSettingSchema } from '@/services/schemas/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function ProfileSetting() {
  const form = useForm({
    resolver: zodResolver(profileSettingSchema),
    defaultValues: {
      name: '',
      imageUrl: 'https://github.com/shadcn.png' /* 추후에 유저의 데이터로 변경 */,
      description: '',
      instagramId: '',
    },
  });

  const onSubmit = (data: z.infer<typeof profileSettingSchema>) => {
    console.log(data);
  };

  const handleSaveClick = useCallback(() => {
    //즉시실행함수를 이용해 검증을 마치고 바로 제출
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  return (
    <PageLayout>
      <div className="w-screen web:w-[661px] flex flex-col px-4 web:px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full">
            <ProfileSettingAvatar imageUrl="https://github.com/shadcn.png" />
            <p className="mt-8 mb-4 font-bold text-text-lg web:text-text-2xl">프로필 편집</p>
            <ProfileSettingForm />
            <AccountSettings />
            <section className="flex justify-between mt-[50px]">
              <Button variant="outline" className="rounded-[6px] w-[120px] h-[42px]">
                취소
              </Button>
              <SaveProfileButton onTrigger={handleSaveClick} />
            </section>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default ProfileSetting;
