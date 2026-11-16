import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { useState } from 'react'
import * as THREE from 'three'
import type { Etapa } from '../tipos'
import { Cofre } from './Cofre'
import { Regalo } from './Regalo'

/** Cámara: se acerca sola hacia la luz cuando algo se abre */
function Camara({ etapa }: { etapa: Etapa }) {
  useFrame(({ camera }, dt) => {
    const cerca = etapa === 'abriendo' || etapa === 'abriendoRegalo'
    const z = cerca ? 4.6 : 8
    const y = cerca ? 0.5 : 1.1
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, cerca ? 0.9 : 3, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y, cerca ? 0.9 : 3, dt)
    camera.lookAt(0, cerca ? 0.2 : -0.1, 0)
  })
  return null
}

/** Achica los objetos para que entren en pantallas angostas (celular vertical) */
function Ajuste({ children }: { children: React.ReactNode }) {
  const ancho = useThree((s) => s.viewport.getCurrentViewport(s.camera, [0, 0, 0]).width)
  const escala = Math.min(1.15, ancho / 3.75)
  return <group scale={escala}>{children}</group>
}

export function Escena({ etapa }: { etapa: Etapa }) {
  const [lista, setLista] = useState(false)
  return (
    <Canvas
      className={lista ? 'escena lista' : 'escena'}
      onCreated={() => setTimeout(() => setLista(true), 150)}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.1, 8], fov: 42 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0d0818']} />
      <fog attach="fog" args={['#0d0818', 9, 20]} />
      <ambientLight intensity={0.35} color="#b79cff" />
      <directionalLight position={[3, 6, 5]} intensity={1.6} color="#ffe2b8" />
      <directionalLight position={[-5, 2, -3]} intensity={0.9} color="#d9506e" />

      {/* reflejos para el dorado, sin descargar nada */}
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={5} color="#ffd9a0" position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={3} color="#ff8fa8" position={[-5, 1, 2]} scale={[3, 5, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={3} color="#ffe9c4" position={[5, 1, 3]} scale={[3, 5, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 1, 7]} scale={3} />
      </Environment>

      <Sparkles count={90} scale={[9, 11, 5]} size={2.6} speed={0.35} opacity={0.85} color="#ffd98a" />
      <Sparkles count={40} scale={[8, 10, 4]} size={4} speed={0.2} opacity={0.5} color="#ff9db5" />

      <Camara etapa={etapa} />
      <Ajuste>
        <Cofre etapa={etapa} />
        <Regalo etapa={etapa} />
      </Ajuste>

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.72} luminanceSmoothing={0.2} radius={0.75} />
        <Vignette darkness={0.72} offset={0.25} />
      </EffectComposer>
    </Canvas>
  )
}
