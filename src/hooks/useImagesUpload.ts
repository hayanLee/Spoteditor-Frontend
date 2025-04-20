import api from '@/services/apis/api';
import { Image, PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { compressImageToWebp } from '@/utils/compressImage';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { getPresignedUrls } from '@/utils/getPresignedUrls';
import { useCallback, useReducer, useState } from 'react';

/* 
  이미지 여러장 변경 
*/

interface ImagePreview {
  previewUrl: string; // 이미지 미리보기 URL
  isNew: boolean; // 새 이미지인지 여부
}
const initialState: ImageState = {
  imageFiles: [],
  initialImages: [],
  imagePreviews: [],
  presignedUrlObjs: [],
  removedImages: [],
};

interface ImageState {
  imageFiles: File[]; // 새로운 이미지 파일
  initialImages: Image[]; // 기존 이미지들
  imagePreviews: ImagePreview[]; // 이미지 미리보기 url
  presignedUrlObjs: PresignUrlResponse[]; // presigendurl로 등록한 새로운 이미지들
  removedImages: number[]; // 삭제된 이미지 id
}
type ImageAction =
  | {
      type: 'ADD_IMAGES';
      payload: { files: File[]; urls: string[]; presignedUrls: PresignUrlResponse[] }; // 파일, 미리보기, presignedURL
    }
  | { type: 'REMOVE_IMAGE'; payload: { index: number; isNew: boolean } }
  | { type: 'RESET' };

const imageReducer = (state: ImageState, action: ImageAction): ImageState => {
  switch (action.type) {
    case 'ADD_IMAGES': {
      return {
        ...state,
        imageFiles: [...state.imageFiles, ...action.payload.files],
        imagePreviews: [
          ...state.imagePreviews,
          ...action.payload.urls.map((previewUrl) => ({
            previewUrl,
            isNew: true, // 새로운 이미지
          })),
        ],
        presignedUrlObjs: [...state.presignedUrlObjs, ...action.payload.presignedUrls],
      };
    }
    case 'REMOVE_IMAGE': {
      const { index, isNew } = action.payload;
      if (isNew) {
        // 신규 이미지 삭제
        const targetUrl = state.imagePreviews[index]?.previewUrl;
        if (targetUrl.startsWith('blob:')) URL.revokeObjectURL(targetUrl);
        return {
          ...state,
          imageFiles: state.imageFiles.filter((_, i) => i !== index),
          imagePreviews: state.imagePreviews.filter((_, i) => i !== index),
          presignedUrlObjs: state.presignedUrlObjs.filter((_, i) => i !== index),
        };
      } else {
        // 기존 이미지 삭제
        const removedImage = state.initialImages[index].imageId;
        return {
          ...state,
          removedImages: [...state.removedImages, removedImage],
          initialImages: state.initialImages.filter((_, i) => i !== index),
          imagePreviews: state.imagePreviews.filter((_, i) => i !== index),
        };
      }
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

/*
 * 1. 이미지 추가
 *  - 3장 - 기존 이미지를 개수만큼만 추가 가능
 * 2. 이미지 삭제
 *  - 기존 이미지 삭제
 *  - 신규 이미지 삭제
 */
function useImagesUpload(initialImages: Image[] = []) {
  const [state, dispatch] = useReducer(imageReducer, {
    imageFiles: [],
    initialImages,
    imagePreviews: initialImages.map((img) => ({
      previewUrl: getImgFromCloudFront(img.storedFile), // 기존 이미지의 미리보기 URL
      isNew: false, // 기존 이미지는 isNew: false
    })),
    presignedUrlObjs: [],
    removedImages: [],
  });
  const [isUploading, setIsUploading] = useState(false);

  /* 파일 변경 핸들러 */
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      const remainingSlots = 3 - state.imagePreviews.length; // 남은 공간
      if (remainingSlots <= 0) {
        alert('최대 3장의 이미지만 업로드할 수 있습니다.');
        return;
      }

      const files = Array.from(event.target.files);
      const filteredFiles = filterNewFiles(files, state.imageFiles); // 중복 파일 제거
      const newFiles = filteredFiles.slice(0, remainingSlots); // 남은 장수만큼 추가
      if (newFiles.length === 0) return; // 없으면 종료

      uploadImages(newFiles);
    },
    [state.imageFiles, state.imagePreviews.length]
  );

  const uploadImages = useCallback(async (newFiles: File[]) => {
    try {
      setIsUploading(true);
      // 1. 이미지 최적화
      const compressedFiles = await Promise.all(
        newFiles.map(async (file) => await compressImageToWebp(file))
      );

      // 2. 미리보기 url 생성
      const newPreviews = compressedFiles.map(
        (file) => URL.createObjectURL(file) // 미리보기 URL
      );

      // 3. presigned url 요청
      const presignedUrls = await getPresignedUrls(compressedFiles);

      // 4. 받은 url로 이미지 업로드
      await Promise.all(
        compressedFiles.map((file, idx) =>
          api.register.uploadImageWithPresignUrl(presignedUrls[idx].preSignedUrl, file)
        )
      );

      // 5. 상태 변경
      dispatch({
        type: 'ADD_IMAGES',
        payload: {
          files: compressedFiles,
          urls: newPreviews,
          presignedUrls,
        },
      });
    } catch (error) {
      console.error('S3 이미지 업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemoveImage = useCallback((index: number, isNew: boolean) => {
    dispatch({ type: 'REMOVE_IMAGE', payload: { index, isNew } });
  }, []);

  return {
    imagePreviews: state.imagePreviews,
    handleFileChange,
    handleRemoveImage,
    isUploading,
    presignedUrlObjs: state.presignedUrlObjs,
    removedImageIds: state.removedImages, // 삭제된 기존 이미지 ID 리스트
  };
}

// 중복된 파일 필터링 함수
const filterNewFiles = (files: File[], imageFiles: File[]) => {
  return files.filter(
    (file) =>
      !imageFiles.some((item) => item.name === file.name && item.lastModified === file.lastModified)
  );
};

export default useImagesUpload;
