import HeadPhoneIcon from '@/components/Icons/HeadPhoneIcon';
import SettingIcon from '@/components/Icons/SettingIcon';
import UserIcon from '@/components/Icons/UserIcon';
import VerifiedLabelIcon from '@/components/Icons/VerifiedLabelIcon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/features/profile/LogoutButton';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function UserProfileButton() {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncate = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    // ResizeObserver를 사용하여 크기 변화를 감지
    const observer = new ResizeObserver(checkTruncate);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button>
          <UserIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[230px]">
        <DropdownMenuItem className="font-bold text-16 flex justify-start gap-[5px] px-4 items-center">
          <span ref={textRef} className="truncate">
            Teamspoteditor
          </span>
          {!isTruncated && <VerifiedLabelIcon />}
        </DropdownMenuItem>
        <Link to="/profile/12/my-logs">
          <DropdownMenuItem className="px-4 py-5 focus:bg-white">
            <Button className="w-full h-full rounded-[60px] bg-[#F7F7F7] text-14 font-medium hover:bg-[#F7F7F7]">
              프로필 보기
            </Button>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/profile-setting">
          <DropdownMenuItem className="flex items-center justify-start gap-2 text-14">
            <SettingIcon />
            설정
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-start gap-2 text-14">
          <HeadPhoneIcon />
          고객센터
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="flex items-center justify-start gap-2 text-14">
          <LogoutButton />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-start px-4 py-[10px] gap-[15px] text-[#81858F]">
          <button className="text-12">이용약관</button>
          <button className="text-12">개인 정보 처리방침</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileButton;
