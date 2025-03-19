import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Image } from '@/services/apis/types/registerAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

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
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img) => (
              <CarouselItem key={img.imageId}>
                <img src={getImgFromCloudFront(img.storedFile)} alt="장소 이미지" />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* 좌우 버튼 */}
          <CarouselPrevious className="!bg-transparent border-none" />
          <CarouselNext className="!bg-transparent border-none" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
