import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { config } from '../config'
import { fotos } from '../fotos'

/** inclinación fija por foto, para que la pila se vea desordenada pero estable */
const giro = (i: number) => (((i * 7919) % 13) - 6) * 1.1
const corrida = (i: number) => (((i * 104729) % 9) - 4) * 2.2

const EN_PILA = 4

export function Album({ alTerminar }: { alTerminar: () => void }) {
  const [actual, setActual] = useState(0)
  const salida = useRef({ x: 1, y: -0.2 })
  const total = fotos.length

  useEffect(() => {
    if (actual < total) return
    const t = setTimeout(alTerminar, 700)
    return () => clearTimeout(t)
  }, [actual, total, alTerminar])

  // precarga la que está por entrar a la pila
  useEffect(() => {
    const prox = fotos[actual + EN_PILA]
    if (prox) new Image().src = prox
  }, [actual])

  const pasar = (x: number, y: number) => {
    const largo = Math.hypot(x, y) || 1
    salida.current = { x: x / largo, y: y / largo }
    setActual((a) => a + 1)
  }

  const alSoltar = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    if (Math.hypot(offset.x, offset.y) > 90 || Math.hypot(velocity.x, velocity.y) > 550) {
      pasar(offset.x + velocity.x * 0.2, offset.y + velocity.y * 0.2)
    }
  }

  const pila = fotos.slice(actual, actual + EN_PILA).map((src, k) => ({ src, i: actual + k, k }))

  return (
    <motion.section
      className="capa album"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="titulo-m"
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.9, duration: 1.1 }}
      >
        {config.album.titulo}
      </motion.h2>

      <div className="pila">
        <AnimatePresence custom={salida}>
          {pila
            .slice()
            .reverse()
            .map(({ src, i, k }) => {
              const arriba = k === 0
              return (
                <motion.figure
                  key={i}
                  className="polaroid"
                  custom={salida}
                  style={{ zIndex: total - i }}
                  drag={arriba}
                  dragSnapToOrigin
                  dragElastic={0.9}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={arriba ? alSoltar : undefined}
                  whileDrag={{ scale: 1.04, rotate: 0, cursor: 'grabbing' }}
                  initial={
                    i < EN_PILA
                      ? { y: '70vh', scale: 0.2, opacity: 0, rotate: giro(i) * 6 }
                      : { y: k * 9, scale: 0.86, opacity: 0, rotate: giro(i) }
                  }
                  animate={{
                    x: arriba ? 0 : corrida(i),
                    y: k * 9,
                    scale: 1 - k * 0.045,
                    opacity: 1,
                    rotate: arriba ? giro(i) * 0.35 : giro(i),
                  }}
                  variants={{
                    fuera: (s: typeof salida) => ({
                      x: s.current.x * 620,
                      y: s.current.y * 620,
                      rotate: s.current.x * 34,
                      opacity: 0,
                      transition: { duration: 0.55, ease: [0.3, 0.7, 0.4, 1] },
                    }),
                  }}
                  exit="fuera"
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 19,
                    delay: i < EN_PILA && actual === 0 ? 0.25 + (EN_PILA - 1 - k) * 0.16 : 0,
                  }}
                >
                  <div className="marco">
                    <img src={src} alt="" draggable={false} />
                  </div>
                  <figcaption>{config.album.frases[i % config.album.frases.length]}</figcaption>
                </motion.figure>
              )
            })}
        </AnimatePresence>
      </div>

      <motion.div
        className="album-pie"
        initial={{ opacity: 0 }}
        animate={{ opacity: actual < total ? 1 : 0 }}
        transition={{ delay: actual === 0 ? 1.6 : 0, duration: 0.8 }}
      >
        <p className="contador">
          {Math.min(actual + 1, total)} <span>/ {total}</span>
        </p>
        <button className="siguiente" onClick={() => actual < total && pasar(1, -0.25)}>
          {config.album.pista} <span aria-hidden>→</span>
        </button>
      </motion.div>
    </motion.section>
  )
}
