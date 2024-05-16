'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring } from '@react-spring/core';
import { a as aThree } from '@react-spring/three';
import { a as aWeb } from '@react-spring/web';
import {
  ContactShadows,
  Environment,
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';

const AnimatedMaterial = aThree(MeshDistortMaterial);

const Orb = ({ setBg }: { setBg: any }) => {
  const sphere = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const [mode, setMode] = useState(false);
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Change cursor on hovered state
  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'none'
      : `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#E8B059"/></svg>'
        )}'), auto`;
  }, [hovered]);

  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: down ? 1.2 : hovered ? 1.05 : 1,
      coat: mode && !hovered ? 0.04 : 1,
      ambient: mode && !hovered ? 1.5 : 0.5,
      env: mode && !hovered ? 0.4 : 1,
      color: hovered ? '#E8B059' : mode ? '#202020' : 'white',
      config: { mass: 2, tension: 1000, friction: 10 },
    },
    [mode, hovered, down]
  );

  useFrame((state) => {
    light.current!.position.x = state.mouse.x * 20;
    light.current!.position.y = state.mouse.y * 20;
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(
        sphere.current.position.x,
        hovered ? state.mouse.x / 2 : 0,
        0.2
      );
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 +
          (hovered ? state.mouse.y / 2 : 0),
        0.2
      );
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>
        <aThree.ambientLight intensity={ambient} />
        <aThree.pointLight
          ref={light}
          position-z={-15}
          intensity={env}
          color="#F8C069"
        />
      </PerspectiveCamera>

      <aThree.mesh
        ref={sphere}
        scale={wobble}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setDown(true)}
        onPointerUp={() => {
          setDown(false);
          // Toggle mode between dark and bright
          setMode(!mode);
          setBg({
            background: !mode ? '#202020' : '#f0f0f0',
            fill: !mode ? '#f0f0f0' : '#202020',
          });
        }}
      >
        <sphereBufferGeometry args={[1, 64, 64]} />
        <AnimatedMaterial
          color={color}
          envMapIntensity={env}
          clearcoat={coat}
          clearcoatRoughness={0}
          metalness={0.1}
        />
      </aThree.mesh>
      <Environment preset="apartment" />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.6, 0]}
        opacity={mode ? 0.8 : 0.4}
        width={15}
        height={15}
        blur={2.5}
        far={1.6}
      />
    </>
  );
};

export const Scene = () => {
  const [{ background }, set] = useSpring({ background: '#f0f0f0' }, []);

  return (
    <aWeb.main style={{ background }}>
      <Canvas className="canvas" dpr={[1, 2]}>
        <Orb setBg={set} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </aWeb.main>
  );
};
