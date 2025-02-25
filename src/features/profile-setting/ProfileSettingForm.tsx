import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

export default function ProfileSettingForm() {
  //useFormContext을 이용해 부모 컴포넌트의 useForm 데이터를 사용
  const { control, watch } = useFormContext();
  const { name: nameLeng, description: descLeng } = watch();

  return (
    <section className="flex flex-col gap-5">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="border-b-[1px] border-b-primary-100">
            <div className="flex items-center justify-between py-[5px]">
              <FormLabel className="font-bold text-text-sm">닉네임</FormLabel>
              <span
                className={cn(
                  'text-text-2xs',
                  nameLeng.length > 30 ? 'text-red-500' : 'text-primarySlate'
                )}
              >
                {nameLeng.length}/30
              </span>
            </div>
            <FormControl>
              <Input
                {...field}
                placeholder="유저의 현재 닉네임"
                className="text-text-sm placeholder:text-text-sm py-[5px]"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="border-b-[1px] border-b-primary-100">
            <div className="flex items-center justify-between py-[5px]">
              <FormLabel className="font-bold text-text-sm">프로필 설명</FormLabel>
              <span
                className={cn(
                  'text-text-2xs',
                  descLeng.length > 50 ? 'text-red-500' : 'text-primarySlate'
                )}
              >
                {descLeng.length}/50
              </span>
            </div>
            <FormControl>
              <Input
                {...field}
                placeholder="프로필 설명을 입력하세요."
                className="text-text-sm placeholder:text-text-sm py-[5px]"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="instagramId"
        render={({ field }) => (
          <FormItem className="border-b-[1px] border-b-primary-100">
            <div className="flex items-center justify-start py-[5px]">
              <FormLabel className="font-bold text-text-sm">인스타그램</FormLabel>
            </div>
            <FormControl>
              <Input
                {...field}
                placeholder="@"
                className="text-text-sm placeholder:text-text-sm py-[5px]"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
}
