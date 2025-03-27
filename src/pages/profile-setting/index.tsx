import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AccountSettings from '@/features/profile-setting/AccountSettings';
import ProfileSettingAvatar from '@/features/profile-setting/ProfileSettingAvatar';
import ProfileSettingForm from '@/features/profile-setting/ProfileSettingForm/ProfileSettingForm';
import SaveProfileButton from '@/features/profile-setting/SaveProfileButton';
import useUpdateUser from '@/hooks/mutations/user/useUpdateUser';
import useUser from '@/hooks/queries/user/useUser';
import PageLayout from '@/layouts/PageLayout';
import api from '@/services/apis/api';
import { profileSettingSchema } from '@/services/schemas/profileSchema';
import { useProfileStore } from '@/store/profileStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Resizer from 'react-image-file-resizer';
import useUnsavedChangesWarning from '@/hooks/form/useUnsavedChangesWarning';

export const resizeFile = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      150, // max width
      150, // max height
      'WEBP', // format (JPEG, PNG, WEBP)
      80, // quality (0~100)
      0, // rotation
      (uri) => {
        resolve(uri as File);
      },
      'file' // output type (base64, blob, file)
    );
  });
};

const fetchPresignedUrl = async (file: File) => {
  try {
    const result = await api.register.getPresignUrl({ originalFile: file.name });

    return result;
  } catch (error) {
    console.error('presigned URL 가져오기 실패', error);
  }
};

function ProfileSetting() {
  const nav = useNavigate();
  const { user } = useUser('userOnly');
  const { file, clearFile } = useProfileStore();

  const form = useForm({
    resolver: zodResolver(profileSettingSchema),
    defaultValues: {
      name: user?.name ?? '',
      imageUrl: user?.profileImage.imageUrl ?? '',
      description: user?.description ?? '',
      instagramId: user?.instagramId ?? '',
    },
  });

  const { mutate } = useUpdateUser();

  /* 폼 변경 여부를 비교하는 함수 */
  const isChanged = useCallback(
    (current: z.infer<typeof profileSettingSchema>) => {
      return (
        current.name !== user?.name ||
        current.description !== user?.description ||
        current.instagramId !== (user?.instagramId ?? '') ||
        current.imageUrl !== (user?.profileImage.imageUrl ?? '') ||
        !!file // 파일이 선택된 경우
      );
    },
    [user, file]
  );

  /* 폼 변경 시 새로고침/페이지 이동 경고 띄우기 */
  useUnsavedChangesWarning(form, isChanged);

  const onSubmit = async (data: z.infer<typeof profileSettingSchema>) => {
    const { name, description, imageUrl } = data;

    const instagramId = data.instagramId.startsWith('@')
      ? data.instagramId
      : `@${data.instagramId}`;

    if (file) {
      const resizingFile = await resizeFile(file);

      const presignedUrl = await fetchPresignedUrl(resizingFile);
      if (!presignedUrl) {
        console.log('프로필 이미지presignedUrl 실패');
        return;
      }
      await api.register.uploadImageWithPresignUrl(presignedUrl.preSignedUrl, resizingFile);

      mutate({
        name,
        description,
        instagramId,
        originalFile: resizingFile.name ?? imageUrl,
        uuid: presignedUrl.uuid,
      });
    } else {
      mutate({
        name,
        description,
        instagramId,
      });
    }
    /* 저장 후 dirty 상태를 false로 변경하여 경고창이 뜨지 않도록 */
    form.reset(data);
    clearFile();
  };

  const handleSaveClick = useCallback(() => {
    //즉시실행함수를 이용해 검증을 마치고 바로 제출
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  const handleNavigation = () => {
    nav(`/profile/${user?.userId}/my-logs`);
  };
  return (
    <PageLayout>
      <div className="w-screen web:w-[661px] flex flex-col px-4 web:px-0">
        <Form {...form}>
          <form className="flex flex-col w-full">
            <ProfileSettingAvatar imageUrl={String(user?.profileImage.imageUrl)} />
            <p className="mt-8 mb-4 font-bold text-text-lg web:text-text-2xl">프로필 편집</p>
            <ProfileSettingForm />
            <AccountSettings />
            <section className="flex justify-between mt-[50px]">
              <Button
                type="button"
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
