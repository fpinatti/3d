import { Canvas } from '@react-three/fiber'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Experience from './Experience'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
	<Canvas
		camera={{
			near: 0.1,
			far: 2000,
		}}
	>
    	<Experience />
	</Canvas>
  </React.StrictMode>,
)
