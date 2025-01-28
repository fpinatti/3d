import { Canvas } from '@react-three/fiber'
import Camera from '@/components/common/Camera'
import Lights from '@/components/common/Lights'
import { Physics } from '@react-three/rapier'
import { Leva } from 'leva'
import { Environment } from '@react-three/drei'
import Platform from '@/components/Platform'
import Player from '@/components/Player'

import Controls from '@/components/controls'
import Bomb from '@/components/Player/components/bomb'
import usePlayer from '@/hooks/store/usePlayer'
import useGlobal from '@/hooks/store/useGlobal'
import { ILevelData } from '@/app/page'

interface BaseLevelProps {
  levelData: ILevelData
}

const BaseLevel = ({ levelData }: BaseLevelProps) => {
  const { bombsPlanted } = usePlayer()
  const { currentLevel } = useGlobal()

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
          <Player
            position={levelData[currentLevel].player.position}
            key={levelData[currentLevel].player.id}
          />
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
          {levelData[currentLevel].platforms.map((platform, idx) => {
            return (
              <Platform
                key={idx}
                size={platform.size}
                position={platform.position}
                color={platform.color}
                type={platform.type}
                actionData={platform.actionData}
              />
            )
          })}
        </Physics>
        <Environment files={'./assets/textures/env.hdr'} />
      </Canvas>
    </>
  )
}

export default BaseLevel
