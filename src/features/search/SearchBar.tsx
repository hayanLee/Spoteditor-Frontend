import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { SearchForm, searchSchema } from '@/services/schemas/searchSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../components/Icons/SearchIcon';
import { useSearchStore } from '@/store/searchStore';

function SearchBar() {
  const nav = useNavigate();
  const { isOpen } = useSearchStore();

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      title: '',
    },
  });

  const { toggleSearchBar } = useSearchStore();

  const onSearchSubmit = ({ title }: SearchForm) => {
    console.log(title);
    form.reset();
    nav('/search', {
      state: { title },
    });
    toggleSearchBar();
  };
  /* fixed top-[60px] */
  const onCloseOverlayClick = () => {
    toggleSearchBar();
  };
  return (
    <>
      {isOpen ? (
        <>
          <nav className="web:px-[50px] z-40 py-[30px] sticky mobile:px-4 web:w-[1440px] mobile:w-full flex justify-center items-center bg-black">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSearchSubmit)}
                className="flex w-[655px] p-0 h-auto items-center bg-formBlack"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="제가 찾는 건..."
                          {...field}
                          style={{ color: 'white' }}
                          className="bg-inherit pl-[25px] caret-white text-white placeholder:text-[#575A63] text-text-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button className="px-[25px] py-[18px]">
                  <SearchIcon />
                </button>
              </form>
            </Form>
          </nav>
          <div
            onClick={onCloseOverlayClick}
            className="fixed z-30 w-full h-screen web:w-[1440px] mobile:w-full bg-black/80"
          />
        </>
      ) : null}
    </>
  );
}

export default SearchBar;
