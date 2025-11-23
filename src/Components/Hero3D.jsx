import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Oil droplets pouring from the bottle opening
const OilDroplets = () => {
  const dropletsRef = useRef();
  const particleCount = 60;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      // Spawn from bottle opening at the top
      positions[i * 3] = (Math.random() - 0.5) * 0.15;
      positions[i * 3 + 1] = 1.5 + Math.random() * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      velocities.push(0.03 + Math.random() * 0.04);
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (dropletsRef.current) {
      const positions = dropletsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        // Fall downward
        positions[i * 3 + 1] -= particles.velocities[i];

        // Reset to top when reaching bottom
        if (positions[i * 3 + 1] < -3) {
          positions[i * 3] = (Math.random() - 0.5) * 0.15;
          positions[i * 3 + 1] = 1.5 + Math.random() * 0.5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
        }
      }

      dropletsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={dropletsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#C4A574" transparent opacity={0.9} />
    </points>
  );
};

// Oil bottle (upside down)
const OilBottle = () => {
  const bottleRef = useRef();

  useFrame(({ clock }) => {
    if (bottleRef.current) {
      // Gentle swaying motion
      bottleRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.8) * 0.08;
    }
  });

  return (
    <group ref={bottleRef} position={[0, 1.2, 0]} rotation={[0, 0, Math.PI]}>
      {/* Bottle body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.25, 1.5, 32]} />
        <meshPhysicalMaterial
          color="#E8D4B8"
          transparent
          opacity={0.15}
          roughness={0.05}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.95}
          thickness={0.5}
        />
      </mesh>

      {/* Bottle neck */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.4, 32]} />
        <meshPhysicalMaterial
          color="#E8D4B8"
          transparent
          opacity={0.15}
          roughness={0.05}
          metalness={0}
          transmission={0.95}
        />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.2, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <spotLight position={[-5, 10, 5]} angle={0.3} intensity={0.5} />

        <OilBottle />
        <OilDroplets />
      </Canvas>
    </div>
  );
};

export default Hero3D;

