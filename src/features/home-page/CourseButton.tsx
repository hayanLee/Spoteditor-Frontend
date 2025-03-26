import { Button } from '@/components/ui/button';

const CourseButton = ({ category }: { category: string }) => {
  return (
    <Button
      variant={'transparent'}
      size={'m'}
      fullRounded
      className="text-white border border-primary-800"
    >
      {category}
    </Button>
  );
};

export default CourseButton;
