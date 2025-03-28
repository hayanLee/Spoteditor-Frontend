import useResponsive from '@/hooks/useResponsive';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import CursorBlinker from './CursorBlinker';

export default function TypingText({ text }: { text: string }) {
  const { isMobile } = useResponsive();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const firstLineLength = 7; // 첫 줄 8글자
  const displayText = useTransform(rounded, (latest) => {
    if (!isMobile) return text.slice(0, latest);

    const firstLine = text.slice(0, Math.min(latest, firstLineLength)); // 첫 줄
    const secondLine = latest > firstLineLength ? text.slice(firstLineLength, latest) : '';

    return `${firstLine}${secondLine ? '\n' + secondLine : ''}`;
  });

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: 'tween',
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    });
    return controls.stop;
  }, []);

  return (
    <span className="min-h-[60px] web:min-h-fit">
      <motion.span className="whitespace-pre-wrap leading-[135%] font-bold text-md web:text-xl">
        {displayText}
      </motion.span>

      <CursorBlinker />
    </span>
  );
}
