import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { PlaceBookMark, PlaceBookMarkCeck } from '@/services/apis/types/placeAPI.type';
import { UserBookmarkPlaces } from '@/services/apis/types/userLogAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get('pageNumber');

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
      await queryClient.cancelQueries({
        queryKey: userLogsKeys.bookmarkPlaceList({
          page: Number(pageNumber),
          size: 12,
          direction: 'ASC',
        }),
      });

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

      const previousProfilePlaceLogBookMark = queryClient.getQueryData(
        userLogsKeys.bookmarkPlaceList({ page: Number(pageNumber), size: 12, direction: 'ASC' })
      );
      queryClient.setQueryData(
        userLogsKeys.bookmarkPlaceList({ page: Number(pageNumber), size: 12, direction: 'ASC' }),
        (oldData: UserBookmarkPlaces) => {
          const targetPlace = oldData.content.filter((place) => place.placeId !== placeLogId);
          return {
            ...oldData,
            ...targetPlace,
          };
        }
      );

      return { previousPlaceLogBookMark, previousPlaceBookMark, previousProfilePlaceLogBookMark };
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

      queryClient.setQueryData(
        userLogsKeys.bookmarkPlaceList({ page: Number(pageNumber), size: 12, direction: 'ASC' }),
        context?.previousProfilePlaceLogBookMark
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...logKeys.bookMark(Number(placeLogId))] });
      queryClient.invalidateQueries({ queryKey: [...logKeys.placeBookMarkCheck(placeId)] });
      queryClient.invalidateQueries({
        queryKey: userLogsKeys.bookmarkPlaceList({
          page: Number(pageNumber),
          size: 12,
          direction: 'ASC',
        }),
      });
    },
  });
};

export default usePlaceBookMarkMutation;
