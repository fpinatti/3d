import * as THREE from 'three';
import gsap from "gsap";

let points = [];

const animateIndividualParticle = (index) => {
    console.log(points[index]);
    // gsap.to(point,
    //         {
    //             duration: 10,
    //             value: 0,
    //             ease: 'linear',
    //         });
};

const animateParticles = (particles) => {
    console.log(particles);
    points = particles.geometry.attributes.position.array;

    for (let i = 0; i < points.length; i++) {
        // if Y coordinate
        if (i % 2 === 0) {
            gsap.to(points[i],
            {
                duration: 10,
                y: 0,
                ease: 'linear',
            });
            // points[i] = 0;
        }
        // points.push(points[i]);
        animateIndividualParticle(i);
    }

    // particles.geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
    // particles.updateMatrix();


    // gsap.to(object.rotation,
    //     {
    //         duration: 10,
    //         y: Math.PI * 2,
    //         repeat: -1,
    //         ease: 'linear',
    //     });
}

export {
    animateParticles,
}