import LeftArrowIcon from '@/components/Icons/LeftArrowIcon';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';

interface NoticeDetailHeaderProps {
  title: string;
  time: string;
}

function NoticeDetailHeader({ title, time }: NoticeDetailHeaderProps) {
  const nav = useNavigate();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setShow(latest >= 64);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <>
      <header className="sticky top-0 flex items-center gap-2.5 w-full pt-3 bg-white border-b min-h-[54px]">
        <div>
          <button onClick={() => nav(-1)} className="py-2 pl-4">
            <LeftArrowIcon />
          </button>
        </div>
        <AnimatePresence mode="popLayout">
          {show && (
            <motion.div
              className="mask-slide"
              initial={{ opacity: 0, maskPosition: '100% 0%' }}
              animate={{ opacity: 1, maskPosition: '0% 0%' }}
              exit={{ opacity: 0, maskPosition: '100% 0%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <h2 className="font-bold text-md">{title}</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="w-full pt-[15px] px-4 flex flex-col justify-center items-start gap-1">
        <h2 className="font-bold text-md">{title}</h2>
        <time className="text-text-xs text-primary-400 font-regular">{time}</time>
      </div>
    </>
  );
}

export default NoticeDetailHeader;
