import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaTools, FaCheckCircle, FaPhoneAlt,
    FaEnvelope, FaDraftingCompass, FaBolt, FaCogs, FaServer,
    FaIndustry, FaMapMarkerAlt, FaMicrochip, FaChartLine
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

const PumpStationAutomation: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Pump Station Automation & Maintenance Project | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Case study demonstrating Vertex Controls pump station automation, level controller programming, telemetry link-ups, and maintenance services in Dubai, UAE.'
        );
    }, []);

    // Services Delivered
    const servicesDelivered = [
        {
            icon: FaDraftingCompass,
            title: "Engineering Design",
            desc: "Custom electrical layouts (SLDs), pump motor protection calculations, and level-sensor flow layout planning."
        },
        {
            icon: FaBolt,
            title: "Control Panel Assembly",
            desc: "Assembling customized motor starter panels, variable frequency drive (VFD) panels, and PLC logic cabinets in our UAE workshop."
        },
        {
            icon: FaCogs,
            title: "PLC Programming",
            desc: "Developing flow-rate control scripts and level-regulation protection cycles using reliable controller hardware."
        },
        {
            icon: FaServer,
            title: "Central Monitoring System",
            desc: "Centralized SCADA server integration linking all pump channels to show live alarms, flow rate records, and motor runtimes."
        },
        {
            icon: FaTools,
            title: "Installation",
            desc: "On-site cable tray routing, power cabling, flow meter mounting, and panel wiring terminations."
        },
        {
            icon: FaCheckCircle,
            title: "Testing & Commissioning",
            desc: "End-to-end signal testing, dry run pump diagnostics, safety trip validation, and utility inspections."
        }
    ];

    // Project Highlights
    const projectHighlights = [
        {
            icon: FaIndustry,
            title: "Industry",
            value: "Water Utilities / Municipal Infrastructure"
        },
        {
            icon: FaMapMarkerAlt,
            title: "Location",
            value: "Jebel Ali, Dubai, UAE"
        },
        {
            icon: FaMicrochip,
            title: "Technologies Used",
            value: "Siemens S7-1500 PLC, WinCC Professional, telemetry gateways, pressure transmitter loops"
        },
        {
            icon: FaChartLine,
            title: "Key Benefits",
            value: "40% increase in water transmission efficiency, 30% reduction in motor electrical spikes, and zero overflows."
        },
        {
            icon: FaCheckCircle,
            title: "Project Outcome",
            value: "100% successful utility approval, completed within schedule, and backed by a 24/7 service plan."
        }
    ];

    // Gallery Images
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
                                <span>Pump Station Automation</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Case Study Showcase</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Pump Station <span className="text-gradient">Automation & Maintenance</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Automated pump control logic, high-efficiency telemetry integration, and proactive maintenance operations for municipal and industrial water networks.
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
                            Vertex Controls engineered a complete system modernization for a major municipal water facility, upgrading legacy electromechanical controls to a self-monitoring, high-efficiency pump automation system.
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
                                            <p>Automate manual station valves and pump sequences to eliminate overflows and runtime faults.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="objective-icon-wrap">
                                            <FaCheckCircle />
                                        </div>
                                        <div>
                                            <strong>Centralized Supervision</strong>
                                            <p>Link all pump level meters, pressure switches, and flow indicators directly to a central monitor room dashboard.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="objective-icon-wrap">
                                            <FaCheckCircle />
                                        </div>
                                        <div>
                                            <strong>Regulation Compliance</strong>
                                            <p>Ensure all electrical switchgear and panel layouts fully conform to local utility regulations and international safety codes.</p>
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
                        <span className="sub-tag">Scope of Execution</span>
                        <h2 className="section-title">Services Delivered & Engineering Solutions</h2>
                        <p>Detailed design, scheduling, workshop engineering, programming, and on-site testing services integrated during the project lifecycle.</p>
                    </motion.div>

                    <motion.div
                        className="project-services-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {servicesDelivered.map((service, idx) => (
                            <motion.div
                                key={idx}
                                className="project-service-card"
                                variants={fadeInUp}
                            >
                                <div className="project-service-icon">
                                    <service.icon />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </motion.div>
                        ))}
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
                        <span className="sub-tag">Performance Benchmarks</span>
                        <h2 className="section-title">Project Highlights & Benchmarks</h2>
                        <p>Key indicators, hardware technologies, geographical locations, and overall operational results achieved.</p>
                    </motion.div>

                    <motion.div
                        className="project-highlights-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {projectHighlights.map((highlight, idx) => (
                            <motion.div
                                key={idx}
                                className="highlight-card"
                                variants={fadeInUp}
                            >
                                <div className="highlight-card-icon">
                                    <highlight.icon />
                                </div>
                                <h3>{highlight.title}</h3>
                                <p>{highlight.value}</p>
                            </motion.div>
                        ))}
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
                        <span className="sub-tag">Site Imagery</span>
                        <h2 className="section-title">Visual Showcase</h2>
                        <p>Photographs showing panels, assemblies, local controllers setup, and final commissioned systems on site.</p>
                    </motion.div>

                    <motion.div
                        className="project-gallery-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {galleryImages.map((image, idx) => (
                            <motion.div
                                key={idx}
                                className="gallery-card"
                                variants={fadeInUp}
                            >
                                <div className="gallery-image-wrap">
                                    <img src={image.src} alt={image.caption} />
                                    <div className="gallery-card-glow"></div>
                                    <div className="gallery-caption">
                                        <span>{image.caption}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 6. CALL TO ACTION */}
            <section className="project-cta-section">
                <div className="container">
                    <motion.div
                        className="cta-glass-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>Need a Similar Solution for Your Plant?</h2>
                        <p>
                            Contact Vertex Controls today. Our expert automation and electromechanical engineers in Dubai will customize, construct, and commission solutions tailored exactly to your operational standards.
                        </p>
                        
                        <div className="cta-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <FaArrowRight size={14} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Our Team
                            </Link>
                        </div>

                        <div className="cta-contacts">
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

export default PumpStationAutomation;
