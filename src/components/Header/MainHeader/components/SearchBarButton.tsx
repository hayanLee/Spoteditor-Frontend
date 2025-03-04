import { useSearchStore } from '@/store/searchStore';
import search from '@/assets/homepage/search.png';

export default function SearchBarButton() {
  const { toggleSearchBar } = useSearchStore();
  return (
    <button onClick={toggleSearchBar}>
      <img src={search} alt="search_logo" className="object-contain w-[20px] h-[20px]" />
    </button>
  );
}
