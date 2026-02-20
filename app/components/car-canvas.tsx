"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";

function CarModel() {
  const gltf = useGLTF("/scene.gltf");

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      const mesh = obj as { isMesh?: boolean; castShadow?: boolean; receiveShadow?: boolean };
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [gltf.scene]);

  return (
    <group position={[0, -1.3, -5]} rotation={[0, MathUtils.degToRad(0), 0]}>
      <primitive object={gltf.scene} scale={2} />
    </group>
  );
}
function LeftTrackDetails() {
  const curbPieces = Array.from({ length: 52 }, (_, i) => i);
  const postPieces = Array.from({ length: 34 }, (_, i) => i);

  return (
    <group position={[0, -1.34, 0]}>
      <mesh position={[-3.72, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.12, 150]} />
        <meshStandardMaterial color="#ffffff" roughness={0.58} metalness={0.01} />
      </mesh>

      {curbPieces.map((i) => {
        const z = -72 + i * 2.8;
        const color = i % 2 === 0 ? "#d32626" : "#f7f7f7";
        return (
          <mesh key={`left-curb-${i}`} position={[-4.32, 0.03, z]} receiveShadow>
            <boxGeometry args={[0.42, 0.04, 2.5]} />
            <meshStandardMaterial color={color} roughness={0.72} metalness={0.05} />
          </mesh>
        );
      })}

      {postPieces.map((i) => {
        const z = -70 + i * 4.4;
        return (
          <mesh key={`guard-post-${i}`} position={[-5.15, 0.45, 0]}>
            <boxGeometry args={[0.09, 0.6, 0.09]} />
            <meshStandardMaterial color="#9ea3a8" roughness={0.45} metalness={0.72} />
          </mesh>
        );
      })}

      <mesh position={[-5.15, 0.74, 0]}>
        <boxGeometry args={[0.14, 0.12, 148]} />
        <meshStandardMaterial color="#c2c7cc" roughness={0.34} metalness={0.82} />
      </mesh>

    </group>
  );
}

export default function CarCanvas() {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [5, 1, 10], fov: 20 }}>
        <color attach="background" args={["#e4e4e4"]} />
        <hemisphereLight args={["#ffffff", "#d1eaff", 0.46]} />
        <ambientLight intensity={0.24} />
        <directionalLight
          position={[7, 8, 10]}
          intensity={1.85}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={70}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={14}
          shadow-camera-bottom={-14}
        />
        <directionalLight position={[-10, 4, 5]} intensity={0.56} />
        <directionalLight position={[2, 3, -12]} intensity={0.48} color="#ffffff" />
        <Suspense fallback={null}>
          <LeftTrackDetails />
          <CarModel />
          <Environment preset="warehouse" />
          <ContactShadows
            position={[0, -1.34, 0]}
            scale={18}
            blur={1.2}
            opacity={0.84}
            far={7}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/scene.gltf");
