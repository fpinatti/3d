import * as THREE from 'three';

const createParticles = (config) => {
    // geometry
    const geometry = new THREE.BufferGeometry();
    const particlesPosition = new Float32Array(config.count * 3);

    for (let i=0; i < config.count; i++) {
        const idx = i * 3;
        particlesPosition[idx] = (Math.random() * 5) - 2.5; // x
        particlesPosition[idx + 1] = 7; // y
        particlesPosition[idx + 2] = (Math.random() * 5) - 2.5;; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));

    // material
    const material = new THREE.PointsMaterial({
        size: config.size,
        sizeAttenuation: true,
    });

    // particles
    const particles = new THREE.Points(geometry, material);
    return particles;

}

export {
    createParticles,
}