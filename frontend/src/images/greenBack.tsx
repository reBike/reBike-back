import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={975}
    height={554}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0-10c90 558.779 664 677 978 465V-10H0Z" fill="#E7F5EF" />
  </svg>
)

export default SvgComponent
