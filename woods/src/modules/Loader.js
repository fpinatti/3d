import * as THREE from 'three';

let manager;

const initLoader = () => {
    manager = new THREE.LoadingManager();
    manager.onLoad = () => {
        console.log( 'Loading complete!');
    };
    return manager;
}

export {
    initLoader,
}