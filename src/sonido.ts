/**
 * Música de fondo + campanitas sintetizadas con Web Audio.
 * La música sale del video de YouTube indicado en config.musica.youtube;
 * si no hay video (o no se puede insertar) usa public/musica.mp3 si existe.
 */
import { config } from './config'

let ctx: AudioContext | null = null
let musica: HTMLAudioElement | null = null
let silencio = false
const oyentes = new Set<(hay: boolean) => void>()
const avisar = () => oyentes.forEach((f) => f(true))

// ---- YouTube ----
/* eslint-disable @typescript-eslint/no-explicit-any */
let yt: any = null
let ytLista = false
let ytFallo = !config.musica.youtube
let quiereSonar = false

/** Carga el reproductor apenas abre la página, así ya está listo para el primer toque */
export function prepararMusica() {
  const id = config.musica.youtube
  if (!id || document.getElementById('yt-musica')) return
  const caja = document.createElement('div')
  caja.className = 'yt-caja'
  caja.setAttribute('aria-hidden', 'true')
  const destino = document.createElement('div')
  destino.id = 'yt-musica'
  caja.appendChild(destino)
  document.body.appendChild(caja)
  ;(window as any).onYouTubeIframeAPIReady = () => {
    yt = new (window as any).YT.Player('yt-musica', {
      width: 200,
      height: 200,
      videoId: id,
      playerVars: { playsinline: 1, controls: 0, disablekb: 1, rel: 0, loop: 1, playlist: id, start: config.musica.desdeSegundo },
      events: {
        onReady: () => {
          ytLista = true
          yt.setVolume(70)
          if (quiereSonar) yt.playVideo()
        },
        onStateChange: (e: any) => {
          if (e.data === 1) avisar()
        },
        onError: () => {
          ytFallo = true // el video no deja insertarse: probamos con el mp3
          if (quiereSonar) sonarMp3()
        },
      },
    })
  }
  const s = document.createElement('script')
  s.src = 'https://www.youtube.com/iframe_api'
  s.onerror = () => (ytFallo = true)
  document.head.appendChild(s)
}

function sonarMp3() {
  if (musica) return
  musica = new Audio(`${import.meta.env.BASE_URL}musica.mp3`)
  musica.loop = true
  musica.volume = 0
  musica.muted = silencio
  musica.addEventListener('playing', () => {
    avisar()
    const sube = setInterval(() => {
      if (!musica) return
      musica.volume = Math.min(0.7, musica.volume + 0.035)
      if (musica.volume >= 0.7) clearInterval(sube)
    }, 120)
  })
  musica.play().catch(() => {
    /* no hay musica.mp3: seguimos sin música */
  })
}

export function alHaberMusica(f: (hay: boolean) => void) {
  oyentes.add(f)
  return () => void oyentes.delete(f)
}

/** Llamar dentro de un toque del usuario (los navegadores lo exigen). Se puede llamar varias veces. */
export function iniciarAudio() {
  try {
    ctx ??= new AudioContext()
    void ctx.resume()
  } catch {
    /* sin audio */
  }
  quiereSonar = true
  if (ytFallo) return sonarMp3()
  if (ytLista && yt.getPlayerState() !== 1) yt.playVideo()
}

export function alternarSilencio() {
  silencio = !silencio
  if (musica) musica.muted = silencio
  if (ytLista) silencio ? yt.mute() : yt.unMute()
  return silencio
}

/** Arpegio brillante para cuando se abre el sobre, el cofre o el regalo */
export function campanitas(base = 523.25) {
  if (!ctx || silencio) return
  const notas = [1, 1.25, 1.5, 2, 2.5, 3, 4]
  notas.forEach((n, i) => {
    const t = ctx!.currentTime + 0.55 + i * 0.09
    const o = ctx!.createOscillator()
    const g = ctx!.createGain()
    o.type = 'sine'
    o.frequency.value = base * n
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.07, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
    o.connect(g).connect(ctx!.destination)
    o.start(t)
    o.stop(t + 1.7)
  })
}
