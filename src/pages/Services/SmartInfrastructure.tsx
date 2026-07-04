import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaTools, FaCheckCircle, FaPhoneAlt,
    FaEnvelope, FaSlidersH, FaShieldAlt, FaClock, FaMapMarkerAlt,
    FaNetworkWired, FaLightbulb, FaTv, FaBolt, FaLock, FaBuilding
} from "react-icons/fa";
import "./SmartInfrastructure.css";

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

const SmartInfrastructure: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Smart Infrastructure & BMS | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Vertex Controls integrates Smart Infrastructure, BMS building management systems, smart lighting, security ELV networks, and cabling in UAE.'
        );
    }, []);

    // 3. Our Solutions Data (6 solutions)
    const solutionsData = [
        {
            icon: FaBuilding,
            title: "BMS Integration",
            desc: "Centralized automation of HVAC, air handlers, chiller plants, and environmental sensors under a single operating screen.",
            features: ["BacNet Protocol Sync", "Modbus Loops Mapping", "AHU Fan Control Logic", "Chiller Flow Automation"]
        },
        {
            icon: FaLightbulb,
            title: "Smart Lighting Controls",
            desc: "DALI and KNX protocol configuration to schedule lighting grids, harvest daylight, and save building energy costs.",
            features: ["KNX Dimming Channels", "DALI Ballast Addressing", "Daylight Harvesting Sensors", "Custom Scene Configurations"]
        },
        {
            icon: FaLock,
            title: "Access Control Networks",
            desc: "Fingerprint scanner clusters, magnetic locks, card swipe reader panels, and smart vehicle barrier grids.",
            features: ["Biometric Integrations", "Database Access Syncs", "Roll-call Alarm Mapping", "IP Controller Stations"]
        },
        {
            icon: FaTv,
            title: "Video Surveillance (CCTV)",
            desc: "Plant-wide IP security camera networks, structural network video recorders, and desktop security center views.",
            features: ["NVR Disk Optimization", "PoE Network Layouts", "Camera Angles Plotting", "Thermal Security Scans"]
        },
        {
            icon: FaNetworkWired,
            title: "Structured Cabling",
            desc: "Installation of structural copper and high-speed fiber optic cabling grids, patch panels, and server racks.",
            features: ["Fiber Splicing Diagnostics", "Cat6A Certified Testing", "Rack Wire Cable Ties", "Patch Panel Labels"]
        },
        {
            icon: FaBolt,
            title: "Energy Monitoring Systems",
            desc: "Smart sub-metering installations communicating via Modbus to map building electrical efficiency.",
            features: ["Sectional Meter Logs", "Real-Time Power Factor", "Load-Shedding Interfaces", "Historical Usage Charts"]
        }
    ];

    // 4. Why Choose Vertex Controls Data (5 feature cards)
    const whyChooseData = [
        {
            icon: FaTools,
            title: "Experience",
            desc: "Qualified smart lighting integrators and network field designers executing complex commercial structures."
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
                                <span>Smart Infrastructure & BMS</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Building Automation</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Smart Infrastructure <span className="text-gradient">& BMS</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Advanced building management systems (BMS), smart lighting controls, access instrumentation, and integrated infrastructure controls.
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
                        <motion.span variants={fadeInUp} className="sub-tag">Facility Automation</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">Centralized Infrastructure Controls</motion.h2>
                        <p className="overview-lead">
                            At Vertex Controls, we design and integrate smart infrastructure systems that unify building controls, lighting grids, and security platforms.
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            Our team builds centralized BMS solutions that automate HVAC, monitoring sensors, and emergency alarms. We enable commercial facility managers to reduce energy waste and maintain structural health via integrated, interactive control interfaces.
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
                            <img src="/Images/Project/lighting_showcase.webp" alt="Smart Infrastructure Building Control Console" />
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
                        <p>Tailored facility services designed to automate lighting grids, access systems, and network cabling.</p>
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
                        <h2 className="section-title">The Technology Advantage</h2>
                        <p>Why facility developers and contractors choose Vertex Controls as their smart building partner.</p>
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
                            Whether you need automated HVAC BMS controls, custom KNX smart lighting designs, integrated video surveillance networks, or certified structured cabling, Vertex Controls delivers expert systems engineered for uptime.
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

export default SmartInfrastructure;
