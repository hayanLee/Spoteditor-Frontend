import { cityDistricts } from '@/services/data/cityData';
import CitySearchButton from './CitySearchButton';

interface BnameButtonListProps {
  sido: string;
  onSigunguClick: (bname: string) => void;
}

export default function BnameButtonList({ sido, onSigunguClick }: BnameButtonListProps) {
  if (!sido || !cityDistricts[sido]) return null;
  return (
    <>
      {cityDistricts[sido].map((bname) => (
        <CitySearchButton key={bname} gio={bname} onClick={onSigunguClick} />
      ))}
    </>
  );
}
