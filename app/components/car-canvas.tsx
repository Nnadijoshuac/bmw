"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import { MathUtils, PerspectiveCamera } from "three";

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

type CarCanvasProps = {
  scrollProgress: number;
};

const START_CAMERA = { x: 6.4, y: 1, z: 8.9, fov: 20 } as const;
const ZOOM_CAMERA = { x: 6.36, y: 1, z: 8.84, fov: 19.95 } as const;
const FOCUS_POINT = { x: -2, y: 0.9, z: -8 } as const;
const START_LOOK_POINT = { x: -2.6, y: 0.4, z: -5 } as const;
const ZOOM_LOOK_POINT = { x: -2.58, y: 0.41, z: -5.08 } as const;
const END_LOOK_POINT = { x: 12, y: 0.9, z: -5 } as const;
const FORWARD_TRAVEL_MAX = 3.2;

function CameraRig({ scrollProgress }: CarCanvasProps) {
  const { camera } = useThree();
  const lookRef = useRef<{ x: number; y: number; z: number }>({
    x: START_LOOK_POINT.x,
    y: START_LOOK_POINT.y,
    z: START_LOOK_POINT.z,
  });

  useLayoutEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return;
    camera.position.set(START_CAMERA.x, START_CAMERA.y, START_CAMERA.z);
    camera.fov = START_CAMERA.fov;
    camera.lookAt(START_LOOK_POINT.x, START_LOOK_POINT.y, START_LOOK_POINT.z);
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame((_, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;

    const p = MathUtils.clamp(scrollProgress, 0, 1);
    const zoomPhase = MathUtils.clamp(p / 0.28, 0, 1);
    const orbitPhase = MathUtils.clamp((p - 0.28) / 0.72, 0, 1);

    const startX = START_CAMERA.x;
    const startY = START_CAMERA.y;
    const startZ = START_CAMERA.z;
    const startFov = START_CAMERA.fov;

    const zoomX = ZOOM_CAMERA.x;
    const zoomY = ZOOM_CAMERA.y;
    const zoomZ = ZOOM_CAMERA.z;
    const zoomFov = ZOOM_CAMERA.fov;

    const focusX = FOCUS_POINT.x;
    const focusY = FOCUS_POINT.y;
    const focusZ = FOCUS_POINT.z;

    const zoomT = MathUtils.smoothstep(zoomPhase, 0, 1);
    const preOrbitX = MathUtils.lerp(startX, zoomX, zoomT);
    const preOrbitY = MathUtils.lerp(startY, zoomY, zoomT);
    const preOrbitZ = MathUtils.lerp(startZ, zoomZ, zoomT);
    const targetFov = MathUtils.lerp(startFov, zoomFov, zoomT);

    const orbitRadius = Math.hypot(zoomX - focusX, zoomZ - focusZ);
    const orbitStartAngle = Math.atan2(zoomZ - focusZ, zoomX - focusX);
    const orbitEndAngle = orbitStartAngle + 2.1;
    const orbitAngle = MathUtils.lerp(orbitStartAngle, orbitEndAngle, orbitPhase);

    const orbitX = focusX + orbitRadius * Math.cos(orbitAngle);
    const orbitZ = focusZ + orbitRadius * Math.sin(orbitAngle);

    const targetX = MathUtils.lerp(preOrbitX, orbitX, orbitPhase);
    const targetY = MathUtils.lerp(preOrbitY, preOrbitY + 1.1, orbitPhase);
    const targetZBase = MathUtils.lerp(preOrbitZ, orbitZ, orbitPhase);
    const forwardTravel = MathUtils.lerp(0, FORWARD_TRAVEL_MAX, MathUtils.smoothstep(p, 0, 1));
    const targetZ = targetZBase + forwardTravel;

    camera.position.x = MathUtils.damp(camera.position.x, targetX, 4.2, delta);
    camera.position.y = MathUtils.damp(camera.position.y, targetY, 4.2, delta);
    camera.position.z = MathUtils.damp(camera.position.z, targetZ, 4.2, delta);
    camera.fov = MathUtils.damp(camera.fov, targetFov, 4.2, delta);

    // Keep the opening framing through zoom, then ease into orbit tracking.
    const preOrbitLookX = MathUtils.lerp(START_LOOK_POINT.x, ZOOM_LOOK_POINT.x, zoomT);
    const preOrbitLookY = MathUtils.lerp(START_LOOK_POINT.y, ZOOM_LOOK_POINT.y, zoomT);
    const preOrbitLookZ = MathUtils.lerp(START_LOOK_POINT.z, ZOOM_LOOK_POINT.z, zoomT);
    const lookBlendRaw = MathUtils.clamp((orbitPhase - 0.12) / 0.88, 0, 1);
    const lookBlend = MathUtils.smootherstep(lookBlendRaw, 0, 1);
    const desiredLookX = MathUtils.lerp(preOrbitLookX, END_LOOK_POINT.x, lookBlend);
    const desiredLookY = MathUtils.lerp(preOrbitLookY, END_LOOK_POINT.y, lookBlend);
    const desiredLookZ = MathUtils.lerp(preOrbitLookZ, END_LOOK_POINT.z, lookBlend);

    lookRef.current.x = MathUtils.damp(lookRef.current.x, desiredLookX, 3.4, delta);
    lookRef.current.y = MathUtils.damp(lookRef.current.y, desiredLookY, 3.4, delta);
    lookRef.current.z = MathUtils.damp(lookRef.current.z, desiredLookZ, 3.4, delta);

    camera.lookAt(lookRef.current.x, lookRef.current.y, lookRef.current.z);
    camera.updateProjectionMatrix();
  });

  return null;
}

export default function CarCanvas({ scrollProgress }: CarCanvasProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [START_CAMERA.x, START_CAMERA.y, START_CAMERA.z],
          fov: START_CAMERA.fov,
        }}
      >
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
          <CameraRig scrollProgress={scrollProgress} />
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
