'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface ScrollShapeProps {
  position: [number, number, number];
  color: string;
  geometry: 'box' | 'sphere' | 'torus' | 'octahedron';
}

export default function ScrollShape({ position, color, geometry }: ScrollShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (meshRef.current) {
      const scrollY = scroll.offset;
      
      // Rotate based on scroll
      meshRef.current.rotation.x = scrollY * Math.PI * 2;
      meshRef.current.rotation.y = scrollY * Math.PI * 3;
      
      // Move up/down based on scroll
      meshRef.current.position.y = position[1] + scrollY * 10 - 5;
      
      // Scale based on scroll
      const scale = 1 + Math.sin(scrollY * Math.PI * 2) * 0.3;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Subtle floating animation
      meshRef.current.position.x = position[0] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
      meshRef.current.position.z = position[2] + Math.cos(state.clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.6, 0.3, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8, 0]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
