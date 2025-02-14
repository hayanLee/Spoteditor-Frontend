import { Separator } from '@/components/ui/separator';

interface PostCardLocationProps {
  location: string;
  detail: string;
  className?: string;
}

function PostCardLocation({ location, detail }: PostCardLocationProps) {
  return (
    <h4 className="flex items-center text-primarySlate">
      <span>{location}</span>
      <div className="mx-2">
        <Separator orientation="vertical" className="h-3 bg-primarySlate" />
      </div>
      <span>{detail}</span>
    </h4>
  );
}

export default PostCardLocation;
