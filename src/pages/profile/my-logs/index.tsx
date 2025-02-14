import MainPagination from '@/components/Pagination/MainPagination';
import {
  PostCard,
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/features/profile/PostCard';

function MyLogs() {
  return (
    <>
      <PostCardWrapper className="mb-[50px]">
        {Array.from({ length: 12 }).map((_, idx) => (
          <PostCard key={idx}>
            <PostCardImage lable className="bg-slate-300" />
            <PostCardTitle title="혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페" />
            <PostCardLocation location="서울" detail="위치 세부 정보" />
          </PostCard>
        ))}
      </PostCardWrapper>
      <MainPagination />
    </>
  );
}

export default MyLogs;
