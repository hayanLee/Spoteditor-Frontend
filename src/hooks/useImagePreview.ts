import api from '@/services/apis/api';
import { PresignedUrlWithName } from '@/services/apis/types/registerAPI.type';
import { useCallback, useEffect, useState } from 'react';

function useImagePreview(initialImageUrl: string = '') {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl);
  const [presignedUrlObj, setPresignedUrlObj] = useState<PresignedUrlWithName | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setImageFile(file);
        const result = await api.register.getPresignUrl({ originalFile: file.name });
        setPresignedUrlObj(result);
      } catch (error) {
        console.log('presigned URL 가져오기 실패', error);
      }
    } else {
      //이미지가 이미 있을 때 이미지를 새로 선택 안 할 경우 취소
      setImageFile(null); // 메모리 해제
      setImagePreview(initialImageUrl);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview(initialImageUrl);
    setPresignedUrlObj(null);
  };

  const uploadImage = useCallback(async () => {
    if (!imageFile || !presignedUrlObj) return;

    try {
      await api.register.uploadImageWithPresignUrl(presignedUrlObj?.preSignedUrl, imageFile);
    } catch (error) {
      console.log(error, 's3 이미지 업로드 실패');
    }
  }, [imageFile, presignedUrlObj]);

  //이미지 미리보기
  useEffect(() => {
    if (imageFile && presignedUrlObj) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      uploadImage();
      // 언마운트, imageFile 변경될때 실행
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile, presignedUrlObj, uploadImage]);

  return { imageFile, imagePreview, handleFileChange, handleClearImage, presignedUrlObj };
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
