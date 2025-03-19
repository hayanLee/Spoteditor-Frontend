import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import api from '@/services/apis/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseLogBookmarkMutationProps {
  isBookMark: boolean;
  placeLogId: number;
}

const useLogBookmarkMutation = ({ isBookMark, placeLogId }: UseLogBookmarkMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      isBookMark ? api.log.deleteLogBookMark(placeLogId) : api.log.addLogBookMark(placeLogId),

    onMutate: async () => {
      const previousLogBookMark = queryClient.getQueryData<{ isBookmarked: boolean }>([
        ...logKeys.logBookMark(placeLogId),
      ]);

      queryClient.setQueryData(
        [...logKeys.logBookMark(placeLogId)],
        (old: { isBookmarked: boolean }) => ({
          isBookmarked: !(old?.isBookmarked ?? false),
        })
      );

      return { previousLogBookMark };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousLogBookMark) {
        queryClient.setQueryData([...logKeys.logBookMark(placeLogId)], context.previousLogBookMark);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...logKeys.logBookMark(placeLogId)] });
      queryClient.refetchQueries({ queryKey: [...logKeys.logBookMark(placeLogId)] });
    },
  });
};

export default useLogBookmarkMutation;
