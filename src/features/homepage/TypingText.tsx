import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import CursorBlinker from './CursorBlinker';

export default function TypingText({ text }: { text: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

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
    <span>
      <motion.span className="font-bold text-sm web:text-xl">{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
}
