import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTools, FaBolt, FaMicrochip, FaCogs } from "react-icons/fa";

const fadeInUp: any = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};

const Services: React.FC = () => {
    const services = [
        {
            icon: FaTools,
            title: "Electromechanical Installation",
            desc: "Complete electrical & mechanical contracting, panel installations, and equipment testing for utility and manufacturing sectors."
        },
        {
            icon: FaBolt,
            title: "Control Panel Assembly",
            desc: "Bespoke design, assembly, and type-testing of custom MCC, VFD, PLC, and low voltage switchgear panels."
        },
        {
            icon: FaMicrochip,
            title: "Industrial Automation & SCADA",
            desc: "Siemens, Rockwell, and Schneider PLC logic programming, telemetry setup, SCADA dash integration, and commissioning."
        },
        {
            icon: FaCogs,
            title: "Annual Maintenance (AMC)",
            desc: "24/7 SLA emergency callout response, preventive maintenance cycles, and thermal imaging checks to secure operational uptime."
        }
    ];

    return (
        <div className="services-page-wrapper">
            {/* Header / Hero */}
            <section className="page-header-section">
                <div className="page-header-bg-grid"></div>
                <div className="container page-header-content">
                    <motion.div
                        className="page-header-inner"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        {/* Breadcrumbs */}
                        <motion.div variants={fadeInUp} className="breadcrumb-wrapper">
                            <div className="breadcrumb">
                                <Link to="/">Home</Link>
                                <span className="breadcrumb-separator">/</span>
                                <span>Services</span>
                            </div>
                        </motion.div>

                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Professional Engineering Services</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Our Engineering <span className="text-gradient">Services</span>
                        </motion.h1>

                        {/* Lead Text */}
                        <motion.p variants={fadeInUp} className="page-header-lead">
                            We deliver comprehensive, high-precision electromechanical, automation, and SCADA solutions engineered for extreme operational reliability, maximum uptime, and regulatory compliance.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div variants={fadeInUp} className="page-header-buttons">
                            <Link to="/contact" className="btn btn-primary">
                                Request a Consultation <FaArrowRight size={14} />
                            </Link>
                            <Link to="/projects" className="btn btn-secondary">
                                View Our Portfolio
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="services-grid-section" style={{ padding: "5rem 0", background: "var(--dark)" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                        {services.map((svc, i) => (
                            <div key={i} style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "12px",
                                padding: "2.5rem",
                                position: "relative"
                            }}>
                                <div style={{
                                    width: "50px", height: "50px", borderRadius: "10px",
                                    background: "rgba(0, 229, 255, 0.1)", border: "1px solid rgba(0, 229, 255, 0.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "var(--primary)", fontSize: "1.4rem", marginBottom: "1.5rem"
                                }}>
                                    <svc.icon />
                                </div>
                                <h3 style={{ color: "var(--white)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                                    {svc.title}
                                </h3>
                                <p style={{ color: "var(--gray)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                    {svc.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
