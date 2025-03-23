import api from '@/services/apis/api';
import { PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { useCallback, useEffect, useState } from 'react';

function useImagePreview(initialImageUrl = '') {
  const [imageFile, setImageFile] = useState<File | null>(null); // 새로운 이미지 파일
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl); // 미리보기 URL
  const [presignedUrlObj, setPresignedUrlObj] = useState<PresignUrlResponse | null>(null); // presigned URL
  const [isUploading, setIsUploading] = useState<boolean>(false); // 업로드 상태

  /* 파일 변경 핸들러 */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* presigned URL 요청 */
  const fetchPresignedUrl = useCallback(async (file: File) => {
    try {
      const result = await api.register.getPresignUrl({ originalFile: file.name });
      setPresignedUrlObj(result);
    } catch (error) {
      console.error('presigned URL 가져오기 실패', error);
    }
  }, []);

  /* imageFile 변경될 때 presigned URL 요청 */
  useEffect(() => {
    if (imageFile) fetchPresignedUrl(imageFile);
  }, [imageFile, fetchPresignedUrl]);

  /* presigned URL이 생성되면 자동 업로드 */
  useEffect(() => {
    const uploadImage = async () => {
      if (!imageFile || !presignedUrlObj) return;

      try {
        setIsUploading(true);
        await api.register.uploadImageWithPresignUrl(presignedUrlObj.preSignedUrl, imageFile);
      } catch (error) {
        console.error('S3 이미지 업로드 실패', error);
      } finally {
        setIsUploading(false);
      }
    };

    if (presignedUrlObj) uploadImage();
  }, [presignedUrlObj, imageFile]);

  /* 초기 이미지 URL 변환 (CloudFront 경로 적용) */
  const processedImagePreview = initialImageUrl
    ? getImgFromCloudFront(initialImageUrl)
    : imagePreview;

  /* 이미지 초기화 */
  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setPresignedUrlObj(null);
  };

  return {
    imageFile,
    imagePreview: processedImagePreview,
    handleFileChange,
    handleClearImage,
    isUploading,
    presignedUrlObj,
  };
}

export default useImagePreview;
