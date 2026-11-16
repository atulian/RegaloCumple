import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { config } from '../config'
import { campanitas, iniciarAudio } from '../sonido'
import { Perrita } from './Perrita'

const c = config.carta

/** Comienzo: un sobre a su nombre; al tocarlo sale la carta que la invita a empezar */
export function Sobre({ alTerminar }: { alTerminar: () => void }) {
  const [abierto, setAbierto] = useState(false)

  const abrir = () => {
    if (abierto) return
    iniciarAudio() // la música arranca desde el primer toque
    campanitas(440)
    setAbierto(true)
  }

  return (
    <motion.section
      className="capa sobre-capa"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.7 } }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence>
        {!abierto && (
          <motion.div
            key="titulo"
            className="arriba"
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.4 } }}
            transition={{ delay: 0.6, duration: 1.1 }}
          >
            <p className="saludo">{c.aviso}</p>
            <h1 className="titulo-l">{c.titulo}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sobre-zona">
        {/* la carta sale desde atrás del sobre y queda en el centro */}
        <motion.article
          className="carta"
          initial={false}
          animate={
            abierto
              ? { y: ['0%', '-42%', '0%'], scale: [0.62, 0.66, 1], opacity: 1, rotate: [0, -3, -1.5] }
              : { y: '0%', scale: 0.62, opacity: 0, rotate: 0 }
          }
          transition={{ duration: 2, times: [0, 0.4, 1], ease: 'easeInOut', delay: abierto ? 0.45 : 0 }}
        >
          {c.lineas.map((l, i) => (
            <motion.p
              key={i}
              className={i === 0 ? 'carta-inicio' : undefined}
              initial={{ opacity: 0, y: 6 }}
              animate={abierto ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ delay: 2.3 + i * 0.55, duration: 0.7 }}
            >
              {l}
            </motion.p>
          ))}
          <motion.p
            className="carta-firma"
            initial={{ opacity: 0 }}
            animate={{ opacity: abierto ? 1 : 0 }}
            transition={{ delay: 2.3 + c.lineas.length * 0.55, duration: 0.8 }}
          >
            {c.firma}
          </motion.p>
          <motion.button
            className="carta-boton"
            onClick={alTerminar}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={abierto ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ delay: 3.1 + c.lineas.length * 0.55, duration: 0.6 }}
            style={{ pointerEvents: abierto ? 'auto' : 'none' }}
          >
            {c.boton} <span aria-hidden>→</span>
          </motion.button>
        </motion.article>

        <motion.button
          className="sobre"
          onClick={abrir}
          aria-label={c.pista}
          initial={{ y: 40, opacity: 0, rotate: -3 }}
          animate={
            abierto
              ? { y: '70vh', opacity: 0, rotate: 8, transition: { delay: 1.15, duration: 0.9, ease: 'easeIn' } }
              : { y: [0, -8, 0], opacity: 1, rotate: -3, transition: { y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: 0.3, duration: 1 } } }
          }
          style={{ pointerEvents: abierto ? 'none' : 'auto' }}
        >
          <svg className="sobre-cuerpo" viewBox="0 0 300 206" aria-hidden>
            <rect width="300" height="206" rx="10" fill="#e6d3b6" />
            <path d="M0 10v186l150-92z" fill="#f1e2c8" />
            <path d="M300 10v186L150 104z" fill="#efdfc3" />
            <path d="M6 206 150 98l144 108z" fill="#f8eeda" />
          </svg>
          <span className="sobre-para">Para {config.para}</span>
          <motion.span
            className="sobre-solapa"
            animate={{ rotateX: abierto ? 180 : 0 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
          />
          <motion.span
            className="sobre-sello"
            animate={abierto ? { scale: 0, opacity: 0 } : { scale: [1, 1.12, 1] }}
            transition={abierto ? { duration: 0.3 } : { duration: 1.6, repeat: Infinity }}
          >
            ♥
          </motion.span>
        </motion.button>

        <motion.div
          className="sobre-perrita"
          initial={{ opacity: 0, x: -30 }}
          animate={abierto ? { opacity: 0, x: -60, transition: { delay: 1, duration: 0.6 } } : { opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 120, damping: 12 }}
        >
          <Perrita />
        </motion.div>
      </div>

      <motion.p className="pista" initial={{ opacity: 0 }} animate={{ opacity: abierto ? 0 : 1 }} transition={{ delay: abierto ? 0 : 1.8, duration: 0.6 }}>
        <span className="pulso" />
        {c.pista}
      </motion.p>
    </motion.section>
  )
}
