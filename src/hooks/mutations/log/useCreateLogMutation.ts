import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import api from '@/services/apis/api';
import { Log } from '@/services/apis/types/registerAPI.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateLogMutation = () => {
  const navi = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formatedLog: Log) => {
      return await api.log.createLog(formatedLog);
    },
    onSuccess: (result) => {
      if (!result?.data.placeLogId) return;
      navi(`/log/${result.data.placeLogId}`, { replace: true });

      queryClient.invalidateQueries({ queryKey: logKeys.detail(result.data.placeLogId) });
      queryClient.invalidateQueries({ queryKey: logKeys.list() });
      
      queryClient.refetchQueries({ queryKey: logKeys.detail(result.data.placeLogId) });
      queryClient.refetchQueries({ queryKey: logKeys.list() });
    },
    onError: (error) => {
      console.error('로그 등록 실패:', error);
      alert('로그 등록에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export default useCreateLogMutation;
