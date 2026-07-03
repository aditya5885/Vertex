import React, { useEffect, useRef } from "react";
import "./ServicesBackground.css";

export const ServicesBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = [];
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        let animId: number;
        let isVisible = true;
        let isLooping = false;

        const render = () => {
            if (!isVisible) {
                isLooping = false;
                return;
            }
            isLooping = true;
            animId = requestAnimationFrame(render);

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(0, 255, 179, 0.6)";

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !isLooping) {
                render();
            }
        }, { threshold: 0.05 });
        if (canvas.parentElement) observer.observe(canvas.parentElement);

        render();

        const handleResize = () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        };

        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div className="services-3d-bg-wrapper">
            <canvas ref={canvasRef} className="services-3d-bg-canvas" />
            <div className="services-glow-mesh"></div>
        </div>
    );
};
