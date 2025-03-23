import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../user/useAuth';
import { logKeys } from './logQueryKeys';

const usePlaceBookMark = (placeLogId: number) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: [...logKeys.bookMark(placeLogId)],
    queryFn: () => api.place.getPlaceBookMark(placeLogId),
    enabled: !!user,
  });
};

export default usePlaceBookMark;
