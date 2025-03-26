import { Button } from '@/components/ui/button';

interface CitySearchButtonProps {
  gio: string;
  onClick: (sido: string) => void;
}

export default function CitySearchButton({ gio, onClick }: CitySearchButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onClick(gio)}
      className="px-2.5 py-[15px] w-full web:w-[145px] text-primarySlate"
    >
      {gio}
    </Button>
  );
}
