"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function WireCore() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.16} />
        </mesh>
        <mesh rotation={[0.8, 0.3, 0.5]}>
          <octahedronGeometry args={[3.1, 0]} />
          <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.08} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroField3D() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <WireCore />
      </Canvas>
    </div>
  );
}
