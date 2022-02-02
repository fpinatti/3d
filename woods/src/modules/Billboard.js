import * as THREE from 'three';
import { loadTexture } from './Material';
import gsap from 'gsap';

let fireTexture;
const stepsAnimation = {x: 0};

const createBillboard = () => {

    loadTexture('textures/leaf.png').then((texture) => {
        fireTexture = texture;
        // texture.offset.x = 0;
        // texture.offset.set(1, 1);
        // fireTexture.repeat.set(1, 1);
        // fireTexture.needsUpdate = true;
        // fireTexture.offset.y = 0;
        // fireTexture.wrapS = THREE.RepeatWrapping;   
        // fireTexture.wrapT = THREE.RepeatWrapping;
        // fireTexture.repeat.set(.2, .2);
        // fireTexture.needsUpdate = true;
        // console.log(fireTexture.matrixAutoUpdate);
        material.map = fireTexture;
        gsap.to(stepsAnimation, {
            duration: 2,
            x: 1,
            repeat: -1,
            ease: "steps(5)",
            onUpdate: () => {
                // fireTexture.repeat.x = stepsAnimation.x;
                // fireTexture.updateMatrix();
                console.log('a', stepsAnimation);
            },
        });
    });
    const material = new THREE.SpriteMaterial();
    // material.needsUpdate = true;

    const sprite = new THREE.Sprite(material);
    sprite.scale.x = 2;
    return sprite;
}

export {
    createBillboard,
}