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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button>
          <UserIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-bold text-text-lg flex justify-start gap-[5px] px-4 items-center">
          <span ref={textRef} className="truncate">
            Teamspoteditor
          </span>
          {!isTruncated && <VerifiedLabelIcon />}
        </DropdownMenuItem>
        <Link to="/profile/12/my-logs">
          <DropdownMenuItem className="px-4 py-5 focus:bg-white">
            <Button className="w-full h-full rounded-[60px] bg-[#F7F7F7] hover:bg-[#F7F7F7]">
              <span className="font-medium text-black text-text-sm">프로필 보기</span>
            </Button>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <div className="m-1">
          <Link to="/profile-setting">
            <DropdownMenuItem className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm">
              <SettingIcon />
              설정
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm">
            <HeadPhoneIcon />
            문의하기
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem asChild className="flex items-center justify-start text-text-sm">
            <LogoutButton />
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-start px-4 py-[10px] gap-[15px] text-[#81858F]">
          <Link to="/notice" className="flex">
            <DropdownMenuItem>
              <button className="text-text-xs">공지사항</button>
            </DropdownMenuItem>
          </Link>
          <button className="text-text-xs">이용약관</button>
          <button className="text-text-xs">개인정보처리방침</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileButton;
