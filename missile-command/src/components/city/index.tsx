"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mesh } from "three";

interface CityProps {
  position: [number, number, number];
  destroyed: boolean;
}

export function City({ position, destroyed }: CityProps) {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (destroyed && meshRef.current) {
      gsap.to(meshRef.current.scale, {
        y: 0.2,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [destroyed]);

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[2, 1.5, 2]} />
      <meshStandardMaterial color={destroyed ? "#444444" : "#2196f3"} />
    </mesh>
  );
}
