import type { SVGProps } from 'react';
const SvgClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <path
      fill="#81858F"
      d="M8 8.857h-.5a.5.5 0 0 0 .343.475zm.5-3.75a.5.5 0 1 0-1 0zm1.593 4.975a.5.5 0 0 0 .316-.949zM8.5 8.857v-3.75h-1v3.75zm-.658.475 2.25.75.316-.949-2.25-.75zM15 8.857a7 7 0 0 1-7 7v1a8 8 0 0 0 8-8zm-7 7a7 7 0 0 1-7-7H0a8 8 0 0 0 8 8zm-7-7a7 7 0 0 1 7-7v-1a8 8 0 0 0-8 8zm7-7a7 7 0 0 1 7 7h1a8 8 0 0 0-8-8z"
    />
  </svg>
);
export default SvgClockIcon;
