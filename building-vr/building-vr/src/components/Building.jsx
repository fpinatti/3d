import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Building2(props) {
	const model = useGLTF('./assets/models/building.gltf')
	console.log(model)
//   model.scene.children.forEach((mesh, i) => {
//     console.log(mesh)
// 	  mesh.castShadow = true;
//   })
//   model.castShadow = true;
//   model.scene.castShadow = true;
//   console.log(model)

  return (
	model.scene.children.map((mesh) => {
		console.log('>>', mesh)
		return mesh
	})
	// <mesh>
	// 	<bufferGeometry attach={nodes} />
	// </mesh>
    // <primitive object={nodes} />
	// // <mesh castShadow>
	// // 	<bufferGeometry attach="geometry" {...geo} />
	// // 	<meshStandardMaterial attach="material" {...mat} />
	// // </mesh>
  )
}
