import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={8.727} cy={27.153} r={8.727} fill="#F7F8E9" />
    <circle cx={39.274} cy={27.153} r={8.727} fill="#F7F8E9" />
    <path
      d="M24.003 27.15 12.877 16.242H35.13L24.003 27.15ZM37.816 4.365h3.394v11.636h-3.394zM30.547 0h17.454v4.364H30.547z"
      fill="#F7F8E9"
    />
  </svg>
);

export default SvgComponent;
