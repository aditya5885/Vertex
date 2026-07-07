import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { useContent } from "../../context/ContentContext";
import { defaultProjectsSubpages } from "../../data/subpageDefaults";
import "./ProjectSubpageShared.css";

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

const PumpStationAutomation: React.FC = () => {
    const { content } = useContent();
    const pageData = content.projectsSubpages?.["pump-station-automation"] || defaultProjectsSubpages["pump-station-automation"];

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

    const servicesDelivered = pageData.servicesDelivered || [];
    const projectHighlights = pageData.highlights || [];
    const galleryImages = pageData.gallery || [];
    
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
                        <span className="sub-tag">{pageData.overview?.subTag}</span>
                        <h2 className="section-title text-gradient">{pageData.overview?.title}</h2>
                        <p className="overview-summary">{pageData.overview?.lead}</p>
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
                                <img src={pageData.overview?.imageSrc} alt={pageData.overview?.title} />
                                <div className="terminal-screen-filter"></div>
                                
                                {/* Floating Status Badges */}
                                <div className="telemetry-badge badge-top-left">
                                    <span className="pulse-green-dot"></span>
                                    <span>{pageData.overview?.statusText}</span>
                                </div>
                                <div className="telemetry-badge badge-bottom-right">
                                    <span>{pageData.overview?.locationText}</span>
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
                                    {(pageData.overview?.objectives || []).map((obj, i) => (
                                        <li key={i}>
                                            <div className="objective-icon-wrap">
                                                {getIcon(obj.icon)}
                                            </div>
                                            <div>
                                                <strong>{obj.title}</strong>
                                                <p>{obj.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="scope-tags-block">
                                <h3>Deliverable Scope</h3>
                                <div className="scope-tags-deck">
                                    {(pageData.overview?.scopeTags || []).map((tag, i) => (
                                        <span key={i} className="scope-tag-item">{tag}</span>
                                    ))}
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
                                    {getIcon(service.icon)}
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
                                    {getIcon(highlight.icon)}
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
                        <p>{pageData.cta?.desc}</p>
                        
                        <div className="cta-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <Icons.FaArrowRight size={14} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Our Team
                            </Link>
                        </div>

                        <div className="cta-contacts">
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

export default PumpStationAutomation;
