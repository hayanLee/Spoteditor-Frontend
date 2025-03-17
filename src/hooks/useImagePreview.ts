import api from '@/services/apis/api';
import { PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { useCallback, useEffect, useState } from 'react';

function useImagePreview(initialImageUrl = '') {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl);
  const [presignedUrlObj, setPresignedUrlObj] = useState<PresignUrlResponse | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    try {
      const result = await api.register.getPresignUrl({ originalFile: file.name });
      setPresignedUrlObj(result);
    } catch (error) {
      console.error('presigned URL 가져오기 실패', error);
    }
  };

  const uploadImage = useCallback(async () => {
    if (!imageFile || !presignedUrlObj) return;

    try {
      setIsUploading(true);
      await api.register.uploadImageWithPresignUrl(presignedUrlObj.preSignedUrl, imageFile);
    } catch (error) {
      console.error(error, 's3 이미지 업로드 실패');
    } finally {
      setIsUploading(false);
    }
  }, [imageFile, presignedUrlObj]);

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setPresignedUrlObj(null);
  };

  //이미지 미리보기
  useEffect(() => {
    if (imageFile && presignedUrlObj) {
      uploadImage();
    }
  }, [imageFile, presignedUrlObj, uploadImage]);

  return {
    imageFile,
    imagePreview: initialImageUrl ? getImgFromCloudFront(imagePreview) : imagePreview,
    handleFileChange,
    handleClearImage,
    isUploading,
    presignedUrlObj,
  };
}

export default useImagePreview;

/* 매개변수

초기 이미지 URL. 기본값은 빈 문자열 ""

반환값

imageFile: 사용자가 업로드한 이미지 파일 객체
예: { name: "profile.png", size: 34567, type: "image/png", ... }

imagePreview: 업로드된 이미지의 미리 보기 URL
예: "blob:http://localhost:3000/..."
초기값은 인자로 받은 initialImageUrl을 반환

handleFileChange: 파일 선택 이벤트 핸들러
<input type="file" /> 요소의 onChange 이벤트에 사용 */
