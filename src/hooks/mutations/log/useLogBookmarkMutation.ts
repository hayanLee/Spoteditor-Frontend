import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { UserBookmarkLogs } from '@/services/apis/types/userLogAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMatch, useSearchParams } from 'react-router-dom';

interface UseLogBookmarkMutationProps {
  isBookMark: boolean;
  placeLogId: number;
}

const useLogBookmarkMutation = ({ isBookMark, placeLogId }: UseLogBookmarkMutationProps) => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get('pageNumber');

  const profileMatch = useMatch('/profile/:userId/saved-logs');

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      isBookMark ? api.log.deleteLogBookMark(placeLogId) : api.log.addLogBookMark(placeLogId),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: logKeys.logBookMark(placeLogId),
      });
      if (profileMatch) {
        await queryClient.cancelQueries({
          queryKey: userLogsKeys.bookmarkLogList({
            page: Number(pageNumber),
            size: 12,
            direction: 'ASC',
          }),
        });
      }

      const previousLogBookMark = queryClient.getQueryData<{ isBookmarked: boolean }>([
        ...logKeys.logBookMark(placeLogId),
      ]);
      const previousProfileLogBookBark = profileMatch
        ? queryClient.getQueryData(
            userLogsKeys.bookmarkLogList({ page: Number(pageNumber), size: 12, direction: 'ASC' })
          )
        : undefined;

      queryClient.setQueryData(
        [...logKeys.logBookMark(placeLogId)],
        (old: { isBookmarked: boolean }) => ({
          isBookmarked: !(old?.isBookmarked ?? false),
        })
      );
      if (profileMatch) {
        queryClient.setQueryData(
          userLogsKeys.bookmarkLogList({ page: Number(pageNumber), size: 12, direction: 'ASC' }),
          (oldData: UserBookmarkLogs) => {
            const targetLog = oldData.content.filter((log) => log.placeLogId !== placeLogId);
            return {
              ...oldData,
              ...targetLog,
            };
          }
        );
      }

      return { previousLogBookMark, previousProfileLogBookBark };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousLogBookMark) {
        queryClient.setQueryData([...logKeys.logBookMark(placeLogId)], context.previousLogBookMark);
      }
      if (profileMatch) {
        queryClient.setQueryData(
          userLogsKeys.bookmarkLogList({ page: Number(pageNumber), size: 12, direction: 'ASC' }),
          context?.previousProfileLogBookBark
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...logKeys.logBookMark(placeLogId)] });
      queryClient.refetchQueries({ queryKey: [...logKeys.logBookMark(placeLogId)] });

      if (profileMatch) {
        queryClient.invalidateQueries({
          queryKey: userLogsKeys.bookmarkLogList({
            page: Number(pageNumber),
            size: 12,
            direction: 'ASC',
          }),
        });
      }
    },
  });
};

export default useLogBookmarkMutation;
