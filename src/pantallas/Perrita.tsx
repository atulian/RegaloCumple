/** La cocker, dibujada y animada con CSS (cola, orejas, parpadeo, cabecita) */
export function Perrita({ gorro = false, salta = false, className = '' }: { gorro?: boolean; salta?: boolean; className?: string }) {
  return (
    <svg className={`perrita ${salta ? 'salta' : ''} ${className}`} viewBox="0 0 200 224" aria-hidden>
      <ellipse cx="100" cy="214" rx="56" ry="7" fill="rgba(0,0,0,.28)" />
      <g className="p-cola">
        <path d="M136 180q30-6 32-38" stroke="#b5631f" strokeWidth="13" strokeLinecap="round" fill="none" />
      </g>
      <ellipse cx="100" cy="172" rx="46" ry="40" fill="#c8742c" />
      <ellipse cx="100" cy="180" rx="24" ry="28" fill="#dd9347" />
      <ellipse cx="78" cy="207" rx="16" ry="9" fill="#d98a3e" />
      <ellipse cx="122" cy="207" rx="16" ry="9" fill="#d98a3e" />
      <g className="p-cabeza">
        <g className="p-oreja izq">
          <path d="M64 60C36 64 26 108 36 142c6 18 26 16 30-2 5-22 7-52 10-74z" fill="#a4571b" />
          <path d="M44 96q8 6 4 16m4 4q8 6 3 16M56 84q7 8 2 18" stroke="#c98039" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
        </g>
        <g className="p-oreja der">
          <path d="M136 60c28 4 38 48 28 82-6 18-26 16-30-2-5-22-7-52-10-74z" fill="#a4571b" />
          <path d="M156 96q-8 6-4 16m-4 4q-8 6-3 16M144 84q-7 8-2 18" stroke="#c98039" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
        </g>
        <ellipse cx="100" cy="88" rx="44" ry="40" fill="#cf7b30" />
        <path d="M84 52q16-10 32 0q-16 6-32 0z" fill="#dd9347" />
        <ellipse cx="100" cy="107" rx="25" ry="19" fill="#e9a960" />
        <path className="p-lengua" d="M92 114q8 18 16 0z" fill="#ef6f86" />
        <path d="M100 103v8m0 0q-8 8-15 1m15-1q8 8 15 1" stroke="#5a2f14" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <ellipse cx="100" cy="98" rx="9.5" ry="7" fill="#1d1210" />
        <ellipse cx="97" cy="96" rx="3" ry="1.8" fill="#fff" opacity=".5" />
        <g className="p-ojos">
          <circle cx="81" cy="84" r="7" fill="#2a1710" />
          <circle cx="119" cy="84" r="7" fill="#2a1710" />
          <circle cx="83.5" cy="81.5" r="2.4" fill="#fff" />
          <circle cx="121.5" cy="81.5" r="2.4" fill="#fff" />
        </g>
        <path d="M72 72q8-6 16-2m24 0q8-4 16 2" stroke="#8a4513" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        {gorro && (
          <g transform="rotate(-10 100 50)">
            <path d="M100 2 76 54h48z" fill="#ff6f91" />
            <path d="M91 22h18l5 11H86zM81 43h38l5 11H76z" fill="#ffd23f" />
            <circle cx="100" cy="3" r="7" fill="#fff6d6" />
          </g>
        )}
      </g>
    </svg>
  )
}
