import React, { useEffect, useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
import { useModelLoader } from '@/store/useModelLoader'
import { Box3, Group, Vector3 } from 'three'

interface ModelProps {
  path: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  center?: boolean
}

export const Model = ({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  center = false,
}: ModelProps) => {
  const { model, loading, error } = useModelLoader(path, 'gltf', { scale })
  const groupRef = useRef<Group>(null)
  // const groupRef = useRef<THREE.Group>(null)

  // Center the model if requested
  useEffect(() => {
    if (model && center && groupRef.current) {
      // Calculate the bounding box of the model
      const box = new Box3().setFromObject(model)
      const center = new Vector3()
      box.getCenter(center)

      // Offset the model to center it
      model.position.x = -center.x
      model.position.y = -center.y
      model.position.z = -center.z
    }
  }, [model, center])

  // Optional: Add animation
  // useFrame(() => {
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.005
  //   }
  // })

  if (loading) return null
  if (error) return null

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {model && <primitive object={model} />}
    </group>
  )
}
