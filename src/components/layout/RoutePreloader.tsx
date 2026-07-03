import React from "react";
import "./RoutePreloader.css";

export const RoutePreloader: React.FC = () => {
    return (
        <div className="route-loader-container">
            <div className="route-loader-box">
                <div className="route-loader-spinner">
                    <div className="spinner-glow"></div>
                </div>
                <div className="route-loader-text">Initializing Systems...</div>
            </div>
        </div>
    );
};
