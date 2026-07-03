import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FaShieldAlt, FaTools, FaMedal, FaClock } from "react-icons/fa";
import "./WhyUs3DVisual.css";

export const WhyUs3DVisual: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(1);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const light1 = new THREE.PointLight(0x00ffb3, 3, 50);
        light1.position.set(4, 4, 4);
        scene.add(light1);

        const light2 = new THREE.PointLight(0x00e5ff, 2, 50);
        light2.position.set(-4, -4, -2);
        scene.add(light2);

        // 3D Group
        const group = new THREE.Group();
        scene.add(group);

        // Outer Wireframe Geometry (Octahedron / Dodecahedron mix)
        const outerGeo = new THREE.DodecahedronGeometry(1.8, 1);
        const outerMat = new THREE.MeshStandardMaterial({
            color: 0x00ffb3,
            wireframe: true,
            emissive: 0x00ffb3,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.7
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        group.add(outerMesh);

        // Inner Core Crystal / Diamond
        const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
        const innerMat = new THREE.MeshPhongMaterial({
            color: 0x00e5ff,
            emissive: 0x00e5ff,
            emissiveIntensity: 0.7,
            shininess: 90,
            flatShading: true
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        group.add(innerMesh);

        // Rotating Energy Ring
        const ringGeo = new THREE.TorusGeometry(2.5, 0.025, 12, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00ffb3,
            transparent: true,
            opacity: 0.6
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.5;
        group.add(ringMesh);

        // Orbiting Nodes around ring
        const nodeGroup = new THREE.Group();
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12);
            const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
            const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
            nodeMesh.position.x = Math.cos(angle) * 2.5;
            nodeMesh.position.z = Math.sin(angle) * 2.5;
            nodeGroup.add(nodeMesh);
        }
        nodeGroup.rotation.x = Math.PI / 2.5;
        group.add(nodeGroup);

        // Mouse Move Interaction & IntersectionObserver Visibility Loop
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

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
            mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
        };

        container.addEventListener("mousemove", handleMouseMove, { passive: true });

        const clock = new THREE.Clock();
        let animId: number;

        function animate() {
            if (!isVisible) {
                isLooping = false;
                return;
            }
            isLooping = true;
            animId = requestAnimationFrame(animate);

            const elapsed = clock.getElapsedTime();

            outerMesh.rotation.y = elapsed * 0.15;
            outerMesh.rotation.z = elapsed * 0.1;

            innerMesh.rotation.y = -elapsed * 0.25;
            innerMesh.rotation.x = elapsed * 0.2;

            ringMesh.rotation.z = elapsed * 0.1;
            nodeGroup.rotation.z = elapsed * 0.2;

            targetX += (mouseX * 0.4 - targetX) * 0.05;
            targetY += (mouseY * 0.4 - targetY) * 0.05;

            group.rotation.y = targetX * 0.7;
            group.rotation.x = -targetY * 0.7;

            renderer.render(scene, camera);
        }

        animate();

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            observer.disconnect();
            container.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animId);
            renderer.dispose();
            outerGeo.dispose();
            outerMat.dispose();
            innerGeo.dispose();
            innerMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
        };
    }, []);

    return (
        <div className="whyus-3d-wrapper" ref={containerRef}>
            <canvas ref={canvasRef} className="whyus-3d-canvas" />

            <div className="why-badge wb-top-left">
                <FaShieldAlt className="wb-icon" />
                <span>Quality & Safety First</span>
            </div>

            <div className="why-badge wb-top-right">
                <FaTools className="wb-icon" />
                <span>Turnkey Engineering</span>
            </div>

            <div className="why-badge wb-bottom-left">
                <FaClock className="wb-icon" />
                <span>Rapid 24/7 Support</span>
            </div>

            <div className="why-badge wb-bottom-right">
                <FaMedal className="wb-icon" />
                <span>15+ Yrs Expertise</span>
            </div>

            <div className="whyus-glow-orb"></div>
        </div>
    );
};
