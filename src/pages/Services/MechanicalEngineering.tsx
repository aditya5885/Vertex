import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaTools, FaCheckCircle, FaPhoneAlt,
    FaEnvelope, FaSlidersH, FaShieldAlt, FaClock, FaMapMarkerAlt,
    FaWater, FaWind, FaBuilding, FaFireExtinguisher
} from "react-icons/fa";
import "./MechanicalEngineering.css";

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

const MechanicalEngineering: React.FC = () => {
    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Mechanical & MEP Contracting Services | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Vertex Controls delivers professional mechanical engineering, MEP contracting, industrial HVAC, pump setups, and fire fighting systems in Dubai, UAE.'
        );
    }, []);

    // 3. Our Solutions Data (6 solutions)
    const solutionsData = [
        {
            icon: FaWind,
            title: "HVAC Installations",
            desc: "Custom ductwork fabrication, chiller plant setups, and air handling systems engineered for high temperature regulations.",
            features: ["Chiller Commissioning", "FCU/AHU Placements", "Duct Static Calculations", "Modbus Protocol Integration"]
        },
        {
            icon: FaTools,
            title: "Industrial Piping",
            desc: "High-grade fabrication and routing of chemical transfer lines, high-pressure loops, and wastewater collection pipelines.",
            features: ["Carbon Steel Weldings", "Stainless Steel Routing", "Valves & Actuators Setup", "Pressure Testing Execution"]
        },
        {
            icon: FaWater,
            title: "Plumbing Systems",
            desc: "Integrated water distribution pumps, booster sets, greywater drainage grids, and filtration piping schemes.",
            features: ["Booster System Tuning", "Submersible Drainage Pump", "Prismatic Water Tanks", "PRV Station Adjusts"]
        },
        {
            icon: FaFireExtinguisher,
            title: "Fire Fighting Systems",
            desc: "Ingress firefighting lines, certified sprinkler arrays, high-pressure diesel fire pumps, and FM200 gas suppression integration.",
            features: ["NFPA Standard Piping", "Wet Alarm Valves", "Zone Control Assemblies", "Civil Defense Inspection Setup"]
        },
        {
            icon: FaBuilding,
            title: "Ventilation Systems",
            desc: "Forced mechanical exhausts, warehouse exhaust grids, fresh air supply fans, and smoke management extraction blowers.",
            features: ["CO Sensor Integration", "Car Park Extraction", "Pressurization Fan Setup", "Eco-speed Fan Controls"]
        },
        {
            icon: FaCheckCircle,
            title: "Facility Commissioning",
            desc: "Rigorous diagnostic testing of mechanical valves, pump loops, and HVAC controls prior to plant startup.",
            features: ["TAB Balancing Reports", "Sound & Vibration Logs", "Interlock Validations", "Commissioning Documentation"]
        }
    ];

    // 4. Why Choose Vertex Controls Data (5 feature cards)
    const whyChooseData = [
        {
            icon: FaTools,
            title: "Experience",
            desc: "Qualified mechanical designers and field technicians executing complex systems across commercial high-rises."
        },
        {
            icon: FaCheckCircle,
            title: "Quality",
            desc: "100% factory acceptance testing (FAT) using premium, certified components from elite global automation brands."
        },
        {
            icon: FaShieldAlt,
            title: "Safety",
            desc: "Full compliance with local Civil Defense rules, utility guidelines (DEWA/ADDC), and IEC international safety standards."
        },
        {
            icon: FaClock,
            title: "Technical Support",
            desc: "SLA response coverage, emergency on-site diagnostics, logic debugging, and prompt component replacement."
        },
        {
            icon: FaSlidersH,
            title: "Customized Solutions",
            desc: "Tailored automation logic and panel dimensions built specifically around your facility's requirements."
        }
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
                                <span>Mechanical & MEP Services</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">MEP Contracting</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Mechanical & <span className="text-gradient">MEP Services</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Integrated mechanical, electrical, and plumbing engineering contracting services optimized for complex industrial infrastructure units.
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
                        <motion.span variants={fadeInUp} className="sub-tag">MEP Contracting</motion.span>
                        <motion.h2 variants={fadeInUp} className="section-title">Integrated Electromechanical Utilities</motion.h2>
                        <p className="overview-lead">
                            At Vertex Controls, we provide integrated mechanical, electrical, and plumbing (MEP) contracting solutions that streamline plant building operations.
                        </p>
                        <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: "1.75" }}>
                            Our experienced crew coordinates the procurement, installation, and startup of HVAC loops, water piping, and power feeds. We ensure that industrial plants and commercial complexes have robust infrastructure foundations that run with maximum energy efficiency.
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
                            <img src="/Images/booth_exib.webp" alt="Mechanical and MEP Industrial Construction Site" />
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
                        <p>Tailored mechanical services designed to regulate HVAC, piping loops, and firefighting networks.</p>
                    </motion.div>

                    <motion.div
                        className="subpage-solutions-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {solutionsData.map((sol, index) => {
                            const SolIcon = sol.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="solution-card"
                                    variants={fadeInUp}
                                >
                                    <div className="solution-card-icon">
                                        <SolIcon />
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
                        <h2 className="section-title">The Mechanical Advantage</h2>
                        <p>Why plant managers and consultants select Vertex Controls as their electromechanical MEP partner.</p>
                    </motion.div>

                    <motion.div
                        className="why-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        {whyChooseData.map((why, index) => {
                            const WhyIcon = why.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="why-item"
                                    variants={fadeInUp}
                                >
                                    <div className="why-icon-box">
                                        <WhyIcon />
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
                        <h2>Ready to Discuss Your Project?</h2>
                        <p>
                            Whether you require industrial HVAC setups, specialized chemical piping designs, plumbing networks, or Civil Defense-compliant firefighting pumps, Vertex Controls delivers expert systems engineered for uptime.
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

export default MechanicalEngineering;
