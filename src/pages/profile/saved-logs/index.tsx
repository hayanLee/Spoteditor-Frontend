import CustomPagination from '@/components/CustomPagination';
import Loading from '@/components/Loading';
import MotionCard from '@/components/MotionCard';
import {
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/features/profile/PostCard';
import useUser from '@/hooks/queries/user/useUser';
import useOtherUserBookmarkLogs from '@/hooks/queries/userLog/useOtherUserBookmarkLogs';
import useUserBookmarkLogs from '@/hooks/queries/userLog/useUserBookmarkLogs';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { Link, useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NotProfileData from '../NotProfileData';

function SavedLogs() {
  const { user } = useUser();
  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  const pageNumber = searchParams.get('pageNumber');

  const isMySaveLogs = user?.userId === Number(userId);

  const { data: mySaveLogsData, isPending: isMySaveLogsPending } = useUserBookmarkLogs(
    { page: Number(pageNumber) },
    { enabled: isMySaveLogs }
  );
  const { data: otherSaveLogsData, isPending: isOtherSaveLogsPending } = useOtherUserBookmarkLogs(
    Number(userId),
    { page: Number(pageNumber) },
    { enabled: !isMySaveLogs }
  );

  const data = isMySaveLogs ? mySaveLogsData : otherSaveLogsData;
  const isPending = isMySaveLogs ? isMySaveLogsPending : isOtherSaveLogsPending;
  return (
    <>
      {isPending ? (
        <Loading className="min-h-[350px]" />
      ) : data?.content.length !== 0 ? (
        <>
          <PostCardWrapper className="mb-[50px]">
            {data?.content.map((log) => (
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
            <CustomPagination
              currentPage={Number(data?.pageNumber)}
              totalPages={Number(data?.totalPages)}
            />
          </section>
        </>
      ) : (
        <NotProfileData />
      )}
    </>
  );
}

export default SavedLogs;
