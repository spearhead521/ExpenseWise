import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 8c0-2.5-2-4.5-4.5-4.5S6 5.5 6 8s2 4.5 4.5 4.5S15 10.5 15 8z" />
      <path d="M17.5 9.5C19 9.5 21 8 21 8s-2-1.5-3.5-1.5" />
      <path d="M3 8.5v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-10" />
      <path d="M12 16v-4" />
    </svg>
  ),
  menu: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
};
