import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
    FaArrowRight, FaGlobe, FaBuilding, FaCheckCircle,
    FaShieldAlt, FaHeadset, FaTools, FaLightbulb
} from "react-icons/fa";
import "./Contact.css";

interface FormFields {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

const Contact: React.FC = () => {
    // Form Inputs & Validation States
    const [formValues, setFormValues] = useState<FormFields>({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });

    const [formErrors, setFormErrors] = useState<Partial<FormFields>>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Mouse coordinates tracking for Awwwards 3D Card Tilts
    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        // 1. Calculate relative cursor position for spotlight gradient mask
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        // 2. Calculate 3D tilt angles (limit to 8 degrees max)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };

    const formSectionRef = useRef<HTMLDivElement>(null);
    const cardsSectionRef = useRef<HTMLDivElement>(null);
    const bentoSectionRef = useRef<HTMLDivElement>(null);
    const ctaSectionRef = useRef<HTMLDivElement>(null);

    // Form inputs validation rules
    const validateForm = (): boolean => {
        const errors: Partial<FormFields> = {};

        if (!formValues.name.trim()) {
            errors.name = "Name is required";
        }

        if (!formValues.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!formValues.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\+?[0-9\s-]{7,15}$/.test(formValues.phone.replace(/\s+/g, ""))) {
            errors.phone = "Please enter a valid phone number";
        }

        if (!formValues.service) {
            errors.service = "Please select a service";
        }

        if (!formValues.message.trim()) {
            errors.message = "Message is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));

        if (formErrors[name as keyof FormFields]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                console.log("Form payload verified and sent:", formValues);
            }, 1500);
        }
    };

    const resetForm = () => {
        setFormValues({
            name: "",
            company: "",
            email: "",
            phone: "",
            service: "",
            message: ""
        });
        setFormErrors({});
        setIsSubmitted(false);
    };

    const scrollToForm = () => {
        formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Stagger reveal animations configurations
    const fadeInUp: any = {
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const servicesList = [
        "New Engineering Projects",
        "Annual Maintenance Contracts (AMC)",
        "Automation & Control Solutions",
        "PLC & SCADA Systems",
        "Electrical Engineering Services",
        "MEP Solutions",
        "Control Panel Design & Manufacturing",
        "Smart Infrastructure Solutions",
        "AI & IoT Integration",
        "ELV & Security Systems",
        "Energy Management Solutions",
        "Technical Consultation & Upgrades"
    ];

    const bentoItems = [
        {
            icon: FaClock,
            title: "Rapid Response",
            description: "Immediate critical support. We ensure 24/7 technical hotline access and rapid response teams deployed across Dubai and the Northern Emirates.",
            colSpan: "bento-cols-4"
        },
        {
            icon: FaTools,
            title: "Engineering Expertise",
            description: "Our engineers specialize in high-end PLC programming, complex MCC panels, SCADA dashboards, mechanical systems, and telemetry optimization designed to withstand harsh industrial environments.",
            colSpan: "bento-cols-8"
        },
        {
            icon: FaBuilding,
            title: "Customized Solutions",
            description: "No generic templates. We conduct detailed site assessments to construct bespoke electromechanical schematics tailored to the precise specifications of your facility.",
            colSpan: "bento-cols-6"
        },
        {
            icon: FaHeadset,
            title: "Reliable Support",
            description: "Strict SLA compliance. From testing and commissioning to preventive maintenance cycles, we guarantee active support to keep your operations running at peak performance.",
            colSpan: "bento-cols-6"
        },
        {
            icon: FaShieldAlt,
            title: "Industry Experience",
            description: "Integrated partner with key industrial and infrastructure hubs across the GCC. We deliver ISO-compliant, certified electromechanical systems engineered to highest safety standards.",
            colSpan: "bento-cols-8"
        },
        {
            icon: FaLightbulb,
            title: "Innovation",
            description: "Pioneering smart engineering. We embed intelligent IoT gateways and predictive maintenance systems that monitor electrical grids and prevent downtime.",
            colSpan: "bento-cols-4"
        }
    ];

    return (
        <div className="contact-page-wrapper">
            <div className="contact-bg-grid"></div>

            {/* Volumetric ambient glow lights */}
            <div className="contact-glow-orb orb-top-left"></div>
            <div className="contact-glow-orb orb-mid-right"></div>

            {/* ==========================================
               SECTION 1 — HERO (About Us Header Design)
               ========================================== */}
            <section className="page-header-section">
                <div className="page-header-bg-grid"></div>
                <div className="container page-header-content">
                    <motion.div
                        className="page-header-inner"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        {/* Breadcrumbs matching About.tsx */}
                        <motion.div variants={fadeInUp} className="breadcrumb-wrapper">
                            <div className="breadcrumb">
                                <Link to="/">Home</Link>
                                <span className="breadcrumb-separator">/</span>
                                <span>Contact Us</span>
                            </div>
                        </motion.div>

                        {/* Standard site badge */}
                        <motion.div variants={fadeInUp} className="hero-badge-wrapper">
                            <div className="hero-badge">
                                <span className="badge-pulse"></span>
                                <span className="badge-text">Electromechanical & Automation UAE</span>
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            Contact <span className="text-gradient">Us</span>
                        </motion.h1>
                        <motion.div variants={fadeInUp} className="let-connect">Let's Connect</motion.div>

                        <motion.p variants={fadeInUp} className="page-header-lead">
                            Whether you're planning a new engineering project, upgrading existing systems, or seeking expert technical support, the team at Vertex Controls Electromechanical LLC is ready to assist. Contact us today to discuss your requirements, request a quotation, or learn more about our engineering solutions.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="page-header-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <FaArrowRight size={13} />
                            </Link>
                            <a href="tel:+971554962866" className="btn btn-secondary">
                                <FaPhoneAlt size={12} /> Call Us
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ==========================================
               SECTION 2 — CONTACT CARDS
               ========================================== */}
            <section className="contact-cards-section container" ref={cardsSectionRef}>
                <div className="contact-cards-grid">

                    {/* Card 1: Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 0.6 }}
                        className="spotlight-card-wrapper"
                    >
                        <div
                            className="spotlight-card"
                            onMouseMove={handleCardMouseMove}
                            onMouseLeave={handleCardMouseLeave}
                        >
                            {/* Orbiting neon border lines */}
                            <div className="neon-trace-line">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="spotlight-card-content">
                                <div className="card-icon-box">
                                    <FaBuilding />
                                </div>
                                <h3 className="card-title">Contact Information</h3>
                                <div className="card-content-block">
                                    <h4>Vertex Controls Electromechanical LLC</h4>
                                    <p>Office No-5, L1/6A, 1st Floor, Reef Mall, Al Murqabat, Deira</p>
                                    <p style={{ color: "var(--primary)" }}>Dubai, United Arab Emirates</p>

                                    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                        <a href="tel:+971554962866" className="card-text-link">
                                            <FaPhoneAlt size={12} /> +971 55 496 2866
                                        </a>
                                        <a href="mailto:Sales@vertex-controls.com" className="card-text-link">
                                            <FaEnvelope size={12} /> Sales@vertex-controls.com
                                        </a>
                                        <a href="https://www.vertex-controls.com" target="_blank" rel="noopener noreferrer" className="card-text-link">
                                            <FaGlobe size={12} /> www.vertex-controls.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Business Hours */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="spotlight-card-wrapper"
                    >
                        <div
                            className="spotlight-card"
                            onMouseMove={handleCardMouseMove}
                            onMouseLeave={handleCardMouseLeave}
                        >
                            <div className="neon-trace-line">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="spotlight-card-content">
                                <div className="card-icon-box">
                                    <FaClock />
                                </div>
                                <h3 className="card-title">Business Hours</h3>
                                <div className="card-content-block">
                                    <h4>Monday – Saturday</h4>
                                    <p style={{ fontSize: "1.1rem", color: "var(--primary)", fontWeight: 600 }}>8:00 AM – 6:00 PM</p>

                                    <h4 style={{ color: "var(--gray)", marginTop: "1rem" }}>Sunday</h4>
                                    <p style={{ color: "#ff4a4a", fontWeight: 600 }}>Closed</p>

                                    <p style={{ fontSize: "0.85rem", color: "var(--gray)", fontStyle: "italic", marginTop: "auto" }}>
                                        *Priority SLA emergency support remains active 24/7 for clients under Annual Maintenance Contracts (AMC).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Dubai Map Radar Schematic */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="spotlight-card-wrapper"
                    >
                        <div
                            className="spotlight-card"
                            onMouseMove={handleCardMouseMove}
                            onMouseLeave={handleCardMouseLeave}
                        >
                            <div className="neon-trace-line">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="spotlight-card-content">
                                <div className="card-icon-box">
                                    <FaMapMarkerAlt />
                                </div>
                                <h3 className="card-title">Google Map</h3>

                                {/* Google Maps Embed */}
                                <div className="map-wrapper">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0330010638054!2d55.32087537489523!3d25.269475277664476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5da8878c837f%3A0xa5adb301b301eeaa!2sVertex%20controls%20Electromechanical%20llc!5e0!3m2!1sen!2sin!4v1782545529440!5m2!1sen!2sin"
                                        allowFullScreen
                                        loading="lazy"
                                        title="Vertex Controls Location"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* ==========================================
               SECTION 3 — REQUEST A QUOTE (FORM)
               ========================================== */}
            <section className="quote-section container" ref={formSectionRef}>
                <div className="quote-grid">

                    {/* Left Details */}
                    <motion.div
                        className="quote-info-col"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 0.65 }}
                    >
                        <h2>Request a Quote</h2>
                        <p className="quote-info-text">
                            Looking for a trusted, certified engineering partner in the UAE? Get in touch with us to receive custom blueprints, SLAs, or competitive commercial tenders for:
                        </p>

                        <ul className="quote-list">
                            {servicesList.map((service, index) => (
                                <li className="quote-list-item" key={index}>
                                    <span className="quote-list-icon"><FaCheckCircle size={13} /></span>
                                    <span>{service}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right Vercel-style Glass Form */}
                    <motion.div
                        className="form-card-container"
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 0.7 }}
                    >
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="form-header-title">Technical Inquiry Form</h3>

                                    <form onSubmit={handleFormSubmit} className="contact-form" noValidate>

                                        {/* Name Field */}
                                        <div className={`form-input-group ${formValues.name ? "has-value" : ""}`}>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                                style={{ borderColor: formErrors.name ? "#ef4444" : undefined }}
                                            />
                                            <label htmlFor="name">Name</label>
                                            {formErrors.name && (
                                                <span className="form-error-msg">{formErrors.name}</span>
                                            )}
                                        </div>

                                        {/* Company Field */}
                                        <div className={`form-input-group ${formValues.company ? "has-value" : ""}`}>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formValues.company}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="company">Company</label>
                                        </div>

                                        {/* Email Field */}
                                        <div className={`form-input-group ${formValues.email ? "has-value" : ""}`}>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formValues.email}
                                                onChange={handleInputChange}
                                                style={{ borderColor: formErrors.email ? "#ef4444" : undefined }}
                                            />
                                            <label htmlFor="email">Email Address</label>
                                            {formErrors.email && (
                                                <span className="form-error-msg">{formErrors.email}</span>
                                            )}
                                        </div>

                                        {/* Phone Field */}
                                        <div className={`form-input-group ${formValues.phone ? "has-value" : ""}`}>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formValues.phone}
                                                onChange={handleInputChange}
                                                style={{ borderColor: formErrors.phone ? "#ef4444" : undefined }}
                                            />
                                            <label htmlFor="phone">Phone Number</label>
                                            {formErrors.phone && (
                                                <span className="form-error-msg">{formErrors.phone}</span>
                                            )}
                                        </div>

                                        {/* Service Field */}
                                        <div className={`form-input-group ${formValues.service ? "has-value" : ""}`}>
                                            <div className="select-wrapper">
                                                <select
                                                    id="service"
                                                    name="service"
                                                    value={formValues.service}
                                                    onChange={handleInputChange}
                                                    style={{ borderColor: formErrors.service ? "#ef4444" : undefined }}
                                                >
                                                    <option value="" disabled></option>
                                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                                    <option value="PLC & SCADA Automation">PLC & SCADA Automation</option>
                                                    <option value="Control Panel Design (MCC/VFD)">Control Panel Design (MCC/VFD)</option>
                                                    <option value="Annual Maintenance Contracts (AMC)">Annual Maintenance Contracts (AMC)</option>
                                                    <option value="Mechanical & MEP Solutions">Mechanical & MEP Solutions</option>
                                                    <option value="Smart Infrastructure & IoT">Smart Infrastructure & IoT</option>
                                                    <option value="Other Engineering Consultation">Other Engineering Consultation</option>
                                                </select>
                                            </div>
                                            <label htmlFor="service">Requested Engineering Service</label>
                                            {formErrors.service && (
                                                <span className="form-error-msg">{formErrors.service}</span>
                                            )}
                                        </div>

                                        {/* Message Field */}
                                        <div className={`form-input-group ${formValues.message ? "has-value" : ""}`}>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formValues.message}
                                                onChange={handleInputChange}
                                                style={{ borderColor: formErrors.message ? "#ef4444" : undefined }}
                                            />
                                            <label htmlFor="message">Project Requirements / Details</label>
                                            {formErrors.message && (
                                                <span className="form-error-msg">{formErrors.message}</span>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-form-submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Processing..." : "Submit Technical Request"}
                                        </button>

                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    className="form-success-overlay"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="success-icon-container">
                                        <FaCheckCircle />
                                    </div>
                                    <h3 style={{ color: "var(--white)", fontSize: "1.75rem", marginBottom: "0.75rem", fontWeight: 700 }}>Request Received</h3>
                                    <p style={{ color: "var(--gray)", fontSize: "0.98rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
                                        Thank you, <strong>{formValues.name}</strong>. Your technical inquiry regarding <strong>{formValues.service}</strong> has been successfully logged. Our engineering sales team will review your specifications and contact you within 1 business day.
                                    </p>
                                    <button onClick={resetForm} className="btn btn-secondary">
                                        Submit Another Inquiry
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ==========================================
               SECTION 4 — WHY CONTACT US (BENTO GRID)
               ========================================== */}
            <section className="bento-section container" ref={bentoSectionRef}>
                <div className="bento-section-header">
                    <span className="sub-tag">The Vertex Advantage</span>
                    <h2>Engineered for Reliability</h2>
                    <p>Vertex Controls LLC brings automated precision, technical transparency, and top-tier industrial safety standards to MEP, energy, and SCADA engineering.</p>
                </div>

                <div className="bento-grid">
                    {bentoItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.05 }}
                            transition={{ duration: 0.6, delay: idx * 0.08 }}
                            className={`bento-card ${item.colSpan}`}
                            onMouseMove={handleCardMouseMove}
                            onMouseLeave={handleCardMouseLeave}
                        >
                            <div className="bento-card-content">
                                <div className="bento-icon-box">
                                    <item.icon />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ==========================================
               SECTION 5 — FINAL CTA
               ========================================== */}
            <section className="final-cta-section" ref={ctaSectionRef}>
                <div className="cta-energy-ring-container">
                    <div className="energy-ring ring-1"></div>
                    <div className="energy-ring ring-2"></div>
                    <div className="energy-ring ring-3"></div>
                </div>

                <div className="final-cta-content container">
                    <h2>We're Here to Help</h2>
                    <p className="final-cta-text">
                        At Vertex Controls Electromechanical LLC, we are committed to delivering innovative engineering solutions, reliable technical expertise, and exceptional customer service. Whether your project is large or small, our team is ready to help you achieve efficient, intelligent, and sustainable results.
                    </p>

                    <div className="final-cta-tagline">
                        Engineering Intelligence. // Automated Excellence.
                    </div>

                    <div className="final-cta-buttons">
                        <button onClick={scrollToForm} className="btn btn-primary">
                            Get a Quote <FaArrowRight size={13} />
                        </button>
                        <a href="tel:+971554962866" className="btn btn-secondary">
                            <FaPhoneAlt size={12} /> Call Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
