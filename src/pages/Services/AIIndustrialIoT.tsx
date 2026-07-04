import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaTools, FaCheckCircle, FaPhoneAlt,
    FaEnvelope, FaSlidersH, FaShieldAlt, FaClock, FaMapMarkerAlt,
    FaCloud, FaMicrochip, FaServer, FaChartArea, FaWifi, FaSatelliteDish
} from "react-icons/fa";
import "./AIIndustrialIoT.css";

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

const AIIndustrialIoT: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "AI & Industrial IoT Solutions | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Vertex Controls integrates AI monitoring, Edge Industrial IoT gateways, wireless sensors, cloud database logging, and predictive maintenance in UAE.'
        );
    }, []);

    // 3. Our Solutions Data (6 solutions)
    const solutionsData = [
        {
            icon: FaSatelliteDish,
            title: "Edge Telemetry Gateways",
            desc: "Heavy-duty communication nodes capturing Modbus, Profibus, and MQTT data streams from field automation devices.",
            features: ["Multi-protocol Support", "Secure Edge Computing", "Data Buffering Store", "Isolated RS485 Ports"]
        },
        {
            icon: FaServer,
            title: "Cloud Data Lakes",
            desc: "Secure cloud database systems storing millions of telemetry logs for historical trend analysis and deep diagnostics.",
            features: ["InfluxDB/SQL Databases", "Secure TLS Encryption", "REST API Connectivity", "Backup Mirror Grids"]
        },
        {
            icon: FaMicrochip,
            title: "Predictive Diagnostics",
            desc: "Machine learning algorithms profiling motor vibration anomalies to forecast mechanical failures.",
            features: ["Vibration Frequency FFT", "Temperature Trend Maps", "Failure Probability Logs", "Early warning Alerting"]
        },
        {
            icon: FaWifi,
            title: "Remote Asset Tracking",
            desc: "Live GPS coordinates and operational performance metrics of mobile field machinery displayed on active maps.",
            features: ["Cellular GPS Nodes", "Geofencing Alert Scripts", "Battery Voltage Logs", "Engine Hour Registers"]
        },
        {
            icon: FaCloud,
            title: "Smart Sensor Clusters",
            desc: "Wireless industrial sensors logging environmental metrics in remote plant structures without structural cables.",
            features: ["LoRaWAN Signal Paths", "Battery Lifespan 5+ Yrs", "IP67 Ingress Ratings", "Ambient Humidity Sensors"]
        },
        {
            icon: FaChartArea,
            title: "Analytical Dashboards",
            desc: "Interactive web-based and mobile screens showing real-time Overall Equipment Effectiveness (OEE) and efficiency targets.",
            features: ["Grafana Graphic Visuals", "Custom Downtime Codes", "KPI Calculation Engines", "Shift Report Generators"]
        }
    ];

    // 4. Why Choose Vertex Controls Data (5 feature cards)
    const whyChooseData = [
        {
            icon: FaTools,
            title: "Experience",
            desc: "Qualified smart telemetry integrators and database architects executing complex industrial networks."
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
                                <span>AI & IoT Solutions</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">IIoT Telemetry</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            AI & <span className="text-gradient">Industrial IoT</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Integrating edge telemetry devices, cloud data gateways, predictive asset diagnostics, and AI monitoring for proactive operations.
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
                        <motion.span variants={fadeInUp} className="sub-tag">Asset Diagnostics</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">Data-Driven Industrial Intelligence</motion.h2>
                        <p className="overview-lead">
                            At Vertex Controls, we deploy advanced AI-driven Industrial IoT (IIoT) platforms that unlock real-time insight from your machinery.
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            Our engineers install edge telemetry gateways and cloud databases that track vibration, temperature, and current loads. We apply intelligent diagnostic algorithms to predict mechanical failures, minimize downtime, and extend equipment lifespans.
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
                            <img src="/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp" alt="AI & IoT Industrial Telemetry Servers and Dashboards" />
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
                        <p>Tailored telemetry services designed to automate edge polling, cloud data logs, and diagnostic dashboards.</p>
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
                        <h2 className="section-title">The Telemetry Advantage</h2>
                        <p>Why modern operations choose Vertex Controls as their smart telemetry integration partner.</p>
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
                            Whether you need industrial IoT edge gateways, secure cloud databases, vibration diagnostic modeling, or custom analytical dashboards, Vertex Controls delivers expert systems engineered for uptime.
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

export default AIIndustrialIoT;
