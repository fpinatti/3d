import { useRef, useEffect } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { gsap } from 'gsap'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

interface GameCameraProps {
  initialPosition?: [number, number, number]
  initialLookAt?: [number, number, number]
}

export function GameCamera({
  initialPosition = [0, 15, 20],
  initialLookAt = [0, 0, 0],
}: GameCameraProps) {
  const cameraRef = useRef(null)
  const { set, camera } = useThree()

  // Position and target refs for animations
  const positionRef = useRef(new Vector3(...initialPosition))
  const targetRef = useRef(new Vector3(...initialLookAt))

  // Set up the camera
  useEffect(() => {
    if (cameraRef.current) {
      // getCameraRef(cameraRef.current)
      // Set the main camera to our PerspectiveCamera
      set({ camera: cameraRef.current })

      // Initial camera position
      cameraRef.current.position.set(...initialPosition)
      cameraRef.current.lookAt(...initialLookAt)
    }
  }, [])

  // Example animation function - you can call this from outside
  const animateCameraTo = (
    newPosition: [number, number, number],
    newTarget: [number, number, number],
    duration = 2
  ) => {
    if (cameraRef.current) {
      // Animate position
      gsap.to(positionRef.current, {
        x: newPosition[0],
        y: newPosition[1],
        z: newPosition[2],
        duration,
        ease: 'power2.inOut',
      })

      // Animate target
      gsap.to(targetRef.current, {
        x: newTarget[0],
        y: newTarget[1],
        z: newTarget[2],
        duration,
        ease: 'power2.inOut',
      })
    }
  }

  // Update camera position and lookAt on each frame
  useFrame(() => {
    if (cameraRef.current) {
      // Update camera position from the ref
      cameraRef.current.position.copy(positionRef.current)

      // Make camera look at the target
      cameraRef.current.lookAt(targetRef.current)
    }
  })

  // Example of triggering an animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Example animation - move camera closer to the scene
      animateCameraTo([0, 1, 25], [0, 7, 0], 3)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />
}
