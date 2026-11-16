import { useEffect, useMemo } from 'react'
import confetti from 'canvas-confetti'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { config } from '../config'

const t = config.ticket

function Avion() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M21.5 13.5v-2l-8-5V3a1.5 1.5 0 0 0-3 0v3.5l-8 5v2l8-2.5V17l-2.25 1.5V20L12 19l3.75 1v-1.5L13.5 17v-6z" transform="rotate(90 12 12)" />
    </svg>
  )
}

function Dato({ k, v, nota }: { k: string; v: string; nota?: string }) {
  return (
    <div className="dato">
      <span className="dato-k">{k}</span>
      <span className="dato-v">{v}</span>
      {nota && <span className="dato-n">{nota}</span>}
    </div>
  )
}

export function Ticket({ alRepetir }: { alRepetir: () => void }) {
  // el ticket se inclina siguiendo el dedo
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-1, 1], [9, -9]), { stiffness: 120, damping: 14 })
  const ry = useSpring(useTransform(px, [-1, 1], [-11, 11]), { stiffness: 120, damping: 14 })
  const brillo = useTransform(px, [-1, 1], ['0%', '100%'])

  const barras = useMemo(() => {
    let s = 20
    return Array.from({ length: 46 }, () => {
      s = (s * 16807) % 2147483647
      return 1 + (s % 4)
    })
  }, [])

  useEffect(() => {
    const colores = ['#f0c063', '#ff6f91', '#1fa55b', '#ffd23f', '#ffffff']
    const tiros = [
      setTimeout(() => {
        confetti({ particleCount: 90, spread: 75, startVelocity: 48, origin: { x: 0, y: 0.75 }, angle: 60, colors: colores })
        confetti({ particleCount: 90, spread: 75, startVelocity: 48, origin: { x: 1, y: 0.75 }, angle: 120, colors: colores })
      }, 1500),
      setTimeout(() => {
        confetti({ particleCount: 140, spread: 110, startVelocity: 38, origin: { x: 0.5, y: 0.35 }, colors: colores, scalar: 0.9 })
      }, 2300),
    ]
    return () => tiros.forEach(clearTimeout)
  }, [])

  const mover = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const soltar = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.section
      className="capa rio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      onPointerMove={mover}
      onPointerLeave={soltar}
      onPointerUp={soltar}
    >
      <div className="rio-sol" />
      <svg className="rio-morros" viewBox="0 0 400 130" preserveAspectRatio="none" aria-hidden>
        <path
          opacity=".55"
          d="M0 130V92c30-6 52-30 80-28 24 2 30 22 52 24 30 2 46-22 78-20 30 2 44 26 70 26 34 0 50-34 82-40 14-2 28 2 38 8v68z"
        />
        <path d="M0 130v-22c40-4 60-16 92-14 20 1 30 12 48 8 22-5 26-58 56-78 22-14 44 4 54 34 8 24 22 34 48 30 28-4 40-22 62-24 16-1 30 6 40 14v52z" />
      </svg>

      {/* nosotros tres mirando el atardecer */}
      <svg className="rio-nosotros" viewBox="0 0 120 110" aria-hidden>
        <path className="corazon" d="M52 22c-5-4-8-7-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 60 11c0 4-3 7-8 11z" />
        <g className="pareja">
          <circle cx="40" cy="38" r="9" />
          <path d="M28 104V62a12 12 0 0 1 24 0v42z" />
          <path d="M57 44a8.5 8.5 0 0 1 17 0c2 8 3 16 1 24H56c-2-8-1-16 1-24z" />
          <path d="M54 104V70a11 11 0 0 1 22 0v34z" />
          <path d="M46 66q10-6 14 4" strokeWidth="6" strokeLinecap="round" fill="none" stroke="currentColor" />
        </g>
        <g>
          <ellipse cx="97" cy="96" rx="10" ry="9" />
          <circle cx="96" cy="82" r="7" />
          <path d="M90 78c-5 1-5 12-2 15 3 1 4-8 4-14zM102 78c5 1 5 12 2 15-3 1-4-8-4-14z" />
          <path className="colita" d="M106 98q8-2 8-10" strokeWidth="3.5" strokeLinecap="round" fill="none" stroke="currentColor" />
        </g>
      </svg>

      <div className="rio-contenido">
        <motion.p
          className="saludo"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          {t.anuncio}
        </motion.p>
        <motion.h1
          className="titulo-l rio-titulo"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 140, damping: 13 }}
        >
          {t.titulo}
        </motion.h1>

        <div className="ticket-perspectiva">
          <motion.div
            className="ticket-entrada"
            initial={{ y: '80vh', rotateX: 75, rotateZ: -14, scale: 0.6 }}
            animate={{ y: 0, rotateX: 0, rotateZ: -2, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 70, damping: 13, mass: 1.1 }}
          >
            <motion.article className="ticket" style={{ rotateX: rx, rotateY: ry }}>
              <header className="ticket-cab">
                <span className="aerolinea">
                  <Avion /> {t.aerolinea}
                </span>
                <span className="pase">Boarding pass</span>
              </header>

              <div className="ruta">
                <div>
                  <b>{t.origenCodigo}</b>
                  <span>{t.origenCiudad}</span>
                </div>
                <div className="ruta-linea">
                  <i />
                  <motion.span
                    className="ruta-avion"
                    initial={{ left: '0%' }}
                    animate={{ left: '100%' }}
                    transition={{ delay: 2, duration: 2.4, ease: [0.5, 0, 0.2, 1] }}
                  >
                    <Avion />
                  </motion.span>
                </div>
                <div className="der">
                  <b>{t.destinoCodigo}</b>
                  <span>{t.destinoCiudad}</span>
                </div>
              </div>

              <div className="datos">
                <Dato k="Pasajera" v={t.pasajera} nota={config.para} />
                <Dato k="Clase" v={t.clase} />
                <Dato k="Vuelo" v={t.vuelo} />
                <Dato k="Fecha" v={t.fecha} />
                <Dato k="Embarque" v={t.embarque} />
                <Dato k="Asiento" v={t.asiento} nota={t.asientoNota} />
              </div>

              <div className="corte" />

              <footer className="talon">
                <div className="barras" aria-hidden>
                  {barras.map((w, i) => (
                    <i key={i} style={{ width: w }} />
                  ))}
                </div>
                <div className="talon-txt">
                  <span>Puerta</span>
                  <b>{t.puerta}</b>
                </div>
              </footer>

              <motion.div className="holo" style={{ backgroundPositionX: brillo }} />
            </motion.article>
          </motion.div>
        </div>

        <motion.p
          className="firma"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.2 }}
        >
          {t.firma}
        </motion.p>
        <motion.button
          className="repetir"
          onClick={alRepetir}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          ↺ {t.repetir}
        </motion.button>
      </div>
    </motion.section>
  )
}
