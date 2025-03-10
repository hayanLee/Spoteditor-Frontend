import { IOhterUser } from '@/services/apis/types/userAPI';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userKeys } from './userQueryKeys';
import api from '@/services/apis/api';

export default function useOtherUser(
  userId: number,
  queryOptions?: Partial<UseQueryOptions<IOhterUser, Error>>
) {
  return useQuery({
    queryKey: userKeys.otherUser(userId),
    queryFn: () => api.otherUser.getOtherUser(userId),
    ...queryOptions,
  });
}
