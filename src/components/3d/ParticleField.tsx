"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random hash (pure function of a seed) so particle
// positions stay stable across re-renders without calling Math.random.
function hash(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

export default function ParticleField({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (hash(i * 3 + 1) - 0.5) * 18;
      arr[i * 3 + 1] = (hash(i * 3 + 2) - 0.5) * 10;
      arr[i * 3 + 2] = (hash(i * 3 + 3) - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#d4af37"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
