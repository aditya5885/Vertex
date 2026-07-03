import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
    FaPhoneAlt, FaArrowRight, FaCheckCircle, FaWhatsapp,
    FaCloudUploadAlt, FaTimes, FaSpinner, FaMapMarkerAlt,
    FaBuilding, FaUser, FaEnvelope, FaFileAlt, FaInfoCircle
} from "react-icons/fa";
import "./Quote.css";

interface QuoteFormFields {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    serviceRequired: string;
    projectLocation: string;
    projectDetails: string;
}

const Quote: React.FC = () => {
    const [formValues, setFormValues] = useState<QuoteFormFields>({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        serviceRequired: "",
        projectLocation: "",
        projectDetails: ""
    });

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const productParam = params.get("product");
        if (productParam) {
            let serviceValue = "";
            if (productParam.includes("PLC") || productParam.includes("SCADA")) {
                serviceValue = "PLC & SCADA Control Panels";
            } else if (productParam.includes("Switchgear") || productParam.includes("MDB")) {
                serviceValue = "LV Switchgears & MDBs";
            } else if (productParam.includes("BMS") || productParam.includes("Lighting")) {
                serviceValue = "Building Management Systems (BMS)";
            } else if (productParam.includes("IoT") || productParam.includes("Device") || productParam.includes("RTU")) {
                serviceValue = "Smart Infrastructure & IoT Telemetry";
            } else if (productParam.includes("Embedded") || productParam.includes("Electronic") || productParam.includes("Controller") || productParam.includes("R&D")) {
                serviceValue = "Other Engineering Support";
            } else {
                serviceValue = "Other Engineering Support";
            }

            setFormValues(prev => ({
                ...prev,
                serviceRequired: serviceValue || prev.serviceRequired,
                projectDetails: `Inquiry regarding: ${productParam}.\n`
            }));
        }
    }, [location]);

    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>("");
    const [formErrors, setFormErrors] = useState<Partial<QuoteFormFields>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [dragActive, setDragActive] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        if (formErrors[name as keyof QuoteFormFields]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const allowedExtensions = ["pdf", "dwg", "docx", "jpg", "jpeg", "png"];
    const maxFileSize = 15 * 1024 * 1024; // 15MB

    const validateFile = (selectedFile: File): boolean => {
        const extension = selectedFile.name.split(".").pop()?.toLowerCase() || "";
        if (!allowedExtensions.includes(extension)) {
            setFileError("Invalid file type. Supported files: PDF, DWG, DOCX, JPG");
            return false;
        }
        if (selectedFile.size > maxFileSize) {
            setFileError("File is too large. Maximum size is 15MB");
            return false;
        }
        setFileError("");
        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
            }
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeFile = () => {
        setFile(null);
        setFileError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const validateForm = (): boolean => {
        const errors: Partial<QuoteFormFields> = {};

        if (!formValues.companyName.trim()) {
            errors.companyName = "Company name is required";
        }
        if (!formValues.contactPerson.trim()) {
            errors.contactPerson = "Contact person is required";
        }
        if (!formValues.email.trim()) {
            errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!formValues.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\+?[0-9\s-]{7,15}$/.test(formValues.phone.replace(/\s+/g, ""))) {
            errors.phone = "Please enter a valid phone number";
        }
        if (!formValues.serviceRequired) {
            errors.serviceRequired = "Please select a service";
        }
        if (!formValues.projectLocation.trim()) {
            errors.projectLocation = "Project location is required";
        }
        if (!formValues.projectDetails.trim()) {
            errors.projectDetails = "Project details are required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                console.log("Quote request submitted successfully:", { ...formValues, file });
            }, 2000);
        }
    };

    const resetForm = () => {
        setFormValues({
            companyName: "",
            contactPerson: "",
            email: "",
            phone: "",
            serviceRequired: "",
            projectLocation: "",
            projectDetails: ""
        });
        setFile(null);
        setFileError("");
        setFormErrors({});
        setIsSubmitted(false);
    };

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const fadeInUp: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const features = [
        {
            title: "Free Technical Consultation",
            desc: "Our senior design engineers review your specifications to propose optimized control schemes."
        },
        {
            title: "Fast Response",
            desc: "We prioritize B2B commercial requests, delivering customized technical proposals in 24–48 hours."
        },
        {
            title: "Experienced Engineering Team",
            desc: "Turnkey integration capability led by qualified engineers with deep industrial PLC/SCADA expertise."
        },
        {
            title: "UAE Wide Support",
            desc: "From testing and assembly to rapid SLA deployment, we cover Dubai, Abu Dhabi, and Northern Emirates."
        }
    ];

    return (
        <div className="quote-page-wrapper">
            {/* Header / Hero Section */}
            <section className="quote-hero">
                <div className="container">
                    <motion.div
                        className="quote-hero-inner"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="quote-breadcrumb">
                            <Link to="/">Home</Link>
                            <span className="separator">/</span>
                            <span>Request a Quote</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="quote-hero-title">
                            Request a <span className="highlight">Quote</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="quote-hero-subtitle">
                            Tell us about your project and our engineering team will prepare a tailored quotation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Layout Section */}
            <section className="quote-content-section">
                <div className="container quote-grid-layout">
                    {/* Left Column: Info Card */}
                    <motion.div
                        className="quote-info-col"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="info-card">
                            <h3 className="info-card-title">Vertex Controls Advantage</h3>
                            <p className="info-card-lead">
                                Partner with a certified electromechanical systems integrator in the UAE.
                            </p>

                            <div className="info-features-list">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="info-feature-item">
                                        <div className="feature-icon-wrapper">
                                            <FaCheckCircle className="check-icon" />
                                        </div>
                                        <div className="feature-text">
                                            <h4>{feature.title}</h4>
                                            <p>{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="info-card-footer">
                                <p className="contact-label">Talk to an Engineer directly</p>
                                <a href="tel:+971554962866" className="phone-link">
                                    <FaPhoneAlt size={14} /> +971 55 496 2866
                                </a>
                                <a
                                    href="https://wa.me/971554962866"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="whatsapp-btn-link"
                                >
                                    <FaWhatsapp size={18} /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Enquiry Form */}
                    <motion.div
                        className="quote-form-col"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="form-card">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.div
                                        key="form-container"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="form-title">Quote Enquiry Form</h3>
                                        <form onSubmit={handleSubmit} className="quote-form" noValidate>
                                            <div className="form-row-two">
                                                {/* Company Name */}
                                                <div className="form-group">
                                                    <label htmlFor="companyName">
                                                        <FaBuilding className="input-icon" /> Company Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="companyName"
                                                        name="companyName"
                                                        value={formValues.companyName}
                                                        onChange={handleInputChange}
                                                        className={formErrors.companyName ? "input-error" : ""}
                                                        placeholder="e.g. Vertex Controls LLC"
                                                    />
                                                    {formErrors.companyName && (
                                                        <span className="error-text">{formErrors.companyName}</span>
                                                    )}
                                                </div>

                                                {/* Contact Person */}
                                                <div className="form-group">
                                                    <label htmlFor="contactPerson">
                                                        <FaUser className="input-icon" /> Contact Person *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="contactPerson"
                                                        name="contactPerson"
                                                        value={formValues.contactPerson}
                                                        onChange={handleInputChange}
                                                        className={formErrors.contactPerson ? "input-error" : ""}
                                                        placeholder="e.g. John Doe"
                                                    />
                                                    {formErrors.contactPerson && (
                                                        <span className="error-text">{formErrors.contactPerson}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="form-row-two">
                                                {/* Email Address */}
                                                <div className="form-group">
                                                    <label htmlFor="email">
                                                        <FaEnvelope className="input-icon" /> Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formValues.email}
                                                        onChange={handleInputChange}
                                                        className={formErrors.email ? "input-error" : ""}
                                                        placeholder="john.doe@company.com"
                                                    />
                                                    {formErrors.email && (
                                                        <span className="error-text">{formErrors.email}</span>
                                                    )}
                                                </div>

                                                {/* Phone Number */}
                                                <div className="form-group">
                                                    <label htmlFor="phone">
                                                        <FaPhoneAlt className="input-icon" /> Phone Number *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formValues.phone}
                                                        onChange={handleInputChange}
                                                        className={formErrors.phone ? "input-error" : ""}
                                                        placeholder="e.g. +971 50 123 4567"
                                                    />
                                                    {formErrors.phone && (
                                                        <span className="error-text">{formErrors.phone}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="form-row-two">
                                                {/* Service Required */}
                                                <div className="form-group">
                                                    <label htmlFor="serviceRequired">
                                                        <FaInfoCircle className="input-icon" /> Service Required *
                                                    </label>
                                                    <select
                                                        id="serviceRequired"
                                                        name="serviceRequired"
                                                        value={formValues.serviceRequired}
                                                        onChange={handleInputChange}
                                                        className={formErrors.serviceRequired ? "input-error" : ""}
                                                    >
                                                        <option value="" disabled>Select a service</option>
                                                        <option value="PLC & SCADA Control Panels">PLC & SCADA Control Panels</option>
                                                        <option value="LV Switchgears & MDBs">LV Switchgears & MDBs</option>
                                                        <option value="Building Management Systems (BMS)">Building Management Systems (BMS)</option>
                                                        <option value="Electrical Engineering Services">Electrical Engineering Services</option>
                                                        <option value="Mechanical & MEP Solutions">Mechanical & MEP Solutions</option>
                                                        <option value="Industrial Automation Integration">Industrial Automation Integration</option>
                                                        <option value="Smart Infrastructure & IoT Telemetry">Smart Infrastructure & IoT Telemetry</option>
                                                        <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                                                        <option value="Other Engineering Support">Other Engineering Support</option>
                                                    </select>
                                                    {formErrors.serviceRequired && (
                                                        <span className="error-text">{formErrors.serviceRequired}</span>
                                                    )}
                                                </div>

                                                {/* Project Location */}
                                                <div className="form-group">
                                                    <label htmlFor="projectLocation">
                                                        <FaMapMarkerAlt className="input-icon" /> Project Location *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="projectLocation"
                                                        name="projectLocation"
                                                        value={formValues.projectLocation}
                                                        onChange={handleInputChange}
                                                        className={formErrors.projectLocation ? "input-error" : ""}
                                                        placeholder="e.g. Jebel Ali, Dubai"
                                                    />
                                                    {formErrors.projectLocation && (
                                                        <span className="error-text">{formErrors.projectLocation}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Project Details */}
                                            <div className="form-group">
                                                <label htmlFor="projectDetails">Project Details *</label>
                                                <textarea
                                                    id="projectDetails"
                                                    name="projectDetails"
                                                    value={formValues.projectDetails}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className={formErrors.projectDetails ? "input-error" : ""}
                                                    placeholder="Please describe your project requirements, control specs, IO list, panel types, schedules, or commissioning needs..."
                                                />
                                                {formErrors.projectDetails && (
                                                    <span className="error-text">{formErrors.projectDetails}</span>
                                                )}
                                            </div>

                                            {/* File Upload */}
                                            <div className="form-group">
                                                <label>Attachments (Drawings, RFQs, IO Lists)</label>
                                                <div
                                                    className={`file-dropzone ${dragActive ? "drag-active" : ""} ${file ? "has-file" : ""}`}
                                                    onDragEnter={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDrop={handleDrop}
                                                    onClick={triggerFileInput}
                                                >
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.dwg,.docx,.jpg,.jpeg,.png"
                                                        style={{ display: "none" }}
                                                    />

                                                    {!file ? (
                                                        <div className="dropzone-placeholder">
                                                            <FaCloudUploadAlt className="upload-icon" />
                                                            <p className="upload-text">
                                                                Drag & drop your files here or <span>browse</span>
                                                            </p>
                                                            <p className="upload-tip">
                                                                Accepts PDF, DWG, DOCX, JPG (Max: 15MB)
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="dropzone-file-preview" onClick={(e) => e.stopPropagation()}>
                                                            <div className="file-info-container">
                                                                <FaFileAlt className="file-icon" />
                                                                <div className="file-details">
                                                                    <span className="file-name">{file.name}</span>
                                                                    <span className="file-size">{formatBytes(file.size)}</span>
                                                                </div>
                                                            </div>
                                                            <button type="button" className="btn-remove-file" onClick={removeFile}>
                                                                <FaTimes size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                {fileError && <span className="error-text file-error">{fileError}</span>}
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="btn btn-quote-submit"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <FaSpinner className="spinner-icon animate-spin" /> Submitting Request...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Quote Request <FaArrowRight size={14} />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success-overlay"
                                        className="quote-success-state"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="success-badge-container">
                                            <FaCheckCircle />
                                        </div>
                                        <h3 className="success-title">Quote Request Received</h3>
                                        <p className="success-desc">
                                            Thank you for contacting Vertex Controls. Your enquiry regarding <strong>{formValues.serviceRequired}</strong> has been logged. Our engineering estimation team will review your specifications and get back to you with a detailed technical/commercial proposal.
                                        </p>
                                        <div className="success-receipt-details">
                                            <p><strong>Enquiry Reference:</strong> VTX-RFQ-{Math.floor(100000 + Math.random() * 900000)}</p>
                                            <p><strong>Contact Person:</strong> {formValues.contactPerson}</p>
                                            <p><strong>Company:</strong> {formValues.companyName}</p>
                                        </div>
                                        <button onClick={resetForm} className="btn btn-quote-reset">
                                            Submit Another Enquiry
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Quote;
