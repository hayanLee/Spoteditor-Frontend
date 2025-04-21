import HeadPhoneIcon from '@/components/Icons/HeadPhoneIcon';
import SettingIcon from '@/components/Icons/SettingIcon';
import UserIcon from '@/components/Icons/UserIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/features/profile/LogoutButton';
import useUser from '@/hooks/queries/user/useUser';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import MyProfileButton from './MyProfileButton';

function UserProfileButton() {
  const { data: user } = useUser();

  /* const textRef = useRef<HTMLSpanElement>(null);
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
  }, []); */

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button>
          <UserIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[264px]">
        <DropdownMenuItem className="font-bold text-text-lg flex justify-start gap-[5px] px-4 items-center">
          {/* 체크 아이콘 추가 시 span에 ref={textRef} 추가 */}
          <span className="truncate">{user?.name}</span>
          {/* {!isTruncated && <VerifiedLabelIcon />} */}
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-5 focus:bg-white">
          <MyProfileButton />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm font-regular">
            <SettingIcon />
            설정
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm"
          >
            <a href="https://tally.so/r/nrYJEo" target="_blank" rel="noopener noreferrer">
              <HeadPhoneIcon />
              문의하기
            </a>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem
            asChild
            className="flex items-center justify-start text-text-sm font-regular"
          >
            <LogoutButton />
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-start px-4 py-[10px] gap-[15px] text-[#81858F]">
          <Link to="/notice" className="flex">
            <DropdownMenuItem>
              <button className="text-text-xs font-regular">공지사항</button>
            </DropdownMenuItem>
          </Link>
          <button className="text-text-xs font-regular">이용약관</button>
          <button className="text-text-xs font-regular">개인정보처리방침</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileButton;
