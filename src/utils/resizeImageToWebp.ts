import Resizer from 'react-image-file-resizer';

/**
 * 이미지를 리사이즈하여 지정된 형식으로 반환하는 함수
 * @param file 리사이즈할 이미지 파일
 * @param width 리사이즈할 너비
 * @param height 리사이즈할 높이
 * @param quality 리사이즈 후 품질 (0 ~ 100)
 * @param outputType 리사이즈 후 출력 형식 (base64, blob, file 중 하나)
 * @returns 리사이즈된 이미지의 지정된 형식 (base64 URL, Blob, 또는 File)
 */
export const resizeImageToWebp = (
  file: File,
  width: number | null = null,
  height: number | null = null,
  quality: number = 80,
  outputType: 'base64' | 'blob' | 'file' = 'base64'
): Promise<string | Blob | File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        img.src = reader.result as string;

        img.onload = () => {
          const imgWidth = width ?? img.width; // 미지정 시 원본 이미지의 너비
          const imgHeight = height ?? img.height; // 높이

          Resizer.imageFileResizer(
            file,
            imgWidth,
            imgHeight,
            'WEBP',
            quality,
            0,
            (uri) => {
              if (outputType === 'base64' && typeof uri === 'string') {
                resolve(uri); // base64 URL 반환
              } else if (outputType === 'blob' && uri instanceof Blob) {
                resolve(uri); // Blob 반환
              } else if (outputType === 'file' && uri instanceof File) {
                resolve(uri); // File 반환
              } else {
                reject(new Error('이미지 리사이징 실패'));
              }
            },
            outputType
          );
        };

        img.onerror = () => reject(new Error('이미지 로딩 실패'));
      }
    };

    reader.onerror = (error) => reject(error);

    // 파일을 읽어 이미지로 변환
    reader.readAsDataURL(file);
  });
};
