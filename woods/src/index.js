import * as THREE from 'three';
import './styles.css';
import { initLoader } from './modules/Loader';
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { createAmbientLight, createDirectionalLight, createSpotLight, shakeLight} from './modules/Light'
import { setRenderer } from './modules/Renderer'
// import { createMaterial, loadTexture } from './modules/Material'
// import { createMesh } from './modules/Mesh'
import { createParticles } from './modules/Particles';
import { loadModel } from './modules/Model'
import { createBillboard } from './modules/Billboard';
import { loadTexture } from './modules/Material';
import { Vector3 } from 'three';
// import { animateParticles } from './modules/Animation';

const bakedVersion = true;
let bakedMaterial;
const main = () => {
    // scene
    const scene = createScene();
    
    // camera
    const camera = createCamera();
    scene.add(camera);
    camera.position.z = 8;
    camera.position.y = 4;
    
    // materials
    if (bakedVersion) {
        bakedTexture.flipY = false;
        bakedMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            map: bakedTexture,
        })
    }
    // const material = createMaterial('standard');
    
    // basic geometry models
    // const model = createMesh(material);
    // model.map = material;
    // scene.add(model);
    
    // renderer
    const renderer = setRenderer(camera, scene);
    setCameraControls(camera, renderer);
    
    // lights
    if (!bakedVersion) {
        const ambientLight = createAmbientLight();
        scene.add(ambientLight);
        
        const directionalLight = createDirectionalLight();
        directionalLight.castShadow = true;
        directionalLight.position.set(3, 5, 3);
        scene.add(directionalLight);
        
        const directionalLight2 = createDirectionalLight();
        directionalLight2.position.set(0, 0, 8);
        scene.add(directionalLight2);
    }

    const spotLight = createSpotLight();
    const targetSpotlight = new THREE.Object3D();
    scene.add(targetSpotlight);
    spotLight.target = targetSpotlight;
    scene.add(spotLight);
    spotLight.position.set(.6, 4, 2.5);
    targetSpotlight.position.set(.6, 0, 2.5);
    shakeLight(spotLight);
    
    /**
     * Fireplace
     */
    const fire = createBillboard(fireTexture);
    scene.add(fire);
    fire.position.set(.6, 1.5, 2.3);

    /**
     * leafs
     */
    const particles = createParticles({
        count: 20,
        size: .1,
        texture: leafTexture,
    });
    particles.position.set(0, 0, -1);

    // external models
    loadModel('models/tree_bench.gltf').then((model) => {
        // model.children.map((element) => {
        //     if (element.name === 'floor') {
        //         element.receiveShadow = true;
        //         grassTexture.flipY = false;
        //         // grassTexture.offset.set(-.15, -.15);
        //         // grassTexture.repeat.set(1.3, 1.3);
        //         // // grassTexture.center(.5, .5);
        //         // element.material.map = grassTexture;
        //         // element.material.displacementMap = grassTexture;
        //         // element.material.displacementScale = .2;
        //         // element.material.needsUpdate = true;
        //     } else {
        //         element.castShadow = true;
        //     }
        // });
        model.children.map((element) => {
            // element.receiveShadow = true;
            // grassTexture.flipY = false;
            if (bakedVersion) {
                element.material = bakedMaterial;
                element.map = bakedTexture;
            }
        });
        scene.add(model);
        scene.add(particles);
    });

}

let grassTexture;
let fireTexture;
let leafTexture;
let bakedTexture;
window.addEventListener('DOMContentLoaded', async () => {
    if (bakedVersion) {
        await loadTexture('textures/baked.jpg').then(texture => bakedTexture = texture);
    }
    await loadTexture('textures/grass Displacement.png').then(texture => grassTexture = texture);
    await loadTexture('textures/fire_sheet.png').then(texture => fireTexture = texture);
    await loadTexture('textures/leaf.png').then(texture => leafTexture = texture);
    main();
});