import {
  useTexture,
  MeshReflectorMaterial,
  Sphere,
  useGLTF,
} from '@react-three/drei'
import { MeshProps } from '@react-three/fiber'
import {
  BallCollider,
  RapierRigidBody,
  RigidBody,
  useRopeJoint,
} from '@react-three/rapier'
import { useRef } from 'react'
import * as THREE from 'three'

interface CloudProps extends MeshProps {
  size?: number
}
const Cloud = ({ size, ...props }: CloudProps) => {
  const anchor = useRef<RapierRigidBody>(null)
  const ball = useRef<RapierRigidBody>(null)
  const ropeLength = 12
  const anchorPosition: [number, number, number] = [0, 20, -5]
  const ballPosition: [number, number, number] = [3, 20, -5]

  useRopeJoint(anchor, ball, [[0, 0, 0], [0, 0, 0], ropeLength])

  const model = useGLTF('assets/models/cloud.glb')
  return (
    <group>
      {/* Anchor */}
      <RigidBody ref={anchor} position={anchorPosition} />

      {/* Cloud */}
      <RigidBody
        position={ballPosition}
        ref={ball}
        restitution={1.2}
        density={3}
        colliders={false}
      >
        <mesh receiveShadow scale={2}>
          <primitive object={model.scene} />
          <meshStandardMaterial color={'cyan'} metalness={1} roughness={0.3} />
        </mesh>
        <BallCollider args={[2]} density={1} restitution={1000} />
      </RigidBody>
    </group>
  )
}

export default Cloud
