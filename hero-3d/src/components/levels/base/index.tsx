import { Canvas } from '@react-three/fiber'
import Camera from '@/components/common/Camera'
import Lights from '@/components/common/Lights'
import { Physics } from '@react-three/rapier'
import { Leva } from 'leva'
import { Environment } from '@react-three/drei'
import Platform from '@/components/Platform'
import Player from '@/components/Player'
import * as THREE from 'three'
import Controls from '@/components/controls'
import Bomb from '@/components/Player/components/bomb'
import usePlayer from '@/hooks/store/usePlayer'

const BaseLevel = () => {
  const { bombsPlanted } = usePlayer()

  return (
    <>
      <div className="z-50 fixed bottom-0 left-0">
        <Controls />
      </div>
      <Leva hidden />
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} shadows>
        <Camera />
        <Lights />
        <Physics debug>
          <Player position={[-4, 4, 0]} />
          {bombsPlanted.map((bomb, idx) => {
            return (
              <Bomb
                key={idx}
                position={bomb.position}
                id={bomb.id}
                isExploded={bomb.isExploded}
              />
            )
          })}
          <Platform size={[7, 3, 3]} position={[-4.5, 1, 0]} />
          <Platform size={[7, 3, 3]} position={[4.5, 1, 0]} />
          <Platform
            size={[1, 3, 3]}
            position={[-7.5, 4, 0]}
            color={new THREE.Color(0x0accaa)}
          />
          <Platform
            size={[1, 3, 3]}
            position={[-1.5, 4, 0]}
            color={new THREE.Color(0x0accaa)}
            type="explodable"
          />
          <Platform
            size={[2, 3, 3]}
            position={[7, 4, 0]}
            color={new THREE.Color(0x0accaa)}
          />
          <Platform
            size={[2, 3, 3]}
            position={[-7, 7, 0]}
            color={new THREE.Color(0x0acc00)}
          />
          <Platform
            size={[1, 3, 3]}
            position={[-1.5, 7, 0]}
            color={new THREE.Color(0x0acc00)}
          />
          <Platform
            size={[3, 3, 3]}
            position={[6.5, 7, 0]}
            color={new THREE.Color(0x0acc00)}
          />
          <Platform
            position={[0, -1, 0]}
            size={[16, 1, 3]}
            color={new THREE.Color(0xaabb23)}
          />
        </Physics>
        <Environment files={'./assets/textures/env.hdr'} />
      </Canvas>
    </>
  )
}

export default BaseLevel
