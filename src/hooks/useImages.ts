import api from '@/services/apis/api';
import { Image, PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { useCallback, useReducer, useState } from 'react';

interface ImagePreview {
  previewUrl: string; // 이미지 미리보기 URL
  isNew: boolean; // 새 이미지인지 여부
}
interface ImageState {
  imageFiles: File[]; // 새로운 이미지 파일
  initialImages: Image[]; // 기존 이미지들
  imagePreviews: ImagePreview[]; // 이미지 미리보기 url
  presignedUrlObjs: PresignUrlResponse[]; // presigendurl로 등록한 새로운 이미지들
  removedImages: number[]; // 삭제된 이미지 id
}

const initialState: ImageState = {
  imageFiles: [],
  initialImages: [],
  imagePreviews: [],
  presignedUrlObjs: [],
  removedImages: [],
};

/*
 * 1. 이미지 추가
 *  - 3장 - 기존 이미지를 개수만큼만 추가 가능
 * 2. 이미지 삭제
 *  - 기존 이미지 삭제
 *  - 신규 이미지 삭제
 */
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
          ...action.payload.urls.map((url) => ({
            previewUrl: url, // URL을 previewUrl로 설정
            isNew: true, // 새로운 이미지는 isNew: true로 설정
          })),
        ],
        presignedUrlObjs: [...state.presignedUrlObjs, ...action.payload.presignedUrls],
      };
    }
    case 'REMOVE_IMAGE': {
      const { index, isNew } = action.payload;
      console.log(index, isNew);
      if (isNew) {
        // 신규 이미지 삭제
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

/* hook */
function useImages(initialImages: Image[] = []) {
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

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      const files = Array.from(event.target.files);

      /* 현재 업로드된 이미지 개수 확인 */
      const remainingSlots = 3 - state.imagePreviews.length; // 남은 공간

      if (remainingSlots <= 0) {
        alert('최대 3장의 이미지만 업로드할 수 있습니다.');
        return;
      }

      const filteredFiles = filterNewFiles(files, state.imageFiles); // 중복 파일 제거
      const newFiles = filteredFiles.slice(0, remainingSlots); // 남은 장수만큼 추가
      if (newFiles.length === 0) return; // 없으면 종료

      const newPreviews = newFiles.map((file) => ({
        previewUrl: URL.createObjectURL(file), // 미리보기 URL
        isNew: true, // 새로운 이미지
      }));

      try {
        setIsUploading(true);
        const presignedUrls = await getPresignedUrls(newFiles); // presigned url 요청하고

        await Promise.all(
          // url로 이미지 등록하기
          newFiles.map((img, idx) =>
            api.register.uploadImageWithPresignUrl(presignedUrls[idx].preSignedUrl, img)
          )
        );

        /* 이미지 추가 */
        dispatch({
          type: 'ADD_IMAGES',
          payload: {
            files: newFiles,
            urls: newPreviews.map((preview) => preview.previewUrl),
            presignedUrls,
          },
        });
      } catch (error) {
        console.error('S3 이미지 업로드 실패:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [state.imageFiles, state.imagePreviews]
  );

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

// Presigned URL 요청 함수
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
