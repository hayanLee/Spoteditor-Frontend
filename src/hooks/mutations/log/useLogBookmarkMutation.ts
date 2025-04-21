import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { UserBookmarkLogs } from '@/services/apis/types/userLogAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

interface UseLogBookmarkMutationProps {
  isBookMark: boolean;
  placeLogId: number;
}

const useLogBookmarkMutation = ({ isBookMark, placeLogId }: UseLogBookmarkMutationProps) => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get('pageNumber');

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      isBookMark ? api.log.deleteLogBookMark(placeLogId) : api.log.addLogBookMark(placeLogId),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: userLogsKeys.bookmarkLogList({
          page: Number(pageNumber),
          size: 12,
          direction: 'ASC',
        }),
      });

      const previousLogBookMark = queryClient.getQueryData<{ isBookmarked: boolean }>([
        ...logKeys.logBookMark(placeLogId),
      ]);
      const previousProfileLogBookBark = queryClient.getQueryData(
        userLogsKeys.bookmarkLogList({ page: Number(pageNumber), size: 12, direction: 'ASC' })
      );

      queryClient.setQueryData(
        [...logKeys.logBookMark(placeLogId)],
        (old: { isBookmarked: boolean }) => ({
          isBookmarked: !(old?.isBookmarked ?? false),
        })
      );

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

      return { previousLogBookMark, previousProfileLogBookBark };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousLogBookMark) {
        queryClient.setQueryData([...logKeys.logBookMark(placeLogId)], context.previousLogBookMark);
      }
      queryClient.setQueryData(
        userLogsKeys.bookmarkLogList({ page: Number(pageNumber), size: 12, direction: 'ASC' }),
        context?.previousProfileLogBookBark
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...logKeys.logBookMark(placeLogId)] });
      queryClient.refetchQueries({ queryKey: [...logKeys.logBookMark(placeLogId)] });

      queryClient.invalidateQueries({
        queryKey: userLogsKeys.bookmarkLogList({
          page: Number(pageNumber),
          size: 12,
          direction: 'ASC',
        }),
      });
    },
  });
};

export default useLogBookmarkMutation;
