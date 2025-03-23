import { SearchIcon } from '@/components/Icons';
import { useSearchStore } from '@/store/searchStore';

export default function SearchBarButton() {
  const { toggleSearchBar } = useSearchStore();
  return (
    <button onClick={toggleSearchBar}>
      <SearchIcon className="w-[20px] h-[20px]" />
    </button>
  );
}
