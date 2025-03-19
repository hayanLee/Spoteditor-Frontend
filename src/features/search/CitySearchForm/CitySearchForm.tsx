import GeoConsentModal from '@/components/GeoConsentModal';
import { Button } from '@/components/ui/button';
import useGeolocationPermission from '@/hooks/useGeolocationPermission';
import { useEffect, useMemo, useState } from 'react';
import CitySearchDropbox from './CitySearchDropbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { citySearchSchema } from '@/services/schemas/searchSchema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useLocationToAddress from '@/hooks/useLocationToAddress';
import { useNavigate } from 'react-router-dom';
import { useCitySearchStore } from '@/store/searchStore';

function CitySearchForm() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const { permission, position } = useGeolocationPermission();
  const { address } = useLocationToAddress(position?.latitude ?? null, position?.longitude ?? null);
  const { isDropBox, sido, bname, openDropBox, closeDropBox } = useCitySearchStore();

  const defaultValues = useMemo(
    () => ({
      sido: sido || address?.region_1depth_name || '서울',
      bname: bname || address?.region_2depth_name || '송파구',
    }),
    [sido, bname, address]
  );

  const form = useForm({
    resolver: zodResolver(citySearchSchema),
    defaultValues,
  });

  // 쥬스탄드 값이 변경되었을 때 form 상태 업데이트
  useEffect(() => {
    if (sido) {
      form.setValue('sido', sido);
    }
    if (bname) {
      form.setValue('bname', bname);
    }
  }, [sido, bname, form]);

  const onSearchSubmit = ({ sido, bname }: z.infer<typeof citySearchSchema>) => {
    if (permission === 'prompt') {
      setOpen(true);
    }
    /* 추후 모달창 닫혔을 경우 검색할 수 있는 기능 추가 */
    nav('/search', {
      state: { sido, bname },
    });
  };

  const openDropBoxClick = () => {
    openDropBox();
  };

  useEffect(() => {
    closeDropBox();
  }, []);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSearchSubmit)}
          className="flex flex-col gap-2.5 web:grid web:grid-cols-[3fr_70px] relative bottom-0 z-30"
        >
          <div className="grid grid-cols-2 gap-1.5">
            <FormField
              control={form.control}
              name="sido"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="text-primary-400 text-text-sm">
                    어디로 놀러갈까요?
                  </FormLabel>
                  <FormControl>
                    <Input
                      onClick={openDropBoxClick}
                      placeholder="서울"
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bname"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="text-primary-400 text-text-sm">더 상세히 검색!</FormLabel>
                  <FormControl>
                    <Input
                      onClick={openDropBoxClick}
                      placeholder="송파구"
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="h-full font-medium text-white rounded-none bg-primary-950 text-text-sm hover:bg-primary-900"
          >
            검색
          </Button>
          {isDropBox ? <CitySearchDropbox /> : null}
        </form>
      </Form>
      {open ? <GeoConsentModal /> : null}
    </>
  );
}

export default CitySearchForm;
