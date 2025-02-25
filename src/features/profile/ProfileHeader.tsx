import VerifiedLabelIcon from '@/components/Icons/VerifiedLabelIcon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FollowButton from './FollowButton';
import { Link } from 'react-router-dom';

function ProfileHeader() {
  return (
    <section className="flex flex-col items-center justify-start w-full pb-[30px] mobile:pb-5">
      <section>
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="user Avatar" />
        </Avatar>
      </section>
      <section className="gap-[6px] flex justify-center items-center my-3">
        <h2 className="font-bold web:text-xl mobile:text-md">Teamspoteditor</h2>
        <VerifiedLabelIcon className="w-[22px] h-[21px] mobile:w-[16.075px] mobile:h-[15.921px]" />
      </section>
      <section className="flex gap-[15px] py-1 text-text-2xl mobile:text-text-lg">
        <FollowButton label="팔로워" count={321} />
        <div className="flex items-center">
          <Separator orientation="vertical" className="h-3 bg-primarySlate" />
        </div>
        <FollowButton label="팔로잉" count={321} />
      </section>
      <section className="flex my-[7px] flex-col web:gap-[15px] mobile:gap-[10px] items-center text-primarySlate text-text-sm mobile:text-text-xs">
        <h3 className="font-medium text-center ">
          소소한 하루, 특별한 순간들을 기록하는 공간 ☕️ <br /> 일상의 작은 행복부터 여행의 찰나까지
          🏞️
        </h3>
        <h3>@spoteditorofficial</h3>
      </section>
      <Link to="/profile-setting">
        <Button
          variant="outline"
          className="web:mt-[15px] p-2 mobile:mt-[10px] web:w-[60px] web:h-[28px] mobile:w-[50px] mobile:h-[24px] rounded-[60px] font-medium text-text-xs"
        >
          편집
        </Button>
      </Link>
    </section>
  );
}

export default ProfileHeader;
