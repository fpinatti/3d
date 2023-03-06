import { Debug, Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Cannon from "./Cannon";
import Cauldron from "./Cauldron";
import Ground from "./Ground";
import Projectiles from "./Projectiles";

export default function Level() {

	return <>
		<Suspense>
			<Physics>
				<Debug />
				<Projectiles />
				<Cannon />
				<Cauldron />
				<Ground />
			</Physics>
		</Suspense>
	</>
}