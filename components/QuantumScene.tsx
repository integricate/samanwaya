import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

const ConnectionNode = ({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[size * 0.2, 32, 32]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
    </Float>
  );
};

const NetworkLines = () => {
  const points = [
    new THREE.Vector3(-2, 1, 0),
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(2, 1, 0),
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(-1, -1, 0),
    new THREE.Vector3(-2, 1, 0),
  ];

  return (
    <Line
      points={points}
      color="#40916C"
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} color="#40916C" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#1B4332"
              speed={2}
              distort={0.4}
              radius={1}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        </Float>

        <ConnectionNode position={[-4, 2, -2]} color="#40916C" size={0.8} />
        <ConnectionNode position={[4, -2, -3]} color="#52B788" size={1.2} />
        <ConnectionNode position={[3, 3, -1]} color="#1B4332" size={0.6} />
        <ConnectionNode position={[-3, -3, 0]} color="#40916C" size={0.9} />
        
        <NetworkLines />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

const CoordinationNetwork = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <ConnectionNode position={[0, 1.5, 0]} color="#52B788" />
            <ConnectionNode position={[1.5, 0, 1.5]} color="#1B4332" />
            <ConnectionNode position={[-1.5, 0, 1.5]} color="#40916C" />
            <ConnectionNode position={[0, -1.5, 0]} color="#52B788" />
            <ConnectionNode position={[1.5, 0, -1.5]} color="#40916C" />
            <ConnectionNode position={[-1.5, 0, -1.5]} color="#1B4332" />
            
            <Line points={[new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(1.5, 0, 1.5)]} color="#40916C" lineWidth={1} transparent opacity={0.2} />
            <Line points={[new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(-1.5, 0, 1.5)]} color="#40916C" lineWidth={1} transparent opacity={0.2} />
            <Line points={[new THREE.Vector3(1.5, 0, 1.5), new THREE.Vector3(-1.5, 0, 1.5)]} color="#40916C" lineWidth={1} transparent opacity={0.2} />
            <Line points={[new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(1.5, 0, -1.5)]} color="#40916C" lineWidth={1} transparent opacity={0.2} />
            <Line points={[new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(-1.5, 0, -1.5)]} color="#40916C" lineWidth={1} transparent opacity={0.2} />
            <Line points={[new THREE.Vector3(1.5, 0, -1.5), new THREE.Vector3(-1.5, 0, -1.5)]} color="#40916C" lineWidth={1} transparent opacity={0.2} />
        </group>
    );
};

export const CoordinationScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[5, 10, 5]} intensity={1.5} />
        <CoordinationNetwork />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
