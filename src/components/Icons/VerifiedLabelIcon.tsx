interface VerifiedLabelIconProps {
  className?: string;
}

function VerifiedLabelIcon({ className }: VerifiedLabelIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.36386 0.614822C7.16783 0.414851 6.84579 0.414851 6.64976 0.614822L5.55577 1.73078C5.43418 1.85481 5.25693 1.90685 5.08759 1.86825L3.56394 1.5209C3.29091 1.45866 3.02 1.63276 2.9632 1.90697L2.64621 3.43723C2.61098 3.60731 2.49001 3.74692 2.32667 3.80599L0.857105 4.33754C0.593769 4.43278 0.459993 4.72571 0.560457 4.9871L1.12111 6.44581C1.18342 6.60794 1.15713 6.79079 1.05166 6.9288L0.102759 8.17046C-0.0672782 8.39296 -0.0214483 8.71172 0.204386 8.8773L1.46467 9.80133C1.60475 9.90403 1.68149 10.0721 1.66737 10.2452L1.5404 11.8028C1.51765 12.0819 1.72853 12.3252 2.00804 12.3424L3.56783 12.4384C3.74119 12.4491 3.89659 12.549 3.97832 12.7022L4.71359 14.0812C4.84534 14.3283 5.15433 14.419 5.39876 14.2824L6.76284 13.5198C6.91444 13.4351 7.09918 13.4351 7.25078 13.5198L8.61486 14.2824C8.85929 14.419 9.16828 14.3283 9.30003 14.0812L10.0353 12.7022C10.117 12.549 10.2724 12.4491 10.4458 12.4384L12.0056 12.3424C12.2851 12.3252 12.496 12.0819 12.4732 11.8028L12.3462 10.2452C12.3321 10.0721 12.4089 9.90403 12.5489 9.80133L13.8092 8.8773C14.0351 8.71172 14.0809 8.39296 13.9109 8.17046L12.962 6.9288C12.8565 6.79079 12.8302 6.60794 12.8925 6.44581L13.4532 4.9871C13.5536 4.72571 13.4199 4.43278 13.1565 4.33754L11.6869 3.80599C11.5236 3.74692 11.4026 3.60731 11.3674 3.43723L11.0504 1.90697C10.9936 1.63276 10.7227 1.45866 10.4497 1.5209L8.92603 1.86825C8.75669 1.90685 8.57944 1.85481 8.45785 1.73078L7.36386 0.614822ZM9.77895 6.55116C10.0377 6.22771 9.98526 5.75574 9.66182 5.49699C9.33837 5.23823 8.8664 5.29067 8.60765 5.61412L6.21593 8.60375L5.35087 7.73869C5.05797 7.44579 4.5831 7.44579 4.29021 7.73869C3.99731 8.03158 3.99731 8.50645 4.29021 8.79935L5.74779 10.2569C5.89864 10.4078 6.10659 10.4873 6.3196 10.4755C6.53261 10.4637 6.73051 10.3617 6.86378 10.1951L9.77895 6.55116Z"
        fill="black"
      />
    </svg>
  );
}

export default VerifiedLabelIcon;
