interface SearchTitleHeaderProps {
  labelText: string;
  queryText: string;
}

export default function SearchTitleHeader({ labelText, queryText }: SearchTitleHeaderProps) {
  return (
    <header className="gap-[5px] web:gap-2 items-start pb-10 web:pb-[60px] border-b-[1px] border-b-primary-100 w-full flex flex-col">
      <h2 className="font-untitled text-[24px] web:text-[32px] leading-[120%] tracking-[-0.48px] web:tracking-[-0.64px] text-primary-400 font-bold">
        {labelText}
      </h2>
      <h2 className="text-[24px] leading-[135%] web:leading-[130%] tracking-[-0.24px] web:tracking-[-0.64px] text-primary-950 font-bold">
        {queryText}
      </h2>
    </header>
  );
}
