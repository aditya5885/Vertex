import React, { useEffect, useRef } from "react";
import "./CTAPortal3D.css";

export const CTAPortal3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        let angle = 0;
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
            const centerX = width / 2;
            const centerY = height / 2;
            angle += 0.008;

            const ringCount = 8;
            for (let i = 0; i < ringCount; i++) {
                const radius = 60 + i * 45;
                ctx.strokeStyle = i % 2 === 0 ? "rgba(0, 229, 255, 0.15)" : "rgba(0, 255, 179, 0.12)";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([15, 25]);
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, angle * (i % 2 === 0 ? 1 : -1), Math.PI * 2 + angle);
                ctx.stroke();
            }
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
        <div className="cta-portal-3d-wrapper">
            <canvas ref={canvasRef} className="cta-portal-3d-canvas" />
        </div>
    );
};
