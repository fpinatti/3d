import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'

const AnimatedModel = ({position}) => {

    const model = useGLTF('./assets/models/elf.gltf')
    const [animationName, setAnimationName] = useState('pose_chapeau')
    const animations = useAnimations(model.animations, model.scene)
    useEffect(() => {
        const nodes = Object.values(model.nodes)
        nodes.forEach((element) => {
            element.castShadow = true
        })
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(.5)
            .play()
        return () => {
            action.fadeOut(.5)
        }
    }, [ animationName ])

    const updateAnimationStand = () => {
        setAnimationName('pose_chapeau')
    }

    const updateAnimationWalk = () => {
        setAnimationName('course_chapeau')
    }

    return <>
        <group
            scale={ 10 }
            onPointerDown={ updateAnimationWalk }
            onPointerUp={ updateAnimationStand }
            position={ position }
        >
            <primitive
                object={ model.scene }
            />
        </group>
    </>
}

export default AnimatedModel