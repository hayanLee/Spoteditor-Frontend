import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import useUser from '../user/useUser';
import { logKeys } from './logQueryKeys';

const usePlaceBookMark = (placeLogId: number) => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: [...logKeys.bookMark(placeLogId)],
    queryFn: () => api.place.getPlaceBookMark(placeLogId),
    enabled: !!user,
  });
};

export default usePlaceBookMark;
