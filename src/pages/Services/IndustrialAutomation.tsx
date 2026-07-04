import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaTools, FaCheckCircle, FaPhoneAlt,
    FaEnvelope, FaMicrochip, FaSlidersH, FaServer, FaTv,
    FaCloud, FaShieldAlt, FaClock, FaMapMarkerAlt, FaIndustry
} from "react-icons/fa";
import "./IndustrialAutomation.css";

// Animation Variants
const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const IndustrialAutomation: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Industrial Automation & SCADA Solutions | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Vertex Controls designs and deploys high-performance industrial automation, PLC programming, SCADA systems, HMI development, and industrial IoT solutions across the UAE.'
        );
    }, []);

    // 3. Our Solutions Data (6 solutions)
    const solutionsData = [
        {
            icon: FaMicrochip,
            title: "PLC Programming",
            desc: "Robust logic control configuration for Siemens, Rockwell, Schneider, and ABB systems to automate sequential and continuous industrial processes.",
            features: ["Custom Logic Design", "Safety PLC Integration", "PID Loop Tuning", "Multi-platform Conversion"]
        },
        {
            icon: FaServer,
            title: "SCADA Integration",
            desc: "Comprehensive plant-wide monitoring platforms providing real-time data visualization, telemetry analysis, and historical reporting.",
            features: ["Interactive Dashboards", "Alarms & Notifications", "SQL Database Logging", "Custom Reporting Modules"]
        },
        {
            icon: FaTv,
            title: "HMI Development",
            desc: "Intuitive touch-screen interfaces designed with ergonomic workflows, clear alarm management, and real-time process graphics.",
            features: ["Ergonomic UI/UX Layouts", "Local Diagnostics Screens", "Multi-language Support", "Trend & Graph Displays"]
        },
        {
            icon: FaIndustry,
            title: "Process Automation",
            desc: "Complete process optimization, sensor-to-cloud integration, and automated feedback loops to regulate temp, pressure, and chemical dosing.",
            features: ["Cascade Controls", "Telemetry & Networking", "Pneumatic Control Loops", "Energy Saving Protocols"]
        },
        {
            icon: FaCloud,
            title: "IIoT Gateways",
            desc: "Cloud-connected telemetry systems allowing secure remote diagnostics, real-time mobile alerts, and off-site machinery status tracking.",
            features: ["Edge Computing Setup", "Email & SMS Alerting", "Secure VPN Access", "Web-based Dashboards"]
        },
        {
            icon: FaTools,
            title: "Commissioning Services",
            desc: "On-site electrical and mechanical mounting, loop checks, sensor calibration, and start-up execution.",
            features: ["Field Ingress Checking", "Signal Loop Validation", "FAT & SAT Certifications", "Post-startup Handover"]
        }
    ];

    // 4. Why Choose Vertex Controls Data (5 feature cards)
    const whyChooseData = [
        {
            icon: FaTools,
            title: "Experience",
            desc: "Over 15 years integrating complex industrial machinery, water loops, and chemical dosing systems across the UAE."
        },
        {
            icon: FaCheckCircle,
            title: "Quality",
            desc: "100% factory acceptance testing (FAT) using premium, certified components from elite global automation brands."
        },
        {
            icon: FaShieldAlt,
            title: "Safety",
            desc: "Full compliance with local Civil Defense rules, utility guidelines (DEWA/ADDC), and IEC international safety standards."
        },
        {
            icon: FaClock,
            title: "Technical Support",
            desc: "SLA response coverage, emergency on-site diagnostics, logic debugging, and prompt component replacement."
        },
        {
            icon: FaSlidersH,
            title: "Customized Solutions",
            desc: "Tailored automation logic and panel dimensions built specifically around your facility's requirements."
        }
    ];

    return (
        <div className="subpage-wrapper">
            {/* 1. HERO SECTION */}
            <section className="subpage-hero-section">
                <div className="container page-header-content">
                    <motion.div
                        className="page-header-inner"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="breadcrumb-wrapper">
                            <div className="breadcrumb">
                                <Link to="/">Home</Link>
                                <span className="breadcrumb-separator">/</span>
                                <Link to="/services">Services</Link>
                                <span className="breadcrumb-separator">/</span>
                                <span>Industrial Automation & SCADA</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Systems Integration</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Industrial Automation <span className="text-gradient">& SCADA</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Orchestrating plant-wide efficiency and transparency through high-performance PLC programming, SCADA telemetry, and process automation solutions.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="page-header-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <FaArrowRight size={14} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Us
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. ABOUT THE SERVICE SECTION */}
            <section className="overview-section section-padding">
                <div className="container split-layout align-center">
                    <motion.div
                        className="overview-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.span variants={fadeInUp} className="sub-tag">Operational Excellence</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">Reliable Process & SCADA Telemetry</motion.h2>
                        <p className="overview-lead">
                            At Vertex Controls, we deliver state-of-the-art industrial automation solutions that empower businesses to optimize process loops and telemetry streams.
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            Our engineering crew designs and configures robust logical control cores, intuitive HMI visualization screens, and secure MQTT gateways. We optimize legacy architectures and build new process platforms conforming to strict international ISO standards.
                        </p>
                    </motion.div>

                    <motion.div
                        className="overview-image-col"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="overview-image-frame">
                            <img src="/Images/Project/scada_showcase.webp" alt="Industrial Automation SCADA Dashboard Visuals" />
                            <div className="image-frame-overlay"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. OUR SOLUTIONS SECTION */}
            <section className="subpage-solutions-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Functional Capabilities</span>
                        <h2 className="section-title">Our Solutions</h2>
                        <p>Tailored automation services designed to regulate plant loops, telemetry streams, and panel networks.</p>
                    </motion.div>

                    <motion.div
                        className="subpage-solutions-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {solutionsData.map((sol, index) => {
                            const SolIcon = sol.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="solution-card"
                                    variants={fadeInUp}
                                >
                                    <div className="solution-card-icon">
                                        <SolIcon />
                                    </div>
                                    <h3>{sol.title}</h3>
                                    <p>{sol.desc}</p>
                                    <ul className="solution-card-features">
                                        {sol.features.map((feat, idx) => (
                                            <li key={idx} className="solution-card-feature-item">
                                                <span className="solution-card-feature-dot"></span>
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 4. WHY CHOOSE VERTEX CONTROLS */}
            <section className="subpage-why-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Why Choose Vertex</span>
                        <h2 className="section-title">The Automation Advantage</h2>
                        <p>Why plant managers and consultants select Vertex Controls as their automation engineering partner.</p>
                    </motion.div>

                    <motion.div
                        className="why-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {whyChooseData.map((why, index) => {
                            const WhyIcon = why.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="why-item"
                                    variants={fadeInUp}
                                >
                                    <div className="why-icon-box">
                                        <WhyIcon />
                                    </div>
                                    <h3>{why.title}</h3>
                                    <p>{why.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 5. CALL TO ACTION SECTION */}
            <section className="subpage-cta-section">
                <div className="container">
                    <motion.div
                        className="cta-glass-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="sub-tag" style={{ color: "var(--primary)", display: "inline-block", marginBottom: "1rem" }}>
                            Get In Touch
                        </span>
                        <h2>Ready to Discuss Your Project?</h2>
                        <p>
                            Whether you need PLC programming configurations, SCADA visualization panels, custom HMI designs, or remote data setups, Vertex Controls delivers expert systems engineered for uptime.
                        </p>
                        
                        <div className="cta-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <FaArrowRight size={14} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Us
                            </Link>
                        </div>

                        <div className="cta-contacts">
                            <div className="cta-contact-item">
                                <span className="cta-contact-icon"><FaMapMarkerAlt /></span>
                                <span>Dubai, UAE</span>
                            </div>
                            <div className="cta-contact-item">
                                <span className="cta-contact-icon"><FaPhoneAlt /></span>
                                <a href="tel:+971554962866">+971 55 496 2866</a>
                            </div>
                            <div className="cta-contact-item">
                                <span className="cta-contact-icon"><FaEnvelope /></span>
                                <a href="mailto:Sales@vertex-controls.com">Sales@vertex-controls.com</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default IndustrialAutomation;
