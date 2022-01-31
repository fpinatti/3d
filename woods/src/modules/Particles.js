import * as THREE from 'three';
import gsap from "gsap";

const createParticles = (config) => {
    // geometry
    const geometry = new THREE.BufferGeometry();
    const particlesPosition = new Float32Array(config.count * 3);
    const particlesGroupPosition = [];

    for (let i=0; i < config.count; i++) {
        const idx = i * 3;
        const posX = (Math.random() * 5) - 2.5;
        const posY = 7;
        const posZ = (Math.random() * 5) - 2.5;
        particlesGroupPosition[idx] = {
            position: idx,
            x: posX,
            y: posY,
            z: posZ,
        };
        particlesPosition[idx] = posX; // x
        particlesPosition[idx + 1] = posY; // y
        particlesPosition[idx + 2] = posZ; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));

    // material
    const material = new THREE.PointsMaterial({
        size: config.size,
        sizeAttenuation: true,
    });

    // particles
    const particles = new THREE.Points(geometry, material);

    // animate
    const animateParticles = (particles, particlesGroupPosition) => {
        // console.log(particles.geometry.attributes.position.array);
        particlesGroupPosition.map((point) => {
            gsap.to(point,
                {
                    duration: 10,
                    y: 0,
                    ease: 'linear',
                    onUpdateParams: [point.position],
                    onUpdate: (position) => {
                        console.log(particlesGroupPosition[position])
                        particles.geometry.attributes.position.array[position] = point;
                        // console.log(particles);
                        // console.log('aaa', position);
                        // geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));
                    }
                });
            // console.log(point);
            // particlesGroupPosition
        })
        // console.log(particles, positionCoordinates);
    };
    animateParticles(particles, particlesGroupPosition);

    return particles;
}

export {
    createParticles,
}