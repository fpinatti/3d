'use client'

interface MissileProps {
  position: [number, number, number]
  target: [number, number, number]
  isEnemy: boolean
}

export function Missile({ position, isEnemy }: MissileProps) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.1, 0.1, 0.8]} />
      <meshStandardMaterial color={isEnemy ? '#ff4444' : '#44ff44'} />
    </mesh>
  )
}