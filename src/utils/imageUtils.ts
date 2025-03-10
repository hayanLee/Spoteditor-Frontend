import api from '@/services/apis/api';

export const filterNewFiles = (files: File[], imageFiles: File[]) => {
  return files.filter(
    (file) =>
      !imageFiles.some((item) => item.name === file.name && item.lastModified === file.lastModified)
  );
};

export const getPresignedUrls = async (files: File[]) => {
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
