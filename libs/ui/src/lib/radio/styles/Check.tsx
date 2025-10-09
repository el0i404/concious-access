import { SVGProps } from 'react';
const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" height={24} width={24} {...props}>
    <path
      fillRule="evenodd"
      d="M22.712 5.025a1.233 1.233 0 0 0-1.889-1.585L8.53 18.09l-5.426-5.425a1.232 1.232 0 1 0-1.743 1.743l6.145 6.145c.107.107.228.19.358.25.522.437 1.299.369 1.736-.153L22.712 5.025Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Check;
