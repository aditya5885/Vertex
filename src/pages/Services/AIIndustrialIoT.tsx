import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { useContent } from "../../context/ContentContext";
import { defaultServicesSubpages } from "../../data/subpageDefaults";
import "./AIIndustrialIoT.css";

// Dynamic Icon Loader
const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? React.createElement(IconComponent) : <Icons.FaQuestionCircle />;
};

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
    const { content } = useContent();
    const pageData = content.servicesSubpages?.["ai-iot"] || defaultServicesSubpages["ai-iot"];

    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        if (pageData.seo) {
            document.title = pageData.seo.title;
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', pageData.seo.description);
        }
    }, [pageData.seo]);

    const solutionsData = pageData.solutions || [];
    const whyChooseData = pageData.whyChoose || [];
    
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
                                <span className="badge-text">{pageData.hero?.badgeText}</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            {(() => {
                                const parts = (pageData.hero?.title || "").split(" ");
                                if (parts.length > 1) {
                                    const lastWords = parts.slice(-2).join(" ");
                                    const firstPart = parts.slice(0, -2).join(" ");
                                    return (
                                        <>{firstPart} <span className="text-gradient">{lastWords}</span></>
                                    );
                                }
                                return pageData.hero?.title;
                            })()}
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            {pageData.hero?.lead}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="page-header-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <Icons.FaArrowRight size={14} />
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
                        <motion.span variants={fadeInUp} className="sub-tag">{pageData.overview?.subTag}</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">{pageData.overview?.title}</motion.h2>
                        <p className="overview-lead">
                            {pageData.overview?.lead}
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            {pageData.overview?.body}
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
                            <img src={pageData.overview?.imageSrc} alt={pageData.overview?.title} />
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
                            return (
                                <motion.div
                                    key={index}
                                    className="solution-card"
                                    variants={fadeInUp}
                                >
                                    <div className="solution-card-icon">
                                        {getIcon(sol.icon)}
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
                            return (
                                <motion.div
                                    key={index}
                                    className="why-item"
                                    variants={fadeInUp}
                                >
                                    <div className="why-icon-box">
                                        {getIcon(why.icon)}
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
                        <h2>{pageData.cta?.title}</h2>
                        <p>{pageData.cta?.desc}</p>
                        
                        <div className="cta-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <Icons.FaArrowRight size={14} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Us
                            </Link>
                        </div>

                        <div className="cta-contacts">
                            <div className="cta-contact-item">
                                <span className="cta-contact-icon"><Icons.FaMapMarkerAlt /></span>
                                <span>{pageData.cta?.location}</span>
                            </div>
                            <div className="cta-contact-item">
                                <span className="cta-contact-icon"><Icons.FaPhoneAlt /></span>
                                <a href={`tel:${(pageData.cta?.phone || "").replace(/\s+/g, "")}`}>{pageData.cta?.phone}</a>
                            </div>
                            <div className="cta-contact-item">
                                <span className="cta-contact-icon"><Icons.FaEnvelope /></span>
                                <a href={`mailto:${pageData.cta?.email}`}>{pageData.cta?.email}</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AIIndustrialIoT;
