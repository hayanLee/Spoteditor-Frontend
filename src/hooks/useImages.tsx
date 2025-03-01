import api from '@/services/apis/api';
import { PresignedUrlWithName } from '@/services/apis/types/registerAPI.type';
import { useCallback, useEffect, useState } from 'react';

function useImages(initialImageUrls: string[] = []) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialImageUrls);
  const [presignedUrls, setPresignedUrls] = useState<PresignedUrlWithName[]>([]);

  const filterNewFiles = (files: File[], imageFiles: File[]) => {
    return files.filter(
      (file) =>
        !imageFiles.some(
          (item) => item.name === file.name && item.lastModified === file.lastModified
        )
    );
  };

  const getPresignedUrls = async (files: File[]) => {
    try {
      const presignedUrls = await Promise.all(
        files.map((file) => api.register.getPresignUrl({ originalFile: file.name }))
      );
      return presignedUrls;
    } catch (error) {
      console.log('Presigned URL 가져오기 실패:', error);
      return [];
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const filteredFiles = filterNewFiles(files, imageFiles); // 중복 파일 제거
    const newFiles = filteredFiles.slice(0, 3 - imageFiles.length); // 추가될 파일
    if (newFiles.length === 0) return; // 없으면 종료

    const newPresignedUrls = await getPresignedUrls(newFiles); // Presigned URL 가져오기
    setImageFiles((prev) => [...prev, ...newFiles]);
    setPresignedUrls((prev) => [...prev, ...newPresignedUrls]);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setPresignedUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = useCallback(async () => {
    if (!imageFiles.length || !presignedUrls.length) return;

    const formDataArr = imageFiles.map((imageFile, idx) => {
      const formData = new FormData();
      formData.append(imageFile?.name, imageFile);

      return { ...formData, presignedUrl: presignedUrls[idx].preSignedUrl };
    });

    try {
      await Promise.all(
        formDataArr.map((formData) =>
          api.register.uploadImageWithPresignUrl(formData.presignedUrl, formData)
        )
      );
    } catch (err) {
      console.log('s3 이미지 업로드 실패');
    }
  }, [imageFiles, presignedUrls]);

  useEffect(() => {
    if (imageFiles.length) {
      const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
      uploadImages();
      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url)); // 메모리 해제
      };
    }
  }, [imageFiles, uploadImages]);

  return { imageFiles, imagePreviews, handleFileChange, handleRemoveImage, presignedUrls };
}

export default useImages;
