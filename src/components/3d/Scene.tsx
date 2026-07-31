"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";
import ParticleField from "./ParticleField";
import FloatingInstruments from "./FloatingInstruments";

export default function Scene() {
  const reducedMotion = useReducedMotion();
  const mouse = useMousePosition();

  if (reducedMotion) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 45 }}
    >
      <ParticleField count={450} />
      <FloatingInstruments mouse={mouse} />
    </Canvas>
  );
}
