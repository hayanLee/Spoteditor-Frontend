import coverImg from '@/assets/detailPage/coverImg.png';
import { SpotIcon, SubtractIcon } from '@/components/Icons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PlaceItem from '@/features/detailpage/PlaceItem';
import LogCard from '@/features/homepage/LogCard';
import useLog from '@/hooks/queries/log/useLog';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { Bookmark, TableIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { placeLogId } = useParams();
  const { data, isLoading } = useLog(Number(placeLogId));

  if (isLoading || !data) return <p>Loading...</p>;
  const { name, description, places } = data;
  return (
    <div>
      {/* 커버 이미지 */}
      <div className="relative w-full aspect-[3/4] web:aspect-[4/1]">
        <img src={coverImg} alt="coverImage" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-cover-gradient"></div>
        <div className="flex flex-col absolute bottom-0 px-4 py-6 gap-2 web:px-[50px] web:py-8">
          <h3 className="text-lg web:text-2xl font-bold text-white">{name}</h3>
          <div className="flex items-center gap-1 text-text-xs web:text-text-sm ">
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full">혼자</span>
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full">여유롭게 힐링</span>
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full gap-1 flex items-center">
              <SpotIcon className="stroke-white" />
              <span>{places.length}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 py-2.5 gap-[15px] web:px-[50px] web:py-5">
        <div className="web:grid web:grid-cols-[1fr_3fr] gap-5">
          {/* 프로필  */}
          <div className="flex items-center gap-2 py-[15px]">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="user Avatar" />
            </Avatar>
            <p className="text-text-sm font-semibold">Teamspoteditor</p>
            <SubtractIcon />
            <Button variant={'ghost'} fullRounded size={'s'}>
              팔로잉
            </Button>
          </div>

          {/* 설명 */}
          <p className="text-primary-400 text-text-sm web:grow web:text-text-lg web:py-1.5">
            {description}
          </p>
        </div>

        {/* 컨텐츠 */}
        {places.map((place: PlaceInLog, idx: number) => (
          <PlaceItem place={place} key={place.placeId} idx={idx + 1} />
        ))}
      </div>

      <div className="fixed bottom-12 right-5 flex flex-col gap-[15px]">
        <button className="w-[60px] h-[60px] border border-gray-200 flex items-center justify-center rounded-full bg-white">
          <Bookmark className="w-[2em] h-[2em]" />
        </button>
        <Dialog>
          <DialogTrigger>
            <button className="w-[60px] h-[60px] border border-gray-200 flex items-center justify-center rounded-full bg-white">
              <TableIcon className="w-[2em] h-[2em]" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="items-start">
              <DialogTitle className="text-text-2xl">소개된 장소</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-x-[5px] gap-y-5 w-full max-h-[680px] overflow-y-auto scrollbar-hide py-[18px]">
              {places.map((place: PlaceInLog) => (
                <LogCard key={place.placeId} place={place} vertical isModal />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DetailPage;
