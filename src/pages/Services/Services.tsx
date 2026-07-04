import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
    FaArrowRight, FaTools, FaBolt, FaCogs, 
    FaServer, FaBrain, FaChartLine, FaShieldAlt, FaClock, 
    FaBuilding, FaGlobe, FaAward, FaCheckCircle, FaUsers, 
    FaPhoneAlt, FaEnvelope, FaNetworkWired, FaIndustry, FaHistory
} from "react-icons/fa";
import "./Services.css";

// Reusable Animation Variants
const fadeInUp: any = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
};

const Services: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    // 8 Core Services
    const services = [
        {
            icon: FaCogs,
            image: "/Images/Project/mcc_showcase.webp",
            title: "Automation & Control Systems",
            desc: "Expert design, fabrication, assembly, and type-testing of custom MCC, VFD, PLC, and LV switchgear panels built to international safety standards.",
            link: "/services/control-panels"
        },
        {
            icon: FaServer,
            image: "/Images/Project/scada_showcase.webp",
            title: "PLC & SCADA Systems",
            desc: "Custom PLC logic development, telemetry integrations, HMI styling, and SCADA dashboard setup using industry-standard platforms.",
            link: "/services/industrial-automation"
        },
        {
            icon: FaBolt,
            image: "/Images/Project/mcc_showcase.webp",
            title: "Electrical Engineering",
            desc: "High-precision LV/MV electrical designs, distribution boards, cabling layouts, and comprehensive load-calculation studies.",
            link: "/services/electrical-engineering"
        },
        {
            icon: FaTools,
            image: "/Images/booth_exib.webp",
            title: "MEP Services",
            desc: "Integrated mechanical, electrical, and plumbing engineering contracting services optimized for complex industrial infrastructure units.",
            link: "/services/mechanical-engineering"
        },
        {
            icon: FaNetworkWired,
            image: "/Images/Project/lighting_showcase.webp",
            title: "Smart Infrastructure",
            desc: "Advanced building management systems (BMS), smart lighting controls, access instrumentation, and integrated infrastructure controls.",
            link: "/services/smart-infrastructure"
        },
        {
            icon: FaShieldAlt,
            image: "/Images/Products/61b16c79-0f71-4ee6-87c5-396b8123796c.webp",
            title: "ELV & Security Systems",
            desc: "Extra Low Voltage installations, video surveillance networks, structural cabling, fire alarm integrations, and access monitoring.",
            link: "/services/smart-infrastructure"
        },
        {
            icon: FaBrain,
            image: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp",
            title: "AI & IoT Solutions",
            desc: "Integrating edge telemetry devices, cloud data gateways, predictive asset diagnostics, and AI monitoring for proactive operations.",
            link: "/services/ai-iot"
        },
        {
            icon: FaChartLine,
            image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp",
            title: "Energy Management",
            desc: "Detailed power analysis, smart sub-metering grids, power quality optimization, and carbon footprint reduction programs.",
            link: "/services/energy-management"
        }
    ];

    // 6-step project workflow
    const workflow = [
        { num: "01", title: "Consultation", desc: "Understanding client specifications & operational demands.", icon: FaUsers },
        { num: "02", title: "Engineering Design", desc: "Detailed layout drawings, logic configurations, and load analysis.", icon: FaCogs },
        { num: "03", title: "Procurement", desc: "Sourcing premium-grade, certified materials from top brands.", icon: FaBuilding },
        { num: "04", title: "Installation", desc: "On-site electrical and mechanical mounting & integration.", icon: FaTools },
        { num: "05", title: "Testing & Commissioning", desc: "Rigorous loop checks, functional testing, and startup approvals.", icon: FaCheckCircle },
        { num: "06", title: "Maintenance & Support", desc: "Continuous 24/7 SLA monitoring, SLAs, and regular diagnostics.", icon: FaClock }
    ];

    // Why Choose Vertex reasons
    const whyChooseList = [
        { title: "Experienced Engineers", desc: "Certified engineering crew with decades of combined execution experience in the Middle East.", icon: FaUsers },
        { title: "Customized Solutions", desc: "Bespoke automation layouts designed specifically around your facilities' capacity.", icon: FaCogs },
        { title: "High Quality Workmanship", desc: "Zero compromises on component quality, assembly standards, and wire management.", icon: FaAward },
        { title: "Safety First", desc: "100% compliant with local civil defense, DEWA, ADDC utility rules, and IEC safety standards.", icon: FaShieldAlt },
        { title: "Fast Project Delivery", desc: "Streamlined logistics and production systems to guarantee timelines are respected.", icon: FaBolt },
        { title: "Industry Best Practices", desc: "Utilizing state-of-the-art diagnostic, design, and calculation tools.", icon: FaCheckCircle },
        { title: "24/7 Technical Support", desc: "SLA response coverage for emergency support, hotlines, and quick site deployments.", icon: FaClock },
        { title: "Long Term Maintenance", desc: "Customized annual maintenance contracts (AMCs) to shield your system investments.", icon: FaHistory }
    ];

    // Industries We Serve
    const industries = [
        { title: "Water & Wastewater", icon: FaGlobe },
        { title: "Industrial Plants", icon: FaIndustry },
        { title: "Commercial Buildings", icon: FaBuilding },
        { title: "Infrastructure", icon: FaNetworkWired },
        { title: "Oil & Gas", icon: FaBolt },
        { title: "Utilities", icon: FaServer },
        { title: "Manufacturing", icon: FaCogs },
        { title: "Government Projects", icon: FaShieldAlt }
    ];

    // Featured Technologies list
    const technologies = [
        "PLC Systems", "SCADA Integration", "HMI Styling", "Industrial IoT",
        "AI Monitoring", "Smart Sensors", "VFD Systems", "Energy Monitoring",
        "Predictive Maintenance", "Cloud Integration"
    ];

    // Capabilities List for Intro
    const capabilities = [
        "Design", "Supply", "Installation", "Programming",
        "Testing", "Commissioning", "Maintenance", "Upgrades"
    ];

    return (
        <div className="services-wrapper">
            {/* 1. HERO SECTION */}
            <section className="services-hero-section">
                <div className="page-header-bg-grid"></div>
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
                                <span>Services</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Vertex Engineering Suite</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Engineering & <span className="text-gradient">Automation Services</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Delivering complete Electrical, Automation, Mechanical, Smart Infrastructure and Industrial Engineering Solutions across the UAE.
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

            {/* 2. INTRODUCTION SECTION */}
            <section className="intro-section section-padding">
                <div className="container">
                    <div className="split-layout align-center">
                        <motion.div
                            className="intro-text"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeInUp} className="sub-tag">End-to-End Capabilities</motion.span>
                            <motion.h2 variants={fadeInUp} className="section-title">
                                Integrated Industrial Solutions
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="intro-lead">
                                Vertex Controls offers a comprehensive range of professional engineering services designed to guarantee uptime, productivity, and absolute safety.
                            </motion.p>
                            <motion.p variants={fadeInUp}>
                                We support project life cycles from concept to execution. Our team of senior programmers, electrical specialists, and field engineers coordinate supply chains and construct panels to meet strict utility specifications.
                            </motion.p>
                            
                            <motion.div variants={fadeInUp} className="capabilities-grid">
                                {capabilities.map((cap, index) => (
                                    <span key={index} className="capability-chip">
                                        {cap}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="featured-image-col"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="featured-image-frame">
                                <img src="/Images/booth_exib.webp" alt="Vertex Engineering Booth Showcase" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. OUR SERVICES SECTION - Typographic Accordion Rows */}
            <section className="services-grid-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="sub-tag">Our Expertise</span>
                        <h2 className="section-title">Engineering Capabilities</h2>
                        <p>Discover our core domains of technical excellence, automated controls, and smart systems integration.</p>
                    </div>

                    <div className="services-accordion-list">
                        {services.map((svc, i) => {
                            const SvcIcon = svc.icon;
                            const isOpen = activeIdx === i;
                            return (
                                <div
                                    key={i}
                                    className={`service-accordion-row ${isOpen ? "active" : ""}`}
                                    onMouseEnter={() => setActiveIdx(i)}
                                    onClick={() => setActiveIdx(isOpen ? -1 : i)}
                                >
                                    <div className="accordion-row-header">
                                        <div className="row-header-left">
                                            <span className="row-num">0{i + 1}</span>
                                            <span className="row-icon-wrap">
                                                <SvcIcon />
                                            </span>
                                            <h3 className="row-title">{svc.title}</h3>
                                        </div>
                                        <div className="row-header-right">
                                            <div className="row-arrow-bubble">
                                                <FaArrowRight size={14} className="row-arrow-icon" />
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        className="row-expandable-content"
                                        initial={false}
                                        animate={{ 
                                            height: isOpen ? "auto" : 0, 
                                            opacity: isOpen ? 1 : 0 
                                        }}
                                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="row-expanded-inner">
                                            <div className="row-text-pane">
                                                <p className="row-desc">{svc.desc}</p>
                                                <Link to={svc.link} className="btn btn-primary row-cta-btn">
                                                    Explore Service <FaArrowRight size={12} style={{ marginLeft: "8px" }} />
                                                </Link>
                                            </div>
                                            <div className="row-image-pane">
                                                <div className="row-img-frame">
                                                    <img src={svc.image} alt={svc.title} className="row-img" />
                                                    <div className="row-img-overlay"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. PROCESS TIMELINE SECTION */}
            <section className="process-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="sub-tag">Execution Workflow</span>
                        <h2 className="section-title">Our Engineering Process</h2>
                        <p>How we ensure complete accuracy, safety compliance, and robust systems delivery from start to finish.</p>
                    </div>

                    <motion.div 
                        className="process-timeline"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {workflow.map((step, i) => {
                            const StepIcon = step.icon;
                            return (
                                <motion.div 
                                    key={i} 
                                    className="process-step"
                                    variants={fadeInUp}
                                >
                                    <div className="process-number">
                                        {step.num}
                                    </div>
                                    <div className="why-card-icon-box" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>
                                        <StepIcon size={20} style={{ color: "var(--primary)" }} />
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 5. WHY CHOOSE VERTEX SECTION */}
            <section className="why-choose-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="sub-tag">The Vertex Edge</span>
                        <h2 className="section-title">Why Choose Vertex</h2>
                        <p>Reliable systems integration backed by certified engineering teams and industry-best safety practices.</p>
                    </div>

                    <motion.div 
                        className="why-cards-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {whyChooseList.map((item, i) => {
                            const WhyIcon = item.icon;
                            return (
                                <motion.div 
                                    key={i} 
                                    className="why-feature-card"
                                    variants={fadeInUp}
                                >
                                    <div className="why-card-icon-box">
                                        <WhyIcon />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 6. INDUSTRIES WE SERVE SECTION */}
            <section className="industries-section section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="sub-tag">Target Sectors</span>
                        <h2 className="section-title">Industries We Serve</h2>
                        <p>Providing specialized controls and custom electromechanical installations for critical sectors.</p>
                    </div>

                    <motion.div 
                        className="industries-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {industries.map((ind, i) => {
                            const IndIcon = ind.icon;
                            return (
                                <motion.div 
                                    key={i} 
                                    className="industry-card"
                                    variants={fadeInUp}
                                >
                                    <div className="industry-icon-box">
                                        <IndIcon />
                                    </div>
                                    <h3>{ind.title}</h3>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 7. FEATURED TECHNOLOGIES */}
            <section className="why-choose-section section-padding" style={{ borderBottom: "none" }}>
                <div className="container">
                    <div className="section-header">
                        <span className="sub-tag">Tech Stack</span>
                        <h2 className="section-title">Featured Technologies</h2>
                        <p>Advanced calculation modeling and system integrations powered by elite hardware and software partners.</p>
                    </div>

                    <motion.div 
                        className="capabilities-grid"
                        style={{ justifyContent: "center", maxWidth: "800px", margin: "2rem auto 0" }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        {technologies.map((tech, i) => (
                            <motion.span 
                                key={i} 
                                className="capability-chip" 
                                style={{ padding: "0.75rem 1.6rem", fontSize: "0.95rem" }}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, translateY: -2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 8. CALL TO ACTION */}
            <section className="cta-section">
                <div className="container">
                    <motion.div 
                        className="cta-glass-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Let's Build Smarter Engineering Solutions Together</h2>
                        <p>
                            Whether you require automation systems, electrical engineering, smart infrastructure or industrial maintenance, our experienced team is ready to support your next project.
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
                                <span className="cta-contact-icon"><FaPhoneAlt /></span>
                                <a href="tel:+971554962866">+971 55 496 2866</a>
                            </div>
                            <div className="cta-contact-item">
                                <span className="cta-contact-icon"><FaEnvelope /></span>
                                <a href="mailto:info@vertexcontrols.ae">info@vertexcontrols.ae</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
