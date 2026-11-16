import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'motion/react'
import { config } from '../config'
import { campanitas, iniciarAudio } from '../sonido'
import { Perrita } from './Perrita'

const GLOBOS = [
  { x: 6, c: '#ff6f91', d: 0, t: 11 },
  { x: 22, c: '#f0c877', d: 3.5, t: 13 },
  { x: 40, c: '#8fd3c8', d: 1.2, t: 12 },
  { x: 58, c: '#ffb36b', d: 5, t: 14 },
  { x: 74, c: '#c79bff', d: 2.2, t: 11.5 },
  { x: 88, c: '#ff8fa8', d: 6.3, t: 13.5 },
  { x: 32, c: '#fff1c9', d: 7.5, t: 12.5 },
]

const texto = {
  initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(8px)' },
}

export function Cumple({ alTerminar }: { alTerminar: () => void }) {
  const [soplado, setSoplado] = useState(false)

  useEffect(() => {
    if (!soplado) return
    const t = setTimeout(alTerminar, 3800)
    return () => clearTimeout(t)
  }, [soplado, alTerminar])

  const soplar = () => {
    if (soplado) return
    iniciarAudio()
    campanitas(587.33)
    setSoplado(true)
    const colores = ['#f0c877', '#ff6f91', '#8fd3c8', '#c79bff', '#ffffff']
    confetti({ particleCount: 120, spread: 100, startVelocity: 42, origin: { x: 0.5, y: 0.6 }, colors: colores })
    setTimeout(() => confetti({ particleCount: 70, spread: 70, angle: 60, origin: { x: 0, y: 0.8 }, colors: colores }), 350)
    setTimeout(() => confetti({ particleCount: 70, spread: 70, angle: 120, origin: { x: 1, y: 0.8 }, colors: colores }), 500)
  }

  return (
    <motion.button
      className="capa capa-toque cumple"
      onClick={soplar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      transition={{ duration: 0.8 }}
      aria-label={config.cumple.pista}
    >
      <div className="globos" aria-hidden>
        {GLOBOS.map((g, i) => (
          <span key={i} className="globo" style={{ left: `${g.x}%`, background: g.c, color: g.c, animationDelay: `${-g.d}s`, animationDuration: `${g.t}s` }} />
        ))}
      </div>

      <div className="arriba cumple-titulo">
        <AnimatePresence mode="wait">
          <motion.h2 key={soplado ? 'b' : 'a'} className="titulo-l" {...texto} transition={{ duration: 0.8, delay: soplado ? 0 : 0.5 }}>
            {soplado ? config.cumple.deseo : config.cumple.titulo}
          </motion.h2>
        </AnimatePresence>
      </div>

      <motion.div
        className="mesa"
        initial={{ y: 60, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 110, damping: 13 }}
      >
        <svg className={`torta ${soplado ? 'apagada' : ''}`} viewBox="0 0 240 236" aria-hidden>
          <ellipse cx="120" cy="212" rx="112" ry="14" fill="#f3ead9" />
          <ellipse cx="120" cy="209" rx="104" ry="11" fill="#fffdf6" />
          {/* piso de abajo */}
          <rect x="30" y="132" width="180" height="76" rx="14" fill="#f7a9bd" />
          <path d="M30 150v-6a14 14 0 0 1 14-14h152a14 14 0 0 1 14 14v10c0 9-12 9-12 0s-14-9-14 4-14 12-14 0-13-10-13 2-15 12-15-2-13-8-13 3-14 10-14-2-13-8-13 4-15 10-15-3-12-6-12 2-13 8-13 0z" fill="#fff4dc" />
          {[52, 84, 118, 152, 186].map((x, i) => (
            <circle key={x} cx={x} cy={186 + (i % 2) * 8} r="4" fill={['#f0c877', '#8fd3c8', '#c79bff', '#fff', '#f0c877'][i]} />
          ))}
          {/* piso de arriba */}
          <rect x="62" y="80" width="116" height="58" rx="12" fill="#fff0cf" />
          <path d="M62 98v-6a12 12 0 0 1 12-12h92a12 12 0 0 1 12 12v8c0 8-11 8-11 0s-12-7-12 4-13 10-13-1-12-8-12 2-13 10-13-2-12-7-12 3-13 8-13-2-10-5-10 0z" fill="#e5567a" />
          {/* velitas */}
          {[92, 120, 148].map((x, i) => (
            <g key={x}>
              <rect x={x - 4} y="48" width="8" height="34" rx="3" fill={['#8fd3c8', '#f0c877', '#c79bff'][i]} />
              <path d={`M${x - 4} 58l8-5M${x - 4} 68l8-5M${x - 4} 78l8-5`} stroke="#fff" strokeWidth="2" opacity=".8" />
              <g className="llama" style={{ animationDelay: `${i * -0.23}s`, transformOrigin: `${x}px 46px` }}>
                <circle cx={x} cy="34" r="16" fill="#ffd27a" opacity=".28" />
                <path d={`M${x} 18c8 10 9 16 5 22a6.5 6.5 0 0 1-10 0c-4-6-3-12 5-22z`} fill="#ffb347" />
                <path d={`M${x} 28c4 5 4 8 2 11a3 3 0 0 1-4 0c-2-3-2-6 2-11z`} fill="#fff6c9" />
              </g>
              <path className="humo" d={`M${x} 42q-6-8 0-15t0-15`} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ animationDelay: `${i * 0.12}s` }} />
            </g>
          ))}
        </svg>
        <Perrita gorro salta={soplado} className="perrita-cumple" />
      </motion.div>

      <motion.p className="pista" animate={{ opacity: soplado ? 0 : 1 }} initial={{ opacity: 0 }} transition={{ delay: soplado ? 0 : 1.8, duration: 0.6 }}>
        <span className="pulso" />
        {config.cumple.pista}
      </motion.p>
    </motion.button>
  )
}
