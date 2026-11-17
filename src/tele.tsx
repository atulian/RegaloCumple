import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'motion/react'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/caveat/500.css'
import '@fontsource-variable/inter'
import './estilos.css'
import './tele.css'
import { config } from './config'
import { Perrita } from './pantallas/Perrita'
import { QR } from './pantallas/QR'

const t = config.tele

// Para ensayar: tele.html?probar=15 revela a los 15 segundos
const probar = new URLSearchParams(location.search).get('probar')
const meta = probar !== null ? Date.now() + (Number(probar) || 10) * 1000 : new Date(t.revelar).getTime()

const dos = (n: number) => String(n).padStart(2, '0')
const GLOBOS = ['#ff6f91', '#f0c877', '#8fd3c8', '#ffb36b', '#c79bff', '#ff8fa8', '#fff1c9', '#8fd3c8']

function Tele() {
  const [falta, setFalta] = useState(() => meta - Date.now())
  const listo = falta <= 0

  useEffect(() => {
    if (listo) return
    const i = setInterval(() => setFalta(meta - Date.now()), 250)
    return () => clearInterval(i)
  }, [listo])

  // que la pantalla no se apague mientras espera
  useEffect(() => {
    const pedir = () => (navigator as any).wakeLock?.request('screen').catch(() => {})
    pedir()
    document.addEventListener('visibilitychange', pedir)
    document.addEventListener('pointerdown', pedir)
    return () => {
      document.removeEventListener('visibilitychange', pedir)
      document.removeEventListener('pointerdown', pedir)
    }
  }, [])

  useEffect(() => {
    if (!listo) return
    const colores = ['#f0c877', '#ff6f91', '#8fd3c8', '#c79bff', '#ffffff']
    const tiro = () => {
      confetti({ particleCount: 110, spread: 80, startVelocity: 55, angle: 60, origin: { x: 0, y: 0.85 }, colors: colores })
      confetti({ particleCount: 110, spread: 80, startVelocity: 55, angle: 120, origin: { x: 1, y: 0.85 }, colors: colores })
    }
    const ts = [600, 1700, 3000, 4600].map((d) => setTimeout(tiro, d))
    const cada = setInterval(tiro, 20000)
    return () => {
      ts.forEach(clearTimeout)
      clearInterval(cada)
    }
  }, [listo])

  const s = Math.max(0, Math.ceil(falta / 1000))
  const reloj = `${dos(Math.floor(s / 3600))}:${dos(Math.floor((s % 3600) / 60))}:${dos(s % 60)}`

  return (
    <main className="tele">
      <div className="tele-borde" />
      <div className="tele-estrellas" />
      <AnimatePresence mode="wait">
        {!listo ? (
          <motion.section
            key="espera"
            className="tele-espera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(14px)' }}
            transition={{ duration: 1 }}
          >
            <p className="saludo">{t.espera}</p>
            <p className="tele-reloj">{reloj}</p>
            <div className="tele-perrita">
              <span className="globo-texto">{t.globoEspera}</span>
              <Perrita />
            </div>
          </motion.section>
        ) : (
          <motion.section key="qr" className="tele-qr" initial="a" animate="b" transition={{ staggerChildren: 0.3, delayChildren: 0.5 }}>
            <div className="globos" aria-hidden>
              {GLOBOS.map((c, i) => (
                <span key={i} className="globo" style={{ left: `${4 + i * 12.5}%`, background: c, color: c, animationDelay: `${-i * 1.7}s`, animationDuration: `${12 + (i % 3) * 1.5}s` }} />
              ))}
            </div>
            <div className="tele-texto">
              {[
                <p className="para">Para {config.para}</p>,
                <p className="saludo">{t.saludo}</p>,
                <h1 className="titulo-xl">{t.titulo}</h1>,
                <p className="bajada">{t.texto}</p>,
              ].map((el, i) => (
                <motion.div key={i} variants={{ a: { opacity: 0, y: 24, filter: 'blur(10px)' }, b: { opacity: 1, y: 0, filter: 'blur(0px)' } }} transition={{ duration: 1.1 }}>
                  {el}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="tele-codigo"
              variants={{ a: { opacity: 0, scale: 0.5, rotate: -8 }, b: { opacity: 1, scale: 1, rotate: 0 } }}
              transition={{ type: 'spring', stiffness: 90, damping: 11 }}
            >
              <div className="qr-marco">
                <QR texto={config.url} />
              </div>
              <p className="pista">
                <span className="pulso" />
                {t.pista}
              </p>
            </motion.div>
            <motion.div className="tele-perrita" variants={{ a: { opacity: 0, y: 40 }, b: { opacity: 1, y: 0 } }}>
              <span className="globo-texto">{t.globo}</span>
              <Perrita gorro salta />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
      <motion.div className="destello" initial={{ opacity: 0 }} animate={listo ? { opacity: [0, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.6, times: [0, 0.25, 1] }} />
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<Tele />)
