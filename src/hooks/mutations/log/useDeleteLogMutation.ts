import { HOME } from '@/constants/pathname';
import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import api from '@/services/apis/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteLog = (placeLogId: number) => {
  const queryClient = useQueryClient();
  const navi = useNavigate();

  return useMutation({
    mutationFn: () => api.log.deleteLog(placeLogId),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: logKeys.detail(placeLogId) });
      queryClient.invalidateQueries({ queryKey: ['log', 'user', 'list'] });
      navi(HOME);
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
};

export default useDeleteLog;
