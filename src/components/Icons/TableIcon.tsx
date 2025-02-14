import * as React from 'react';
import type { SVGProps } from 'react';
const SvgTableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 36 36"
    {...props}
  >
    <path
      stroke="#000"
      strokeWidth={2.5}
      d="M31.5 18v13.5H18M31.5 18V4.5H18M31.5 18h-27m0 0V4.5H18M4.5 18v13.5H18m0-27v27"
    />
  </svg>
);
export default SvgTableIcon;
