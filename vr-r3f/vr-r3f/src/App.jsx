import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Canvas } from '@react-three/fiber'
import Ground from './components/Ground'
import Camera from './components/Camera'
import Box from './components/Box'
import Lights from './components/Lights'
import { Controllers, Hands, VRButton, XR, XRButton } from '@react-three/xr'
import Controller from './components/Controller'
import { KeyboardControls } from '@react-three/drei'

function App() {
  const [count, setCount] = useState(0)
  const [moveDirection, setMoveDirection] = useState({x:0, y:0, z:2})

  const onMoveCharacter = (direction) => {
	const newDirection = {
		x: moveDirection.x + direction.x,
		y: moveDirection.y + direction.y,
		z: moveDirection.z + direction.z,
	}
	// console.log(newDirection)
	setMoveDirection(newDirection)
	// setMoveDirection({x:0, y:0, z:0})
  }


  const map = useMemo(()=>[
    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
    { name: 'back', keys: ['ArrowDown', 's', 'S'] },
    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
    { name: 'jump', keys: ['Space'] },
  ], [])

  return (
    <>
		<VRButton />
		{/* <XRButton mode='AR' /> */}
		<KeyboardControls map={ map }>
			<Canvas
				shadows
				camera={{
					position: [0, 1, 2],
			}}>
				<fog attach="fog" color="hotpink" near={0} far={50} />
				<color attach="background" args={["hotpink"]} />
				<XR foveation={ 1 }>
					<Controllers />
					<Hands />
					<Controller onMove={ onMoveCharacter } />
					<Camera direction={ moveDirection } />
					<Lights />
					<Box />
					<Ground />
				</XR>
			</Canvas>
		</KeyboardControls>
    </>
  )
}

export default App
