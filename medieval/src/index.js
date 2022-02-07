import * as THREE from 'three';
import './styles.css';
import { initLoader } from './modules/Loader';
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { createAmbientLight, createDirectionalLight, createSpotLight, shakeLight} from './modules/Light'
import { setRenderer } from './modules/Renderer'
import { createParticles } from './modules/Particles';
import { loadModel } from './modules/Model'
import { createBillboard } from './modules/Billboard';
import { loadTexture } from './modules/Material';

const main = () => {
    // scene
    const scene = createScene();
    
    // camera
    const camera = createCamera();
    scene.add(camera);
    camera.position.z = 8;
    camera.position.y = 4;
    
    // materials
    // bakedTexture.flipY = false;
    // bakedMaterial = new THREE.MeshBasicMaterial({ 
    //     color: 0xffffff,
    //     map: bakedTexture,
    // })
    
    // renderer
    const renderer = setRenderer(camera, scene);
    setCameraControls(camera, renderer);
    
    // lights
    const ambientLight = createAmbientLight();
    scene.add(ambientLight);
    
    const directionalLight = createDirectionalLight();
    directionalLight.castShadow = true;
    directionalLight.position.set(3, 5, 3);
    scene.add(directionalLight);
    
    const directionalLight2 = createDirectionalLight();
    directionalLight2.position.set(0, 0, 8);
    scene.add(directionalLight2);

    // /**
    //  * leafs
    //  */
    // const particles = createParticles({
    //     count: 20,
    //     size: .1,
    //     texture: leafTexture,
    // });
    // particles.position.set(0, 0, -1);

    // external models
    loadModel('models/tree_bench.gltf').then((model) => {
        // model.children.map((element) => {
        //     if (bakedVersion) {
        //         element.material = bakedMaterial;
        //         element.map = bakedTexture;
        //     }
        // });
        scene.add(model);
        // scene.add(particles);
    });

}

// let grassTexture;
// let fireTexture;
// let leafTexture;
// let bakedTexture;
window.addEventListener('DOMContentLoaded', async () => {
    // if (bakedVersion) {
    //     await loadTexture('textures/baked.jpg').then(texture => bakedTexture = texture);
    // }
    // await loadTexture('textures/grass Displacement.png').then(texture => grassTexture = texture);
    // await loadTexture('textures/fire_sheet.png').then(texture => fireTexture = texture);
    // await loadTexture('textures/leaf.png').then(texture => leafTexture = texture);
    main();
});