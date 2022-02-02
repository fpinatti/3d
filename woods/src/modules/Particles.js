import * as THREE from 'three';
import { loadTexture } from './Material';
// import gsap from "gsap";

const baseSpeed = .02;
const radius = 3;
const startY = 4;

const createParticles = (config) => {
    // geometry
    const geometry = new THREE.BufferGeometry();
    const particlesPosition = new Float32Array(config.count * 3);
    const particlesSpeed = new Float32Array(config.count * 3);
    // const particlesGroupPosition = [];

    for (let i=0; i < config.count; i++) {
        const idx = i * 3;
        const posX = (Math.random() * radius) - (radius * .5);
        const posY = startY - (Math.random() * .4);
        const posZ = (Math.random() * radius) - (radius * .5);
        // particlesGroupPosition[idx] = {
        //     position: idx,
        //     x: posX,
        //     y: posY,
        //     z: posZ,
        // };
        particlesSpeed[idx + 1] = .01 + (Math.random() * .01);
        particlesPosition[idx] = posX; // x
        particlesPosition[idx + 1] = posY; // y
        particlesPosition[idx + 2] = posZ; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));

    // material
    const material = new THREE.PointsMaterial({
        size: config.size,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        map: config.texture,
    });

    // particles
    const particles = new THREE.Points(geometry, material);

    // animate
    const animateParticles = (particles, particlesPosition, particlesSpeed) => {
        requestAnimationFrame(() => {
            animateParticles(particles, particlesPosition, particlesSpeed);
        });
        let counter = 0;
        particlesPosition = particlesPosition.map((point, index) => {
            counter++;
            if (counter > 2) {
                counter = 0;
            }
            // animate y axys
            if (counter === 2) {
                if (point < 0) {
                    point = startY;
                }
                return point -= particlesSpeed[index];
            } else {
                return point;
            }
        });
        particles.geometry.attributes.position.array = particlesPosition;
        particles.geometry.attributes.position.needsUpdate = true;
    };
    animateParticles(particles, particlesPosition, particlesSpeed);

    return particles;
}

export {
    createParticles,
}