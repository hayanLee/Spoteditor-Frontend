import api from '@/services/apis/api';
import { PresignUrlResponse } from '@/services/apis/types/registerAPI.type';

/** 여러 요청 */
export const getPresignedUrls = async (files: File[]): Promise<PresignUrlResponse[]> => {
  try {
    const responses = await Promise.all(
      files.map((file) => api.register.getPresignUrl({ originalFile: file.name }))
    );
    return responses;
  } catch (error) {
    console.error('Presigned URL 가져오기 실패:', error);
    throw error;
  }
};

/** getPresignedUrls를 사용해서 단일 요청 */
export const getPresignedUrl = async (file: File): Promise<PresignUrlResponse> => {
  const [result] = await getPresignedUrls([file]);
  return result;
};
