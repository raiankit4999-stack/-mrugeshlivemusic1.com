"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ShapeDef = {
  position: [number, number, number];
  geometry: "torus" | "box" | "cone" | "icosahedron" | "torusKnot" | "cylinder" | "sphere" | "octahedron";
  scale: number;
  speed: number;
};

const SHAPES: ShapeDef[] = [
  { position: [-4.2, 1.4, -2], geometry: "torus", scale: 0.9, speed: 0.6 },
  { position: [4, -1.2, -3], geometry: "box", scale: 0.8, speed: 0.4 },
  { position: [-3, -2, -1.5], geometry: "cone", scale: 0.7, speed: 0.5 },
  { position: [3.4, 2, -2.5], geometry: "icosahedron", scale: 0.75, speed: 0.55 },
  { position: [0, 2.6, -4], geometry: "torusKnot", scale: 0.55, speed: 0.35 },
  { position: [-1.6, -0.4, -3.5], geometry: "cylinder", scale: 0.6, speed: 0.5 },
  { position: [2, -2.4, -1], geometry: "sphere", scale: 0.5, speed: 0.65 },
  { position: [-5, -0.6, -3.5], geometry: "octahedron", scale: 0.65, speed: 0.45 },
];

function Shape({ def, mouse }: { def: ShapeDef; mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  // Deterministic phase offset derived from the shape's own position instead
  // of Math.random, so it stays pure across re-renders.
  const seed = def.position[0] * 12.9898 + def.position[1] * 78.233 + def.position[2] * 37.719;
  const offset = useRef((Math.sin(seed) * 43758.5453123) % (Math.PI * 2));

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * def.speed + offset.current;
    ref.current.position.y = def.position[1] + Math.sin(t) * 0.35;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.y = t * 0.3;
    ref.current.position.x = def.position[0] + mouse.x * 0.4;
    ref.current.position.z = def.position[2] + mouse.y * 0.2;
  });

  return (
    <mesh ref={ref} position={def.position} scale={def.scale}>
      {def.geometry === "torus" && <torusGeometry args={[0.7, 0.22, 16, 48]} />}
      {def.geometry === "box" && <boxGeometry args={[1, 1, 1]} />}
      {def.geometry === "cone" && <coneGeometry args={[0.6, 1.3, 24]} />}
      {def.geometry === "icosahedron" && <icosahedronGeometry args={[0.8, 0]} />}
      {def.geometry === "torusKnot" && <torusKnotGeometry args={[0.55, 0.16, 100, 16]} />}
      {def.geometry === "cylinder" && <cylinderGeometry args={[0.35, 0.35, 1.4, 24]} />}
      {def.geometry === "sphere" && <sphereGeometry args={[0.6, 24, 24]} />}
      {def.geometry === "octahedron" && <octahedronGeometry args={[0.8, 0]} />}
      <meshStandardMaterial
        color="#d4af37"
        emissive="#c68b2c"
        emissiveIntensity={0.4}
        roughness={0.25}
        metalness={0.85}
        wireframe
      />
    </mesh>
  );
}

export default function FloatingInstruments({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#f0d98c" />
      {SHAPES.map((def, i) => (
        <Shape key={i} def={def} mouse={mouse} />
      ))}
    </group>
  );
}
