// A citrus cross-section drawn from scratch: rind, pith ring and wedge segments.
const SEGMENTS = 9
const R_OUT = 39
const R_IN = 5
const GAP = 0.07

const pt = (r, a) => `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`

const WEDGES = Array.from({ length: SEGMENTS }, (_, i) => {
  const a0 = (i / SEGMENTS) * Math.PI * 2 + GAP
  const a1 = ((i + 1) / SEGMENTS) * Math.PI * 2 - GAP
  return `M${pt(R_IN, a0)} L${pt(R_OUT, a0)} A${R_OUT} ${R_OUT} 0 0 1 ${pt(R_OUT, a1)} L${pt(R_IN, a1)} Z`
})

export default function Slice({ rind, flesh, pith = '#FFF6E8', size, className, style, ...rest }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      {...rest}
    >
      <circle cx="50" cy="50" r="49" fill={rind} />
      <circle cx="50" cy="50" r="44" fill={pith} />
      {WEDGES.map((d, i) => (
        <path key={i} d={d} fill={flesh} strokeLinejoin="round" stroke={flesh} strokeWidth="1.5" />
      ))}
      {WEDGES.map((_, i) => {
        const a = ((i + 0.5) / SEGMENTS) * Math.PI * 2
        return (
          <ellipse
            key={`h${i}`}
            cx={50 + 26 * Math.cos(a)}
            cy={50 + 26 * Math.sin(a)}
            rx="2.4"
            ry="5"
            fill="#fff"
            opacity="0.35"
            transform={`rotate(${(a * 180) / Math.PI + 90} ${50 + 26 * Math.cos(a)} ${50 + 26 * Math.sin(a)})`}
          />
        )
      })}
      <circle cx="50" cy="50" r="4" fill={pith} />
    </svg>
  )
}
