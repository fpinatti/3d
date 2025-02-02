import { Canvas } from '@react-three/fiber'
import Camera from '@/components/common/Camera'
import Lights from '@/components/common/Lights'
import { Physics } from '@react-three/rapier'
import { Leva } from 'leva'
import { Environment } from '@react-three/drei'
import Platform from '@/components/Platform'
import Player from '@/components/entities/Player'

import Controls from '@/components/controls'
import Bomb from '@/components/entities/Player/components/bomb'
import usePlayer from '@/hooks/store/usePlayer'
import useGlobal from '@/hooks/store/useGlobal'
import { ILevelData } from '@/app/page'
import Enemy from '@/components/entities/Enemy'
import RescueGuy from '@/components/entities/RescueGuy'
import { useState } from 'react'
import Lamp from '@/components/Lamp'

interface BaseLevelProps {
  levelData: ILevelData
}

const BaseLevel = ({ levelData }: BaseLevelProps) => {
  const { bombsPlanted, clearAllBombs, snapshotPlayerPosition } = usePlayer()
  const { currentLevel } = useGlobal()
  const [level, setLevel] = useState(currentLevel)

  if (level !== currentLevel) {
    setLevel(currentLevel)
    clearAllBombs()
  }

  return (
    <>
      <div className="z-50 fixed bottom-0 left-0">
        <Controls />
      </div>
      <Leva hidden />
      <Canvas camera={{ position: [0, 5, 15], fov: 75 }} shadows>
        <Camera />
        <Lights />
        <Physics debug>
          <Player
            position={
              snapshotPlayerPosition || levelData[currentLevel].player.position
            }
            key={levelData[currentLevel].player.id}
          />
          {/* <Enemy position={[-2, 4, 0]} />
          <RescueGuy position={[-5.5, 3.3, 0]} /> */}

          {levelData[currentLevel].objects?.map((object, idx) => {
            if (object.type === 'lamp') {
              return (
                <Lamp
                  key={`${currentLevel}-${idx}`}
                  position={object.position}
                />
              )
            }
          })}
          {levelData[currentLevel].enemies?.map((enemy, idx) => {
            return (
              <Enemy
                key={`${currentLevel}-${idx}`}
                position={enemy.position}
                rotation={enemy.rotation}
                type={enemy.type}
              />
            )
          })}
          {levelData[currentLevel].rescueGuy?.map((rescueGuy, idx) => {
            return (
              <RescueGuy
                key={`${currentLevel}-${idx}`}
                position={rescueGuy.position}
                actionData={rescueGuy.actionData}
              />
            )
          })}
          {bombsPlanted.map((bomb, idx) => {
            return (
              <Bomb
                key={`${currentLevel}-${idx}`}
                position={bomb.position}
                id={bomb.id}
                isExploded={bomb.isExploded}
              />
            )
          })}
          {levelData[currentLevel].platforms.map((platform, idx) => {
            return (
              <Platform
                key={`${currentLevel}-${idx}`}
                size={platform.size}
                position={platform.position}
                color={platform.color}
                type={platform.type}
                actionData={platform.actionData}
              />
            )
          })}
          {/* back wall */}
          <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
            <boxGeometry args={[18, 12, 1]} />
            <meshStandardMaterial color={0x444444} />
          </mesh>
        </Physics>
        {/* <Environment files={'./assets/textures/env.hdr'} /> */}
      </Canvas>
    </>
  )
}

export default BaseLevel
