/** Música opcional (public/musica.mp3) + campanitas sintetizadas con Web Audio */
let ctx: AudioContext | null = null
let musica: HTMLAudioElement | null = null
let silencio = false
const oyentes = new Set<(hay: boolean) => void>()

export function alHaberMusica(f: (hay: boolean) => void) {
  oyentes.add(f)
  return () => void oyentes.delete(f)
}

/** Llamar dentro de un toque del usuario (los navegadores lo exigen) */
export function iniciarAudio() {
  try {
    ctx ??= new AudioContext()
    void ctx.resume()
  } catch {
    /* sin audio */
  }
  if (!musica) {
    musica = new Audio(`${import.meta.env.BASE_URL}musica.mp3`)
    musica.loop = true
    musica.volume = 0
    musica.addEventListener('playing', () => {
      oyentes.forEach((f) => f(true))
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
}

export function alternarSilencio() {
  silencio = !silencio
  if (musica) musica.muted = silencio
  return silencio
}

/** Arpegio brillante para cuando se abre el cofre o el regalo */
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
    g.gain.linearRampToValueAtTime(0.11, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
    o.connect(g).connect(ctx!.destination)
    o.start(t)
    o.stop(t + 1.7)
  })
}
