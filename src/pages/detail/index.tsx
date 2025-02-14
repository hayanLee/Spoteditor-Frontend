import coverImg from '@/assets/detailPage/coverImg.png';
import SubstractIcon from '@/components/Icons/SubstractIcon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import PlaceItem from '@/features/detailpage/PlaceItem';
const DetailPage = () => {
  return (
    <div>
      {/* 배너 */}
      <div className="relative h-[488px]">
        <img src={coverImg} alt="coverImage" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-cover-gradient"></div>
        <div className="flex flex-col absolute bottom-0 px-4 py-6">
          <h3 className="text-lg web:text-2xl font-bold text-white">
            혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
          </h3>
          <div className="flex gap-1">
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full text-text-xs">
              혼자
            </span>
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full text-text-xs">
              여유롭게 힐링
            </span>
            <span className="text-white bg-white/30 px-4 py-1.5 rounded-full text-text-xs">3</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 py-2.5 gap-[15px] web:px-[50px]">
        <div className="web:grid web:grid-cols-[1fr_3fr] web:gap-5">
          {/* 프로필  */}
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="user Avatar" />
            </Avatar>

            <p className="text-text-sm font-semibold">Teamspoteditor</p>
            <SubstractIcon fill="black" />

            <Button className="rounded-full py-1 px-4 bg-gray-50 text-black">팔로잉</Button>
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
    </div>
  );
};

export default DetailPage;
