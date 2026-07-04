import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaDraftingCompass, FaBolt, FaCogs,
    FaServer, FaTools, FaCheckCircle, FaIndustry,
    FaMapMarkerAlt, FaMicrochip, FaChartLine, FaPhoneAlt, FaEnvelope
} from "react-icons/fa";
import "./ProjectSubpageShared.css";

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

const ControlPanelsAutomationProject: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Industrial Control Panels & Automation Project | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Case study showcasing Vertex Controls electromechanical project capabilities in Industrial Control Panel design, manufacturing, PLC SCADA integration, and commissioning in Dubai, UAE.'
        );
    }, []);

    // 3. Services Delivered
    const servicesDelivered = [
        {
            icon: FaDraftingCompass,
            title: "Engineering Design",
            desc: "Custom electrical drawings (SLDs), schematic drawings, thermal ventilation calculations, and CAD layout designs."
        },
        {
            icon: FaBolt,
            title: "Control Panel Manufacturing",
            desc: "Fabricating certified low-voltage motor control centers (MCC), VFD starters, and PLC enclosures in our Dubai facilities."
        },
        {
            icon: FaCogs,
            title: "PLC Programming",
            desc: "Robust sequence script coding and closed-loop control tuning using Siemens TIA Portal and Rockwell architectures."
        },
        {
            icon: FaServer,
            title: "SCADA Integration",
            desc: "Centralized SCADA server integration displaying real-time alarms, historical databases logging, and performance metrics."
        },
        {
            icon: FaTools,
            title: "Installation",
            desc: "On-site cable routing tray assembly, signal terminations, instrument mounting, and phase wiring checks."
        },
        {
            icon: FaCheckCircle,
            title: "Testing & Commissioning",
            desc: "Rigorous signal loop diagnostics, sensor calibrations, FAT panel checklists, and final SAT startup validations."
        }
    ];

    // 4. Project Highlights
    const projectHighlights = [
        {
            icon: FaIndustry,
            title: "Industry",
            value: "Industrial Manufacturing / Water & Utilities"
        },
        {
            icon: FaMapMarkerAlt,
            title: "Location",
            value: "Jebel Ali Industrial Area, Dubai, UAE"
        },
        {
            icon: FaMicrochip,
            title: "Technologies Used",
            value: "Siemens S7-1500, WinCC SCADA, Modbus TCP, active telemetry networks"
        },
        {
            icon: FaChartLine,
            title: "Key Benefits",
            value: "35% increase in operational throughput, 40% reduction in power quality surges, and zero manual faults."
        },
        {
            icon: FaCheckCircle,
            title: "Project Outcome",
            value: "100% successful utility approval, completed within the planned shutdown window with zero downtime extensions."
        }
    ];

    // 5. Gallery Images
    const galleryImages = [
        { src: "/Images/Project/mcc_showcase.webp", caption: "Low-Voltage MCC & VFD Cabinets" },
        { src: "/Images/Project/scada_showcase.webp", caption: "SCADA Control Interface Console" },
        { src: "/Images/Project/lighting_showcase.webp", caption: "Smart Facility Control Center" },
        { src: "/Images/booth_exib.webp", caption: "Electromechanical Commissioning Site" }
    ];

    return (
        <div className="subpage-wrapper">
            {/* 1. HERO BANNER */}
            <section className="subpage-hero-section">
                <div className="container page-header-content">
                    <motion.div
                        className="page-header-inner"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="breadcrumb-wrapper">
                            <div className="breadcrumb">
                                <Link to="/">Home</Link>
                                <span className="breadcrumb-separator">/</span>
                                <Link to="/projects">Projects</Link>
                                <span className="breadcrumb-separator">/</span>
                                <span>Industrial Control Panels & Automation</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Case Study Showcase</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Industrial Control Panels <span className="text-gradient">& Automation</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Showcasing Vertex Controls' premium engineering, assembly, and testing of intelligent control panels and automation configurations in the UAE.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="page-header-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <FaArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. PROJECT OVERVIEW */}
            <section className="project-overview-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header align-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Case Study Scoping</span>
                        <h2 className="section-title text-gradient">Project Overview & Objectives</h2>
                        <p className="overview-summary">
                            Vertex Controls engineered a complete system modernization for a tier-1 manufacturing plant in Dubai, replacing legacy electromechanical control gear with state-of-the-art automation loops.
                        </p>
                    </motion.div>

                    <div className="overview-split-layout">
                        {/* Left Side - Interactive Terminal Media */}
                        <motion.div
                            className="overview-media-panel"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="overview-terminal-frame">
                                <img src="/Images/Project/scada_showcase.webp" alt="Vertex Control Panel Modernization Layout" />
                                <div className="terminal-screen-filter"></div>
                                
                                {/* Floating Status Badges */}
                                <div className="telemetry-badge badge-top-left">
                                    <span className="pulse-green-dot"></span>
                                    <span>STATUS: ONLINE</span>
                                </div>
                                <div className="telemetry-badge badge-bottom-right">
                                    <span>LOCATION: DUBAI, UAE</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Case Specifications */}
                        <motion.div
                            className="overview-details-panel"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <div className="details-card-block">
                                <h3>Project Objectives</h3>
                                <ul className="objectives-list-modern">
                                    <li>
                                        <div className="objective-icon-wrap">
                                            <FaCheckCircle />
                                        </div>
                                        <div>
                                            <strong>Error-Free Operations</strong>
                                            <p>Automate manual facility operations to eliminate human errors and maximize runtime efficiency.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="objective-icon-wrap">
                                            <FaCheckCircle />
                                        </div>
                                        <div>
                                            <strong>Centralized Supervision</strong>
                                            <p>Link all manufacturing floor equipment into a single, centralized control room screen dashboard.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="objective-icon-wrap">
                                            <FaCheckCircle />
                                        </div>
                                        <div>
                                            <strong>Regulation Compliance</strong>
                                            <p>Ensure all electrical designs fully conform to local utility regulations and international safety codes.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="scope-tags-block">
                                <h3>Deliverable Scope</h3>
                                <div className="scope-tags-deck">
                                    <span className="scope-tag-item">Electrical Schematics</span>
                                    <span className="scope-tag-item">Control Panels Assembly</span>
                                    <span className="scope-tag-item">Automation Programming</span>
                                    <span className="scope-tag-item">Central Monitoring System</span>
                                    <span className="scope-tag-item">Factory Validation Testing</span>
                                    <span className="scope-tag-item">On-Site Setup & Handover</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICES DELIVERED */}
            <section className="project-services-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Solutions Executed</span>
                        <h2 className="section-title">Services Delivered</h2>
                        <p>Our complete range of engineering, panels assembly, programming, and testing services deployed on site.</p>
                    </motion.div>

                    <motion.div
                        className="project-services-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {servicesDelivered.map((serv, index) => {
                            const ServIcon = serv.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="project-service-card"
                                    variants={fadeInUp}
                                >
                                    <div className="project-service-icon">
                                        <ServIcon />
                                    </div>
                                    <h3>{serv.title}</h3>
                                    <p>{serv.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 4. PROJECT HIGHLIGHTS */}
            <section className="project-highlights-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Key Metrics</span>
                        <h2 className="section-title">Project Highlights</h2>
                        <p>Critical metrics, technologies used, and final outcomes achieved for the client.</p>
                    </motion.div>

                    <motion.div
                        className="project-highlights-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {projectHighlights.map((high, index) => {
                            const HighIcon = high.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="highlight-card"
                                    variants={fadeInUp}
                                >
                                    <div className="highlight-card-icon">
                                        <HighIcon />
                                    </div>
                                    <h3>{high.title}</h3>
                                    <p>{high.value}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 5. GALLERY */}
            <section className="project-gallery-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Visual Portfolio</span>
                        <h2 className="section-title">Project Gallery</h2>
                        <p>Step inside our commissioning process and panels assembly setups through our gallery.</p>
                    </motion.div>

                    <motion.div
                        className="project-gallery-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {galleryImages.map((img, index) => (
                            <motion.div
                                key={index}
                                className="gallery-card"
                                variants={fadeInUp}
                            >
                                <div className="gallery-image-wrap">
                                    <img src={img.src} alt={img.caption} />
                                    <div className="gallery-card-glow"></div>
                                    <div className="gallery-caption">
                                        <span>{img.caption}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 6. CALL TO ACTION */}
            <section className="project-cta-section section-padding">
                <div className="container">
                    <motion.div
                        className="cta-glass-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="sub-tag" style={{ color: "var(--primary)", display: "inline-block", marginBottom: "1rem" }}>
                            Start Your Project
                        </span>
                        <h2>Start Your Next Automation Project with Vertex Controls</h2>
                        <p>
                            Contact our engineering estimation crew today to discuss PLC configurations, custom low-voltage panels, or integration plans.
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

export default ControlPanelsAutomationProject;
