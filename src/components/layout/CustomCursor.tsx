import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export const CustomCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const auraRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        document.body.classList.add("custom-cursor-active");

        let clientX = -100;
        let clientY = -100;
        let auraX = -100;
        let auraY = -100;
        let isHovered = false;
        let isClicked = false;
        let animId: number;

        const onMouseMove = (e: MouseEvent) => {
            clientX = e.clientX;
            clientY = e.clientY;

            const target = e.target as HTMLElement;
            if (target) {
                const isInteractive = target.closest("a, button, input, textarea, .btn, .service-card, .solution-card, .proj-card-modern, .float-card, .metric-box");
                isHovered = !!isInteractive;
            }
        };

        const onMouseDown = () => { isClicked = true; };
        const onMouseUp = () => { isClicked = false; };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mousedown", onMouseDown, { passive: true });
        window.addEventListener("mouseup", onMouseUp, { passive: true });

        // Zero-latency hardware accelerated animation loop
        const loop = () => {
            // Direct DOM transformation for 60fps smoothness
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${clientX - 5}px, ${clientY - 5}px, 0) scale(${isClicked ? 0.6 : isHovered ? 1.4 : 1})`;
                if (isHovered) dotRef.current.classList.add("hovered");
                else dotRef.current.classList.remove("hovered");
            }

            // Smooth trailing aura with lerp
            auraX += (clientX - auraX) * 0.25;
            auraY += (clientY - auraY) * 0.25;

            if (auraRef.current) {
                auraRef.current.style.transform = `translate3d(${auraX - 22}px, ${auraY - 22}px, 0) scale(${isClicked ? 0.7 : isHovered ? 1.5 : 1})`;
                if (isHovered) auraRef.current.classList.add("hovered");
                else auraRef.current.classList.remove("hovered");
            }

            animId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            cancelAnimationFrame(animId);
        };
    }, []);

    if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <div className="custom-cursor-container">
            <div className="laser-core" ref={dotRef} />
            <div className="laser-aura" ref={auraRef}>
                <div className="aura-pulse-ring" />
            </div>
        </div>
    );
};
