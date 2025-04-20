import api from '@/services/apis/api';
import { PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { compressImageToWebp } from '@/utils/compressImage';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { getPresignedUrl } from '@/utils/getPresignedUrls';
import { useEffect, useMemo, useState } from 'react';

/* 
  이미지 1장 변경 
*/

function useImageUpload(initialImageUrl = '') {
  const [imageFile, setImageFile] = useState<File | null>(null); // 새로운 이미지 파일
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl); // 미리보기 URL
  const [presignedUrlObj, setPresignedUrlObj] = useState<PresignUrlResponse | null>(null); // presigned URL
  const [isUploading, setIsUploading] = useState<boolean>(false); // 업로드 상태

  /* 파일 변경 핸들러 */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      // const start = performance.now();
      // console.log('file', file);
      const compressed = await compressImageToWebp(file); // 이미지 최적화
      // console.log('compressed', compressed);
      const previewUrl = URL.createObjectURL(compressed);
      setImagePreview(previewUrl);
      setImageFile(compressed);
      // const end = performance.now();
      // console.log(`기존 코드 실행 시간: ${end - start}ms`);
    } catch (error) {
      console.error('이미지 압축 실패', error);
    }
  };

  /* imageFile 변경될 때 presigned URL 요청 */
  useEffect(() => {
    const fetchPresignedUrl = async () => {
      if (imageFile) {
        const result = await getPresignedUrl(imageFile);
        setPresignedUrlObj(result);
      }
    };
    fetchPresignedUrl();
  }, [imageFile]);

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

  /* URL.createObjectURL 해제 */
  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  /* 초기 이미지 URL 변환 (CloudFront 경로 적용) */
  const processedImagePreview = useMemo(() => {
    return initialImageUrl ? getImgFromCloudFront(initialImageUrl) : imagePreview;
  }, [initialImageUrl, imagePreview]);

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

export default useImageUpload;
