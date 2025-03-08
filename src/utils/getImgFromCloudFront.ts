export const getImgFromCloudFront = (storedFile: string) =>
  `${import.meta.env.VITE_CLOUDE_FRONT}/${storedFile}`;
