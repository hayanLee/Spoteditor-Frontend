import { z } from 'zod';

export const profileSettingSchema = z.object({
  name: z
    .string()
    .max(30, { message: '닉네임은 30글자를 넘을 수 없습니다.' })
    .min(1, { message: '' }),
  imageUrl: z
    .string()
    .url({ message: '올바른 이미지 URL을 입력해주세요.' })
    .refine(
      (val) => {
        return /\.(jpeg|jpg|png|gif)$/i.test(val);
      },
      { message: '이미지는 JPEG, PNG, GIF만 업로드 가능합니다.' }
    ),
  description: z
    .string()
    .max(50, { message: '프로필 설명은 50글자를 넘을 수 없습니다.' })
    .min(5, { message: '' }),
  instagramId: z.string(),
});
