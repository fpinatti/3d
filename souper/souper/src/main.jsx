import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Camera from './components/Camera'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<Canvas
		camera={{
			position: [4, 12, 3],
		}}
	>
		<Environment preset='forest' />
		<Camera />
		<App />
	</Canvas>
  </React.StrictMode>,
)
