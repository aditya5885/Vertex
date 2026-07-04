import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaShieldAlt, FaMedal, FaCheckCircle,
    FaArrowRight, FaBuilding, FaBolt, FaMicrochip, FaLightbulb,
    FaUsers, FaCertificate, FaGlobe, FaHandshake, FaAward, FaClock
} from "react-icons/fa";
import "./About.css";
import { WhyUs3DVisual } from "../Home/WhyUs3DVisual";
import { CTAPortal3D } from "../Home/CTAPortal3D";

// Reusable Animation Variants
const fadeInUp: any = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const slideInLeft: any = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const slideInRight: any = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; suffix?: string; label: string; icon: React.ReactNode }> = ({ value, suffix = "", label, icon }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / value));
        
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= value) {
                clearInterval(timer);
                setCount(value);
            }
        }, Math.max(stepTime, 16));

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <div className="counter-card" ref={ref}>
            <div className="counter-icon-wrap">{icon}</div>
            <div className="counter-number">{count}{suffix}</div>
            <div className="counter-label">{label}</div>
        </div>
    );
};

// 1. Hero Banner Component
const AboutHero = () => {
    return (
        <section className="page-header-section">
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
                            <span>About Us</span>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                        <div className="hero-badge">
                            <span className="badge-pulse"></span>
                            <span className="badge-text">About Vertex Controls LLC</span>
                        </div>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="page-header-title">
                        Engineering Intelligence. <span className="text-gradient">Automated Excellence.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="page-header-lead">
                        Vertex Controls is a leading Dubai-based electromechanical and automation systems integrator. We engineer mission-critical power, control, and building management solutions across the UAE & GCC region.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="page-header-buttons">
                        <Link to="/services" className="btn btn-primary">
                            Explore Our Capabilities <FaArrowRight size={14} />
                        </Link>
                        <Link to="/contact" className="btn btn-secondary">
                            Connect With Experts
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// 2. Company Overview Component
const CompanyOverview = () => {
    return (
        <section className="overview-section section-padding">
            <div className="container split-layout align-center">
                <motion.div
                    className="overview-text"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <motion.span variants={fadeInUp} className="sub-tag">Company Profile & Overview</motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title">Driving Industrial Evolution In Dubai</motion.h2>
                    
                    <motion.p variants={fadeInUp} className="overview-lead">
                        Founded in Dubai, Vertex Controls Electromechanical LLC has established itself as a trusted partner for turnkey industrial automation, electrical distribution, and smart infrastructure engineering. Our multidisciplinary team of senior engineers, SCADA programmers, and MEP specialists combine deep technical domain knowledge with state-of-the-art technologies to ensure maximum operational uptime, energy efficiency, and safety across manufacturing facilities, municipal water authorities, and commercial projects.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="overview-highlights-list">
                        <div className="oh-item">
                            <FaBuilding className="oh-icon" />
                            <span>ISO Certified Quality Standards</span>
                        </div>
                        <div className="oh-item">
                            <FaBolt className="oh-icon" />
                            <span>End-to-End Turnkey Execution</span>
                        </div>
                        <div className="oh-item">
                            <FaMicrochip className="oh-icon" />
                            <span>Advanced SCADA & IoT Telemetry</span>
                        </div>
                        <div className="oh-item">
                            <FaGlobe className="oh-icon" />
                            <span>Serving UAE & GCC Region</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="overview-image-col"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={slideInRight}
                >
                    <div className="who-image-frame">
                        <img src="/Images/booth_exib.webp" alt="Vertex Controls Engineering Showcase" className="who-we-are-img" />
                        
                        <div className="who-glass-badge wgb-top">
                            <span className="wgb-pulse"></span>
                            <span>📍 Dubai Engineering Showcase</span>
                        </div>

                        <div className="who-glass-badge wgb-bottom">
                            <FaCertificate className="wgb-icon" />
                            <div>
                                <strong>Certified Systems Integrator</strong>
                                <span>PLC, SCADA & Switchgears</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// 3. Vision & Mission Component
const VisionMission = () => {
    return (
        <section className="vision-mission-section section-padding">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <span className="sub-tag">Our Guiding Compass</span>
                    <h2 className="section-title">Vision & Mission</h2>
                </motion.div>

                <div className="vm-grid">
                    <motion.div
                        className="vm-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="vm-icon-header">
                            <FaLightbulb />
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            To be the benchmark premier electromechanical and industrial automation partner across the Middle East, recognized for pioneering intelligent engineering, sustainable energy optimization, and unmatched operational reliability.
                        </p>
                        <div className="vm-bg-glow"></div>
                    </motion.div>

                    <motion.div
                        className="vm-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <div className="vm-icon-header">
                            <FaHandshake />
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To deliver high-precision, mission-critical control solutions, panel assembly, and turnkey MEP engineering services that empower our clients to achieve maximum efficiency, zero downtime, and complete peace of mind.
                        </p>
                        <div className="vm-bg-glow"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// 4. Core Values Component
const CoreValues = () => {
    const values = [
        { icon: FaMedal, title: "Engineering Excellence", desc: "Rigorous standards, cutting-edge SCADA logic, and precision execution in every panel and deployment." },
        { icon: FaLightbulb, title: "Innovation & AI", desc: "Integrating smart IoT telemetry and predictive maintenance to future-proof infrastructure." },
        { icon: FaHandshake, title: "Integrity & Trust", desc: "Transparent client partnerships built on honest engineering, clear timelines, and dependability." },
        { icon: FaShieldAlt, title: "Safety First", desc: "Uncompromising compliance with international electrical codes and UAE safety regulations." },
        { icon: FaCertificate, title: "Uncompromising Quality", desc: "Using top-tier components and thorough factory acceptance testing (FAT) prior to commissioning." },
        { icon: FaUsers, title: "Customer Commitment", desc: "Dedicated 24/7 technical support and rapid response teams ensuring uninterrupted operations." }
    ];

    return (
        <section className="values-section section-padding">
            <div className="container">
                <motion.div
                    className="section-header text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <span className="sub-tag">The Pillars Of Our Success</span>
                    <h2 className="section-title">Our Core Values</h2>
                </motion.div>

                <motion.div
                    className="values-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer}
                >
                    {values.map((val, i) => (
                        <motion.div key={i} className="value-card" variants={fadeInUp} whileHover={{ y: -8 }}>
                            <div className="val-icon-box">
                                <val.icon />
                            </div>
                            <h3>{val.title}</h3>
                            <p>{val.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// 5. Why Choose Vertex Component
const AboutWhyChooseUs = () => {
    const reasons = [
        "Experienced Team of Senior SCADA & MEP Engineers",
        "Complete Turnkey Execution (Design, Assembly, Testing & Commissioning)",
        "Advanced PLC, HMI & IoT Telemetry Expertise",
        "Strict Adherence to ISO & UAE Electrical Safety Standards",
        "Reliable 24/7 On-Call Technical Support & Maintenance",
        "Proven Track Record in Major UAE Industrial & Infrastructure Projects"
    ];

    return (
        <section className="about-why-section section-padding">
            <div className="container split-layout align-center">
                <motion.div
                    className="why-image"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={slideInLeft}
                >
                    <WhyUs3DVisual />
                </motion.div>

                <motion.div
                    className="why-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <motion.span variants={fadeInUp} className="sub-tag">The Vertex Advantage</motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title">Why Industry Leaders Choose Vertex</motion.h2>
                    <motion.p variants={fadeInUp} style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
                        We eliminate downtime and complex technical headaches by delivering seamlessly integrated electromechanical systems built for extreme industrial environments.
                    </motion.p>
                    
                    <ul className="checklist">
                        {reasons.map((reason, i) => (
                            <motion.li key={i} variants={fadeInUp}>
                                <div className="check-icon-wrapper">
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <span>{reason}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

// 6. Company Statistics Component
const CompanyStatistics = () => {
    return (
        <section className="about-stats-section">
            <div className="container">
                <div className="stats-counter-grid">
                    <AnimatedCounter value={250} suffix="+" label="Projects Delivered" icon={<FaCheckCircle />} />
                    <AnimatedCounter value={120} suffix="+" label="Enterprise Clients" icon={<FaUsers />} />
                    <AnimatedCounter value={15} suffix="+" label="Years Experience" icon={<FaAward />} />
                    <AnimatedCounter value={24} suffix="/7" label="Technical Support" icon={<FaClock />} />
                    <AnimatedCounter value={10} suffix="+" label="Industries Served" icon={<FaBuilding />} />
                </div>
            </div>
        </section>
    );
};

// 7. Call To Action Component
const AboutCTA = () => {
    return (
        <section className="cta-contact-section">
            <div className="cta-block about-cta-block relative-3d-section">
                <CTAPortal3D />
                <motion.div
                    className="container text-center cta-inner relative-z-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="sub-tag cta-sub-tag">Get In Touch With Engineering Experts</span>
                    <h2>Let's Build Smarter Engineering Solutions Together</h2>
                    <p>Partner with Dubai's premier electromechanical systems integrator for your next control or automation project.</p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn btn-primary btn-cta-primary">
                            Contact Us Today <FaArrowRight size={14} />
                        </Link>
                        <Link to="/quote" className="btn btn-secondary btn-cta-secondary">
                            Request a Quote
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default function About() {
    return (
        <div className="about-wrapper">
            <AboutHero />
            <CompanyOverview />
            <VisionMission />
            <CoreValues />
            <AboutWhyChooseUs />
            <CompanyStatistics />
            <AboutCTA />
        </div>
    );
}
