import coverImg from '@/assets/detailPage/coverImg.png';
import mockImg from '@/assets/mock/1.png';
import { BookMarkIcon, SpotIcon, SubtractIcon, TableIcon } from '@/components/Icons';
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

const DetailPage = () => {
  return (
    <div>
      {/* 배너 */}
      <div className="relative h-[488px]">
        <img src={coverImg} alt="coverImage" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-cover-gradient"></div>
        <div className="flex flex-col absolute bottom-0 px-4 py-6 web:gap-2">
          <h3 className="text-lg web:text-2xl font-bold text-white">
            혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
          </h3>
          <div className="flex items-center gap-1 text-text-xs web:text-text-sm ">
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full">혼자</span>
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full">여유롭게 힐링</span>
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full gap-1 flex items-center">
              <SpotIcon className="stroke-white" />
              <span>3</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 py-2.5 gap-[15px] web:px-[50px] web:py-5">
        <div className="web:grid web:grid-cols-[1fr_3fr] web:gap-5">
          {/* 프로필  */}
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="user Avatar" />
            </Avatar>

            <p className="text-text-sm font-semibold">Teamspoteditor</p>
            <SubtractIcon />

            <Button variant={'ghost'} fullRounded>
              팔로잉
            </Button>
          </div>

          {/* 설명 */}
          <p className="text-primary-400 text-text-sm web:grow web:text-text-lg web:py-1.5">
            그저 그날의 날씨, 공간의 분위기, 흘러나오는 음악 소리, 그리고 함께 있는 사람, 그 모든
            것들이 조화롭게 어우러지는 순간. 그럴 때 커피 한 잔이 우리의 감정을 담는 그릇이
            되어특별한 의미를 갖는 것 같아요. 풍류는 옛 선비들이 인격 수양을 위해 자연을 가까이 두고
            멋스럽게 운치를 즐기던 행위를 뜻합니다. 어느 학자는 이런 의미를 두고 멋스럽게
          </p>
        </div>

        {/* 컨텐츠 */}
        <PlaceItem />
        <PlaceItem />
        <PlaceItem />
      </div>

      <div className="fixed bottom-12 right-5 flex flex-col gap-[15px]">
        <button className="w-[60px] h-[60px] border border-gray-200 flex items-center justify-center rounded-full bg-white">
          <BookMarkIcon className="w-5 h-7" strokeWidth={2.5} />
        </button>

        {/* 나중에 분리 */}
        <Dialog>
          <DialogTrigger>
            <button className="w-[60px] h-[60px] border border-gray-200 flex items-center justify-center rounded-full bg-white">
              <TableIcon className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="items-start">
              <DialogTitle className="text-text-2xl">소개된 장소</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-x-[5px] gap-y-5 w-full max-h-[680px] overflow-y-auto scrollbar-hide py-[18px]">
              {[...Array(10)].map((_, idx) => (
                <LogCard
                  key={idx}
                  image={mockImg}
                  location1="서울"
                  location2="종로구"
                  title="친구랑 서촌 하루"
                  vertical
                  isModal
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DetailPage;
