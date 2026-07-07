import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaInfoCircle, FaMicrochip, FaTv,
    FaTabletAlt, FaNetworkWired, FaSatellite, FaCloud,
    FaWater, FaIndustry, FaBuilding, FaPlug, FaRoad, FaSolarPanel,
    FaGasPump, FaSnowflake, FaUsers, FaCogs, FaClock, FaCheckCircle,
    FaLightbulb, FaHandshake, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope
} from "react-icons/fa";
import "./IndustrialAutomationProjects.css";

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

const IndustrialAutomationProjects: React.FC = () => {
    const [hoveredService, setHoveredService] = useState(0);

    // SEO Requirements: Dynamic Title & Meta Description update
    useEffect(() => {
        document.title = "Industrial Automation Projects | Vertex Controls Electromechanical LLC";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            'Vertex Controls delivers expert PLC programming, SCADA systems, HMI design, and Industrial IoT control systems integration projects across the UAE.'
        );
    }, []);

    // Featured Projects Data (4 projects)
    const featuredProjects = [
        {
            title: "PLC Upgrade for Water Pump Station",
            image: "/Images/Project/scada_showcase.webp",
            industry: "Water & Wastewater",
            location: "Al Aweer, Dubai",
            scope: "Design, Programming & Commissioning",
            tech: "Siemens S7-1500, WinCC SCADA",
            desc: "Complete retrofitting of legacy pump controls with dual-redundant PLC processors, fiber optic ring networks, and remote telemetry logging."
        },
        {
            title: "SCADA Modernization Project",
            image: "/Images/Products/control_panels.png",
            industry: "Utilities",
            location: "Jebel Ali Industrial Area, Dubai",
            scope: "Software Architecture & Server Setup",
            tech: "Ignition SCADA, Modbus TCP",
            desc: "Centralization of real-time telemetry from 14 remote sites, incorporating predictive analytics dashboards and automated SMS alarm routing."
        },
        {
            title: "Industrial Process Automation",
            image: "/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.webp",
            industry: "Manufacturing",
            location: "Industrial Area, Sharjah",
            scope: "Control Loop Tuning & Integration",
            tech: "Schneider Modicon, Magelis HMI",
            desc: "Automating raw material mixing and temperature profiles with closed-loop PID controllers, reducing production errors by 32%."
        },
        {
            title: "Factory Control System Integration",
            image: "/Images/Project/mcc_showcase.webp",
            industry: "Manufacturing",
            location: "KIZAD, Abu Dhabi",
            scope: "Turnkey Panels & Programming",
            tech: "Rockwell ControlLogix, FactoryTalk View",
            desc: "Design and deployment of integrated motor control centers (MCC), variable speed drives, and central conveyor routing safety grids."
        }
    ];

    // Services Delivered Data with non-technical values and applications
    const servicesDelivered = [
        {
            icon: FaMicrochip,
            title: "PLC Programming",
            desc: "Expert logic development matching IEC 61131-3 standards for Siemens, Rockwell, Schneider, and ABB controllers.",
            value: "Automates machine sequences to run continuously without human error, maximizing plant safety.",
            applications: ["Water Pump Stations", "Conveyor Grids", "Packaging Lines", "Mixing Systems"]
        },
        {
            icon: FaTv,
            title: "SCADA Development",
            desc: "Custom graphical interfaces, historical alarm logs, telemetry configurations, and plant reporting engines.",
            value: "Provides a centralized control room displaying real-time facility alarms, historical trends, and reports.",
            applications: ["Municipal Water Loops", "Chiller Plants", "Factory Control Rooms", "Power Telemetry"]
        },
        {
            icon: FaTabletAlt,
            title: "HMI Design",
            desc: "Intuitive touch screen interfaces featuring high-performance graphics designed to optimize operator actions.",
            value: "Empowers operators on the factory floor with simple, user-friendly touch screens to adjust parameters.",
            applications: ["Operator Touch Panels", "Local Machine Screens", "Alarm Display Consoles"]
        },
        {
            icon: FaNetworkWired,
            title: "Industrial Networking",
            desc: "Design of robust Ethernet/IP, Profinet, Modbus TCP, and serial device meshes configured for plant environments.",
            value: "Establishes a highly secure, fail-safe communication ring between controllers and field devices.",
            applications: ["Fiber Optic Ring Networks", "Device-to-Controller Links", "Switchgear Networks"]
        },
        {
            icon: FaSatellite,
            title: "Remote Monitoring",
            desc: "Cellular RTUs, secure VPN telemetry loops, and cloud databases for continuous equipment tracking.",
            value: "Sends real-time alarm alerts directly to operators' phones and allows secure off-site status checking.",
            applications: ["Remote Reservoirs", "Cellular Pump Stations", "Unmanned Facilities", "SMS Dialers"]
        },
        {
            icon: FaCloud,
            title: "Industrial IoT Integration",
            desc: "Edge gateways streaming telemetry metrics directly to cloud-based predictive and web dashboards.",
            value: "Gathers diagnostic machine data to predict mechanical wear and schedule proactive maintenance.",
            applications: ["Cloud Energy Dashboards", "Vibration Monitors", "Predictive Maintenance Portals"]
        }
    ];

    // Technologies Data with specific communication protocols
    const technologies = [
        { name: "Siemens", protocols: ["PROFINET", "S7 Protocol", "MPI/DP"] },
        { name: "Schneider Electric", protocols: ["Modbus TCP", "EtherNet/IP", "CANopen"] },
        { name: "ABB", protocols: ["PROFIBUS", "Modbus RTU", "ControlNet"] },
        { name: "Allen-Bradley", protocols: ["EtherNet/IP", "DeviceNet", "DF1"] },
        { name: "Mitsubishi", protocols: ["CC-Link", "MELSECNET", "SLMP"] },
        { name: "Omron", protocols: ["EtherCAT", "Sysmac Link", "Host Link"] },
        { name: "Delta", protocols: ["Modbus TCP", "CANopen", "DeviceNet"] },
        { name: "WAGO", protocols: ["Modbus TCP", "PROFINET", "BACnet"] },
        { name: "Phoenix Contact", protocols: ["PROFINET", "Interbus", "Modbus TCP"] }
    ];

    // Industries Served Data
    const industriesServed = [
        { icon: FaWater, name: "Water & Wastewater" },
        { icon: FaIndustry, name: "Manufacturing" },
        { icon: FaBuilding, name: "Commercial Buildings" },
        { icon: FaPlug, name: "Utilities" },
        { icon: FaRoad, name: "Infrastructure" },
        { icon: FaSolarPanel, name: "Energy" },
        { icon: FaGasPump, name: "Oil & Gas" },
        { icon: FaSnowflake, name: "District Cooling" }
    ];

    // Timeline Steps Data
    const deliverySteps = [
        { num: "01", title: "Consultation", desc: "Requirements analysis" },
        { num: "02", title: "Site Survey", desc: "Detailed audits & checks" },
        { num: "03", title: "Engineering Design", desc: "Schematics & layouts" },
        { num: "04", title: "PLC Programming", desc: "Logic & HMI code" },
        { num: "05", title: "Installation", desc: "Panel & field wiring" },
        { num: "06", title: "Testing", desc: "FAT & wire loops" },
        { num: "07", title: "Commissioning", desc: "Startups & handovers" },
        { num: "08", title: "Maintenance Support", desc: "AMCs & routine checks" }
    ];

    // Why Choose Data
    const whyChooseData = [
        {
            icon: FaUsers,
            title: "Experienced Engineers",
            desc: "Qualified control systems specialists with deep experience delivering automation in the UAE."
        },
        {
            icon: FaCogs,
            title: "Customized Automation Solutions",
            desc: "Tailored software architectures and panels configured specifically to your plant logic."
        },
        {
            icon: FaClock,
            title: "Reliable Project Delivery",
            desc: "Structured milestone tracking to guarantee completion within planned shutdown windows."
        },
        {
            icon: FaCheckCircle,
            title: "IEC-Compliant Systems",
            desc: "Full adherence to international electromechanical codes and safety standards."
        },
        {
            icon: FaLightbulb,
            title: "Advanced Technologies",
            desc: "Integrating digital smart sensors, high-speed fiber loops, and predictive analytics."
        },
        {
            icon: FaHandshake,
            title: "Long-Term Support",
            desc: "Prompt troubleshooting, remote diagnostics, and Annual Maintenance Contracts (AMC)."
        }
    ];

    // FAQs Data
    const faqs = [
        {
            q: "What PLC brands do you support?",
            a: "We support all major industrial PLC brands, including Siemens (S7-1200/1500/400), Schneider Electric (Modicon), Rockwell Automation/Allen-Bradley (ControlLogix/CompactLogix), ABB, Mitsubishi, Omron, Delta, and WAGO."
        },
        {
            q: "Do you provide SCADA upgrades?",
            a: "Yes. We specialize in upgrading legacy SCADA systems to modern, web-compatible platforms like Ignition, Siemens WinCC, and AVEVA/Wonderware. We migrate historical databases, configure redundant servers, and update graphic layouts."
        },
        {
            q: "Can you retrofit existing automation systems?",
            a: "Yes. We offer complete system retrofits. We can replace old controller hardware, recode legacy logic programs, and update control panels on-site with minimal plant downtime."
        },
        {
            q: "Do you provide commissioning?",
            a: "Absolutely. We perform strict Factory Acceptance Testing (FAT) in our workshop, followed by on-site Site Acceptance Testing (SAT), IO loop checks, control loop tuning, and final operational handovers."
        },
        {
            q: "Do you offer AMC services?",
            a: "Yes. We provide Annual Maintenance Contracts (AMC) that include regular system health audits, code backups, sensor calibrations, fast emergency callouts, and remote engineering diagnostics."
        },
        {
            q: "Can you integrate Industrial IoT?",
            a: "Yes. We integrate secure edge gateways and cellular RTUs to stream key process parameters (such as flow rates, pump run-times, and faults) to cloud platforms for real-time dashboard viewing and ESG reporting."
        }
    ];

    return (
        <div className="projects-page-wrapper">
            {/* 1. HERO SECTION */}
            <section className="automation-hero-section">
                <div className="container corporate-hero-content">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="hero-text-align"
                    >
                        <motion.div variants={fadeInUp} className="breadcrumb-wrapper">
                            <div className="breadcrumb">
                                <Link to="/">Home</Link>
                                <span className="breadcrumb-separator">/</span>
                                <Link to="/projects">Projects</Link>
                                <span className="breadcrumb-separator">/</span>
                                <span>Industrial Automation</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="corp-hero-title">
                            Industrial Automation <span className="text-gradient">Projects</span>
                        </motion.h1>
                        
                        <motion.p variants={fadeInUp} className="corp-hero-sub">
                            Design, supply, installation, programming, testing, commissioning and maintenance of industrial automation systems across the UAE.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="corp-hero-ctas">
                            <Link to="/quote" className="btn btn-primary corp-btn">
                                Request a Quote <FaArrowRight size={12} />
                            </Link>
                            <Link to="/services/industrial-automation" className="btn btn-secondary corp-btn-outline">
                                View Services
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. PROJECT OVERVIEW */}
            <section className="overview-section">
                <div className="container split-layout align-center">
                    <motion.div
                        className="overview-text"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <span className="sub-tag">Expert Systems Integrator</span>
                        <h2 className="section-title">End-to-End Control System Integration & Automation Upgrades</h2>
                        <p className="overview-lead">
                            Vertex Controls designs and commissions robust industrial control systems that maximize uptime and process efficiency in Dubai and the wider UAE.
                        </p>
                    </motion.div>

                    <motion.div
                        className="overview-description-col"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <p>
                            We specialize in modernizing legacy plants and engineering new automation architectures. Our engineers deploy custom PLC Programming UAE and SCADA Systems UAE configurations, ensuring secure Industrial Networking and continuous Remote Monitoring. 
                        </p>
                        <p>
                            By integrating modern HMI Development and Industrial IoT telemetry, we bridge field instruments with management dashboards. From minor code adjustments to complete control system retrofits, we deliver reliable, safe, and efficient electromechanical solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. FEATURED PROJECTS */}
            <section className="featured-portfolio-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">Case Studies</span>
                        <h2 className="corp-section-title">Featured Projects</h2>
                    </div>

                    <div className="minimal-projects-grid">
                        {featuredProjects.map((proj, idx) => (
                            <motion.div
                                key={idx}
                                className="minimal-project-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeInUp}
                            >
                                <div className="min-proj-img-wrap">
                                    <img src={proj.image} alt={proj.title} loading="lazy" />
                                    <span className="min-proj-badge">{proj.industry}</span>
                                </div>
                                <div className="min-proj-body">
                                    <span className="min-proj-location">📍 {proj.location}</span>
                                    <h3 className="min-proj-title">{proj.title}</h3>
                                    <p className="min-proj-desc">{proj.desc}</p>
                                    <div className="min-proj-footer">
                                        <FaInfoCircle size={12} className="min-footer-icon" />
                                        <span>Technology: <strong>{proj.tech}</strong></span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SERVICES DELIVERED (Interactive Console Split Dashboard) */}
            <section className="services-delivered-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">Core Capabilities</span>
                        <h2 className="corp-section-title">Services Delivered</h2>
                    </div>

                    <div className="console-split-layout">
                        {/* Left Side Sticky Showcase */}
                        <div className="console-showcase-box">
                            <div className="console-showcase-header">
                                <div className="console-showcase-num">
                                    {String(hoveredService + 1).padStart(2, "0")}
                                </div>
                                <div className="console-showcase-icon-box">
                                    {React.createElement(servicesDelivered[hoveredService].icon)}
                                </div>
                            </div>
                            <div className="console-showcase-body">
                                <h3>{servicesDelivered[hoveredService].title}</h3>
                                <p>{servicesDelivered[hoveredService].desc}</p>
                            </div>
                            <div className="console-value-box">
                                <span className="console-value-title">Operational Value</span>
                                <p className="console-value-text">
                                    {servicesDelivered[hoveredService].value}
                                </p>
                                <div className="console-app-list">
                                    {servicesDelivered[hoveredService].applications.map((app, appIdx) => (
                                        <span key={appIdx} className="console-app-badge">
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side Hover Rows */}
                        <div className="console-rows-list">
                            {servicesDelivered.map((serv, idx) => (
                                <div
                                    key={idx}
                                    className={`console-row-item ${hoveredService === idx ? "active" : ""}`}
                                    onMouseEnter={() => setHoveredService(idx)}
                                >
                                    <div className="console-row-left">
                                        <span className="console-row-num">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="console-row-title">{serv.title}</span>
                                    </div>
                                    <FaArrowRight className="console-row-arrow" size={14} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. TECHNOLOGIES WE WORK WITH (Interactive Protocol Cards) */}
            <section className="tech-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">System Standards</span>
                        <h2 className="corp-section-title">Technologies We Work With</h2>
                    </div>

                    <div className="tech-interactive-grid">
                        {technologies.map((tech, idx) => (
                            <motion.div
                                key={idx}
                                className="tech-interactive-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeInUp}
                            >
                                <span className="tech-status-dot"></span>
                                <div className="tech-card-main">
                                    <h3>{tech.name}</h3>
                                </div>
                                <div className="tech-card-protocols">
                                    {tech.protocols.map((proto, pidx) => (
                                        <span key={pidx} className="protocol-badge">
                                            {proto}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. INDUSTRIES SERVED */}
            <section className="industries-served-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">Operational Sectors</span>
                        <h2 className="corp-section-title">Industries Served</h2>
                    </div>

                    <div className="industries-grid">
                        {industriesServed.map((ind, idx) => (
                            <motion.div
                                key={idx}
                                className="industry-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={fadeInUp}
                            >
                                <div className="industry-icon-box">
                                    <ind.icon />
                                </div>
                                <h3>{ind.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. PROJECT DELIVERY PROCESS */}
            <section className="timeline-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">Engineering Lifecycle</span>
                        <h2 className="corp-section-title">Project Delivery Process</h2>
                    </div>

                    <div className="timeline-horizontal-wrapper">
                        <div className="timeline-line"></div>
                        <div className="timeline-horizontal-grid">
                            {deliverySteps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    className="timeline-horizontal-node"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInUp}
                                >
                                    <div className="timeline-node-dot">{step.num}</div>
                                    <h4 className="timeline-node-title">{step.title}</h4>
                                    <p className="timeline-node-desc">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. WHY CHOOSE VERTEX CONTROLS */}
            <section className="why-choose-automation-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">The Vertex Edge</span>
                        <h2 className="corp-section-title">Why Choose Vertex Controls</h2>
                    </div>

                    <div className="why-choose-grid">
                        {whyChooseData.map((why, idx) => (
                            <motion.div
                                key={idx}
                                className="why-choose-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={fadeInUp}
                            >
                                <div className="why-choose-card-icon-box">
                                    {React.createElement(why.icon)}
                                </div>
                                <h3>{why.title}</h3>
                                <p>{why.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. FREQUENTLY ASKED QUESTIONS */}
            <section className="faq-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">Got Questions?</span>
                        <h2 className="corp-section-title">Frequently Asked Questions</h2>
                    </div>

                    <div className="faq-grid">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                className="faq-item"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={fadeInUp}
                            >
                                <h3 className="faq-question">
                                    <span className="faq-q-bullet">Q.</span>
                                    <span>{faq.q}</span>
                                </h3>
                                <p className="faq-answer">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. CALL TO ACTION */}
            <section className="cta-bottom-section">
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
                        <h2>Let's Automate Your Next Project</h2>
                        <p>
                            Whether you require PLC programming, SCADA development, industrial automation upgrades, or complete control system integration, Vertex Controls delivers reliable engineering solutions across the UAE.
                        </p>
                        
                        <div className="cta-buttons">
                            <Link to="/quote" className="btn btn-primary corp-btn">
                                Request a Quote <FaArrowRight size={14} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary corp-btn-outline">
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

export default IndustrialAutomationProjects;
