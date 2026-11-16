import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Etapa } from './tipos'
import { config } from './config'
import { Escena } from './escena/Escena'
import { Album } from './pantallas/Album'
import { Cumple } from './pantallas/Cumple'
import { Ticket } from './pantallas/Ticket'
import { alHaberMusica, alternarSilencio, campanitas, iniciarAudio } from './sonido'

const aparecer = {
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -14, filter: 'blur(8px)', transition: { duration: 0.35 } },
}

export default function App() {
  const [etapa, setEtapa] = useState<Etapa>('intro')
  const [hayMusica, setHayMusica] = useState(false)
  const [mudo, setMudo] = useState(false)

  useEffect(() => alHaberMusica(setHayMusica), [])

  // las aperturas duran un tiempo fijo y después pasan solas a la siguiente escena
  useEffect(() => {
    if (etapa === 'abriendo') {
      const t = setTimeout(() => setEtapa('album'), 2900)
      return () => clearTimeout(t)
    }
    if (etapa === 'abriendoRegalo') {
      const t = setTimeout(() => setEtapa('ticket'), 2250)
      return () => clearTimeout(t)
    }
  }, [etapa])

  const abrirCofre = useCallback(() => {
    iniciarAudio()
    campanitas()
    setEtapa('abriendo')
  }, [])

  const abrirRegalo = useCallback(() => {
    iniciarAudio()
    campanitas(659.25)
    setEtapa('abriendoRegalo')
  }, [])

  const destello =
    etapa === 'abriendo'
      ? { opacity: 1, transition: { delay: 2.05, duration: 0.8, ease: 'easeIn' as const } }
      : etapa === 'abriendoRegalo'
        ? { opacity: 1, transition: { delay: 1.5, duration: 0.7, ease: 'easeIn' as const } }
        : { opacity: 0, transition: { duration: 1.3, ease: 'easeOut' as const } }

  return (
    <main className="app">
      <Escena etapa={etapa} />

      <AnimatePresence mode="wait">
        {etapa === 'intro' && (
          <motion.button
            key="intro"
            className="capa capa-toque"
            onClick={abrirCofre}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{ animate: { transition: { staggerChildren: 0.35, delayChildren: 0.4 } }, exit: {} }}
            aria-label={config.intro.pista}
          >
            <div className="arriba">
              <motion.p className="para" variants={aparecer} transition={{ duration: 1.1 }}>
                Para {config.para}
              </motion.p>
              <motion.p className="saludo" variants={aparecer} transition={{ duration: 1.1 }}>
                {config.intro.saludo}
              </motion.p>
              <motion.h1 className="titulo-xl" variants={aparecer} transition={{ duration: 1.3 }}>
                {config.intro.titulo}
              </motion.h1>
              <motion.p className="bajada" variants={aparecer} transition={{ duration: 1.1 }}>
                {config.intro.texto}
              </motion.p>
            </div>
            <motion.p className="pista" variants={aparecer} transition={{ duration: 1 }}>
              <span className="pulso" />
              {config.intro.pista}
            </motion.p>
          </motion.button>
        )}

        {etapa === 'album' && <Album key="album" alTerminar={() => setEtapa('cumple')} />}

        {etapa === 'cumple' && <Cumple key="cumple" alTerminar={() => setEtapa('regalo')} />}

        {etapa === 'regalo' && (
          <motion.button
            key="regalo"
            className="capa capa-toque"
            onClick={abrirRegalo}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{ animate: { transition: { staggerChildren: 0.5, delayChildren: 0.9 } }, exit: {} }}
            aria-label={config.regalo.pista}
          >
            <div className="arriba">
              <motion.h2 className="titulo-l" variants={aparecer} transition={{ duration: 1.2 }}>
                {config.regalo.titulo}
              </motion.h2>
            </div>
            <motion.p className="pista" variants={aparecer} transition={{ duration: 1 }}>
              <span className="pulso" />
              {config.regalo.pista}
            </motion.p>
          </motion.button>
        )}

        {etapa === 'ticket' && <Ticket key="ticket" alRepetir={() => setEtapa('intro')} />}
      </AnimatePresence>

      <motion.div className="destello" initial={{ opacity: 0 }} animate={destello} />

      {hayMusica && (
        <button
          className="boton-sonido"
          onClick={() => setMudo(alternarSilencio())}
          aria-label={mudo ? 'Activar música' : 'Silenciar música'}
        >
          {mudo ? '♪̸' : '♪'}
        </button>
      )}
    </main>
  )
}
