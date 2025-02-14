import * as React from 'react';
import type { SVGProps } from 'react';
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 17"
    {...props}
  >
    <path
      fill="#000"
      d="m9 .357 2.433 5.651 6.127.568-4.623 4.06 1.353 6.003L9 13.497 3.71 16.64l1.353-6.002L.44 6.577l6.127-.569z"
    />
  </svg>
);
export default SvgStar;
