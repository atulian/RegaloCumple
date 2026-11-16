import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Etapa } from '../tipos'
import { Estallido } from './Estallido'
import { easeInCubic, easeOutBack, texturaHalo, texturaHaz, texturaMadera, tramo } from './util'

const W = 2.2
const H = 1.0
const D = 1.4

function medioCilindro(radio: number, largo: number) {
  const s = new THREE.Shape()
  s.absarc(0, 0, radio, 0, Math.PI, false)
  s.lineTo(radio, 0)
  const g = new THREE.ExtrudeGeometry(s, { depth: largo, bevelEnabled: false, curveSegments: 40 })
  g.translate(0, 0, -largo / 2)
  g.rotateY(Math.PI / 2)
  return g
}

export function Cofre({ etapa }: { etapa: Etapa }) {
  const grupo = useRef<THREE.Group>(null)
  const tapa = useRef<THREE.Group>(null)
  const luz = useRef<THREE.PointLight>(null)
  const inicio = useRef<number | null>(null)

  const r = useMemo(() => {
    const madera = texturaMadera()
    return {
      tapaGeo: medioCilindro(D / 2, W),
      bandaGeo: medioCilindro(D / 2 + 0.025, 0.16),
      madera: new THREE.MeshStandardMaterial({ map: madera, roughness: 0.62, metalness: 0.05 }),
      oro: new THREE.MeshStandardMaterial({ color: '#f0c063', roughness: 0.22, metalness: 1 }),
      brillo: new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 2.7, 1.1), toneMapped: false }),
      haz: new THREE.MeshBasicMaterial({
        color: new THREE.Color(2.2, 1.6, 0.8),
        alphaMap: texturaHaz(),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
      piso: new THREE.MeshBasicMaterial({
        map: texturaHalo(),
        color: '#e9a94e',
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    }
  }, [])

  const visible = etapa === 'intro' || etapa === 'abriendo'

  useFrame(({ clock }) => {
    const g = grupo.current
    if (!g || !tapa.current || !luz.current) return
    const ahora = clock.elapsedTime
    if (etapa === 'abriendo' && inicio.current === null) inicio.current = ahora
    if (etapa === 'intro') inicio.current = null
    const t = inicio.current === null ? -1 : ahora - inicio.current

    // reposo: flota y late
    g.position.y = -1.25 + Math.sin(ahora * 1.2) * 0.05
    g.rotation.y = -0.38 + Math.sin(ahora * 0.5) * 0.09
    const latido = 0.5 + 0.5 * Math.sin(ahora * 2.4)

    if (t < 0) {
      tapa.current.rotation.x = -0.035 - latido * 0.02
      g.rotation.z = 0
      luz.current.intensity = 1 + latido * 1.6
      r.haz.opacity = 0
      r.piso.opacity = 0.25 + latido * 0.15
      return
    }
    // 1) tiembla  2) se abre la tapa  3) sale la luz
    const temblor = tramo(t, 0, 0.75) * (1 - tramo(t, 0.75, 1.0))
    g.rotation.z = Math.sin(t * 46) * 0.035 * temblor
    g.position.x = Math.sin(t * 61) * 0.02 * temblor
    const abre = easeOutBack(tramo(t, 0.7, 1.7))
    tapa.current.rotation.x = -0.05 - abre * 1.85
    const fuerza = tramo(t, 0.7, 1.6)
    luz.current.intensity = 3 + fuerza * 45
    r.haz.opacity = fuerza * 0.42 + easeInCubic(tramo(t, 1.8, 2.8)) * 0.5
    r.piso.opacity = 0.4 + fuerza * 0.5
  })

  return (
    <group visible={visible}>
      <group ref={grupo} position={[0, -1.25, 0]} rotation={[0, -0.38, 0]}>
        {/* halo en el piso */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} material={r.piso}>
          <planeGeometry args={[6.5, 5]} />
        </mesh>

        {/* cuerpo */}
        <mesh position={[0, H / 2, 0]} material={r.madera}>
          <boxGeometry args={[W, H, D]} />
        </mesh>
        {[-0.72, 0.72].map((x) => (
          <mesh key={x} position={[x, H / 2, 0]} material={r.oro}>
            <boxGeometry args={[0.16, H + 0.02, D + 0.05]} />
          </mesh>
        ))}
        <mesh position={[0, H - 0.045, 0]} material={r.oro}>
          <boxGeometry args={[W + 0.07, 0.09, D + 0.07]} />
        </mesh>
        <mesh position={[0, 0.05, 0]} material={r.oro}>
          <boxGeometry args={[W + 0.07, 0.1, D + 0.07]} />
        </mesh>

        {/* el tesoro: pura luz */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, H + 0.002, 0]} material={r.brillo}>
          <planeGeometry args={[W - 0.12, D - 0.12]} />
        </mesh>
        <pointLight ref={luz} position={[0, H * 0.95, D / 2 + 0.7]} color="#ffc266" intensity={3} distance={9} />
        <mesh position={[0, H + 2.6, 0]} material={r.haz}>
          <cylinderGeometry args={[2.1, 0.62, 5.2, 40, 1, true]} />
        </mesh>

        {/* tapa con bisagra atrás */}
        <group ref={tapa} position={[0, H, -D / 2]}>
          <group position={[0, 0, D / 2]}>
            <mesh geometry={r.tapaGeo} material={r.madera} scale={[1, 0.72, 1]} />
            {[-0.72, 0.72].map((x) => (
              <mesh key={x} geometry={r.bandaGeo} material={r.oro} position={[x, 0, 0]} scale={[1, 0.72, 1]} />
            ))}
            <mesh position={[0, 0.04, 0]} material={r.oro}>
              <boxGeometry args={[W + 0.07, 0.08, D + 0.07]} />
            </mesh>
            {/* cerradura */}
            <mesh position={[0, -0.1, D / 2 + 0.05]} material={r.oro}>
              <boxGeometry args={[0.32, 0.4, 0.07]} />
            </mesh>
            <mesh position={[0, -0.12, D / 2 + 0.087]}>
              <circleGeometry args={[0.055, 24]} />
              <meshBasicMaterial color="#1a0d06" />
            </mesh>
          </group>
        </group>

        <Estallido activo={etapa === 'abriendo'} origen={[0, H + 0.1, 0]} />
      </group>
    </group>
  )
}
