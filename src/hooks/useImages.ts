import api from '@/services/apis/api';
import { PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { useState } from 'react';

function useImages(initialImageUrls: string[] = []) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialImageUrls.map(getImgFromCloudFront)
  );
  const [presignedUrlObjs, setPresignedUrlObjs] = useState<PresignUrlResponse[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const filteredFiles = filterNewFiles(files, imageFiles); // 중복 파일 제거
    const newFiles = filteredFiles.slice(0, 3 - imageFiles.length); // 추가될 파일
    if (newFiles.length === 0) return; // 없으면 종료

    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newFiles.map((file) => URL.createObjectURL(file))]);

    try {
      setIsUploading(true);
      const presignedUrls = await getPresignedUrls(newFiles);

      await Promise.all(
        newFiles.map((img, idx) =>
          api.register.uploadImageWithPresignUrl(presignedUrls[idx].preSignedUrl, img)
        )
      );
      setPresignedUrlObjs((prev) => [...prev, ...presignedUrls]);
    } catch (error) {
      console.error('S3 이미지 업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setPresignedUrlObjs((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    imagePreviews,
    handleFileChange,
    handleRemoveImage,
    isUploading,
    presignedUrlObjs,
  };
}

const filterNewFiles = (files: File[], imageFiles: File[]) => {
  return files.filter(
    (file) =>
      !imageFiles.some((item) => item.name === file.name && item.lastModified === file.lastModified)
  );
};

const getPresignedUrls = async (files: File[]) => {
  try {
    return await Promise.all(
      files.map((file) => api.register.getPresignUrl({ originalFile: file.name }))
    );
  } catch (error) {
    console.error('Presigned URL 가져오기 실패:', error);
    return [];
  }
};

export default useImages;
