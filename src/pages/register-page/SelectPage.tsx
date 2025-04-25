import { Button } from '@/components/ui/button';
import { REGISTER_SEARCH } from '@/constants/pathname';
import OptionSelection from '@/features/register-page/OptionSelection';
import RegisterBar from '@/features/register-page/RegisterBar';
import { useRegisterStore } from '@/store/registerStore';
import { Link, useNavigate } from 'react-router-dom';

const SelectPage = () => {
  const navi = useNavigate();
  const companions = useRegisterStore((state) => state.experience.selectedWhom);
  const feelings = useRegisterStore((state) => state.experience.selectedMoods);

  return (
    <div className="h-full flex flex-col">
      <RegisterBar />

      <main className="flex flex-col items-center justify-center grow px-4">
        {/* 제목 */}
        <div className="flex flex-col items-center mt-5 mb-[25px] gap-[7px]">
          <h3 className="text-md font-bold">어떤 하루인가요?</h3>
          <p className="text-text-sm text-primary-300 font-medium">여러개를 선택할 수 있어요.</p>
        </div>

        {/* 선택지 */}
        <div className="flex flex-col gap-5 grow">
          <OptionSelection title="누구와" storeKey="selectedWhom" />
          <OptionSelection title="어떤 느낌으로" storeKey="selectedMoods" />
        </div>
      </main>

      {/* 버튼 */}
      <div className="w-full flex flex-col items-center gap-[15px] mb-6 px-4">
        <Button
          className="w-full !text-text-sm text-gray-50"
          size={'xl'}
          disabled={!companions.length || !feelings.length}
          onClick={() => navi(REGISTER_SEARCH)}
        >
          다음
        </Button>

        <p className="underline text-primary-300 text-text-sm !font-medium">
          <Link to={REGISTER_SEARCH}>다음에 하기</Link>
        </p>
      </div>
    </div>
  );
};

export default SelectPage;
