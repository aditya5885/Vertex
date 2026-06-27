// React import omitted for new JSX transform
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
                        <span className="badge-text">Electromechanical & Automation Engineering in UAE</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="hero-title">
                        Engineering Reliable <span className="text-gradient">Control & Automation</span> Solutions
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="hero-subtext">
                        End-to-end Design, Supply, Installation, Testing, Commissioning, and Maintenance of mission-critical Electrical, Automation, and SCADA control panels across the United Arab Emirates.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="hero-buttons">
                        <Link to="/contact" className="btn btn-primary btn-hero">
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
    return (
        <section className="stats-section">
            <motion.div
                className="container stats-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={staggerContainer}
            >
                {[
                    { num: "500+", label: "Projects Completed" },
                    { num: "150+", label: "Clients Served" },
                    { num: "100%", label: "UAE Coverage" },
                    { num: "15+ Yrs", label: "Engineering Expertise" }
                ].map((stat, i) => (
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
                    <motion.span variants={fadeInUp} className="sub-tag">Pioneering Industrial Engineering</motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title">Who We Are</motion.h2>
                    <motion.p variants={fadeInUp} className="who-lead-p">
                        Vertex Controls is a premier electromechanical and industrial automation engineering firm based in Dubai, UAE. We specialize in delivering mission-critical control solutions that drive operational reliability and efficiency.
                    </motion.p>
                    <motion.p variants={fadeInUp} className="who-sub-p">
                        From complex PLC/SCADA control panel integration to predictive maintenance, IoT telemetry, and turnkey MEP services, our intelligent engineering approach ensures safety, precision, and peak performance.
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
                        <img src="/Images/booth exib.png" alt="Vertex Controls Exhibition Booth" className="who-we-are-img" />

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
    const services = [
        { icon: FaBolt, title: "Electrical Engineering", desc: "Advanced power systems, switchgears, and robust distribution solutions." },
        { icon: FaCogs, title: "Mechanical Engineering", desc: "HVAC, piping, and industrial machinery optimization." },
        { icon: FaIndustry, title: "Industrial Automation", desc: "End-to-end automation for manufacturing and process industries." },
        { icon: FaMicrochip, title: "PLC & SCADA Systems", desc: "Intelligent control logic and real-time visualization dashboards." },
        { icon: FaNetworkWired, title: "IoT Solutions", desc: "Smart sensors and cloud-connected infrastructure monitoring." },
        { icon: FaServer, title: "Control Panels", desc: "Custom design and assembly of VFD, MCC, and PLC panels." },
        { icon: FaChartLine, title: "Predictive Maintenance", desc: "AI-driven analytics to prevent downtime and extend asset life." },
        { icon: FaBuilding, title: "MEP Services", desc: "Comprehensive Mechanical, Electrical, and Plumbing integration." }
    ];

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
                    viewport={{ once: true, amount: 0.1 }}
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
    const reasons = [
        "Experienced Engineering Team",
        "End-to-End Project Delivery",
        "Innovative Technology Solutions",
        "Quality & Safety Focused",
        "Rapid Technical Support",
        "Cost-Effective Solutions"
    ];

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
    const solutions = [
        { title: "MCC Panels", cat: "Power Distribution", spec: "IEC 61439 Certified", image: "/Images/Products/08d07495-ea3a-4a50-8291-b81c2c99f4a9.png" },
        { title: "PLC Control Panels", cat: "Automation", spec: "Real-time Logic", image: "/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.png" },
        { title: "SCADA Systems", cat: "Telemetry & Software", spec: "HMI Dashboards", image: "/Images/Products/3b41b48b-793d-4b06-b872-8a701ecd05d0.png" },
        { title: "Energy Monitoring", cat: "Smart Grid", spec: "AI Power Analytics", image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.png" },
        { title: "Smart Lighting", cat: "ELV Integration", spec: "DALI Protocols", image: "/Images/Products/61b16c79-0f71-4ee6-87c5-396b8123796c.png" },
        { title: "Industrial IoT", cat: "Cloud Gateways", spec: "Telemetry Sensors", image: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.png" }
    ];

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
    const projects = [
        {
            title: "Pump Station Automation",
            cat: "Infrastructure",
            location: "Dubai Water Authority",
            desc: "Mission-critical SCADA telemetry & automated pump sequencing for municipal water management.",
            image: "/Images/Project/08d07495-ea3a-4a50-8291-b81c2c99f4a9.png"
        },
        {
            title: "Electrical Power Distribution",
            cat: "Power Systems",
            location: "Industrial City, Sharjah",
            desc: "Turnkey MV/LV switchgear assembly, power factor correction, and smart distribution panels.",
            image: "/Images/Project/0a2f66b6-afd9-48b8-a972-f34cfae38112.png"
        },
        {
            title: "Smart Lighting Automation",
            cat: "ELV Systems",
            location: "Commercial Complex, Abu Dhabi",
            desc: "DALI intelligent lighting integration with daylight harvesting and centralized scheduling.",
            image: "/Images/Project/57045811-01db-4a79-8406-f8398676e32e.png"
        },
        {
            title: "Industrial Energy Telemetry",
            cat: "IoT Solutions",
            location: "Logistics Hub, Dubai",
            desc: "Cloud IoT sensors and AI predictive analytics dashboard for automated power optimization.",
            image: "/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.png"
        }
    ];

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
    const steps = [
        { title: "Site Assessment", desc: "Detailed inspection & requirements gathering." },
        { title: "Engineering Design", desc: "Custom CAD blueprints & logic programming." },
        { title: "Installation", desc: "Expert on-site execution & integration." },
        { title: "Testing", desc: "Rigorous commissioning & safety checks." },
        { title: "Maintenance", desc: "24/7 support & predictive monitoring." }
    ];

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

const CTAContactSection = () => {
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
                        <Link to="/contact" className="btn btn-secondary btn-cta-secondary">
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
                            <li><FaMapMarkerAlt className="c-icon" /> <span>Office No-5, L1/6A, 1st Floor<br />Reef Mall, Al Murqabat, Deira<br />Dubai, UAE</span></li>
                            <li><FaPhoneAlt className="c-icon" /> +971 55 496 2866</li>
                            <li><FaEnvelope className="c-icon" /> Sales@vertex-controls.com</li>
                        </ul>
                        <div className="map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0330010638054!2d55.32087537489523!3d25.269475277664476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5da8878c837f%3A0xa5adb301b301eeaa!2sVertex%20controls%20Electromechanical%20llc!5e0!3m2!1sen!2sin!4v1782545529440!5m2!1sen!2sin"
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
                        <form className="quick-form">
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="How can we help you?" rows={4} required></textarea>
                            </div>
                            <button type="submit" className="btn-submit">Send Message</button>
                        </form>
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