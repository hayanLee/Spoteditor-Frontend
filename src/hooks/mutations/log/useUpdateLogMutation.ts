import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import api from '@/services/apis/api';
import { UpdateRequest } from '@/services/apis/types/registerAPI.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUpdateLogMutation = () => {
  const navi = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { placeLogId: number; data: UpdateRequest }) => {
      const { placeLogId, data } = params;
      return await api.log.updateLog(placeLogId, data);
    },
    onSuccess: (result) => {
      if (result) {
        queryClient.invalidateQueries({ queryKey: logKeys.detail(result.data.placeLogId) });
        navi(`/log/${result.data.placeLogId}`, { replace: true });
      }
    },
    onError: (error) => {
      console.error('로그 수정 실패:', error);
      alert('로그 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export default useUpdateLogMutation;
