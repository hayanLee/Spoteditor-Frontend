import api from '@/services/apis/api';
import { PlaceBookMarkCeck } from '@/services/apis/types/placeAPI.type';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

export default function usePlaceBookMarkCheck(
  placeId: number,
  queryOptions?: Partial<UseQueryOptions<PlaceBookMarkCeck, Error>>
) {
  return useQuery<PlaceBookMarkCeck>({
    queryKey: logKeys.placeBookMarkCheck(placeId),
    queryFn: () => api.place.getPlaceBookMarkCheck(placeId),
    ...queryOptions,
  });
}
