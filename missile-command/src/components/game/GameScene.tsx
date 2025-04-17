'use client'

import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { City } from '../city'
import { Missile } from '../missile'
import { useGameLogic } from './hooks/useGameLogic'
import { Defense } from '../defense'
import useGameStore from '@/store/useGameStore'
import { Model } from '../utils/model'
// import { Center } from '@react-three/drei'
// import SpaceMaterial from '@/shaders/space/shader'
// import { useRef } from 'react'
// import { vec2 } from 'three/tsl'

interface GameSceneProps {
  level: number
  onScoreUpdate: (points: number) => void
  onGameOver: () => void
  onNextLevel: () => void
}

export function GameScene({ level, onGameOver, onNextLevel }: GameSceneProps) {
  const { setMissiles, missiles, setDefenses, defenses, handleClick, updateGame, currentCities } =
    useGameLogic({
      level,
      onGameOver,
      onNextLevel,
    })

  // const testMaterial = useRef(null as any)

  // useFrame(({ clock }) => {
  // const elapsedTime = clock.getElapsedTime()
  // testMaterial.current.material.uniforms.u_time.value += 0.00005
  // testMaterial.current.material.uniforms.uTime.value = elapsedTime
  // testMaterial.current.material.uniforms.uResolution.value = vec2(1000, 1000)
  // console.log(testMaterial.current.material.uniforms)
  // scene.traverse((object) => {
  //   if (object.material && object.material.uniforms) {
  //     object.material.uniforms.uTime.value = elapsedTime;
  //   }
  // });
  // })

  // if (testMaterial?.current) {
  //   testMaterial.current.material.uniforms.u_resolution.value.x = 300 //normalize(renderer.domElement.width,0,renderer.domElement.width);
  //   testMaterial.current.material.uniforms.u_resolution.value.y = 300
  // }

  const { updateScore, score } = useGameStore()
  // Game loop
  useFrame(() => {
    updateGame()
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* <mesh material={SpaceMaterial} ref={testMaterial}>
        <sphereGeometry args={[10, 10, 10]} />
      </mesh> */}

      {/* Ground */}
      <RigidBody type="fixed" name="ground">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.5, 0]}>
          <planeGeometry args={[50, 30]} />
          <meshStandardMaterial color="#3a7e4c" />
        </mesh>
      </RigidBody>

      {/* Cities */}
      {currentCities.map((city) => (
        <City key={city.id} position={city.position} id={city.id} />
      ))}

      {/* Missile Base */}
      {/* <Center> */}
      <Model path="/assets/rocket_baseB.glb" scale={3} position={[-6, 0, -8]} />
      {/* </Center> */}
      {/* <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color="#555555" />
      </mesh> */}

      {/* Enemy Missiles */}
      {missiles.map((missile) => (
        <Missile
          key={missile.id}
          id={missile.id}
          position={missile.position}
          target={missile.target}
          isEnemy={true}
          onCompleteProjectile={() => {
            // Remove the enemy missile
            setMissiles((prev) => prev.filter((m) => m.id !== missile.id))
          }}
        />
      ))}

      {/* Defense Missiles */}
      {/* {defenses.map((defense) => (
        <Defense
          key={defense.id}
          position={defense.position}
          target={defense.target}
          onCompleteProjectile={() => {
            // Remove the defense missile
            setDefenses((prev) => prev.filter((d) => d.id !== defense.id))
          }}
          onCollideWithEnemy={(missileId) => {
            // Remove the defense missile
            setMissiles((prev) => prev.filter((m) => m.id !== missileId))
            updateScore(score + 10)
          }}
        />
      ))} */}

      {/* Click handler for firing defense missiles */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        // visible={false}
      >
        <boxGeometry args={[50, 1, 40]} />
        <meshBasicMaterial transparent opacity={0.1} />
      </mesh>
    </>
  )
}
