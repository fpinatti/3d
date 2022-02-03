import * as THREE from 'three';
const createAmbientLight = () => {
    const light = new THREE.AmbientLight(0xffffff);
    return light;
}

const createDirectionalLight = () => {
    const light = new THREE.PointLight( 0xffffff, 2, 10 );
    return light;
}

export {
    createAmbientLight,
    createDirectionalLight,
}