import React, { useEffect, useRef } from "react";
import "./Products3DBackground.css";

export const Products3DBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
        const nodeCount = 35;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        let animId: number;
        let isVisible = true;

        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        }, { threshold: 0.05 });
        if (canvas.parentElement) observer.observe(canvas.parentElement);

        const render = () => {
            animId = requestAnimationFrame(render);
            if (!isVisible) return;

            ctx.clearRect(0, 0, width, height);

            // Connect nodes
            for (let i = 0; i < nodeCount; i++) {
                const n1 = nodes[i];
                n1.x += n1.vx;
                n1.y += n1.vy;

                if (n1.x < 0 || n1.x > width) n1.vx *= -1;
                if (n1.y < 0 || n1.y > height) n1.vy *= -1;

                ctx.fillStyle = "rgba(0, 229, 255, 0.7)";
                ctx.beginPath();
                ctx.arc(n1.x, n1.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < nodeCount; j++) {
                    const n2 = nodes[j];
                    const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(0, 229, 255, ${0.25 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.75;
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }
        };

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
        <div className="products-3d-bg-wrapper">
            <canvas ref={canvasRef} className="products-3d-bg-canvas" />
        </div>
    );
};
