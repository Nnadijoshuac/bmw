"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import { Group, MathUtils } from "three";

type CarModelProps = {
  scrollProgress: number;
};

function CarModel({ scrollProgress }: CarModelProps) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF("/scene.gltf");

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY = MathUtils.lerp(0.45, -1.15, scrollProgress);
    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetY, 4, delta);
  });

  return (
    <group ref={groupRef} position={[0, -1.25, 0]}>
      <primitive object={gltf.scene} scale={1.03} />
    </group>
  );
}

export default function CarCanvas({ scrollProgress }: CarModelProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [4.8, 1.8, 5.7], fov: 31 }}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[8, 11, 5]} intensity={1.55} />
        <directionalLight position={[-6, 4, -5]} intensity={0.45} />
        <Suspense fallback={null}>
          <CarModel scrollProgress={scrollProgress} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.34, 0]}
            scale={14}
            blur={2.3}
            opacity={0.58}
            far={5.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/scene.gltf");