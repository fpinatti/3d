import { Trail } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import { useState } from 'react'

export default function TrailElement() {

	const [test, setTest] = useState(true)

	const {x} = useSpring({
		x: test ? 5 : 0,
		config: {
			duration: 1000,
			friction: 10,
			mass: 1000,
			tension: 2,
		}
	})

	const clickElement = () => {
		setTest(!test)
	}

	return <>
		<Trail
			decay={ 1.2 }
			width={ 25 }
			length={ 10 }
			attenuation={ (width) => width }
		>
			<animated.mesh position-x={ x } position-y={ 2 } onClick={ clickElement }>
				<boxGeometry />
				<meshStandardMaterial />
			</animated.mesh>
		</Trail>
	</>
}