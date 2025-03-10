import { Separator } from '@/components/ui/separator';

interface PostCardLocationProps {
  sido: string;
  bname: string;
  sigungu: string;
}

function PostCardLocation({ sido, bname, sigungu }: PostCardLocationProps) {
  return (
    <h4 className="flex items-center text-text-sm text-primarySlate web:text-text-md">
      <span>{sido}</span>
      <div className="mx-2">
        <Separator orientation="vertical" className="h-3 bg-primarySlate" />
      </div>
      <span>{`${bname} ${sigungu}`}</span>
    </h4>
  );
}

export default PostCardLocation;
