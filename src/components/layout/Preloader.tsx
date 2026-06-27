import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";

const loadingTexts = [
    "Initializing Engineering Core...",
    "Loading SCADA & Telemetry Systems...",
    "Connecting Industrial IoT Gateway...",
    "Establishing Electromechanical Control...",
    "System Ready — Opening Vertex Controls..."
];

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [textIdx, setTextIdx] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Smooth counter simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        if (onComplete) onComplete();
                    }, 500);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 8) + 3;
                return Math.min(prev + increment, 100);
            });
        }, 60);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        if (progress > 20 && progress <= 45) setTextIdx(1);
        else if (progress > 45 && progress <= 70) setTextIdx(2);
        else if (progress > 70 && progress <= 95) setTextIdx(3);
        else if (progress > 95) setTextIdx(4);
    }, [progress]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    <div className="preloader-bg-mesh"></div>
                    
                    <div className="preloader-content">
                        {/* Glowing Ring & Logo Container */}
                        <div className="preloader-logo-box">
                            <div className="preloader-ring ring-outer"></div>
                            <div className="preloader-ring ring-inner"></div>
                            <motion.img
                                src="/Vertex_logo.png"
                                alt="Vertex Controls Logo"
                                className="preloader-logo"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            />
                        </div>

                        {/* Progress Bar & Counter */}
                        <div className="preloader-progress-container">
                            <div className="preloader-counter">{progress}%</div>
                            <div className="preloader-bar-track">
                                <motion.div
                                    className="preloader-bar-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Telemetry Text */}
                        <motion.p
                            key={textIdx}
                            className="preloader-status-text"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {loadingTexts[textIdx]}
                        </motion.p>
                    </div>

                    <div className="preloader-bottom-decor">
                        VERTEX CONTROLS ELECTROMECHANICAL LLC
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
