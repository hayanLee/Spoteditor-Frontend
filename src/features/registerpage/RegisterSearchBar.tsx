import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MAPS } from '@/constants/pathname';
import { ArrowLeft, Search } from 'lucide-react';
import { FormEvent, ForwardedRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterSearchBar = forwardRef(
  (
    { onSubmit }: { onSubmit?: (e: FormEvent<HTMLFormElement>) => void },
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const navigate = useNavigate();
    const handleGoBack = () => navigate(-1);

    return (
      <form
        className="border-b flex items-center"
        onSubmit={onSubmit}
        onClick={() => navigate(MAPS)}
      >
        <ArrowLeft size={24} onClick={handleGoBack} className="cursor-pointer" />
        <Input
          ref={ref}
          placeholder="장소를 검색해보세요."
          className="placeholder:text-primary-300 text-text-lg font-medium"
        />
        <Button type="submit">
          <Search />
        </Button>
      </form>
    );
  }
);

export default RegisterSearchBar;
