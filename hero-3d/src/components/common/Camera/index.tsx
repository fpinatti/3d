// import { OrbitControls } from '@react-three/drei'

// const Camera = () => {
//   return (
//     <OrbitControls />
//     // <PerspectiveCamera makeDefault position={[0, 15, 40]} />
//   )
// }

// export default Camera

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

const Camera = () => {
  const { size, set } = useThree()
  const cameraRef = useRef<PerspectiveCamera>(null!)

  useEffect(() => {
    const camera = cameraRef.current
    set({ camera })
  }, [set])

  useFrame(() => {
    // const aspect = size.width / size.height
    // const frustumHeight = 15 // Adjust this value to control how much of the scene is visible
    // let frustumWidth = frustumHeight * aspect

    // if (size.width > size.height) {
    //   // Adjust based on width if width is larger
    //   frustumWidth = frustumHeight * aspect
    //   cameraRef.current.left = -frustumWidth / 2
    //   cameraRef.current.right = frustumWidth / 2
    //   cameraRef.current.top = frustumHeight / 2
    //   cameraRef.current.bottom = -frustumHeight / 2
    // } else {
    //   // Adjust based on height if height is larger
    //   const frustumHeightAdjusted = frustumWidth / aspect
    //   cameraRef.current.left = -frustumWidth / 2
    //   cameraRef.current.right = frustumWidth / 2
    //   cameraRef.current.top = frustumHeightAdjusted / 2
    //   cameraRef.current.bottom = -frustumHeightAdjusted / 2
    // }
    const aspect = size.width / size.height
    const fov = 45 // Field of view (you can adjust this value as needed)
    const near = 0.1
    const far = 1000

    if (size.width > size.height) {
      // Adapt based on width if width is larger
      const frustumHeight = 2 * Math.tan((fov * Math.PI) / 360) * near
      const frustumWidth = frustumHeight * aspect
      cameraRef.current.fov =
        (360 / Math.PI) * Math.atan(frustumWidth / (2 * near))
    } else {
      // Adapt based on height if height is larger
      cameraRef.current.fov = fov
    }

    cameraRef.current.aspect = aspect
    cameraRef.current.fov = fov
    cameraRef.current.near = near
    cameraRef.current.far = far
    cameraRef.current.updateProjectionMatrix()
  })

  return <PerspectiveCamera ref={cameraRef} position={[0, 0, 15]} makeDefault />
}

export default Camera
