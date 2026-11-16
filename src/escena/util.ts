import * as THREE from 'three'

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
/** progreso 0..1 de t entre a y b */
export const tramo = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))
export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
export const easeInCubic = (x: number) => x * x * x
export const easeOutBack = (x: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

function lienzo(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return [c, c.getContext('2d')!] as const
}

/** Punto suave para partículas y halos */
export function texturaHalo() {
  const [c, g] = lienzo(128, 128)
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  r.addColorStop(0, 'rgba(255,255,255,1)')
  r.addColorStop(0.25, 'rgba(255,255,255,.55)')
  r.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = r
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

/** Degradé vertical para el haz de luz (abajo intenso, arriba se apaga) */
export function texturaHaz() {
  const [c, g] = lienzo(4, 128)
  const r = g.createLinearGradient(0, 128, 0, 0)
  r.addColorStop(0, '#ffffff')
  r.addColorStop(0.5, '#555555')
  r.addColorStop(1, '#000000')
  g.fillStyle = r
  g.fillRect(0, 0, 4, 128)
  return new THREE.CanvasTexture(c)
}

/** Madera con tablones y veta, generada en un canvas */
export function texturaMadera() {
  const [c, g] = lienzo(512, 512)
  g.fillStyle = '#6b3d22'
  g.fillRect(0, 0, 512, 512)
  let s = 7
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  for (let i = 0; i < 900; i++) {
    const y = rnd() * 512
    const x = rnd() * 512
    const l = 40 + rnd() * 220
    g.strokeStyle = rnd() > 0.5 ? 'rgba(30,12,4,.22)' : 'rgba(190,120,70,.14)'
    g.lineWidth = 0.6 + rnd() * 1.6
    g.beginPath()
    g.moveTo(x, y)
    g.bezierCurveTo(x + l / 3, y + rnd() * 5 - 2.5, x + (2 * l) / 3, y + rnd() * 5 - 2.5, x + l, y)
    g.stroke()
  }
  for (let y = 0; y <= 512; y += 128) {
    g.fillStyle = 'rgba(15,6,2,.75)'
    g.fillRect(0, y - 3, 512, 6)
    g.fillStyle = 'rgba(255,190,120,.12)'
    g.fillRect(0, y + 3, 512, 2)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}
