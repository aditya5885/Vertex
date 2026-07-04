import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaCogs, FaServer, FaBolt, FaWrench,
    FaBuilding, FaNetworkWired, FaCloud, FaChartLine,
    FaIndustry, FaRoad, FaWater, FaPlug, FaLandmark,
    FaCheckCircle, FaUserTie, FaDraftingCompass, FaTools,
    FaShieldAlt
} from "react-icons/fa";
import "./Projects.css";

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

const Projects: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Our Engineering Projects in UAE | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Explore Vertex Controls completed engineering projects across Dubai and UAE, specializing in PLC SCADA programming, electrical distribution boards, MEP, and smart infrastructure.'
        );
    }, []);

    // 3. Featured Project Categories
    const projectCategories = [
        {
            icon: FaCogs,
            title: "Automation & Control Systems",
            desc: "Custom low-voltage switchgear panels, variable frequency drive (VFD) starters, and smart motor control center assembly.",
            scope: "Factory Assembly, FAT Commissioning, Component Integration, Thermal Auditing",
            image: "/Images/Project/mcc_showcase.webp"
        },
        {
            icon: FaServer,
            title: "PLC & SCADA Projects",
            desc: "High-reliability programmable logic control programming and customized SCADA supervision telemetry for municipal utility loops.",
            scope: "Logic Development, HMI Interface Design, Network Loop Testing, Telemetry Upgrades",
            image: "/Images/Project/scada_showcase.webp"
        },
        {
            icon: FaBolt,
            title: "Electrical Engineering",
            desc: "Complete electrical power systems designs, sub-main distribution boards installation, cabling routing, and load analysis audits.",
            scope: "Cable Sizing, Schematics Auditing, DEWA Drawings Submission, Load Calculation",
            image: "/Images/Project/57045811-01db-4a79-8406-f8398676e32e.webp"
        },
        {
            icon: FaWrench,
            title: "MEP Services",
            desc: "Integrated electromechanical, HVAC piping, fluid booster pumps, and sprinkler system contracting for industrial facilities.",
            scope: "HVAC Installation, Pump Alignment, Drain Grid Plumbing, Civil Defense Approvals",
            image: "/Images/booth_exib.webp"
        },
        {
            icon: FaBuilding,
            title: "Smart Infrastructure",
            desc: "Centralized Building Management Systems (BMS) and intelligent smart lighting grids running under KNX and DALI protocols.",
            features: "BACNet Programming, KNX Dimming Modules, Occupancy Sensors Integration",
            scope: "Sensor Mapping, Light Bus Configurations, BMS Control Dashboard Setup",
            image: "/Images/Project/lighting_showcase.webp"
        },
        {
            icon: FaNetworkWired,
            title: "ELV & Security Systems",
            desc: "Plant-wide CCTV surveillance layouts, biometric door locks, card readers, and structured high-speed network fiber cabling.",
            scope: "Cat6A Cabling runs, NVR Storage Tuning, Security Panel Terminations",
            image: "/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.webp"
        },
        {
            icon: FaCloud,
            title: "AI & IoT Solutions",
            desc: "Deploying Edge IIoT telemetry transmitters, vibration diagnostic sensors, and cloud analytical software systems.",
            scope: "MQTT Gateway Integrations, Machine Vibration Profiling, Cloud Database Setup",
            image: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp"
        },
        {
            icon: FaChartLine,
            title: "Energy Management",
            desc: "Smart departmental sub-metering systems, automatic power factor correction banks, and active harmonic filtration grids.",
            scope: "Capacitor Bank Assembly, Active Filtering Calibration, Power Quality Auditing",
            image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp"
        }
    ];

    // 4. Industries We Serve
    const industriesData = [
        { icon: FaIndustry, title: "Industrial Facilities", desc: "Factories, assembly warehouses, and heavy engineering production mills." },
        { icon: FaBuilding, title: "Commercial Buildings", desc: "Premium skyscrapers, corporate offices, and mixed-use retail malls." },
        { icon: FaRoad, title: "Infrastructure", desc: "Public transport grids, highway lighting systems, and remote telemetry gates." },
        { icon: FaWater, title: "Water & Wastewater", desc: "Municipal pump stations, treatment plants, and irrigation pipeline networks." },
        { icon: FaCogs, title: "Manufacturing", desc: "Automated production loops, chemical blending sites, and batch processes." },
        { icon: FaPlug, title: "Utilities", desc: "Electrical substations, power distribution networks, and smart metering loops." },
        { icon: FaLandmark, title: "Government Projects", desc: "Public sector utility plants, secure structures, and municipal buildings." }
    ];

    // 5. Project Delivery Process
    const deliverySteps = [
        {
            num: "01",
            icon: FaUserTie,
            title: "Consultation",
            desc: "Comprehensive site audits, detailed load surveys, feasibility assessments, and technical parameter definitions."
        },
        {
            num: "02",
            icon: FaDraftingCompass,
            title: "Engineering Design",
            desc: "Creation of bespoke schematics (SLDs), CAD routing path drawings, panel layouts, and logical control flowcharts."
        },
        {
            num: "03",
            icon: FaTools,
            title: "Installation",
            desc: "Custom workshop panel assembly, on-site heavy equipment positioning, cable terminations, and system integration."
        },
        {
            num: "04",
            icon: FaShieldAlt,
            title: "Testing & Commissioning",
            desc: "Rigorous signal loop checks, sensor calibration, and Factory/Site Acceptance Testing (FAT/SAT) under compliance codes."
        },
        {
            num: "05",
            icon: FaCheckCircle,
            title: "Maintenance & Support",
            desc: "Recurring diagnostics, logic backups, preventative maintenance checkups, and 24/7 SLA emergency callout coverage."
        }
    ];

    return (
        <div className="projects-page-wrapper">
            {/* 1. HERO BANNER */}
            <section className="projects-hero-section">
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
                                <span>Projects</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Completed Portfolios</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Our <span className="text-gradient">Projects</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Showcasing engineering intelligence and electromechanical excellence across Dubai and the wider UAE. Discover our projects catalog.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="page-header-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <FaArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. ABOUT OUR PROJECTS SECTION */}
            <section className="projects-about-section section-padding">
                <div className="container split-layout align-center">
                    <motion.div
                        className="overview-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.span variants={fadeInUp} className="sub-tag">Electromechanical Delivery</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">Complete Project Lifecycle</motion.h2>
                        <p className="overview-lead">
                            At Vertex Controls, we design, build, test, and maintain turnkey engineering systems that secure high performance for utilities and corporations across the UAE.
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            Our senior team bridges the gap between field instrumentation and smart cloud monitoring, delivering custom LV panels, logic automation loops, and MEP contracting built to international standards.
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
                            <img src="/control_room_bg.png" alt="Vertex Controls Operations Control Room Layout" />
                            <div className="image-frame-overlay"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. FEATURED PROJECT CATEGORIES */}
            <section className="featured-categories-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Core Sectors</span>
                        <h2 className="section-title">Project Categories</h2>
                        <p>Discover our capabilities and scope of work across key electromechanical and automation fields.</p>
                    </motion.div>

                    <motion.div
                        className="categories-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {projectCategories.map((cat, index) => {
                            const CatIcon = cat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="project-category-card"
                                    variants={fadeInUp}
                                >
                                    <div className="category-card-image">
                                        <img src={cat.image} alt={`${cat.title} project showcase`} />
                                        <div className="category-image-glow"></div>
                                        <div className="category-icon-overlay">
                                            <CatIcon />
                                        </div>
                                    </div>
                                    <div className="category-card-body">
                                        <h3>{cat.title}</h3>
                                        <p className="category-desc">{cat.desc}</p>
                                        <div className="category-scope">
                                            <strong>Scope of Work:</strong>
                                            <span>{cat.scope}</span>
                                        </div>
                                        <Link to="/services" className="category-learn-btn">
                                            <span>Explore Capabilities</span>
                                            <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 4. INDUSTRIES WE SERVE */}
            <section className="industries-serve-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Application Areas</span>
                        <h2 className="section-title">Industries We Serve</h2>
                        <p>Supporting critical operations and commercial spaces with specialized electromechanical engineering.</p>
                    </motion.div>

                    <motion.div
                        className="industries-cards-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {industriesData.map((ind, index) => {
                            const IndIcon = ind.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="industry-grid-card"
                                    variants={fadeInUp}
                                >
                                    <div className="industry-grid-icon">
                                        <IndIcon />
                                    </div>
                                    <h3>{ind.title}</h3>
                                    <p>{ind.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 5. PROJECT DELIVERY PROCESS (Timeline) */}
            <section className="delivery-process-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">How We Work</span>
                        <h2 className="section-title">Our Project Delivery Process</h2>
                        <p>A rigorous, systematic engineering timeline that guarantees quality control and safety validation.</p>
                    </motion.div>

                    <div className="process-timeline-wrapper">
                        {deliverySteps.map((step, index) => {
                            const StepIcon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="process-timeline-node"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={fadeInUp}
                                >
                                    <div className="timeline-node-marker">
                                        <span className="timeline-node-num">{step.num}</span>
                                        <span className="timeline-node-line"></span>
                                    </div>
                                    <div className="timeline-node-content">
                                        <div className="timeline-node-icon">
                                            <StepIcon />
                                        </div>
                                        <h3>{step.title}</h3>
                                        <p>{step.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION */}
            <section className="projects-cta-section section-padding">
                <div className="container">
                    <motion.div
                        className="cta-glass-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="sub-tag" style={{ color: "var(--primary)", display: "inline-block", marginBottom: "1rem" }}>
                            Build With Vertex
                        </span>
                        <h2>Let's Build Your Next Engineering Project</h2>
                        <p>
                            Get in touch with our electromechanical estimation crew to discuss technical specifications, submit schematic plans, or request a detailed quotation.
                        </p>
                        
                        <div className="cta-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <FaArrowRight size={14} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Projects;
