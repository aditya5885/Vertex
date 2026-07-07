import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { useContent } from "../../context/ContentContext";
import "./Contact.css";

interface FormFields {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

// Helper to resolve font-awesome icons dynamically by string name
const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? React.createElement(IconComponent) : <Icons.FaQuestionCircle />;
};

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
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email.trim())) {
            errors.email = "Please enter a valid email address";
        }

        if (!formValues.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\+?[0-9]{7,15}$/.test(formValues.phone.replace(/[\s()-]/g, ""))) {
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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formValues)
                });
                
                if (res.ok) {
                    setIsSubmitted(true);
                } else {
                    const data = await res.json();
                    alert(data.message || "Something went wrong. Please try again later.");
                }
            } catch (err) {
                console.error("Form submission error:", err);
                alert("Network error. Please check your internet connection.");
            } finally {
                setIsSubmitting(false);
            }
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

    const { content } = useContent();

    // Pre-select first service from CMS dynamic list by default
    React.useEffect(() => {
        const services = content?.contact?.quoteSection?.servicesList || [];
        if (services.length > 0 && !formValues.service) {
            setFormValues(prev => ({
                ...prev,
                service: services[0]
            }));
        }
    }, [content, formValues.service]);

    // Safe fallbacks for Contact Us CMS variables
    const contactData = content.contact || {
        hero: {
            pulseBadge: "Electromechanical & Automation UAE",
            title: "Contact Us",
            subtitle: "Let's Connect",
            lead: "Whether you're planning a new engineering project, upgrading existing systems, or seeking expert technical support, the team at Vertex Controls Electromechanical LLC is ready to assist.",
            phoneUrl: "tel:+971554962866",
            phoneText: "Call Us"
        },
        infoCard: {
            title: "Contact Information",
            companyName: "Vertex Controls Electromechanical LLC",
            address: "Office No-5, L1/6A, 1st Floor, Reef Mall, Al Murqabat, Deira",
            country: "Dubai, United Arab Emirates",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            website: "www.vertex-controls.com"
        },
        hoursCard: {
            title: "Business Hours",
            weekDaysTitle: "Monday – Saturday",
            weekDaysHours: "8:00 AM – 6:00 PM",
            sundayTitle: "Sunday",
            sundayHours: "Closed",
            disclaimer: "*Priority SLA emergency support remains active 24/7 for clients under Annual Maintenance Contracts (AMC)."
        },
        mapCard: {
            title: "Google Map",
            embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0330010638054!2d55.32087537489523!3d25.269475277664476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5da8878c837f%3A0xa5adb301b301eeaa!2sVertex%20controls%20Electromechanical%20llc!5e0!3m2!1sen!2sin!4v1782545529440!5m2!1sen!2sin"
        },
        quoteSection: {
            title: "Request a Quote",
            lead: "Looking for a trusted, certified engineering partner in the UAE?",
            servicesList: []
        },
        bentoHeader: {
            subTag: "The Vertex Advantage",
            title: "Engineered for Reliability",
            desc: "Vertex Controls LLC brings automated precision, technical transparency, and top-tier industrial safety standards to MEP, energy, and SCADA engineering."
        },
        bentoItems: [],
        finalCta: {
            title: "We're Here to Help",
            desc: "At Vertex Controls Electromechanical LLC, we are committed to delivering innovative engineering solutions.",
            tagline: "Engineering Intelligence. // Automated Excellence.",
            phoneUrl: "tel:+971554962866",
            phoneText: "Call Now"
        }
    };

    const hero = contactData.hero || {};
    const infoCard = contactData.infoCard || {};
    const hoursCard = contactData.hoursCard || {};
    const mapCard = contactData.mapCard || {};
    const quoteSection = contactData.quoteSection || {};
    const bentoHeader = contactData.bentoHeader || {};
    const bentoItems = contactData.bentoItems || [];
    const finalCta = contactData.finalCta || {};

    const servicesList = quoteSection.servicesList || [];

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
                                <span className="badge-text">{hero.pulseBadge}</span>
                            </div>
                        </motion.div>
 
                        <motion.h1 variants={fadeInUp} className="page-header-title">
                            {(() => {
                                const parts = (hero.title || "Contact Us").split(" ");
                                if (parts.length > 1) {
                                    const lastWord = parts.pop();
                                    return (
                                        <>{parts.join(" ")} <span className="text-gradient">{lastWord}</span></>
                                    );
                                }
                                return hero.title || "Contact Us";
                            })()}
                        </motion.h1>
                        <motion.div variants={fadeInUp} className="let-connect">{hero.subtitle}</motion.div>
 
                        <motion.p variants={fadeInUp} className="page-header-lead">
                            {hero.lead}
                        </motion.p>
 
                        <motion.div variants={fadeInUp} className="page-header-buttons">
                            <Link to="/quote" className="btn btn-primary">
                                Request a Quote <Icons.FaArrowRight size={13} />
                            </Link>
                            <a href={hero.phoneUrl || "tel:+971554962866"} className="btn btn-secondary">
                                <Icons.FaPhoneAlt size={12} /> {hero.phoneText || "Call Us"}
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
                                    <Icons.FaBuilding />
                                </div>
                                <h3 className="card-title">{infoCard.title}</h3>
                                <div className="card-content-block">
                                    <h4>{infoCard.companyName}</h4>
                                    <p>{infoCard.address}</p>
                                    <p style={{ color: "var(--primary)" }}>{infoCard.country}</p>
 
                                    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                        <a href={`tel:${(infoCard.phone || "").replace(/\s+/g, "")}`} className="card-text-link">
                                            <Icons.FaPhoneAlt size={12} /> {infoCard.phone}
                                        </a>
                                        <a href={`mailto:${infoCard.email}`} className="card-text-link">
                                            <Icons.FaEnvelope size={12} /> {infoCard.email}
                                        </a>
                                        <a href={`https://${infoCard.website}`} target="_blank" rel="noopener noreferrer" className="card-text-link">
                                            <Icons.FaGlobe size={12} /> {infoCard.website}
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
                                    <Icons.FaClock />
                                </div>
                                <h3 className="card-title">{hoursCard.title}</h3>
                                <div className="card-content-block">
                                    <h4>{hoursCard.weekDaysTitle}</h4>
                                    <p style={{ fontSize: "1.1rem", color: "var(--primary)", fontWeight: 600 }}>{hoursCard.weekDaysHours}</p>
 
                                    <h4 style={{ color: "var(--gray)", marginTop: "1rem" }}>{hoursCard.sundayTitle}</h4>
                                    <p style={{ color: "#ff4a4a", fontWeight: 600 }}>{hoursCard.sundayHours}</p>
 
                                    <p style={{ fontSize: "0.85rem", color: "var(--gray)", fontStyle: "italic", marginTop: "auto" }}>
                                        {hoursCard.disclaimer}
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
                                    <Icons.FaMapMarkerAlt />
                                </div>
                                <h3 className="card-title">{mapCard.title}</h3>
 
                                {/* Google Maps Embed */}
                                <div className="map-wrapper">
                                    <iframe
                                        src={mapCard.embedUrl}
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
                        <h2>{quoteSection.title}</h2>
                        <p className="quote-info-text">
                            {quoteSection.lead}
                        </p>
 
                        <ul className="quote-list">
                            {servicesList.map((service, index) => (
                                <li className="quote-list-item" key={index}>
                                    <span className="quote-list-icon"><Icons.FaCheckCircle size={13} /></span>
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
                                                    {servicesList.map((service, sIdx) => (
                                                        <option key={sIdx} value={service}>{service}</option>
                                                    ))}
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
                                        <Icons.FaCheckCircle />
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
                    <span className="sub-tag">{bentoHeader.subTag}</span>
                    <h2>{bentoHeader.title}</h2>
                    <p>{bentoHeader.desc}</p>
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
                                    {getIcon(item.icon)}
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
                    <h2>{finalCta.title}</h2>
                    <p className="final-cta-text">
                        {finalCta.desc}
                    </p>
 
                    <div className="final-cta-tagline">
                        {finalCta.tagline}
                    </div>
 
                    <div className="final-cta-buttons">
                        <button onClick={scrollToForm} className="btn btn-primary">
                            Get a Quote <Icons.FaArrowRight size={13} />
                        </button>
                        <a href={finalCta.phoneUrl || "tel:+971554962866"} className="btn btn-secondary">
                            <Icons.FaPhoneAlt size={12} /> {finalCta.phoneText || "Call Now"}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
