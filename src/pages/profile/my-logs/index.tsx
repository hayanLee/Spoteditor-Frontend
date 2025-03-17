import Loading from '@/components/Loading';
import MotionCard from '@/components/MotionCard';
import CustomPagination from '@/components/CustomPagination';
import {
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/features/profile/PostCard';
import useUser from '@/hooks/queries/user/useUser';
import useOtherUserLogs from '@/hooks/queries/userLog/useOtherUserLogs';
import useUserLogs from '@/hooks/queries/userLog/useUserLogs';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import NotProfileData from '../NotProfileData';

function MyLogs() {
  const { user } = useUser();
  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  const pageNumber = searchParams.get('pageNumber');

  const isMyLogs = user?.userId === Number(userId);

  const { data: myLogsData, isPending: isMyLogsPending } = useUserLogs(
    { page: Number(pageNumber) },
    { enabled: isMyLogs }
  );
  const { data: otherLogsData, isPending: isOtherLogsPending } = useOtherUserLogs(
    Number(userId),
    { page: Number(pageNumber) },
    { enabled: !isMyLogs }
  );

  const data = isMyLogs ? myLogsData : otherLogsData;
  const isPending = isMyLogs ? isMyLogsPending : isOtherLogsPending;

  return (
    <>
      {isPending ? (
        <Loading className="min-h-[350px]" />
      ) : data?.content.length !== 0 ? (
        <>
          <PostCardWrapper className="mb-[50px]">
            {data?.content?.map((log) => (
              <Link to={`/log/${log.placeLogId}`}>
                <MotionCard key={log.placeLogId}>
                  <PostCardImage
                    lable
                    author={log.author}
                    imageUrl={getImgFromCloudFront(log.image.storedFile)}
                  />
                  <PostCardTitle title={log.name} />
                  <PostCardLocation
                    sido={log.address.sido}
                    bname={log.address.bname}
                    sigungu={log.address.sigungu}
                  />
                </MotionCard>
              </Link>
            ))}
          </PostCardWrapper>
          <section className="mt-[50px]">
            <CustomPagination currentPage={data?.pageNumber!} totalPages={data?.totalPages!} />
          </section>
        </>
      ) : (
        <NotProfileData />
      )}
    </>
  );
}

export default MyLogs;
