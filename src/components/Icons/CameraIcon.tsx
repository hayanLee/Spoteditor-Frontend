import type { SVGProps } from 'react';
const CameraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Add Camera">
      <path
        id="Camera"
        d="M9.99935 4.26367H12.0851C12.3504 4.26367 12.6047 4.36903 12.7922 4.55657L13.8731 5.63745C14.0607 5.82498 14.315 5.93034 14.5802 5.93034H17.3327C17.885 5.93034 18.3327 6.37805 18.3327 6.93034V15.7637C18.3327 16.316 17.885 16.7637 17.3327 16.7637H2.66601C2.11373 16.7637 1.66602 16.316 1.66602 15.7637V10.9303"
        stroke="#575A63"
        strokeWidth="1.5"
      />
      <circle id="Lens" cx="10.0007" cy="10.9303" r="3.41667" stroke="#575A63" strokeWidth="1.5" />
      <path
        id="Plus"
        d="M3.33333 1.76367V8.43034M6.66667 5.09701H0"
        stroke="#575A63"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export default CameraIcon;
