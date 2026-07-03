import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        document.body.classList.add("custom-cursor-active");

        const cursorEl = cursorRef.current;
        if (!cursorEl) return;

        // Only update coordinate translations on mouse move (ZERO TRAILING DELAY & NO DOM QUERY)
        const onMouseMove = (e: MouseEvent) => {
            cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        };

        // Leverage event delegation on window to check hovered items (runs only on element transition, not movement pixels)
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target) {
                const isInteractive = target.closest("a, button, input, textarea, .btn, .service-card, .solution-card, .proj-card-modern, .float-card, .metric-box");
                if (isInteractive) {
                    cursorEl.classList.add("hovered");
                } else {
                    cursorEl.classList.remove("hovered");
                }
            }
        };

        const onMouseDown = () => cursorEl.classList.add("clicked");
        const onMouseUp = () => cursorEl.classList.remove("clicked");

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        window.addEventListener("mousedown", onMouseDown, { passive: true });
        window.addEventListener("mouseup", onMouseUp, { passive: true });

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <div className="instant-cursor-wrapper" ref={cursorRef}>
            <div className="instant-dot" />
            <div className="instant-ring" />
        </div>
    );
};
