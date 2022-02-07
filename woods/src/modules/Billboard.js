import * as THREE from 'three';
import gsap from 'gsap';

const stepsAnimation = {x: 0};

const createBillboard = (texture) => {

    texture.repeat.set(.15, 1);
    texture.wrapS = THREE.RepeatWrapping;   
    texture.wrapT = THREE.RepeatWrapping;
    gsap.to(stepsAnimation, {
        duration: 2,
        x: 1,
        repeat: -1,
        ease: "steps(7)",
        onUpdate: () => {
            texture.offset.x = stepsAnimation.x;
        },
    });
    const material = new THREE.SpriteMaterial({ 
        map: texture,
        blending: THREE.AdditiveBlending,
    });

    const sprite = new THREE.Sprite(material);
    sprite.scale.x = 1.6;
    sprite.scale.y = 3;
    return sprite;
}

export {
    createBillboard,
}