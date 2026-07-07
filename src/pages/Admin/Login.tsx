import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import { FaLock, FaChevronRight, FaExclamationTriangle } from "react-icons/fa";
import "./Dashboard.css"; // We'll share a stylesheet for clean theme bindings

const Login: React.FC = () => {
    const [password, setPassword] = useState("");
    const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });
    const [submitting, setSubmitting] = useState(false);
    
    const { login, isLoggedIn } = useContent();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/admin/dashboard");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;

        setSubmitting(true);
        setStatusMsg({ type: "", text: "" });

        const success = await login(password);
        if (success) {
            setStatusMsg({ type: "success", text: "Authenticated successfully! Redirecting..." });
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 800);
        } else {
            setStatusMsg({ type: "error", text: "Authentication failed. Incorrect admin passcode." });
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="login-bg-decorations">
                <div className="decor-orb orb-1"></div>
                <div className="decor-orb orb-2"></div>
            </div>

            <div className="admin-login-card">
                <div className="login-logo-header">
                    <img src="/favicon.png" alt="Vertex Logo" className="login-logo-img" />
                    <h2>Vertex Controls</h2>
                    <span className="login-subtitle">Content Management Portal</span>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="admin-passcode">Enter Admin Passcode</label>
                        <div className="password-input-wrap">
                            <span className="input-icon"><FaLock /></span>
                            <input 
                                id="admin-passcode"
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={submitting}
                                required
                            />
                        </div>
                    </div>

                    {statusMsg.text && (
                        <div className={`status-toast ${statusMsg.type}`}>
                            {statusMsg.type === "error" && <FaExclamationTriangle className="toast-icon" />}
                            <span>{statusMsg.text}</span>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="btn btn-primary login-btn"
                        disabled={submitting}
                    >
                        <span>{submitting ? "Authenticating..." : "Login to CMS"}</span>
                        {!submitting && <FaChevronRight size={12} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
