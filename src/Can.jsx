import { useId } from 'react'
import Slice from './Slice.jsx'

// Fake-3D can: the label scrolls horizontally inside a clipped body while a
// fixed cylindrical shading gradient sits on top, so it reads as a spinning can.
const BODY = 'M22,56 Q22,46 30,44 L170,44 Q178,46 178,56 L178,350 Q178,362 168,366 L32,366 Q22,362 22,350 Z'
const PERIOD = 200

function Label({ f }) {
  return (
    <g>
      {/* cream label panel */}
      <rect x="0" y="70" width={PERIOD} height="236" fill="#FFF1DC" />
      {/* pop wave band */}
      <path
        d="M0,300 Q25,286 50,300 T100,300 T150,300 T200,300 V370 H0 Z"
        fill={f.pop}
      />
      <path d="M0,70 Q25,84 50,70 T100,70 T150,70 T200,70 V40 H0 Z" fill={f.deep} opacity="0.25" />
      {/* vertical wordmark */}
      <text
        x="0"
        y="0"
        transform="translate(78 188) rotate(-90)"
        textAnchor="middle"
        fontFamily="Anton, Impact, sans-serif"
        fontSize="86"
        fill="#1E0F08"
        letterSpacing="1"
      >
        ZESTO
      </text>
      <text
        x="0"
        y="0"
        transform="translate(116 188) rotate(-90)"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
        fontSize="11"
        letterSpacing="3"
        fill={f.deep}
      >
        {`${f.name.join(' ').toUpperCase()} · SPARKLING`}
      </text>
      <Slice x="128" y="96" width="62" height="62" rind={f.rind} flesh={f.flesh} />
      <Slice x="136" y="214" width="44" height="44" rind={f.rind} flesh={f.flesh} />
      <circle cx="160" cy="185" r="4" fill={f.accent} />
      <circle cx="146" cy="196" r="2.5" fill={f.accent} />
    </g>
  )
}

export default function Can({ f, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const clip = `body-${uid}`
  const shade = `shade-${uid}`
  const metal = `metal-${uid}`

  return (
    <svg
      viewBox="0 0 200 390"
      className={`can ${className}`}
      role="img"
      aria-label={`ZESTO ${f.name.join(' ')} soda can`}
    >
      <defs>
        <clipPath id={clip}>
          <path d={BODY} />
        </clipPath>
        <linearGradient id={shade} gradientUnits="userSpaceOnUse" x1="22" x2="178" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.1" stopColor="#000" stopOpacity="0.12" />
          <stop offset="0.24" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.32" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.62" stopColor="#000" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={metal} x1="0" x2="1">
          <stop offset="0" stopColor="#8d8d93" />
          <stop offset="0.25" stopColor="#f4f4f6" />
          <stop offset="0.5" stopColor="#b9b9c0" />
          <stop offset="0.8" stopColor="#e2e2e6" />
          <stop offset="1" stopColor="#7c7c83" />
        </linearGradient>
      </defs>

      {/* body + spinning label */}
      <path d={BODY} fill={f.accent} />
      <g clipPath={`url(#${clip})`}>
        <g className="can-label">
          <Label f={f} />
          <g transform={`translate(${PERIOD} 0)`}>
            <Label f={f} />
          </g>
        </g>
        <rect x="0" y="0" width="200" height="390" fill={`url(#${shade})`} />
      </g>

      {/* shoulder, lid, tab */}
      <path d="M30,47 Q27,30 46,21 L154,21 Q173,30 170,47 Z" fill={`url(#${metal})`} />
      <ellipse cx="100" cy="21" rx="55" ry="7" fill="#d4d4da" stroke="#8a8a92" strokeWidth="2" />
      <ellipse cx="100" cy="22" rx="46" ry="4.5" fill="#bdbdc4" />
      <rect x="84" y="15" width="34" height="9" rx="4.5" fill="#e9e9ee" stroke="#8a8a92" strokeWidth="1.5" />
      <circle cx="94" cy="19.5" r="2.4" fill="#8a8a92" />
      {/* bottom rim */}
      <path d="M32,364 L168,364 Q171,376 156,380 L44,380 Q29,376 32,364 Z" fill={`url(#${metal})`} />
    </svg>
  )
}
