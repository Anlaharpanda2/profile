'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ScrollControls } from '@react-three/drei';
import FloatingShape from './FloatingShape';
import ScrollShape from './ScrollShape';
import { Suspense } from 'react';

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.1}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
            <pointLight position={[10, 10, 5]} intensity={0.5} color="#ec4899" />
            <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#3b82f6" />
            
            {/* Background floating shapes */}
            <FloatingShape position={[-4, 2, -5]} color="#8b5cf6" speed={0.5} />
            <FloatingShape position={[4, -2, -6]} color="#ec4899" speed={0.7} />
            <FloatingShape position={[0, 3, -7]} color="#3b82f6" speed={0.6} />
            <FloatingShape position={[-3, -1, -5]} color="#10b981" speed={0.8} />
            
            {/* Scroll-reactive shapes */}
            <ScrollShape position={[5, 0, -3]} color="#a855f7" geometry="octahedron" />
            <ScrollShape position={[-5, 2, -4]} color="#06b6d4" geometry="torus" />
            <ScrollShape position={[3, -3, -2]} color="#f59e0b" geometry="sphere" />
            <ScrollShape position={[-4, -2, -3]} color="#ec4899" geometry="box" />
            <ScrollShape position={[0, 4, -5]} color="#10b981" geometry="octahedron" />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
