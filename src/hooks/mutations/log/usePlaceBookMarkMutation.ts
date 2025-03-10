import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import api from '@/services/apis/api';
import { PlaceBookMark } from '@/services/apis/types/placeAPI.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface usePlaceBookMarkMutationProps {
  isBookMark: boolean;
  placeId: number;
  placeLogId: number;
}

const usePlaceBookMarkMutation = ({
  isBookMark,
  placeId,
  placeLogId,
}: usePlaceBookMarkMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (isBookMark) {
        return api.place.deletePlaceBookMark(placeId);
      } else {
        return api.place.addPlaceBookMark(placeId);
      }
    },
    onMutate: async () => {
      const previousPlaceBookMark = queryClient.getQueryData([...logKeys.bookMark(placeLogId)]);
      queryClient.setQueryData([...logKeys.bookMark(placeLogId)], (old: PlaceBookMark[]) => {
        return old.map((item) =>
          item.placeId === placeId ? { ...item, isBookmarked: !isBookMark } : item
        );
      });
      return { previousPlaceBookMark };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPlaceBookMark) {
        queryClient.setQueryData([...logKeys.bookMark(placeLogId)], context.previousPlaceBookMark);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...logKeys.bookMark(placeLogId)] });
    },
  });
};

export default usePlaceBookMarkMutation;
