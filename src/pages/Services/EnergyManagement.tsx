import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaTools, FaCheckCircle, FaPhoneAlt,
    FaEnvelope, FaSlidersH, FaShieldAlt, FaClock, FaMapMarkerAlt,
    FaBolt, FaChartLine, FaLeaf, FaHdd, FaCalculator
} from "react-icons/fa";
import "./EnergyManagement.css";

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

const EnergyManagement: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Energy Management & Power Quality | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Vertex Controls installs Energy Management systems, smart sub-meters, Power Factor Correction, active harmonic filters, and utility auditing in UAE.'
        );
    }, []);

    // 3. Our Solutions Data (6 solutions)
    const solutionsData = [
        {
            icon: FaChartLine,
            title: "Smart Sub-Metering",
            desc: "Sectional digital meter grids logging raw active power, current, and voltage parameters to identify heavy-load areas.",
            features: ["Modbus TCP/IP Chains", "Billing Allocation Logs", "Demand Load Profiles", "Real-Time Current Feeds"]
        },
        {
            icon: FaBolt,
            title: "Power Factor Correction",
            desc: "Automatic capacitor banks custom-engineered to elevate power factor above 0.97, neutralizing utility fine surcharges.",
            features: ["APFC Relay Tuning", "Heavy Duty Capacitor Banks", "Detuned Reactor Filters", "Thermal Enclosure Ventilation"]
        },
        {
            icon: FaSlidersH,
            title: "Harmonic Filtration",
            desc: "Active and passive harmonic filters protecting sensitive computers and minimizing heating in busbars.",
            features: ["Active Filtering (AHF)", "Total Harmonic Distortion (THD)", "Busbar Heat Audits", "IEEE 519 Standard Alignments"]
        },
        {
            icon: FaCalculator,
            title: "Energy Auditing",
            desc: "Detailed site load profiling surveys highlighting voltage spikes, power leakage, and equipment optimization options.",
            features: ["Portable Power Loggers", "Leakage Current Traces", "Optimization Proposals", "Detailed Auditing Reports"]
        },
        {
            icon: FaHdd,
            title: "Load Shedding Logic",
            desc: "Automatic PLC control scripts reducing non-critical facility consumption lines during peak utility demand spikes.",
            features: ["Priority Stage Triggers", "Chiller Capacity Throttling", "Generator Sync Logic", "Peak-Demand Threshold Monitors"]
        },
        {
            icon: FaLeaf,
            title: "Carbon Reporting",
            desc: "Integrated software metrics translating active kilowatt logs into carbon footprint output files.",
            features: ["ESG Metric Dashboards", "Conversion Weight Indexes", "PDF Compliance Outputs", "Multi-site Consolidations"]
        }
    ];

    // 4. Why Choose Vertex Controls Data (5 feature cards)
    const whyChooseData = [
        {
            icon: FaTools,
            title: "Experience",
            desc: "Qualified energy management designers and power technicians executing complex systems across commercial high-rises."
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
                                <span>Energy Management</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Power Optimization</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Energy <span className="text-gradient">Management</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Detailed power quality analysis, smart sub-metering grids, power quality optimization, and carbon footprint reduction programs.
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
                        <motion.span variants={fadeInUp} className="sub-tag">Power Quality</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">Reduce Waste & Utility Penalties</motion.h2>
                        <p className="overview-lead">
                            At Vertex Controls, we design energy management systems that help UAE enterprises track power quality and reduce electricity waste.
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            Our specialists deploy smart sub-metering grids and harmonic correction filters. We audit electrical systems to identify power factor inefficiencies, saving you money on utility penalties and building a greener carbon footprint.
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
                            <img src="/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp" alt="Energy Management Power Analyzer Console" />
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
                        <p>Tailored energy systems designed to automate power factor corrections, filter harmonics, and meter loads.</p>
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
                        <h2 className="section-title">The Efficiency Advantage</h2>
                        <p>Why commercial plants and building managers select Vertex Controls as their energy saving partner.</p>
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
                            Whether you need smart sub-metering configurations, automatic capacitor banks for power factor correction, harmonic active filters, or detailed site auditing, Vertex Controls delivers expert systems engineered for uptime.
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

export default EnergyManagement;
