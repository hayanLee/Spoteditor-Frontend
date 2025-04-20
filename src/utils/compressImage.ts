import imageCompression from 'browser-image-compression';

type CompressionOptions = {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  onProgress?: (progress: number) => void;
  useWebWorker?: boolean;
  libURL?: string;
  preserveExif?: boolean;
  signal?: AbortSignal;
  maxIteration?: number;
  exifOrientation?: number;
  fileType?: string;
  initialQuality?: number;
  alwaysKeepResolution?: boolean;
};

export async function compressImageToWebp(file: File, options?: CompressionOptions): Promise<File> {
  const defaultOptions: CompressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: 'image/webp',
    onProgress: (p) => console.log(`압축률: ${p}%`),
    ...options,
  };

  try {
    const compressedFile = await imageCompression(file, defaultOptions);
    return compressedFile;
  } catch (error) {
    console.error('이미지 압축 실패:', error);
    throw error;
  }
}
