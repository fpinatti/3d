import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Camera from './components/Camera'
import Lights from './components/Lights'
import Building from './components/Building'
import { Html } from '@react-three/drei'
import Markers from './components/Markers'
import Ground from './components/Ground'

function App() {

	const [markerSelected, setMarkerSelected] = useState(-1)

	const markers = [
		{ label: 'Entrada principal', position: [-1, 2, 11], pov: [-1, 2, 15] },
		{ label: 'Área Gourmet', position: [-.2, 1.3, -6], pov: [-.5, 1.3, 7] },
		{ label: 'Quintal', position: [0, 1, -13], pov: [0, 10, -30] },
		{ label: 'Vizinho esquerda', position: [13, 3, -3], pov: [20, 5, -5] },
		{ label: 'Vizinho direita', position: [-13, 3, -3], pov: [-20, 5, -5] },
		{ label: 'Cima', position: [0, 10, 0], pov: [0, 30, 4] },
	]

	const onSelectView = (evt) => {
		setMarkerSelected(evt.target.value)
	}

	return (
		<>
			<Canvas
				camera={{position: [0, 6, 30]}}
				shadows
			>
				<Camera />
				<Lights />
				<Building />
				<Markers markers={ markers } selected={ markerSelected } />
				<Ground />
			</Canvas>
			<select className="views absolute w-1/4 m-2 rounded-sm top-0" onChange={ onSelectView }>
				<option value="">Select a view</option>
				{ markers.map((item, idx) => {
					return <option value={ idx } key={ idx }>{ item.label }</option>		
				}) }
			</select>
		</>
	)
}

export default App
