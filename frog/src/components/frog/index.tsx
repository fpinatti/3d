import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export const Frog = ({ position, onMove }) => {
  const frogRef = useRef();
  
  useEffect(() => {
    if (frogRef.current) {
      // Animate to the new position with GSAP
      gsap.to(frogRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [position]);
  
  return (
    <mesh ref={frogRef} castShadow>
      <boxGeometry args={[0.8, 0.5, 0.8]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};