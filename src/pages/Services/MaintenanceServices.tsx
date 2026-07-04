import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaWrench, FaTools, FaCheckCircle, FaLightbulb,
    FaHandshake, FaClock, FaWater, FaIndustry, FaBuilding,
    FaPlug, FaRoad, FaSolarPanel, FaMapMarkerAlt, FaPhoneAlt,
    FaEnvelope, FaThermometerHalf, FaHeartbeat, FaCalendarAlt,
    FaUsers
} from "react-icons/fa";
import "./MaintenanceServices.css";

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

const MaintenanceServices: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.max(0, Math.min(Math.floor(latest * 6), 5));
        setActiveIndex(index);
    });

    const scrollToSlide = (index: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const containerStart = rect.top + scrollTop;
        const containerHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        const scrollDistancePerSlide = (containerHeight - viewportHeight) / 5;
        const targetScroll = containerStart + index * scrollDistancePerSlide;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth"
        });
    };

    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Electromechanical Maintenance & AMC | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Vertex Controls delivers preventive & corrective maintenance, thermal imaging, vibration analysis, and 24/7 AMCs in Dubai and the UAE.'
        );
    }, []);

    // 3. Our Solutions Data (6 solutions)
    const solutionsData = [
        {
            icon: FaCalendarAlt,
            title: "Preventive Maintenance",
            desc: "Structured schedules, sensor calibrations, and wear parts swaps to prevent unexpected breakdowns and extend mechanical life.",
            features: ["Lubrication Cycles", "Calibration Audits", "Parameter Tuning", "Checklist Verifications"]
        },
        {
            icon: FaWrench,
            title: "Corrective Maintenance",
            desc: "Emergency troubleshooting and restoration of failed electromechanical layouts, panels, and pump units.",
            features: ["Emergency Diagnostics", "Spare Part Fitting", "Logic Code Fixes", "On-site Field Repairs"]
        },
        {
            icon: FaHandshake,
            title: "Annual Maintenance (AMC)",
            desc: "Comprehensive 24/7 electromechanical SLA agreements featuring committed response limits and flat callout rates.",
            features: ["SLA Response Commitments", "Dedicated Support Teams", "Routine Site Audits", "Flat-Rate Callouts"]
        },
        {
            icon: FaHeartbeat,
            title: "Condition Monitoring",
            desc: "Continuous parameter tracking (current logs, speed, flow, heat) to monitor overall asset operational health.",
            features: ["Current Signature Log", "Bearing Temp Checks", "Process Output Audits", "Health Index Reports"]
        },
        {
            icon: FaThermometerHalf,
            title: "Thermal Imaging",
            desc: "High-precision infrared thermography scans of electrical switchgears, busbars, and panels to identify hotspots.",
            features: ["Hotspot Identification", "Thermography Reports", "Load Testing Checks", "Prevent Fire Hazards"]
        },
        {
            icon: FaTools,
            title: "Vibration Analysis",
            desc: "Advanced frequency analysis on rotating machines (pumps, blowers, motors) to diagnose bearing wear.",
            features: ["Spectrum Demodulation", "Alignment Diagnostics", "Cavitation Detection", "Bearing Wear Profiles"]
        }
    ];

    // 4. Why Choose Vertex Controls Data (6 feature cards)
    const whyChooseData = [
        {
            icon: FaUsers,
            title: "Experienced Engineering Team",
            desc: "Certified maintenance planners, field electricians, and alignment technicians with deep UAE site experience."
        },
        {
            icon: FaTools,
            title: "Tailored Solutions",
            desc: "AMC contracts and preventive timelines scaled exactly to your machinery count and plant operating hours."
        },
        {
            icon: FaCheckCircle,
            title: "Quality Standards",
            desc: "Detailed service reporting, calibrated test instruments, safety compliance logs, and ISO framework compliance."
        },
        {
            icon: FaLightbulb,
            title: "Modern Technology",
            desc: "Using top-tier thermal cameras, laser aligners, and diagnostic logging tools."
        },
        {
            icon: FaHandshake,
            title: "Fast Technical Support",
            desc: "Rapid field response, dedicated emergency lines, and quick turnaround on seal and bearing swaps."
        },
        {
            icon: FaClock,
            title: "Reliable Project Delivery",
            desc: "Consistent maintenance visits, detailed task logging, and prompt report sharing."
        }
    ];

    // 5. Industries We Serve Data (6 industries)
    const industriesData = [
        { icon: FaIndustry, name: "Manufacturing" },
        { icon: FaWater, name: "Water & Wastewater" },
        { icon: FaBuilding, name: "Commercial Buildings" },
        { icon: FaPlug, name: "Utilities" },
        { icon: FaRoad, name: "Infrastructure" },
        { icon: FaSolarPanel, name: "Energy" }
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
                                <span>Maintenance Services</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">24/7 SLA Support</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Maintenance <span className="text-gradient">Services</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            We deliver expert preventive maintenance, emergency corrective repairs, thermal imaging audits, vibration analysis, and 24/7 AMCs across the UAE.
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

            {/* 2. OVERVIEW SECTION */}
            <section className="overview-section">
                <div className="container split-layout align-center">
                    <motion.div
                        className="overview-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.span variants={fadeInUp} className="sub-tag">Operational Support</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">Keep Your Plant Running Smoothly with Professional Support</motion.h2>
                        <p className="overview-lead">
                            Vertex Controls provides electromechanical maintenance and AMC services that eliminate machinery downtime and protect your investments.
                        </p>
                    </motion.div>

                    <motion.div
                        className="overview-description-col"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75", marginBottom: "1.5rem" }}>
                            Our field technicians support utilities, manufacturing plants, and commercial complexes across the UAE. We carry out scheduled system calibrations, execute corrective breakdown swaps, manage custom 24/7 AMCs, and check rotating asset balance profiles.
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            By applying diagnostics like thermography and vibration checks, we identify hotspots before failures occur. Learn more about our core engineering <Link to="/services" style={{ color: "var(--primary)", textDecoration: "underline" }}>services</Link>, explore our successfully delivered <Link to="/projects" style={{ color: "var(--primary)", textDecoration: "underline" }}>projects</Link>, browse our systems <Link to="/products" style={{ color: "var(--primary)", textDecoration: "underline" }}>products</Link>, or <Link to="/contact" style={{ color: "var(--primary)", textDecoration: "underline" }}>contact us</Link> today.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. OUR SOLUTIONS SECTION */}
            {/* Desktop Pinned Sticky Scroll Layout */}
            <section ref={containerRef} className="solutions-sticky-container">
                <div className="solutions-sticky-inner">
                    <div className="container">
                        <motion.div
                            className="section-header"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeInUp}
                            style={{ marginBottom: "1rem" }}
                        >
                            <span className="sub-tag">Functional Capabilities</span>
                            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>Our Solutions</h2>
                            <p>Preventive audits, corrective breakdown repairs, annual contracts, and predictive scans.</p>
                        </motion.div>

                        <div className="sticky-active-wrapper">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    className={`solution-block ${activeIndex % 2 === 0 ? "" : "reversed"}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="solution-title-col">
                                        <div className="solution-num">
                                            {String(activeIndex + 1).padStart(2, "0")} / 06
                                        </div>
                                        <h3 className="solution-title">
                                            {solutionsData[activeIndex].title}
                                        </h3>
                                        <div className="solution-icon-box">
                                            {React.createElement(solutionsData[activeIndex].icon)}
                                        </div>
                                    </div>

                                    <div className="solution-desc-col">
                                        <p className="solution-desc">
                                            {solutionsData[activeIndex].desc}
                                        </p>
                                        <div className="solution-features-grid">
                                            {solutionsData[activeIndex].features.map((feat, idx) => (
                                                <div key={idx} className="solution-feature-item">
                                                    <span className="solution-feature-dot"></span>
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Slide Dots Indicator */}
                        <div className="sticky-nav-dots">
                            {solutionsData.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`sticky-nav-dot ${activeIndex === idx ? "active" : ""}`}
                                    onClick={() => scrollToSlide(idx)}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile/Tablet Fallback (Normal Stacking List Layout) */}
            <section className="solutions-mobile-container section-padding">
                <div className="container">
                    <div className="section-header">
                        <span className="sub-tag">Functional Capabilities</span>
                        <h2 className="section-title">Our Solutions</h2>
                        <p>Preventive audits, corrective breakdown repairs, annual contracts, and predictive scans.</p>
                    </div>

                    <div className="solutions-blocks-container">
                        {solutionsData.map((sol, index) => {
                            const isEven = index % 2 === 0;
                            const solNum = String(index + 1).padStart(2, "0");
                            return (
                                <motion.div
                                    key={index}
                                    className={`solution-block ${isEven ? "" : "reversed"}`}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    variants={staggerContainer}
                                >
                                    <motion.div className="solution-title-col" variants={fadeInUp}>
                                        <div className="solution-num">{solNum} / 06</div>
                                        <h3 className="solution-title">{sol.title}</h3>
                                        <div className="solution-icon-box">
                                            <sol.icon />
                                        </div>
                                    </motion.div>

                                    <motion.div className="solution-desc-col" variants={fadeInUp}>
                                        <p className="solution-desc">{sol.desc}</p>
                                        <div className="solution-features-grid">
                                            {sol.features.map((feat, idx) => (
                                                <div key={idx} className="solution-feature-item">
                                                    <span className="solution-feature-dot"></span>
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
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
                        <h2 className="section-title">The Maintenance Advantage</h2>
                        <p>Why plant operators and engineering managers select Vertex Controls for their long-term AMC support.</p>
                    </motion.div>

                    <motion.div
                        className="why-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {whyChooseData.map((why, index) => (
                            <motion.div
                                key={index}
                                className="why-item"
                                variants={fadeInUp}
                            >
                                <div className="why-icon-box">
                                    <why.icon />
                                </div>
                                <h3>{why.title}</h3>
                                <p>{why.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 5. INDUSTRIES WE SERVE */}
            <section className="subpage-industries-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                    >
                        <span className="sub-tag">Application Sectors</span>
                        <h2 className="section-title">Industries We Serve</h2>
                        <p>Deploying specialized electromechanical support and AMC packages in diverse sectors across the UAE.</p>
                    </motion.div>

                    <motion.div
                        className="subpage-industries-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {industriesData.map((ind, index) => (
                            <motion.div
                                key={index}
                                className="industry-card"
                                variants={fadeInUp}
                            >
                                <div className="industry-icon-box">
                                    <ind.icon />
                                </div>
                                <h3>{ind.name}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 6. CALL TO ACTION SECTION */}
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
                            Whether you need routine electromechanical preventive checks, rapid corrective breakdown aid, thermal imaging diagnostics, vibration scans, or an Annual Maintenance Contract (AMC), Vertex Controls provides professional solutions tailored to your operational targets.
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

export default MaintenanceServices;
