import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FaMicrochip, FaNetworkWired, FaChartLine, FaShieldAlt } from "react-icons/fa";
import "./Hero3DVisual.css";

export const Hero3DVisual: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;

        // 1. Scene setup
        const scene = new THREE.Scene();

        // 2. Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 6.5;

        // 3. Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(1);

        // 4. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00e5ff, 3, 50);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00ffb3, 2, 50);
        pointLight2.position.set(-5, -5, -2);
        scene.add(pointLight2);

        // 5. 3D Objects Construction
        const techGroup = new THREE.Group();
        scene.add(techGroup);

        // Outer Wireframe Core (Icosahedron)
        const outerGeo = new THREE.IcosahedronGeometry(2, 1);
        const outerMat = new THREE.MeshStandardMaterial({
            color: 0x00e5ff,
            wireframe: true,
            emissive: 0x00b3cc,
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.75
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        techGroup.add(outerMesh);

        // Inner Core Energy Sphere
        const innerGeo = new THREE.SphereGeometry(1.1, 24, 24);
        const innerMat = new THREE.MeshPhongMaterial({
            color: 0x00ffb3,
            emissive: 0x00e5ff,
            emissiveIntensity: 0.6,
            shininess: 100,
            wireframe: false,
            transparent: true,
            opacity: 0.6
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        techGroup.add(innerMesh);

        // Orbital Tech Ring 1
        const ringGeo1 = new THREE.TorusGeometry(2.7, 0.02, 12, 64);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.5 });
        const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 3;
        techGroup.add(ring1);

        // Orbital Tech Ring 2
        const ringGeo2 = new THREE.TorusGeometry(3.1, 0.015, 12, 64);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00ffb3, transparent: true, opacity: 0.4 });
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.rotation.y = Math.PI / 4;
        techGroup.add(ring2);

        // Particles Swarm
        const particleCount = 120;
        const particlesGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
        }

        particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.04,
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        // 6. Mouse Interaction & IntersectionObserver Visibility Loop
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let isVisible = true;
        let isLooping = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible && !isLooping) {
                    animate();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(container);

        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        };

        container.addEventListener("mousemove", handleMouseMove, { passive: true });

        let animationFrameId: number;
        const clock = new THREE.Clock();

        function animate() {
            if (!isVisible) {
                isLooping = false;
                return;
            }
            isLooping = true;
            animationFrameId = requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Constant rotation
            outerMesh.rotation.y = elapsedTime * 0.2;
            outerMesh.rotation.x = elapsedTime * 0.1;
            
            innerMesh.rotation.y = -elapsedTime * 0.3;
            
            ring1.rotation.z = elapsedTime * 0.15;
            ring2.rotation.x = elapsedTime * 0.2;

            particleSystem.rotation.y = elapsedTime * 0.05;

            // Smooth parallax mouse tilt
            targetX += (mouseX * 0.5 - targetX) * 0.05;
            targetY += (mouseY * 0.5 - targetY) * 0.05;

            techGroup.rotation.y = targetX * 0.8;
            techGroup.rotation.x = -targetY * 0.8;

            renderer.render(scene, camera);
        }

        animate();

        // 7. Resize Handler
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener("resize", handleResize, { passive: true });

        // Cleanup
        return () => {
            observer.disconnect();
            container.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            outerGeo.dispose();
            outerMat.dispose();
            innerGeo.dispose();
            innerMat.dispose();
            ringGeo1.dispose();
            ringMat1.dispose();
            ringGeo2.dispose();
            ringMat2.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
        };
    }, []);

    return (
        <div className="hero-3d-wrapper" ref={containerRef}>
            <canvas ref={canvasRef} className="hero-3d-canvas" />
            
            {/* Overlay Holographic Floating Cards */}
            <div className="holo-badge hb-top-left">
                <FaMicrochip className="hb-icon" />
                <div>
                    <strong>Smart PLC Logic</strong>
                    <span>Real-time Execution</span>
                </div>
            </div>

            <div className="holo-badge hb-top-right">
                <FaNetworkWired className="hb-icon" />
                <div>
                    <strong>IoT Gateway</strong>
                    <span>Cloud Sync Active</span>
                </div>
            </div>

            <div className="holo-badge hb-bottom-left">
                <FaChartLine className="hb-icon" />
                <div>
                    <strong>99.99% Reliability</strong>
                    <span>Zero Downtime</span>
                </div>
            </div>

            <div className="holo-badge hb-bottom-right">
                <FaShieldAlt className="hb-icon" />
                <div>
                    <strong>ISO Certified</strong>
                    <span>Electrical Safety</span>
                </div>
            </div>
            
            <div className="holo-glow-ring"></div>
        </div>
    );
};
