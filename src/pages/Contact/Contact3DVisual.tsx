import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Glowing double-sine wave of telemetry particles
const TelemetryParticleWave: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
    const pointsRef = useRef<THREE.Points>(null);
    
    // Wave parameters: 50 x 50 grid = 2,500 particles
    const gridDim = 50;
    const count = gridDim * gridDim;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        
        let idx = 0;
        const spacing = 0.16;
        const halfSize = (gridDim * spacing) / 2;

        for (let i = 0; i < gridDim; i++) {
            for (let j = 0; j < gridDim; j++) {
                const x = i * spacing - halfSize;
                const z = j * spacing - halfSize;
                
                pos[idx * 3] = x;
                pos[idx * 3 + 1] = 0; // calculated in useFrame
                pos[idx * 3 + 2] = z;

                idx++;
            }
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const t = state.clock.getElapsedTime();
        const positionsAttr = pointsRef.current.geometry.attributes.position;
        const array = positionsAttr.array as Float32Array;

        let idx = 0;
        for (let i = 0; i < gridDim; i++) {
            for (let j = 0; j < gridDim; j++) {
                const xIdx = idx * 3;
                const yIdx = idx * 3 + 1;
                const zIdx = idx * 3 + 2;

                const x = array[xIdx];
                const z = array[zIdx];

                // Double-sine wave mathematical equations representing frequency streams
                const y = Math.sin(x * 1.1 + t * 1.6) * Math.cos(z * 1.1 + t * 1.2) * 0.45
                        + Math.sin((x + z) * 0.6 + t * 0.8) * 0.2;

                array[yIdx] = y;
                idx++;
            }
        }
        positionsAttr.needsUpdate = true;

        // Apply mouse-based parallax rotations to the whole wave grid
        const targetRotX = mouse.current.y * 0.35 + 0.55; // Low-angle tilted plane
        const targetRotY = mouse.current.x * 0.35;
        
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.05);
        pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotY, 0.05);
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#00C2FF"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

// Ambient floating cyber-dust
const FloatingDust: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 300;

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 8;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#00E08A"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

// Floor grid mapping
const BlueprintGrid: React.FC = () => {
    return (
        <group position={[0, -1.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <gridHelper args={[12, 24, "#005577", "#030a17"]} />
            <mesh receiveShadow>
                <planeGeometry args={[12, 12]} />
                <shadowMaterial opacity={0.2} />
            </mesh>
        </group>
    );
};

// Camera sweep controller
const CameraController: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
    useFrame((state) => {
        const { camera } = state;
        const t = state.clock.getElapsedTime();
        
        // Auto slow cinematic camera rotation path
        const orbitRadius = 6.2;
        const orbitSpeed = 0.045;
        const camX = Math.sin(t * orbitSpeed) * orbitRadius;
        const camZ = Math.cos(t * orbitSpeed) * orbitRadius;
        const camY = 1.1 + Math.sin(t * 0.02) * 0.25;

        // Apply mouse-based parallax shifts
        const targetX = camX + mouse.current.x * 0.6;
        const targetZ = camZ + mouse.current.x * 0.3;
        const targetY = camY - mouse.current.y * 0.45;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.035);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);

        camera.lookAt(new THREE.Vector3(0, 0.1, 0));
    });

    return null;
};

// Main Export Component
const Contact3DVisual: React.FC = () => {
    const mouse = useRef({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseLeave = () => {
        mouse.current.x = 0;
        mouse.current.y = 0;
    };

    return (
        <div 
            className="hero-3d-wrapper" 
            style={{ width: "100%", height: "100%", position: "relative" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Canvas
                dpr={1}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                camera={{ position: [0, 1.2, 6.2], fov: 45 }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                
                {/* Spotlights and highlights */}
                <pointLight position={[3, 3, 3]} color="#00C2FF" intensity={2} distance={8} />
                <pointLight position={[-3, -2, -3]} color="#00E08A" intensity={1.5} distance={8} />

                {/* 3D Visualizer Elements */}
                <TelemetryParticleWave mouse={mouse} />
                <FloatingDust />
                <BlueprintGrid />

                {/* Camera Orbit Controllers */}
                <CameraController mouse={mouse} />
            </Canvas>
        </div>
    );
};

export default Contact3DVisual;
