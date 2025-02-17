import { SVGProps } from 'react';

function LeftArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 25"
      fill="none"
      {...props}
    >
      <g clip-path="url(#clip0_6525_9658)">
        <path
          d="M9.5 4.21484L1 12.7148M1 12.7148L9.5 21.2148M1 12.7148H17.5"
          stroke="black"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_6525_9658">
          <rect width="24" height="24" fill="white" transform="translate(0 0.714844)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LeftArrowIcon;
