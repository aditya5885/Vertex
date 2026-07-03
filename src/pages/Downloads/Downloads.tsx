import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaFilePdf, FaDownload, FaSearch, FaBuilding,
    FaBookOpen, FaFileAlt, FaListAlt, FaWrench, FaCertificate,
    FaCheckCircle, FaSyncAlt, FaLock, FaQuestionCircle
} from "react-icons/fa";
import "./Downloads.css";

// Document model definition
interface DocumentResource {
    title: string;
    category: string; // Match filter value: 'Brochures' | 'Datasheets' | 'Manuals' | 'Catalogues' | 'Certificates' | 'Company Documents'
    desc: string;
    size: string;
    updatedDate: string;
}

// Interactive 3D tilt card component
interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className, onClick, ...props }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Calculate mouse position relative to card center
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Calculate rotation angles (max 15 degrees tilt for extreme premium feel)
        const rX = -(mouseY / height) * 15;
        const rY = (mouseX / width) * 15;

        // Calculate dynamic spotlight glow position
        const glowX = ((e.clientX - rect.left) / width) * 100;
        const glowY = ((e.clientY - rect.top) / height) * 100;

        // High-performance direct DOM manipulation (0ms React re-render overhead)
        card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.zIndex = "10";
        card.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
        card.style.setProperty("--glow-x", `${glowX}%`);
        card.style.setProperty("--glow-y", `${glowY}%`);
        card.style.setProperty("--shadow-offset-x", `${-rY * 1.5}px`);
        card.style.setProperty("--shadow-offset-y", `${rX * 1.5}px`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;

        // Revert style properties in DOM to default CSS layout rules
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        card.style.setProperty("--glow-x", "50%");
        card.style.setProperty("--glow-y", "50%");
        card.style.setProperty("--shadow-offset-x", "0px");
        card.style.setProperty("--shadow-offset-y", "0px");
    };

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

const Downloads: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filterSectionRef = useRef<HTMLDivElement>(null);

    // List of Technical resources (12 standard B2B documents)
    const documents: DocumentResource[] = [
        {
            title: "Vertex Controls Corporate Profile",
            category: "Company Documents",
            desc: "Learn more about Vertex Controls, our expertise, industries served, capabilities and engineering solutions.",
            size: "4.8 MB",
            updatedDate: "May 2026"
        },
        {
            title: "Industrial Automation Brochure",
            category: "Brochures",
            desc: "Detailed overview of automation solutions, PLC logic programming, and custom SCADA interfaces.",
            size: "3.2 MB",
            updatedDate: "Jun 2026"
        },
        {
            title: "Type-Tested Control Panel Catalogue",
            category: "Catalogues",
            desc: "Technical specification sheets and dimensions for MDB, SMDB, capacitor bank, and control panels.",
            size: "12.5 MB",
            updatedDate: "Apr 2026"
        },
        {
            title: "PLC & SCADA Systems Solutions Guide",
            category: "Brochures",
            desc: "Detailed systems engineering guide explaining telemetry integrations, network protocols, and SCADA control layouts.",
            size: "6.7 MB",
            updatedDate: "Jun 2026"
        },
        {
            title: "Electrical & MEP Services Brochure",
            category: "Brochures",
            desc: "Our engineering capabilities for electrical installations, switchgear modifications, testing, and commissioning.",
            size: "2.9 MB",
            updatedDate: "May 2026"
        },
        {
            title: "AI-Driven Predictive Maintenance Overview",
            category: "Brochures",
            desc: "Introduction to smart industrial IoT telemetry sensors and cloud diagnostics to prevent machine downtime.",
            size: "1.8 MB",
            updatedDate: "Jun 2026"
        },
        {
            title: "Energy Management Solutions Datasheet",
            category: "Datasheets",
            desc: "Detailed specifications and data sheets for automatic capacitor banks, power factor controllers, and active filters.",
            size: "2.4 MB",
            updatedDate: "Mar 2026"
        },
        {
            title: "Industrial IoT Telemetry Solutions Datasheet",
            category: "Datasheets",
            desc: "Product specs for telemetry gateway units, wireless RTU nodes, cloud databases, and industrial sensors.",
            size: "3.5 MB",
            updatedDate: "Feb 2026"
        },
        {
            title: "Annual Maintenance Contracts (AMC) Services Catalogue",
            category: "Catalogues",
            desc: "Comprehensive catalogue of preventative service plans, SLA frameworks, and 24/7 technical on-call services.",
            size: "4.1 MB",
            updatedDate: "May 2026"
        },
        {
            title: "Smart Infrastructure & BMS Solutions Guide",
            category: "Brochures",
            desc: "Technical implementation guide for central SCADA, DALI lighting controllers, and integrated building automation systems.",
            size: "5.3 MB",
            updatedDate: "Apr 2026"
        },
        {
            title: "Vertex Controls Official Trade License",
            category: "Certificates",
            desc: "Official business license copy certified by the Dubai Department of Economy and Tourism (DET).",
            size: "1.2 MB",
            updatedDate: "Jan 2026"
        },
        {
            title: "VAT Registration Certificate",
            category: "Certificates",
            desc: "Official VAT tax registration certificate issued by the Federal Tax Authority (FTA) of the United Arab Emirates.",
            size: "0.85 MB",
            updatedDate: "Jan 2026"
        }
    ];

    // Resource categories cards definition
    const resourceCategories = [
        {
            index: "01",
            icon: FaBuilding,
            title: "Company Profile",
            desc: "Learn more about Vertex Controls, our expertise, industries served, capabilities and engineering solutions.",
            count: 1,
            targetFilter: "Company Documents"
        },
        {
            index: "02",
            icon: FaBookOpen,
            title: "Product Brochures",
            desc: "Overview brochures covering automation systems, electrical engineering, MEP services, smart infrastructure and industrial technologies.",
            count: 5,
            targetFilter: "Brochures"
        },
        {
            index: "03",
            icon: FaFileAlt,
            title: "Technical Datasheets",
            desc: "Detailed specifications, performance data and product information for control panels, PLC systems, MCC panels, energy monitoring systems and industrial equipment.",
            count: 2,
            targetFilter: "Datasheets"
        },
        {
            index: "04",
            icon: FaListAlt,
            title: "Catalogues",
            desc: "Comprehensive product catalogues with available engineering solutions, components and system configurations.",
            count: 2,
            targetFilter: "Catalogues"
        },
        {
            index: "05",
            icon: FaWrench,
            title: "Operation & Maintenance Manuals",
            desc: "Installation guides, user manuals, maintenance instructions and operational documentation.",
            count: 0,
            targetFilter: "Manuals"
        },
        {
            index: "06",
            icon: FaCertificate,
            title: "Certifications & Company Documents",
            desc: "Trade License, VAT Registration, Quality Certificates, Compliance Documents and other official company documentation.",
            count: 2,
            targetFilter: "Certificates"
        }
    ];

    // Why download features definition
    const whyFeatures = [
        {
            icon: FaCheckCircle,
            title: "Latest Technical Information",
            desc: "Get access to up-to-date specifications, drawing details and catalogs approved by our engineering leads."
        },
        {
            icon: FaCertificate,
            title: "Engineering Approved Documentation",
            desc: "All drawings, datasheets and guides conform to international electromechanical safety codes and UAE standards."
        },
        {
            icon: FaLock,
            title: "Easy PDF Downloads",
            desc: "One-click downloads. No subscription, no login gateways, just raw technical resources for engineering professionals."
        },
        {
            icon: FaSyncAlt,
            title: "Regularly Updated Resources",
            desc: "Our design team updates documentation frequently to align with component modifications, certification additions and software iterations."
        }
    ];

    // Filters categories mapping
    const filterCategories = [
        "All",
        "Brochures",
        "Datasheets",
        "Manuals",
        "Catalogues",
        "Certificates",
        "Company Documents"
    ];

    // Filter trigger when clicking category cards
    const handleCategoryCardClick = (targetFilter: string) => {
        setSelectedCategory(targetFilter);
        setSearchQuery(""); // Clear search query to show all documents in category
        setTimeout(() => {
            filterSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    // Filter document listings
    const filteredDocuments = documents.filter((doc) => {
        const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
        const matchesQuery =
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    const handleDownload = (docTitle: string) => {
        // Simulating PDF file download trigger
        alert(`Downloading Technical Document: ${docTitle}`);
    };

    return (
        <div className="downloads-page-wrapper">
            {/* 1. HERO SECTION */}
            <section className="downloads-hero">
                <div className="container">
                    <div className="downloads-hero-inner">
                        <div className="downloads-breadcrumb">
                            <Link to="/">Home</Link>
                            <span className="separator">/</span>
                            <span>Technical Resource Center</span>
                        </div>

                        <h1 className="downloads-hero-title">
                            Technical <span>Downloads</span>
                        </h1>

                        <p className="downloads-hero-subtitle">
                            Access our company profile, product brochures, technical datasheets, manuals, certifications, and engineering resources. Browse and download the latest documentation to support your projects.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. RESOURCE CATEGORIES */}
            <section className="categories-section">
                <div className="container">
                    <span className="section-tag">Resource Center</span>
                    <h2 className="section-title-main">Browse Categories</h2>

                    <div className="categories-grid">
                        {resourceCategories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                style={{ height: "100%" }}
                            >
                                <TiltCard
                                    className="category-card"
                                    onClick={() => handleCategoryCardClick(cat.targetFilter)}
                                >
                                    <span className="category-card-number">{cat.index}</span>
                                    <div className="category-icon-box">
                                        <cat.icon />
                                    </div>
                                    <h3>{cat.title}</h3>
                                    <p>{cat.desc}</p>
                                    <div className="category-card-footer">
                                        <span className="doc-count">{cat.count} {cat.count === 1 ? "document" : "documents"}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCategoryCardClick(cat.targetFilter);
                                            }}
                                            className="btn-view-downloads"
                                        >
                                            View Downloads <FaArrowRight size={11} />
                                        </button>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SEARCH & DYNAMIC FILTER BAR */}
            <div className="search-filter-wrapper" ref={filterSectionRef}>
                <div className="container">
                    <div className="sticky-bar-container">
                        <div className="search-input-box">
                            <FaSearch className="search-icon-svg" size={16} />
                            <input
                                type="text"
                                placeholder="Search Technical Documents (e.g. PLC, SCADA, Switchgear, VAT...)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="filter-tabs-container">
                            {filterCategories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    className={`filter-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat === "All" ? "All Documents" : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4. FEATURED DOWNLOADS LISTINGS */}
                    <span className="section-tag" style={{ marginBottom: "1rem", display: "block" }}>
                        Featured Documents
                    </span>
                    <h3 className="section-title-main" style={{ fontSize: "1.6rem", marginBottom: "2.5rem" }}>
                        {selectedCategory === "All" ? "All Resources" : selectedCategory} ({filteredDocuments.length})
                    </h3>

                    {filteredDocuments.length > 0 ? (
                        <div className="documents-grid">
                            {filteredDocuments.map((doc, idx) => (
                                <motion.div
                                    key={idx}
                                    className="doc-download-card"
                                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.08 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 90,
                                        damping: 14,
                                        delay: (idx % 2) * 0.15 + Math.floor(idx / 2) * 0.04
                                    }}
                                    style={{ transformOrigin: "top center" }}
                                >
                                    <div className="doc-pdf-icon-box">
                                        <FaFilePdf />
                                    </div>
                                    <div className="doc-info-block">
                                        <div className="doc-info-header">
                                            <h4>{doc.title}</h4>
                                        </div>
                                        <p className="doc-desc">{doc.desc}</p>
                                        <div className="doc-meta-footer">
                                            <div className="doc-spec-labels">
                                                <span className="doc-spec-pill">{doc.category}</span>
                                                <span className="doc-spec-pill">{doc.size}</span>
                                                <span className="doc-spec-pill pill-date">Updated: {doc.updatedDate}</span>
                                            </div>
                                            <button
                                                className="btn-doc-download"
                                                onClick={() => handleDownload(doc.title)}
                                                title="Download PDF"
                                            >
                                                <FaDownload size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="downloads-empty-state">
                            <FaQuestionCircle className="empty-icon" />
                            <h4>No Documents Found</h4>
                            <p>We couldn't find any technical document matching your search or category filter. Try clearing your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 5. WHY DOWNLOAD FROM VERTEX */}
            <section className="why-download-section">
                <div className="container">
                    <span className="section-tag" style={{ textAlign: "center" }}>Quality Assurance</span>
                    <h2 className="section-title-main" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        Why Download From Vertex
                    </h2>

                    <div className="why-grid">
                        {whyFeatures.map((feat, idx) => (
                            <motion.div
                                key={idx}
                                className="why-download-card"
                                initial={{ opacity: 0, y: 40, scale: 0.92, rotateX: 8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 80,
                                    damping: 15,
                                    delay: idx * 0.18
                                }}
                                style={{ transformOrigin: "bottom center" }}
                            >
                                <div className="why-icon-box">
                                    <feat.icon />
                                </div>
                                <h4>{feat.title}</h4>
                                <p>{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. NEED MORE INFORMATION (CTA BANNER) */}
            <section className="downloads-cta-section">
                <div className="container">
                    <motion.div
                        className="cta-banner-card"
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Can't find the document you're looking for?</h2>
                        <p>
                            Our engineering team can provide additional technical documentation, custom specifications and product information upon request.
                        </p>

                        <div className="cta-banner-buttons">
                            <Link to="/quote" className="btn btn-cta-blue">
                                Request Technical Information <FaArrowRight size={13} />
                            </Link>
                            <Link to="/contact" className="btn btn-cta-outline-white">
                                Contact Our Team
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Downloads;
