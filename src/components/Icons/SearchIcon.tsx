import { SVGProps } from 'react';

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="m-0"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      {...props}
    >
      <path
        d="M14.375 13.875L17 16.5M16.25 8.625C16.25 4.68997 13.06 1.5 9.125 1.5C5.18997 1.5 2 4.68997 2 8.625C2 12.56 5.18997 15.75 9.125 15.75C13.06 15.75 16.25 12.56 16.25 8.625Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SearchIcon;
