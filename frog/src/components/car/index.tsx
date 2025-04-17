import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Car = ({ position, direction, speed }) => {
  const mesh = useRef();
  
  useEffect(() => {
    if (!mesh.current) return;
    
    // Create a smooth animation to the new position
    gsap.to(mesh.current.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 0.5, // Animation duration in seconds
      ease: "power2.out" // Easing function for smooth movement
    });
  }, [position]);
  
  return (
    <mesh ref={mesh} castShadow>
      <boxGeometry args={[2, 0.5, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};