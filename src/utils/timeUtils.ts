import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 지원

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow(); // 예: "3일 전", "2분 전", "방금 전"
};
