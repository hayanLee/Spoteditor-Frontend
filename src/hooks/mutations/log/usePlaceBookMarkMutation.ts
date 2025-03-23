import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import api from '@/services/apis/api';
import { PlaceBookMark, PlaceBookMarkCeck } from '@/services/apis/types/placeAPI.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface usePlaceBookMarkMutationProps {
  isBookMark: boolean;
  placeId: number;
  placeLogId?: number;
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
      const previousPlaceLogBookMark = placeLogId
        ? queryClient.getQueryData([...logKeys.bookMark(Number(placeLogId))])
        : undefined;
      if (placeLogId) {
        queryClient.setQueryData(
          [...logKeys.bookMark(Number(placeLogId))],
          (old: PlaceBookMark[]) => {
            return old.map((item) =>
              item.placeId === placeId ? { ...item, isBookmarked: !isBookMark } : item
            );
          }
        );
      }

      const previousPlaceBookMark = !placeLogId
        ? queryClient.getQueryData([...logKeys.placeBookMarkCheck(placeId)])
        : undefined;
      if (!placeLogId) {
        queryClient.setQueryData(
          [...logKeys.placeBookMarkCheck(placeId)],
          (old: PlaceBookMarkCeck) => {
            const isBookMark = !old.isBookmarked;
            return {
              isBookMark,
            };
          }
        );
      }

      return { previousPlaceLogBookMark, previousPlaceBookMark };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPlaceLogBookMark) {
        queryClient.setQueryData(
          [...logKeys.bookMark(Number(placeLogId))],
          context.previousPlaceLogBookMark
        );
      }
      if (context?.previousPlaceBookMark) {
        queryClient.setQueryData(
          [...logKeys.placeBookMarkCheck(placeId)],
          context.previousPlaceBookMark
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...logKeys.bookMark(Number(placeLogId))] });
      queryClient.invalidateQueries({ queryKey: [...logKeys.placeBookMarkCheck(placeId)] });
    },
  });
};

export default usePlaceBookMarkMutation;
