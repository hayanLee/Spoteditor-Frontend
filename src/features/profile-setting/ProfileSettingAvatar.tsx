import PenIcon from '@/components/Icons/PenIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import useImagePreview from '@/hooks/useImagePreview';
import { useRef } from 'react';

interface ProfileSettingAvatarProps {
  imageUrl: string;
}

export default function ProfileSettingAvatar({ imageUrl }: ProfileSettingAvatarProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => hiddenInputRef.current?.click();
  const { imagePreview, handleFileChange } = useImagePreview(imageUrl);

  return (
    <div className="flex justify-center ">
      <article className="relative">
        <Avatar className="w-[100px] h-[100px] relative">
          <AvatarImage src={imagePreview} alt="프로필 이미지" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 flex justify-center items-center w-[26px] h-[26px] bg-white z-10 rounded-full border border-[#E5E6E8]"
        >
          <PenIcon className="w-4 h-4 stroke-black" />
        </button>
        <Input
          type="file"
          accept="image/*"
          id="imageUrl"
          ref={hiddenInputRef}
          onChange={handleFileChange}
          // className="hidden"
        />
      </article>
    </div>
  );
}
