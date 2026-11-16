import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Etapa } from '../tipos'
import { Estallido } from './Estallido'
import { easeInCubic, easeOutBack, easeOutCubic, texturaHalo, texturaHaz, tramo } from './util'

const A = 1.5 // ancho
const H = 1.1

export function Regalo({ etapa }: { etapa: Etapa }) {
  const grupo = useRef<THREE.Group>(null)
  const tapa = useRef<THREE.Group>(null)
  const luz = useRef<THREE.PointLight>(null)
  const aparece = useRef<number | null>(null)
  const abre = useRef<number | null>(null)

  const r = useMemo(
    () => ({
      papel: new THREE.MeshStandardMaterial({ color: '#a3213f', roughness: 0.45, metalness: 0.1 }),
      cinta: new THREE.MeshStandardMaterial({ color: '#f3c56a', roughness: 0.35, metalness: 0.55, emissive: '#6b4409', emissiveIntensity: 0.6 }),
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
        opacity: 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    }),
    [],
  )

  const visible = etapa === 'regalo' || etapa === 'abriendoRegalo'

  useFrame(({ clock }) => {
    const g = grupo.current
    if (!g || !tapa.current || !luz.current) return
    const ahora = clock.elapsedTime
    if (!visible) {
      aparece.current = null
      abre.current = null
      return
    }
    if (aparece.current === null) aparece.current = ahora
    if (etapa === 'abriendoRegalo' && abre.current === null) abre.current = ahora

    // entrada: cae y rebota
    const e = tramo(ahora - aparece.current, 0.15, 1.15)
    const escala = Math.max(0.001, easeOutBack(e))
    g.scale.setScalar(escala)
    g.position.y = -1.3 + (1 - easeOutCubic(e)) * 3 + Math.sin(ahora * 1.2) * 0.05
    g.rotation.y = 0.55 + Math.sin(ahora * 0.6) * 0.18
    const latido = 0.5 + 0.5 * Math.sin(ahora * 2.4)

    const t = abre.current === null ? -1 : ahora - abre.current
    if (t < 0) {
      tapa.current.position.set(0, 0, 0)
      tapa.current.rotation.set(0, 0, 0)
      g.rotation.z = 0
      luz.current.intensity = 0
      r.haz.opacity = 0
      r.piso.opacity = 0.2 + latido * 0.12
      return
    }
    const temblor = tramo(t, 0, 0.6) * (1 - tramo(t, 0.6, 0.85))
    g.rotation.z = Math.sin(t * 48) * 0.045 * temblor
    g.scale.set(escala * (1 + temblor * 0.05), escala * (1 - temblor * 0.07), escala * (1 + temblor * 0.05))
    const vuela = easeOutCubic(tramo(t, 0.6, 1.9))
    tapa.current.position.set(vuela * 1.2, vuela * 7, -vuela * 1.5)
    tapa.current.rotation.set(-vuela * 2.4, 0, vuela * 1.3)
    const fuerza = tramo(t, 0.6, 1.3)
    luz.current.intensity = fuerza * 60
    r.haz.opacity = fuerza * 0.42 + easeInCubic(tramo(t, 1.2, 2.1)) * 0.5
    r.piso.opacity = 0.35 + fuerza * 0.5
  })

  return (
    <group visible={visible}>
      <group ref={grupo} position={[0, -1.3, 0]} rotation={[0, 0.55, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} material={r.piso}>
          <planeGeometry args={[6, 5]} />
        </mesh>

        {/* caja */}
        <mesh position={[0, H / 2, 0]} material={r.papel}>
          <boxGeometry args={[A, H, A]} />
        </mesh>
        <mesh position={[0, H / 2, 0]} material={r.cinta}>
          <boxGeometry args={[0.26, H + 0.004, A + 0.02]} />
        </mesh>
        <mesh position={[0, H / 2, 0]} material={r.cinta}>
          <boxGeometry args={[A + 0.02, H + 0.004, 0.26]} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, H + 0.003, 0]} material={r.brillo}>
          <planeGeometry args={[A - 0.1, A - 0.1]} />
        </mesh>
        <pointLight ref={luz} position={[0, H + 0.6, 0.4]} color="#ffc266" intensity={0} distance={9} />
        <mesh position={[0, H + 2.6, 0]} material={r.haz}>
          <cylinderGeometry args={[2, 0.6, 5.2, 40, 1, true]} />
        </mesh>

        {/* tapa + moño */}
        <group ref={tapa}>
          <group position={[0, H + 0.14, 0]}>
            <mesh material={r.papel}>
              <boxGeometry args={[A + 0.14, 0.28, A + 0.14]} />
            </mesh>
            <mesh material={r.cinta}>
              <boxGeometry args={[0.28, 0.285, A + 0.16]} />
            </mesh>
            <mesh material={r.cinta}>
              <boxGeometry args={[A + 0.16, 0.285, 0.28]} />
            </mesh>
            {[-1, 1].map((s) => (
              <mesh
                key={s}
                material={r.cinta}
                position={[s * 0.3, 0.3, 0]}
                rotation={[0.25, 0, s * -0.55]}
                scale={[1.25, 0.72, 1.6]}
              >
                <torusGeometry args={[0.24, 0.065, 16, 40]} />
              </mesh>
            ))}
            <mesh material={r.cinta} position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.13, 24, 16]} />
            </mesh>
          </group>
        </group>

        <Estallido activo={etapa === 'abriendoRegalo'} origen={[0, H + 0.1, 0]} />
      </group>
    </group>
  )
}
