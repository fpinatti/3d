import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createCamera = () => {
    const camera = new THREE.PerspectiveCamera( 
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    return camera;
}

const setCameraControls = (camera, renderer) => {
    new OrbitControls(camera, renderer.domElement);
};

export {
    createCamera,
    setCameraControls,
}