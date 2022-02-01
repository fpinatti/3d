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
// import { animateParticles } from './modules/Animation';

const main = () => {
    // scene
    const scene = createScene();
    
    // camera
    const camera = createCamera();
    scene.add(camera);
    camera.position.z = 8;
    camera.position.y = 4;
    camera.position.x = -12;
    
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
    scene.add(directionalLight);
    
    /**
     * Fireplace
     */
    const fire = createBillboard();
    scene.add(fire);
    fire.position.set(-3, 1, 1);

    /**
     * leafs
     */
    const particles = createParticles({
        count: 80,
        size: .2,
    });

    // external models
    loadModel('models/tree_bench.gltf').then((model) => {
        scene.add(model);
        scene.add(particles);
    });

}

window.addEventListener('DOMContentLoaded', () => {
    initLoader();
    main();
});