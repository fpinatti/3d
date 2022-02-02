import * as THREE from 'three';
import './styles.css';
import { initLoader } from './modules/Loader';
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { createAmbientLight, createDirectionalLight} from './modules/Light'
import { setRenderer } from './modules/Renderer'
// import { createMaterial, loadTexture } from './modules/Material'
// import { createMesh } from './modules/Mesh'
import { createParticles } from './modules/Particles';
import { loadModel } from './modules/Model'
import { createBillboard } from './modules/Billboard';
import { loadTexture } from './modules/Material';
// import { animateParticles } from './modules/Animation';

const main = () => {
    // scene
    const scene = createScene();
    
    // camera
    const camera = createCamera();
    scene.add(camera);
    camera.position.z = 8;
    camera.position.y = 4;
    
    // materials
    // const material = createMaterial('standard');
    
    // basic geometry models
    // const model = createMesh(material);
    // model.map = material;
    // scene.add(model);
    
    // renderer
    const renderer = setRenderer(camera, scene);
    setCameraControls(camera, renderer);
    
    // lights
    const ambientLight = createAmbientLight();
    scene.add(ambientLight);
    const directionalLight = createDirectionalLight();
    directionalLight.position.set(3, 5, 3);
    scene.add(directionalLight);
    const directionalLight2 = createDirectionalLight();
    directionalLight2.position.set(0, -10, 0);
    scene.add(directionalLight2);
    // const directionalLight = createDirectionalLight();
    // scene.add(directionalLight);
    
    /**
     * Fireplace
     */
    const fire = createBillboard(fireTexture);
    scene.add(fire);
    fire.position.set(.6, .5, 2.3);

    /**
     * leafs
     */
    const particles = createParticles({
        count: 80,
        size: .2,
        texture: leafTexture,
    });

    // external models
    loadModel('models/tree_bench.gltf').then((model) => {
        model.children.map((element) => {
            if (element.name === 'floor') {
                // element.material.displacementMap = grassTexture;
                element.material.needsUpdate = true;
            }
        });
        scene.add(model);
        scene.add(particles);
    });

}

let grassTexture;
let fireTexture;
let leafTexture;
window.addEventListener('DOMContentLoaded', async () => {
    await loadTexture('textures/grass.jpg').then(texture => grassTexture = texture);
    await loadTexture('textures/fire_sheet.jpg').then(texture => fireTexture = texture);
    await loadTexture('textures/leaf.png').then(texture => leafTexture = texture);
    main();
});