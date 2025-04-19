interface SearchTitleHeaderProps {
  labelText: string;
  queryText: string;
}

export default function SearchTitleHeader({ labelText, queryText }: SearchTitleHeaderProps) {
  return (
    <header className="web:gap-[3px] items-start pb-10 web:pb-[60px] border-b-[1px] border-b-primary-100 w-full flex flex-col">
      <h2 className="text-lg font-medium web:text-2xl !leading-[120%] font-untitled text-primary-400">
        {labelText}
      </h2>
      <h2 className="text-lg font-bold !leading-[120%] web:text-2xl text-primary-950">
        {queryText}
      </h2>
    </header>
  );
}
