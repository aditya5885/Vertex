import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import {
    FaBolt, FaCogs, FaMicrochip, FaServer, FaIndustry,
    FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
    FaArrowRight, FaNetworkWired, FaChartLine, FaBuilding
} from "react-icons/fa";
import "./Home.css";
import { Hero3DVisual } from "./Hero3DVisual";
import { WhyUs3DVisual } from "./WhyUs3DVisual";
import { Products3DBackground } from "./Products3DBackground";
import { CTAPortal3D } from "./CTAPortal3D";
import { ServicesBackground } from "./ServicesBackground";

// Reusable Animation Variants
const fadeInUp: any = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
};

const HeroSection = () => {
    const { content } = useContent();
    const hero = content.home.hero;

    return (
        <section className="hero-section">
            <div className="hero-bg-grid"></div>
            <div className="hero-glow-orb orb-1"></div>
            <div className="hero-glow-orb orb-2"></div>

            <div className="container hero-split-container">
                {/* Left Column: Text & CTAs */}
                <motion.div
                    className="hero-text-col"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="hero-badge">
                        <span className="badge-pulse"></span>
                        <span className="badge-text">{hero.badge}</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="hero-title">
                        {hero.title} <span className="text-gradient">{hero.highlightText}</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="hero-subtext">
                        {hero.lead}
                    </motion.p>

                    <motion.div variants={fadeInUp} className="hero-buttons">
                        <Link to="/quote" className="btn btn-primary btn-hero">
                            Request a Quote <FaArrowRight size={14} />
                        </Link>
                        <Link to="/services" className="btn btn-secondary btn-hero">
                            Explore Services
                        </Link>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="hero-trust-bar">
                        <div className="trust-item"><FaCheckCircle className="trust-icon" /> <span>ISO Certified</span></div>
                        <div className="trust-item"><FaCheckCircle className="trust-icon" /> <span>24/7 Support</span></div>
                        <div className="trust-item"><FaCheckCircle className="trust-icon" /> <span>500+ Projects</span></div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Interactive 3D WebGL Three.js Visual */}
                <motion.div
                    className="hero-visual-col"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Hero3DVisual />
                </motion.div>
            </div>
        </section>
    );
};

const StatsSection = () => {
    const { content } = useContent();
    const stats = content.home.stats;

    return (
        <section className="stats-section">
            <motion.div
                className="container stats-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={staggerContainer}
            >
                {stats.map((stat, i) => (
                    <motion.div key={i} className="stat-card" variants={fadeInUp}>
                        <h3>{stat.num}</h3>
                        <p>{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const WhoWeAreSection = () => {
    const { content } = useContent();
    const aboutShort = content.home.aboutShort;

    return (
        <section className="who-we-are-section section-padding">
            <div className="container split-layout align-center">
                <motion.div
                    className="who-text"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <motion.span variants={fadeInUp} className="sub-tag">{aboutShort.subTag}</motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title">{aboutShort.title}</motion.h2>
                    <motion.p variants={fadeInUp} className="who-lead-p">
                        {aboutShort.lead}
                    </motion.p>
                    <motion.p variants={fadeInUp} className="who-sub-p">
                        {aboutShort.body}
                    </motion.p>

                    {/* Interactive Highlights Grid */}
                    <motion.div variants={fadeInUp} className="who-pillars-grid">
                        <div className="pillar-card">
                            <div className="pillar-icon"><FaBuilding /></div>
                            <div>
                                <strong>Dubai Headquartered</strong>
                                <span>Serving UAE & GCC</span>
                            </div>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-icon"><FaBolt /></div>
                            <div>
                                <strong>Turnkey MEP</strong>
                                <span>Power & Control</span>
                            </div>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-icon"><FaMicrochip /></div>
                            <div>
                                <strong>Smart SCADA</strong>
                                <span>AI & IoT Analytics</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} style={{ marginTop: '2.5rem' }}>
                        <Link to="/about" className="btn btn-secondary who-cta-btn">
                            Learn More About Our Vision <FaArrowRight size={14} />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="who-image-col"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="who-image-frame">
                        <img src="/Images/booth_exib.webp" alt="Vertex Controls Exhibition Booth" className="who-we-are-img" />

                        {/* Floating Overlay Glass Badges */}
                        <div className="who-glass-badge wgb-top">
                            <span className="wgb-pulse"></span>
                            <span>📍 Dubai Exhibition & Engineering Showcase</span>
                        </div>

                        <div className="who-glass-badge wgb-bottom">
                            <FaCheckCircle className="wgb-icon" />
                            <div>
                                <strong>Certified Integrator</strong>
                                <span>Electrical & Automation Solutions</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const CoreServicesSection = () => {
    const { content } = useContent();

    const iconMap: Record<string, any> = {
        "Automation & Control Systems": FaServer,
        "Industrial Automation & SCADA": FaIndustry,
        "Electrical Engineering": FaBolt,
        "Mechanical & MEP Services": FaCogs,
        "Smart Infrastructure & BMS": FaBuilding,
        "AI & Industrial IoT": FaNetworkWired,
        "Energy Management": FaChartLine,
        "Maintenance & Operation": FaCogs
    };

    const services = content.services.list.map(s => ({
        ...s,
        icon: iconMap[s.title] || FaCogs
    }));

    return (
        <section className="services-section section-padding dark-bg relative-3d-section">
            <ServicesBackground />

            <div className="container relative-z-content">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <span className="sub-tag">Turnkey Electromechanical Expertise</span>
                    <h2 className="section-title">Core Services</h2>
                    <p>Engineered solutions for complex industrial challenges.</p>
                </motion.div>

                <motion.div
                    className="services-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer}
                >
                    {services.map((srv, i) => (
                        <motion.div key={i} className="service-card" variants={fadeInUp} whileHover={{ y: -8 }}>
                            <div className="icon-wrapper">
                                <srv.icon size={28} />
                            </div>
                            <h3>{srv.title}</h3>
                            <p>{srv.desc}</p>
                            <div className="card-glow"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const WhyChooseUsSection = () => {
    const { content } = useContent();
    const reasons = content.home.whyChoose || [];

    return (
        <section className="why-us-section section-padding">
            <div className="container split-layout align-center">
                <motion.div
                    className="why-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
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
                    <motion.h2 variants={fadeInUp} className="section-title">Why Choose Vertex</motion.h2>
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

const FeaturedSolutionsSection = () => {
    const { content } = useContent();
    const solutions = content.home.solutions || [];

    return (
        <section className="solutions-section section-padding dark-bg relative-3d-section">
            <Products3DBackground />

            <div className="container relative-z-content">
                <motion.div
                    className="section-header text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="sub-tag">Electromechanical Equipment & Systems</span>
                    <h2 className="section-title">Featured Products & Solutions</h2>
                </motion.div>

                <motion.div
                    className="solutions-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer}
                >
                    {solutions.map((sol, i) => (
                        <motion.div key={i} className="solution-card service-card" variants={fadeInUp} whileHover={{ y: -8 }}>
                            <div className="sol-image-wrapper">
                                <img src={sol.image} alt={sol.title} />
                                <div className="sol-badge">{sol.cat}</div>
                            </div>
                            <div className="sol-content">
                                <div className="sol-spec-pill"><FaCheckCircle size={10} /> {sol.spec}</div>
                                <h3>{sol.title}</h3>
                                <Link to="/products" className="sol-link">View Details & Specs <FaArrowRight size={12} /></Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};


const ProjectHighlightsSection = () => {
    const { content } = useContent();
    const projects = content.home.projectHighlights || [];

    return (
        <section className="projects-section section-padding">
            <div className="container">
                <motion.div
                    className="section-header text-left-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <div className="header-flex">
                        <div>
                            <span className="sub-tag">Engineering Case Studies</span>
                            <h2 className="section-title">Featured Project Highlights</h2>
                        </div>
                        <Link to="/projects" className="btn btn-secondary view-all-btn">
                            View All Projects <FaArrowRight size={14} />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="projects-grid-modern"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer}
                >
                    {projects.map((proj, i) => (
                        <motion.div key={i} className="proj-card-modern" variants={fadeInUp} whileHover={{ y: -8 }}>
                            <div className="proj-card-image">
                                <img src={proj.image} alt={proj.title} />
                                <div className="proj-badge">{proj.cat}</div>
                            </div>
                            <div className="proj-card-body">
                                <div className="proj-location"><FaMapMarkerAlt size={12} /> {proj.location}</div>
                                <h3>{proj.title}</h3>
                                <p>{proj.desc}</p>
                                <div className="proj-card-footer">
                                    <Link to="/projects" className="proj-link">
                                        Explore Case Study <FaArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                            <div className="proj-border-glow"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ProcessTimelineSection = () => {
    const { content } = useContent();
    const steps = content.home.process || [];

    return (
        <section className="process-section section-padding dark-bg">
            <div className="container">
                <motion.h2
                    className="section-title deliveryP"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Our Delivery Process
                </motion.h2>

                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    <div className="timeline">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                className="timeline-step"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                            >
                                <div className="step-number">0{i + 1}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const QuickContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            setErrorMessage("All fields are required.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.trim())) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    phone: "", 
                    service: "General Quick Inquiry",
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                setName("");
                setEmail("");
                setMessage("");
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Failed to submit. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Network error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div 
                className="quick-form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: "center", padding: "1rem 0" }}
            >
                <div style={{ fontSize: "3rem", color: "var(--accent-emerald)", marginBottom: "1rem" }}>✓</div>
                <h3 style={{ color: "var(--white)", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "var(--gray)", fontSize: "0.95rem" }}>
                    Thank you. We will get back to you shortly.
                </p>
                <button 
                    onClick={() => setIsSuccess(false)}
                    className="btn btn-secondary"
                    style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}
                >
                    Send Another Message
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="quick-form" noValidate>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <textarea 
                    placeholder="How can we help you?" 
                    rows={4} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
            </div>
            {errorMessage && (
                <div style={{ color: "#ef4444", fontSize: "0.88rem", marginBottom: "1rem", fontWeight: 600 }}>
                    {errorMessage}
                </div>
            )}
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
};

const CTAContactSection = () => {
    const { content } = useContent();
    const contactPreview = content.home.contactPreview;

    return (
        <section className="cta-contact-section">
            <div className="cta-block relative-3d-section">
                <CTAPortal3D />
                <motion.div
                    className="container text-center cta-inner relative-z-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="sub-tag cta-sub-tag">Get In Touch With Engineering Experts</span>
                    <h2>Let’s Build Your Next Industrial Solution</h2>
                    <p>Contact our engineering experts today for a comprehensive technical consultation and custom quote.</p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn btn-primary btn-cta-primary">
                            Contact Engineering Team <FaArrowRight size={14} />
                        </Link>
                        <Link to="/quote" className="btn btn-secondary btn-cta-secondary">
                            Request Instant Quote
                        </Link>
                    </div>
                </motion.div>
            </div>

            <div className="contact-preview section-padding">
                <div className="container contact-grid">
                    <motion.div
                        className="contact-info-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>Get in Touch</h3>
                        <ul>
                            <li><FaMapMarkerAlt className="c-icon" /> <span style={{ whiteSpace: "pre-line" }}>{contactPreview?.address}</span></li>
                            <li><FaPhoneAlt className="c-icon" /> {contactPreview?.phone}</li>
                            <li><FaEnvelope className="c-icon" /> {contactPreview?.email}</li>
                        </ul>
                        <div className="map-wrapper">
                            <iframe
                                src={contactPreview?.mapEmbedUrl}
                                allowFullScreen
                                loading="lazy"
                                title="Vertex Controls Location"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-card"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <QuickContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <div className="home-wrapper">
            <HeroSection />
            <StatsSection />
            <WhoWeAreSection />
            <CoreServicesSection />
            <WhyChooseUsSection />
            <FeaturedSolutionsSection />
            <ProcessTimelineSection />
            <ProjectHighlightsSection />
            <CTAContactSection />
        </div>
    );
}