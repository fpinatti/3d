import { Canvas } from '@react-three/fiber'
import { Debug, Physics, RigidBody } from '@react-three/rapier'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Experience from './Experience'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
	<Canvas
		shadows
		camera={{
			near: 0.1,
			far: 2000,
			fov: 45,
			position: [0, 4, 10]
		}}
	>
		<Suspense>
			<Experience />
		</Suspense>
	</Canvas>
  </React.StrictMode>,
)
