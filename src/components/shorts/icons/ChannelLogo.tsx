import { SVGProps } from 'react'

const ChannelLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    style={{
      pointerEvents: 'none',
      display: 'block',
    }}
    {...props}
  >
    <rect
      width={2}
      height={20}
      x={11}
      y={2}
      fill="#fff"
      fillOpacity={0.3}
      rx={1}
    />
    <rect
      width={2}
      height={12}
      x={15}
      y={6}
      fill="#fff"
      fillOpacity={0.3}
      rx={1}
    />
    <rect
      width={2}
      height={12}
      x={7}
      y={6}
      fill="#fff"
      fillOpacity={0.3}
      rx={1}
    />
    <rect
      width={2}
      height={4}
      x={3}
      y={10}
      fill="#fff"
      fillOpacity={0.3}
      rx={1}
    />
    <rect
      width={2}
      height={4}
      x={19}
      y={10}
      fill="#fff"
      fillOpacity={0.3}
      rx={1}
    />
  </svg>
)
export default ChannelLogo
