import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { texturaHalo } from './util'

const N = 420
const DURACION = 4.2

/** Chorro de chispas doradas que sale hacia arriba cuando `activo` pasa a true */
export function Estallido({ activo, origen }: { activo: boolean; origen: [number, number, number] }) {
  const puntos = useRef<THREE.Points>(null)
  const inicio = useRef<number | null>(null)
  const { geo, vel, mat } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
    const mat = new THREE.PointsMaterial({
      map: texturaHalo(),
      color: new THREE.Color(3, 2.1, 0.9),
      size: 0.16,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
    return { geo, vel: new Float32Array(N * 3), mat }
  }, [])

  useFrame(({ clock }, dt) => {
    const pos = geo.attributes.position as THREE.BufferAttribute
    const a = pos.array as Float32Array
    if (!activo) {
      inicio.current = null
      mat.opacity = 0
      return
    }
    if (inicio.current === null) {
      inicio.current = clock.elapsedTime
      for (let i = 0; i < N; i++) {
        a[i * 3] = origen[0] + (Math.random() - 0.5) * 1.2
        a[i * 3 + 1] = origen[1] - Math.random() * 0.2
        a[i * 3 + 2] = origen[2] + (Math.random() - 0.5) * 0.7
        const ang = Math.random() * Math.PI * 2
        const abre = Math.pow(Math.random(), 0.7) * 2.4
        vel[i * 3] = Math.cos(ang) * abre
        vel[i * 3 + 1] = 2.5 + Math.random() * 6.5
        vel[i * 3 + 2] = Math.sin(ang) * abre * 0.7
      }
    }
    const edad = clock.elapsedTime - inicio.current
    const d = Math.min(dt, 0.05)
    for (let i = 0; i < N; i++) {
      vel[i * 3 + 1] -= 3.2 * d
      vel[i * 3] *= 1 - 0.6 * d
      vel[i * 3 + 2] *= 1 - 0.6 * d
      a[i * 3] += vel[i * 3] * d
      a[i * 3 + 1] += vel[i * 3 + 1] * d
      a[i * 3 + 2] += vel[i * 3 + 2] * d
    }
    pos.needsUpdate = true
    mat.opacity = Math.max(0, 1 - edad / DURACION)
  })

  return <points ref={puntos} geometry={geo} material={mat} frustumCulled={false} />
}
