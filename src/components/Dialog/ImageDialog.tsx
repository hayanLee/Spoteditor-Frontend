import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import useResponsive from '@/hooks/useResponsive';
import { Image } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface ImageDialogProps {
  images: Image[];
  triggerImg: string;
  triggerAlt: string;
}
const ImageDialog = ({ images, triggerImg, triggerAlt }: ImageDialogProps) => {
  const { isWeb } = useResponsive();
  return (
    <Dialog>
      <DialogTrigger>
        <img src={triggerImg} alt={triggerAlt} className="h-[425px] aspect-[1/1.3] object-cover" />
      </DialogTrigger>
      <DialogContent
        className="bg-transparent p-0 h-fit max-w-[90vw] max-h-[50vh] flex justify-center items-center"
        hideCloseButton
      >
        <DialogHeader className="hidden">
          <DialogTitle>장소 이미지</DialogTitle>
          <DialogDescription>장소 이미지를 확대해 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        <Carousel className="max-w-full max-h-full">
          <CarouselContent className="items-center ">
            {images.map((img) => (
              <CarouselItem key={img.imageId} className="scale-95 web:scale-100">
                <img src={getImgFromCloudFront(img.storedFile)} alt="장소 이미지" />
              </CarouselItem>
            ))}
          </CarouselContent>

          {isWeb && images.length > 1 && (
            <>
              <CarouselPrevious className="!bg-transparent border-none absolute left-[15%] web:left-[-60%] p-5" />
              <CarouselNext className="!bg-transparent border-none absolute right-[15%] web:right-[-60%] p-5" />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
