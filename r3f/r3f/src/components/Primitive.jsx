import { Html, PivotControls, PresentationControls, MeshWobbleMaterial } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'

export default function Primitive({ position = [0, 0, 0], type, args = [1, 1, 1] }) {
	const [primitive, setPrimitive] = useState()

	const collider = useRef()
	
	useEffect(() => {
		console.log(collider.current)
		switch (type) {
			case 'sphere':
				setPrimitive(<sphereGeometry args={ args} />)
				break;
			case 'capsule':
				setPrimitive(<capsuleGeometry args={ args} />)
				break;
			case 'circle':
				setPrimitive(<circleGeometry args={ args} />)
				break;
			case 'cone':
				setPrimitive(<coneGeometry args={ args} />)
				break;
			case 'cylinder':
				setPrimitive(<cylinderGeometry args={ args} />)
				break;
			case 'dodecahedron':
				setPrimitive(<dodecahedronGeometry args={ args} />)
				break;
			case 'edges':
				setPrimitive(<edgesGeometry args={ args} />)
				break;
			case 'extrude':
				setPrimitive(<extrudeGeometry args={ args} />)
				break;
			case 'icosahedron':
				setPrimitive(<icosahedronGeometry args={ args} />)
				break;
			case 'lathe':
				setPrimitive(<latheGeometry args={ args} />)
				break;
			case 'octahedron':
				setPrimitive(<octahedronGeometry args={ args} />)
				break;
			case 'plane':
				setPrimitive(<planeGeometry args={ args} />)
				break;
			case 'polyhedron':
				setPrimitive(<polyhedronGeometry args={ args} />)
				break;
			case 'ring':
				setPrimitive(<ringGeometry args={ args} />)
				break;
			case 'shape':
				setPrimitive(<shapeGeometry args={ args} />)
				break;
			case 'tetrahedron':
				setPrimitive(<tetrahedronGeometry args={ args} />)
				break;
			case 'torus':
				setPrimitive(<torusGeometry args={ args} />)
				break;
			case 'torusknot':
				setPrimitive(<torusknotGeometry args={ args} />)
				break;
			case 'tube':
				setPrimitive(<tubeGeometry args={ args} />)
				break;
			case 'wireframe':
				setPrimitive(<wireframeGeometry args={ args} />)
				break;
			default:
				setPrimitive(<boxGeometry args={ args } />)
		}
	}, [])

	return (
		<RigidBody
			ref={ collider }
			position={ [0, 2, 0] }
			colliders={ false }
		>
			<mesh
				castShadow
			>
				{ primitive }
				<CuboidCollider args={ args }  />
				{/* <Html center>
					<h1>Teste</h1>
				</Html> */}
				{/* <MeshWobbleMaterial
					factor={1}
					speed={.1}
					color={ 'red' }
					metalness={ 0 }
				/> */}
				<meshNormalMaterial side={ THREE.DoubleSide } />
			</mesh>
		</RigidBody>

	)
}