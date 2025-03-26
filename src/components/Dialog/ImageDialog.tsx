import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Image } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface ImageDialogProps {
  images: Image[];
  triggerImg: string;
  triggerAlt: string;
}
const ImageDialog = ({ images, triggerImg, triggerAlt }: ImageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={triggerImg} alt={triggerAlt} className="h-[425px] aspect-[1/1.3] object-cover" />
      </DialogTrigger>
      <DialogContent className="bg-transparent" hideCloseButton>
        <DialogHeader className="hidden">
          <DialogTitle>장소 이미지</DialogTitle>
          <DialogDescription>장소 이미지를 확대해 볼 수 있습니다.</DialogDescription>
        </DialogHeader>
        {/* <Carousel className="w-full"> */}
        <Carousel>
          <CarouselContent className="items-center">
            {images.map((img) => (
              <CarouselItem key={img.imageId} className="scale-50 web:scale-100">
                <img src={getImgFromCloudFront(img.storedFile)} alt="장소 이미지" />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* 좌우 버튼 */}
          <CarouselPrevious className="!bg-transparent border-none absolute left-[15%] web:left-[-60%] p-5" />
          <CarouselNext className="!bg-transparent border-none absolute right-[15%] web:right-[-60%] p-5" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
