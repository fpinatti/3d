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
        particlesPosition[idx] = posX; // x
        particlesPosition[idx + 1] = posY; // y
        particlesPosition[idx + 2] = posZ; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));

    // texture
    loadTexture('./textures/leaf.png').then((texture) => {
        material.map = texture;
        material.needsUpdate = true;
    });

    // material
    const material = new THREE.PointsMaterial({
        size: config.size,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
    });

    // particles
    const particles = new THREE.Points(geometry, material);

    // animate
    const animateParticles = (particles, particlesPosition) => {
        requestAnimationFrame(() => {
            animateParticles(particles, particlesPosition);
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
                const fallSpeed = (baseSpeed * (index * .01) * .5);
                return point -= Math.min(.01, fallSpeed);
            } else {
                return point;
            }
        });
        particles.geometry.attributes.position.array = particlesPosition;
        particles.geometry.attributes.position.needsUpdate = true;
    };
    animateParticles(particles, particlesPosition);

    return particles;
}

export {
    createParticles,
}