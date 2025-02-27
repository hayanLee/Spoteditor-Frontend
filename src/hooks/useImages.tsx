import { useEffect, useState } from 'react';

function useImages(initialImageUrls: string[] = []) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialImageUrls);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    // 중복 파일 제거
    const filteredFiles = files.filter(
      (file) =>
        !imageFiles.some(
          (item) => item.name === file.name && item.lastModified === file.lastModified
        )
    );

    if (filteredFiles.length === 0) alert('3장 초과');

    const newFiles = filteredFiles.slice(0, 3 - imageFiles.length); // 기존 이미지 개수 고려해서 최대 3개 제한

    setImageFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (imageFiles.length) {
      const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);

      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url)); // 메모리 해제
      };
    }
  }, [imageFiles]);

  return { imageFiles, imagePreviews, handleFileChange, handleRemoveImage };
}

export default useImages;
