import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
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
    const { content } = useContent();
    const hero = content.about.hero;

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
                            <span className="badge-text">{hero.badge}</span>
                        </div>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="page-header-title">
                        {hero.title}
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="page-header-lead">
                        {hero.lead}
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
    const { content } = useContent();
    const overview = content.about.overview;

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
                    <motion.h2 variants={fadeInUp} className="section-title">{overview?.title}</motion.h2>
                    
                    <motion.p variants={fadeInUp} className="overview-lead" style={{ whiteSpace: "pre-line" }}>
                        {overview?.body}
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
                        <img src={overview?.image || "/Images/booth_exib.webp"} alt="Vertex Controls Engineering Showcase" className="who-we-are-img" />
                        
                        <div className="who-glass-badge wgb-top">
                            <span className="wgb-pulse"></span>
                            <span>📍 Dubai Engineering Showcase</span>
                        </div>

                        <div className="who-glass-badge wgb-bottom">
                            <FaCertificate className="wgb-icon" />
                            <div>
                                <strong style={{ whiteSpace: "pre-line" }}>{overview?.badgeText.split("\n")[0]}</strong>
                                <span>{overview?.badgeText.split("\n")[1]}</span>
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
    const { content } = useContent();
    const mission = content.about.mission;
    const vision = content.about.vision;

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
                        <h3>{vision.title}</h3>
                        <p>
                            {vision.body}
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
                        <h3>{mission.title}</h3>
                        <p>
                            {mission.body}
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
    const { content } = useContent();
    const iconMap: Record<string, any> = {
        "Engineering Excellence": FaMedal,
        "Innovation & AI": FaLightbulb,
        "Integrity & Trust": FaHandshake,
        "Safety First": FaShieldAlt,
        "Uncompromising Quality": FaCertificate,
        "Customer Commitment": FaUsers
    };

    const values = (content.about.values || []).map(val => ({
        ...val,
        icon: iconMap[val.title] || FaMedal
    }));

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
    const { content } = useContent();
    const reasons = content.about.whyChoose || [];

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
    const { content } = useContent();
    const iconMap: Record<string, any> = {
        "Projects Delivered": <FaCheckCircle />,
        "Enterprise Clients": <FaUsers />,
        "Years Experience": <FaAward />,
        "Technical Support": <FaClock />,
        "Industries Served": <FaBuilding />
    };

    return (
        <section className="about-stats-section">
            <div className="container">
                <div className="stats-counter-grid">
                    {(content.about.stats || []).map((stat, i) => (
                        <AnimatedCounter 
                            key={i}
                            value={stat.value} 
                            suffix={stat.suffix} 
                            label={stat.label} 
                            icon={iconMap[stat.label] || <FaCheckCircle />} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// 7. Call To Action Component
const AboutCTA = () => {
    const { content } = useContent();
    const cta = content.about.cta;

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
                    <h2>{cta?.title}</h2>
                    <p>{cta?.desc}</p>
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
