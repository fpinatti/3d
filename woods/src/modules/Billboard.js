import * as THREE from 'three';
import { loadTexture } from './Material';

const createBillboard = () => {
    loadTexture('textures/leaf.png').then((texture) => {
        material.map = texture;
    });
    const material = new THREE.SpriteMaterial();

    const sprite = new THREE.Sprite(material);
    return sprite;
}

export {
    createBillboard,
}