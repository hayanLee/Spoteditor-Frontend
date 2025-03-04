import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { SearchForm, searchSchema } from '@/services/schemas/searchSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@/components/Icons/SearchIcon';
import { useSearchStore } from '@/store/searchStore';
import { AnimatePresence, motion } from 'motion/react';

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
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.nav
            initial={{ translateY: -200, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="web:px-[50px] -z-10 py-[30px] fixed mobile:px-4 w-full flex justify-center items-center border-t-primary-900 border-t-[1px] bg-black top-11 left-0 web:top-[61px]"
          >
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
          </motion.nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseOverlayClick}
            className="fixed top-0 left-0 w-screen h-screen -z-20 bg-black/80"
          />
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default SearchBar;
