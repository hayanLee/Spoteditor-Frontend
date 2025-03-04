import LeftArrowIcon from '@/components/Icons/LeftArrowIcon';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

interface NoticeDetailHeaderProps {
  title: string;
  time: string;
}

function NoticeDetailHeader({ title, time }: NoticeDetailHeaderProps) {
  const nav = useNavigate();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <>
      <header className="sticky top-0 flex items-start w-full pt-3 bg-white">
        <div>
          <button onClick={() => nav(-1)} className="pl-4 py-3.5">
            <LeftArrowIcon />
          </button>
        </div>
        {isScrolled && (
          <motion.div
            layoutId="noticeDetailHeader"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex flex-col items-start justify-center w-full gap-1 px-4 pt-2"
          >
            <h2 className="font-bold text-text-2xl">{title}</h2>
            <time className="text-text-xs text-primary-400">{time}</time>
          </motion.div>
        )}
      </header>
      {!isScrolled && (
        <motion.div
          layoutId="noticeDetailHeader"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="w-full pt-[15px] px-4 flex flex-col justify-center items-start gap-1"
        >
          <h2 className="font-bold text-text-2xl">{title}</h2>
          <time className="text-text-xs text-primary-400">{time}</time>
        </motion.div>
      )}
    </>
  );
}

export default NoticeDetailHeader;
