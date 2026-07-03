import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
    FaArrowRight, FaCheckCircle, FaBolt, 
    FaChevronRight, FaInfoCircle
} from "react-icons/fa";
import "./Projects.css";

const Projects: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const domains = [
        {
            id: "automation",
            title: "Industrial Automation",
            desc: "End-to-end design, software engineering, and commissioning of intelligent PLC controls, SCADA telemetry suites, and real-time process monitoring networks.",
            tech: [
                "PLC Programming (Siemens S7, Rockwell, Schneider)",
                "SCADA & HMI Integration (WinCC, Wonderware, Ignition)",
                "Telemetry Networks & Telecommunication Gateways",
                "Remote monitoring log streams & alarm notifications"
            ],
            sectors: [
                "Water & Wastewater Utility plants",
                "Industrial manufacturing facilities",
                "District cooling and HVAC plants"
            ]
        },
        {
            id: "electrical",
            title: "Electrical Infrastructure",
            desc: "Expert assembly, wiring, Factory Acceptance Testing (FAT), and site commissioning of custom control panels and main power distribution systems.",
            tech: [
                "Motor Control Centers (MCC Panels)",
                "Variable Frequency Drive (VFD Panels)",
                "Low-Voltage Switchgears & Distribution Boards",
                "Power Factor Correction & Capacitor Banks"
            ],
            sectors: [
                "Commercial Skyscrapers & Retail malls",
                "Heavy industrial manufacturing cities",
                "Infrastructure & Municipal utilities"
            ]
        },
        {
            id: "mechanical",
            title: "Mechanical & Smart Systems",
            desc: "Installation, alignments, and smart integration of mechanical assets, smart facility protocols, and predictive telemetry.",
            tech: [
                "Pump & Valve Automation (Belimo, actuator links)",
                "Laser Shaft Alignment & vibration sensors",
                "Smart Facade Lighting (DALI protocol integration)",
                "AI-driven predictive maintenance parameters"
            ],
            sectors: [
                "Municipal pump stations & pipeline networks",
                "Commercial towers & public facade media",
                "District cooling loops & chiller plants"
            ]
        }
    ];

    const featuredProjects = [
        {
            title: "Industrial Control Panel Manufacturing",
            image: "/Images/Products/08d07495-ea3a-4a50-8291-b81c2c99f4a9.webp",
            industry: "Electrical Infrastructure",
            location: "Jebel Ali Free Zone, Dubai",
            desc: "Factory assembly, thermal scanning, and FAT commissioning of custom low-voltage motor control centers (MCC) and heavy VFD starter panels.",
            tech: "ABB Drives, Schneider Switchgears"
        },
        {
            title: "Pump Station SCADA Automation",
            image: "/Images/Project/scada_showcase.webp",
            industry: "Water & Wastewater",
            location: "Al Aweer Station, Dubai",
            desc: "Upgrading PLC sequence programs, telemetry links, and central HMI monitoring screens to control municipal water delivery systems.",
            tech: "Siemens S7-1500, WinCC SCADA"
        },
        {
            title: "Smart Lighting Facade Installation",
            image: "/Images/Project/lighting_showcase.webp",
            industry: "Commercial Buildings",
            location: "Sheikh Zayed Road, Dubai",
            desc: "Design and deployment of centralized DALI intelligent lighting protocols managing facade illumination profiles for a skyscraper.",
            tech: "DALI bus, Helvar controllers"
        },
        {
            title: "District Cooling Mechanical Rehabilitation",
            image: "/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.webp",
            industry: "Mechanical Systems",
            location: "Chiller Plant, Abu Dhabi",
            desc: "Laser shaft alignment of chilled water pumps, replacement of mechanical seals, and automated actuator calibrations.",
            tech: "Belimo actuators, Laser tools"
        }
    ];

    const timelineSteps = [
        { step: "01", title: "Assessment", desc: "Site audits, load studies, and technical specification scoping on site." },
        { step: "02", title: "Engineering", desc: "Custom electrical schematics, CAD layouts, and controller programming." },
        { step: "03", title: "Execution", desc: "Workshop assembly, on-site installation, safety testing, and commissioning." }
    ];

    const whyChooseUs = [
        { title: "Expert Engineers", desc: "Qualified field specialists possessing years of industrial expertise in UAE." },
        { title: "IEC Standards", desc: "Strict adherence to DEWA/ADDC utility regulations and international criteria." },
        { title: "Uptime Safety", desc: "Zero-compromise protection logic, interlocks, and preventative maintenance logs." }
    ];

    return (
        <div className="projects-page-wrapper">
            {/* Section 1 – Hero Banner */}
            <section className="corporate-hero-section">
                <div className="corporate-hero-overlay"></div>
                <div className="container corporate-hero-content">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="hero-text-align"
                    >
                        <div className="corp-breadcrumb">
                            <Link to="/">Home</Link>
                            <FaChevronRight size={8} className="breadcrumb-separator-icon" />
                            <span>Projects</span>
                        </div>

                        <h1 className="corp-hero-title">Our Projects</h1>
                        <p className="corp-hero-sub">
                            Delivering Reliable Engineering Solutions Across Electrical, Mechanical, Automation & Infrastructure Sectors.
                        </p>

                        <div className="corp-hero-ctas">
                            <Link to="/services" className="btn btn-primary corp-btn">
                                View Services <FaArrowRight size={12} />
                            </Link>
                            <Link to="/quote" className="btn btn-secondary corp-btn-outline">
                                Request a Quote
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 2 – Capabilities Tabbed Dashboard */}
            <section className="capabilities-dashboard-section">
                <div className="container">
                    <div className="minimal-section-header">
                        <span className="corp-section-subtitle">Scope of Expertise</span>
                        <h2 className="corp-section-title">Capabilities & Sectors</h2>
                    </div>

                    <div className="dashboard-console-deck">
                        {/* Tab Switchers */}
                        <div className="dashboard-tab-selector">
                            {domains.map((dom, idx) => (
                                <button
                                    key={dom.id}
                                    className={`dashboard-tab-btn ${activeTab === idx ? "active" : ""}`}
                                    onClick={() => setActiveTab(idx)}
                                >
                                    <span className="tab-bullet"></span>
                                    <span>{dom.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* Active Panel Content */}
                        <div className="dashboard-content-pane">
                            <h3 className="pane-title">{domains[activeTab].title}</h3>
                            <p className="pane-desc">{domains[activeTab].desc}</p>
                            
                            <div className="pane-split-grid">
                                <div className="pane-list-block">
                                    <h4 className="pane-list-title">Core Systems & Systems</h4>
                                    <ul>
                                        {domains[activeTab].tech.map((t, idx) => (
                                            <li key={idx}>
                                                <FaBolt className="pane-li-icon" />
                                                <span>{t}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pane-list-block">
                                    <h4 className="pane-list-title">Sectors Supported</h4>
                                    <ul>
                                        {domains[activeTab].sectors.map((s, idx) => (
                                            <li key={idx}>
                                                <FaCheckCircle className="pane-li-icon green-icon" />
                                                <span>{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 – Featured Projects Grid (4 Projects) */}
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
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
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
                                        <span>Systems Deployed: <strong>{proj.tech}</strong></span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4 – Split Process & Partnership */}
            <section className="process-split-section">
                <div className="container split-grid-layout">
                    {/* Left Column: Timeline */}
                    <div className="split-col-panel">
                        <span className="corp-section-subtitle">Delivery Workflow</span>
                        <h2 className="split-panel-title">Project Delivery</h2>
                        
                        <div className="vertical-timeline-minimal">
                            {timelineSteps.map((step, idx) => (
                                <div key={idx} className="timeline-minimal-item">
                                    <div className="timeline-minimal-left">
                                        <div className="timeline-minimal-bullet">{step.step}</div>
                                        {idx < timelineSteps.length - 1 && <div className="timeline-minimal-line"></div>}
                                    </div>
                                    <div className="timeline-minimal-right">
                                        <h4 className="timeline-item-title">{step.title}</h4>
                                        <p className="timeline-item-desc">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Why Choose Us */}
                    <div className="split-col-panel">
                        <span className="corp-section-subtitle">Client Value</span>
                        <h2 className="split-panel-title">Why Choose Vertex</h2>

                        <div className="why-choose-list-minimal">
                            {whyChooseUs.map((w, idx) => (
                                <div key={idx} className="why-choose-item-minimal">
                                    <div className="why-choose-icon-minimal">
                                        <FaCheckCircle />
                                    </div>
                                    <div className="why-choose-body-minimal">
                                        <h4>{w.title}</h4>
                                        <p>{w.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5 – Minimal CTA */}
            <section className="cta-minimal-bottom-section">
                <div className="container">
                    <div className="cta-minimal-card">
                        <h2 className="cta-minimal-title">Let's Build Your Next Engineering Project</h2>
                        <p className="cta-minimal-desc">
                            Whether you require automation systems, control panels, electrical infrastructure, mechanical installations, predictive maintenance or smart technology solutions, Vertex Controls is ready to support your project from concept to completion.
                        </p>
                        <div className="cta-minimal-buttons">
                            <Link to="/quote" className="btn btn-primary corp-btn-cta">
                                Request a Quote
                            </Link>
                            <Link to="/contact" className="btn btn-secondary corp-btn-cta-outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Projects;
