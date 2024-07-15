import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Camera from '../components/Camera'
import Lights from '../components/Lights'
import Ground from '../components/Pinas'
import AnimatedModel from '../components/AnimatedModel'
import TextureModel from '../components/TextureModel'
import PerformanceMonitor from '../components/PerformanceMonitor'
import EffectsRender from '../components/EffectsRender'
import { Scroll, ScrollControls, useScroll } from '@react-three/drei'
import { useEffect, useMemo, useRef, useLayoutEffect, useState } from 'react'
import { Leva } from 'leva'
import Pinas from '../components/Pinas'
import RoomWithTv from '../components/RoomWithTv'
import { gsap } from "gsap"

function Experience({ scrollOffset }) {

	const experienceRef = useRef()
	const pinasRef = useRef()

	const [st, setSt] = useState()
	let tl

	// useMemo(() => {
	// 	if (pinasRef.current) {
	// 	}
	// }, [pinasRef.current])

	useLayoutEffect(() => {
		setSt(pinasRef.current)
		let ctx = gsap.context(() => {
    
			tl = gsap.timeline({paused: true})
			if (pinasRef.current) {
				tl
				.to(pinasRef.current.position, {
					x: 3,
					duration: 2,
				})
				.to(pinasRef.current.position, {
					y: 3,
					duration: 2,
				})
			}
			
		  }, experienceRef); // <- IMPORTANT! Scopes selector text
		  
		  return () => ctx.revert();
	}, [pinasRef.current]);
	useEffect(() => {
		// console.log(tl)
		// tl.totalProgress(scrollOffset)
		// tl.progress(scrollOffset)
		// console.log('update scroll offset', scrollOffset)
	}, [scrollOffset])

	useEffect(() => {
		console.log('BBBBBBBBBBBBB', st)
	}, [st])

	return (
		<>
			<Canvas
				camera={{fov: 75, position: [0, 0, 4]}}
				shadows
				ref={ experienceRef }
			>
				{/* <ScrollControls pages={1}> */}
				{/* <Camera /> */}
				<Lights />
				<Pinas
					// scrollOffset={ scrollOffset }
					ref={ pinasRef }
					// position={[(scrollOffset * 20), 0, 0]}
					// scale={[2, 2, 2]}
					// rotation={[0, (Math.PI * -.4) * (Math.PI * (scrollOffset * .5)), 0]}
				/>
				<RoomWithTv 
					// scrollOffset={ scrollOffset }
				/>
				{/* <EffectsRender />
				<PerformanceMonitor />
				<AnimatedModel position={[-8, 0, 60]} /> */}
				{/* <TextureModel position={[scrollOffset * 10, 5, 45]} /> */}
				{/* <Scroll>
				</Scroll> */}
				{/* <Scroll html>
					<Home />
					<Bio />
				</Scroll> */}
				{/* <Ground position={ [0, -1, 0] } /> */}
				{/* </ScrollControls> */}
			</Canvas>
		</>
	)
}

export default Experience
