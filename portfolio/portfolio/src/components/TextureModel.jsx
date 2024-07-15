import { Float, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import gsap from 'gsap'

const TextureModel = ({position}) => {

    const model = useGLTF('./assets/models/heli.gltf')
    
    useEffect(() => {
        const nodes = Object.values(model.nodes)
        nodes.forEach((element) => {
            element.castShadow = true
        })
        gsap.to(model.nodes.HelicopterBackWings.rotation, {
            duration: .2,
            x: Math.PI * .5,
            ease: 'linear',
            repeat: -1,
        })
        gsap.to(model.nodes.BackMotor.rotation, {
            duration: .2,
            x: Math.PI * .5,
            ease: 'linear',
            repeat: -1,
        })
        gsap.to(model.nodes.TopFin.rotation, {
            duration: .2,
            y: Math.PI * .5,
            ease: 'linear',
            repeat: -1,
        })
    }, [])

    return <>
        <group
            scale={ 8 }
            position={ position }
        >
            <Float>
                <primitive
                    object={ model.scene }
                />
            </Float>
        </group>
    </>
}

export default TextureModel