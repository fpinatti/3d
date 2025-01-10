import { RefObject, useEffect } from 'react'
import { Object3D, Vector3 } from 'three'

interface AttachToSphereProps {
  elementRef: RefObject<Object3D | null>
  radius: number
  lat: number
  long: number
  offset: { x: number; y: number; z: number }
}

const useAttachToSphere = (
  elementRef: RefObject<Object3D | null>,
  radius: number,
  lat: number,
  long: number,
  offset = { x: 0, y: 0, z: 0 },
) => {
  useEffect(() => {
    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.cos(lat) * Math.sin(long) + offset.x
    const y = radius * Math.sin(lat) + offset.y
    const z = radius * Math.cos(lat) * Math.cos(long) + offset.z
    // Update the position of the object
    elementRef?.current?.position.set(x, y, z)

    // Calculate the normal vector
    const normal = new Vector3(x, y, z).normalize()
    // Align the object's rotation with the normal vector
    const up = new Vector3(0, 1, 0)
    // Up direction
    elementRef?.current?.quaternion.setFromUnitVectors(up, normal)
  }, [lat, long, radius, elementRef])
}

export { useAttachToSphere }
