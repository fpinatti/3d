import { Debug, Physics } from "@react-three/rapier";
import { Suspense, useEffect, useRef, useState } from "react";
import Cannon from "./Cannon";
import Cauldron from "./Cauldron";
import Ground from "./Ground";
import Block from "./Block";
import Projectiles from "./Projectiles";
import { Text } from "@react-three/drei";
import gsap from "gsap";

export default function Level() {

	const levelTitle = useRef()
	const [nextProjectileDirection, setNextProjectileDirection] = useState()
	
	const onShoot = (directionX, directionY) => {
		setNextProjectileDirection([directionX, directionY])
	}


	useEffect(() => {
		const ctx_title = gsap.context(() => {
			const tl = gsap.timeline()
			tl.from(levelTitle.current.position, {duration: 1, y: 8})
				.to(levelTitle.current.scale, {delay:3, x: 0, y:0, z:0, duration: .2}, '-=.2')
		}, levelTitle);
		return () => {
			ctx_title.revert()
		} 
	},[])


	return <>
		{/* <Suspense> */}
			<Physics>
				<Debug />
				<Text
					position={ [-1, .5, -3] }
					ref={ levelTitle }
					color={'#EC2D2D'}
					fontSize={1}
					maxWidth={200}
					lineHeight={1}
					letterSpacing={0.02}
					textAlign={'left'}
					font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
					// anchorX="center"
					// anchorY="middle"
					// outlineWidth={2}
					// outlineColor="#ffffff"
				>Sopa de cenoura</Text>
				<Projectiles nextProjectileDirection={ nextProjectileDirection } />
				<group>
					<Block type='fixed' position={[4.5, 0, -3]} />
					<Block type='fixed' position={[4.5, 0, -2]} />
					<Block type='fixed' position={[4.5, 0, -1]} />
					<Block type='fixed' position={[4.5, 0, 0]} /> 
					<Block type='fixed' position={[4.5, 0, 1]} />
					<Block type='fixed' position={[4.5, 0, 2]} />
					<Block type='fixed' position={[4.5, 0, 3]} />
					<Block type='carrot' position={[4.5, 1.1, -2]} />
					<Block type='carrot' position={[4.5, 1.1, -1]} />
					<Block type='carrot' position={[4.5, 1.1, 0]} />
					<Block type='carrot' position={[4.5, 1.1, 1]} />
					<Block type='carrot' position={[4.5, 1.1, 2]} />
					<Block type='cabbage' position={[4.25, 2, -2.25]} />
					<Block type='cabbage' position={[4.25, 2, -1.75]} />
					<Block type='cabbage' position={[4.75, 2, -2.25]} />
					<Block type='cabbage' position={[4.75, 2, -1.75]} />
				</group>
				<Cannon onShoot={ onShoot } />
				<Cauldron />
				<Ground />
			</Physics>
		{/* </Suspense> */}
	</>
}