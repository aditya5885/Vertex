import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { useContent } from "../../context/ContentContext";
import "./Products.css";

const ProductVisual: React.FC<{ name: string; fallbackImage: string }> = ({ name, fallbackImage }) => {
    if (name === "Energy Monitoring Systems") {
        return (
            <div className="tech-visual-card energy-monitoring-visual">
                <div className="grid-overlay"></div>
                <div className="pulse-wave-container">
                    <svg viewBox="0 0 300 150" className="sine-wave-svg">
                        <path d="M 0,75 C 30,30 60,120 90,75 C 120,30 150,120 180,75 C 210,30 240,120 270,75 L 300,75" fill="none" stroke="var(--prod-highlight-green)" strokeWidth="3" className="animated-path" />
                    </svg>
                </div>
                <div className="telemetry-hud">
                    <div className="hud-metric">
                        <span className="hud-lbl">SYS LOAD</span>
                        <span className="hud-val text-green">98.4%</span>
                    </div>
                    <div className="hud-metric">
                        <span className="hud-lbl">PF STATUS</span>
                        <span className="hud-val text-blue">0.99 PF</span>
                    </div>
                    <div className="hud-metric">
                        <span className="hud-lbl">FREQ</span>
                        <span className="hud-val text-cyan">50.02 Hz</span>
                    </div>
                </div>
                <div className="hud-status">
                    <span className="status-dot green"></span>
                    <span className="status-text">POWER QUALITY STABLE</span>
                </div>
            </div>
        );
    }
    
    if (name === "Customized Electronic Controllers") {
        return (
            <div className="tech-visual-card pcb-visual">
                <div className="grid-overlay pcb-grid"></div>
                <div className="pcb-tracks">
                    <div className="track track-1"></div>
                    <div className="track track-2"></div>
                    <div className="track track-3"></div>
                </div>
                <div className="pcb-mcu">
                    <div className="mcu-pins"></div>
                    <div className="mcu-core">
                        <span>VERTEX</span>
                        <span className="mcu-sub">CORE-V1</span>
                    </div>
                </div>
                <div className="pcb-leds">
                    <span className="led led-red pulsing"></span>
                    <span className="led led-green pulsing"></span>
                    <span className="led led-blue pulsing"></span>
                </div>
                <div className="hud-status">
                    <span className="status-dot blue"></span>
                    <span className="status-text">PCB INTERFACES ACTIVE</span>
                </div>
            </div>
        );
    }

    if (name === "Embedded Systems") {
        return (
            <div className="tech-visual-card embedded-visual">
                <div className="grid-overlay"></div>
                <div className="logic-diagram">
                    <div className="logic-gate gate-and">
                        <span className="gate-name">AND</span>
                        <div className="gate-ports-in">
                            <span className="port pin-active"></span>
                            <span className="port pin-active"></span>
                        </div>
                        <span className="gate-port-out pin-active"></span>
                    </div>
                    <div className="logic-flow-arrow"></div>
                    <div className="logic-gate gate-or">
                        <span className="gate-name">OR</span>
                        <div className="gate-ports-in">
                            <span className="port pin-active"></span>
                            <span className="port"></span>
                        </div>
                        <span className="gate-port-out pin-active"></span>
                    </div>
                </div>
                <div className="hud-status">
                    <span className="status-dot green"></span>
                    <span className="status-text">LOGIC CONTROLLER RUNNING</span>
                </div>
            </div>
        );
    }

    if (name === "Industrial IoT Devices") {
        return (
            <div className="tech-visual-card iot-visual">
                <div className="grid-overlay"></div>
                <div className="iot-antenna-container">
                    <div className="antenna">
                        <div className="antenna-rod"></div>
                        <div className="antenna-tip"></div>
                    </div>
                    <div className="wave wave-1"></div>
                    <div className="wave wave-2"></div>
                    <div className="wave wave-3"></div>
                </div>
                <div className="iot-network-hud">
                    <div className="net-stat">
                        <span className="net-lbl">CELLULAR</span>
                        <span className="net-val">LTE / 4G</span>
                    </div>
                    <div className="net-stat">
                        <span className="net-lbl">MQTT PORT</span>
                        <span className="net-val">1883</span>
                    </div>
                    <div className="net-stat">
                        <span className="net-lbl">DATAPACKETS</span>
                        <span className="net-val txt-green">TX/RX OK</span>
                    </div>
                </div>
                <div className="hud-status">
                    <span className="status-dot green"></span>
                    <span className="status-text">GATEWAY ONLINE</span>
                </div>
            </div>
        );
    }

    if (name === "CCTV & Access Control Systems") {
        return (
            <div className="tech-visual-card security-visual">
                <div className="grid-overlay security-grid"></div>
                <div className="scanner-frame">
                    <div className="scanner-line"></div>
                    <div className="scanner-aperture">
                        <div className="aperture-lens"></div>
                        <div className="rec-indicator">
                            <span className="rec-dot"></span>
                            <span>REC</span>
                        </div>
                    </div>
                </div>
                <div className="security-status-bar">
                    <div className="sec-stat">
                        <span className="sec-lbl">IP-CAM IP</span>
                        <span className="sec-val">192.168.10.45</span>
                    </div>
                    <div className="sec-stat">
                        <span className="sec-lbl">BIOMETRIC</span>
                        <span className="sec-val text-green">SECURE</span>
                    </div>
                </div>
                <div className="hud-status">
                    <span className="status-dot red"></span>
                    <span className="status-text">NVR STREAM ONLINE</span>
                </div>
            </div>
        );
    }

    if (name === "Research & Development Solutions") {
        return (
            <div className="tech-visual-card rnd-visual">
                <div className="grid-overlay"></div>
                <div className="rnd-graph-container">
                    <svg viewBox="0 0 300 150" className="rnd-graph-svg">
                        <path d="M 0,100 L 50,100 L 50,50 L 100,50 L 100,100 L 150,100 L 150,30 L 200,30 L 200,100 L 250,100 L 250,50 L 300,50" fill="none" stroke="var(--prod-accent-blue)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="animated-rnd-path" />
                    </svg>
                </div>
                <div className="rnd-hud">
                    <div className="rnd-metric">
                        <span className="hud-lbl">SIMULATOR</span>
                        <span className="hud-val">HIL ACTIVE</span>
                    </div>
                    <div className="rnd-metric">
                        <span className="hud-lbl">TESTING BED</span>
                        <span className="hud-val text-green">PASS</span>
                    </div>
                </div>
                <div className="hud-status">
                    <span className="status-dot green"></span>
                    <span className="status-text">VALIDATION ENGINE STABLE</span>
                </div>
            </div>
        );
    }

    return <img src={fallbackImage} alt={name} />;
};

const Products: React.FC = () => {
    const { content } = useContent();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [activeWhyIdx, setActiveWhyIdx] = useState<number>(0);
    const [activeIndIdx, setActiveIndIdx] = useState<number>(0);

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const tabContainerRef = useRef<HTMLDivElement>(null);

    const productsData = content.products || {
        hero: { title: "Products", lead: "" },
        categories: [],
        productList: [],
        featuredProduct: { title: "", image: "", overview: "", applications: [], specs: [] },
        whyChooseList: [],
        industries: [],
        customSolution: { title: "", desc: "" },
        footerCta: { title: "", desc: "" }
    };

    const hero = productsData.hero;
    const categories = productsData.categories || [];
    const productList = productsData.productList || [];
    const featuredProduct = productsData.featuredProduct || {
        title: "",
        image: "",
        overview: "",
        applications: [],
        specs: []
    };
    const whyChooseList = productsData.whyChooseList || [];
    const industries = productsData.industries || [];
    const customSolution = productsData.customSolution || { title: "", desc: "" };
    const footerCta = productsData.footerCta || { title: "", desc: "" };

    // Safety checks for selected indexes
    const activeWhy = whyChooseList[activeWhyIdx] || whyChooseList[0];
    const activeInd = industries[activeIndIdx] || industries[0];

    // Filter product grid items
    const filteredProducts = productList.filter((prod) => {
        return selectedCategory === "All" || prod.category === selectedCategory;
    });

    // Scroll handling for categories tabs
    const scrollTabs = (direction: "left" | "right") => {
        if (tabContainerRef.current) {
            const scrollAmount = 240; // amount to scroll in px
            tabContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    const checkScroll = () => {
        if (tabContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tabContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            // Allow 2px tolerance for float subpixel layouts
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    useEffect(() => {
        const container = tabContainerRef.current;
        if (container) {
            checkScroll();
            container.addEventListener("scroll", checkScroll, { passive: true });
            window.addEventListener("resize", checkScroll, { passive: true });

            // Fire checkScroll after a small delay to handle layout updates
            const timer = setTimeout(checkScroll, 150);

            return () => {
                container.removeEventListener("scroll", checkScroll);
                window.removeEventListener("resize", checkScroll);
                clearTimeout(timer);
            };
        }
    }, [categories]);

    const handleDownloadDatasheet = (productName: string) => {
        alert(`Downloading Technical Datasheet for: ${productName}`);
    };

    // Helper function to resolve dynamic font awesome icons by name
    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName];
        return IconComponent ? React.createElement(IconComponent) : <Icons.FaQuestionCircle />;
    };

    return (
        <div className="products-page-wrapper">
            {/* 1. HERO SECTION */}
            <section className="products-hero">
                <div className="container">
                    <div className="products-hero-inner">
                        <div className="products-breadcrumb">
                            <Link to="/">Home</Link>
                            <span className="separator">/</span>
                            <span>Products</span>
                        </div>

                        <h1 className="products-hero-title">{hero.title}</h1>

                        <p className="products-hero-subtitle">
                            {hero.lead}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. CATEGORY NAVIGATION TABS */}
            <section className="products-nav-section">
                <div className="container">
                    <div className={`products-tabs-outer-wrap ${showLeftArrow ? "has-left-scroll" : ""} ${showRightArrow ? "has-right-scroll" : ""}`}>
                        <button 
                            className={`products-tab-arrow-btn left ${showLeftArrow ? "" : "hidden-arrow"}`}
                            onClick={() => scrollTabs("left")}
                            aria-label="Scroll categories left"
                        >
                            <Icons.FaChevronLeft size={14} />
                        </button>
                        
                        <div className="products-tab-container" ref={tabContainerRef}>
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    className={`products-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat === "All" ? "All Products" : cat}
                                </button>
                            ))}
                        </div>

                        <button 
                            className={`products-tab-arrow-btn right ${showRightArrow ? "" : "hidden-arrow"}`}
                            onClick={() => scrollTabs("right")}
                            aria-label="Scroll categories right"
                        >
                            <Icons.FaChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. PRODUCTS GRID */}
            <section className="products-grid-section">
                <div className="container">
                    <div className="products-grid">
                        {filteredProducts.map((prod, idx) => (
                            <div key={idx} className="product-card">
                                <div className="product-card-image-box">
                                    <ProductVisual name={prod.name} fallbackImage={prod.image} />
                                </div>
                                <div className="product-card-content">
                                    <span className="product-card-category">{prod.category}</span>
                                    <h3 className="product-card-title">{prod.name}</h3>
                                    <p className="product-card-desc">{prod.desc}</p>
                                    
                                    <ul className="product-card-features-list">
                                        {(prod.features || []).map((feat, fidx) => (
                                            <li key={fidx}>
                                                <Icons.FaCheckCircle className="feature-bullet-icon" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="product-card-buttons">
                                        <button
                                            className="btn-card-datasheet"
                                            onClick={() => handleDownloadDatasheet(prod.name)}
                                        >
                                            Technical Datasheet
                                        </button>
                                        <Link
                                            to={`/quote?product=${encodeURIComponent(prod.name)}`}
                                            className="btn-card-quote"
                                        >
                                            Request Quote
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FEATURED PRODUCT SECTION (WIDESCREEN DETAIL) */}
            <section className="featured-product-section">
                <div className="container">
                    <div className="featured-product-card">
                        <div className="featured-product-image-box">
                            <img src={featuredProduct.image} alt={featuredProduct.title} />
                        </div>
                        <div className="featured-product-details">
                            <span className="featured-label">Featured Product</span>
                            <h2 className="featured-title">{featuredProduct.title}</h2>
                            <p className="featured-overview">
                                {featuredProduct.overview}
                            </p>

                            <h4 className="featured-sub-title">Applications</h4>
                            <ul className="featured-specs-list" style={{ marginBottom: "2rem" }}>
                                {(featuredProduct.applications || []).map((app, idx) => (
                                    <li key={idx}>
                                        <Icons.FaAngleRight className="feature-bullet-icon" style={{ color: "var(--prod-accent-blue)" }} />
                                        <span>{app}</span>
                                    </li>
                                ))}
                            </ul>

                            <h4 className="featured-sub-title">Technical Specifications</h4>
                            <div className="featured-specs-table-container">
                                <table className="specs-table">
                                    <tbody>
                                        {(featuredProduct.specs || []).map((spec, idx) => (
                                            <tr key={idx}>
                                                <td className="spec-name">{spec.name}</td>
                                                <td>{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="featured-buttons">
                                <button
                                    onClick={() => handleDownloadDatasheet(featuredProduct.title)}
                                    className="btn-featured-download"
                                >
                                    <Icons.FaFilePdf /> Download Datasheet
                                </button>
                                <Link
                                    to={`/quote?product=${encodeURIComponent(featuredProduct.title)}`}
                                    className="btn-featured-quote"
                                >
                                    Request Quote <Icons.FaArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. WHY CHOOSE OUR PRODUCTS (INTERACTIVE OPERATIONS DESK) */}
            <section className="why-choose-section">
                <div className="container">
                    <span className="section-tag" style={{ textAlign: "center" }}>Quality Standards</span>
                    <h2 className="section-title-main" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        Why Choose Our Products
                    </h2>

                    <div className="why-interactive-deck">
                        {/* Selector links */}
                        <div className="why-interactive-menu">
                            {whyChooseList.map((feat, idx) => (
                                <button
                                    key={idx}
                                    className={`why-menu-btn ${activeWhyIdx === idx ? "active" : ""}`}
                                    onClick={() => setActiveWhyIdx(idx)}
                                >
                                    <span className="why-menu-num">0{idx + 1}</span>
                                    <span className="why-menu-title">{feat.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* Details Pane */}
                        {activeWhy && (
                            <div className="why-interactive-pane">
                                <div className="pane-header">
                                    <span className="pane-compliance-tag">{activeWhy.compliance}</span>
                                    <div className="pane-icon-circle">
                                        {getIcon(activeWhy.icon)}
                                    </div>
                                </div>
                                
                                <h3 className="pane-heading">{activeWhy.title}</h3>
                                <p className="pane-paragraph">{activeWhy.desc}</p>
                                
                                <div className="pane-testing-bar">
                                    <div className="testing-bar-label">
                                        <span>FACTORY QUALITY RATING</span>
                                        <span>{activeWhy.percentage}% QUALITY LEVEL</span>
                                    </div>
                                    <div className="testing-bar-track">
                                        <div className="testing-bar-fill" style={{ width: `${activeWhy.percentage}%` }}></div>
                                    </div>
                                </div>

                                <ul className="pane-spec-bullets">
                                    {(activeWhy.bullets || []).map((bullet, bIdx) => (
                                        <li key={bIdx}>
                                            <Icons.FaCheckCircle className="pane-bullet-check" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 6. INDUSTRIES SERVED (INTERACTIVE TELEMETRY DIAL) */}
            <section className="industries-served-section">
                <div className="container">
                    <span className="section-tag" style={{ textAlign: "center" }}>Markets & Verticals</span>
                    <h2 className="section-title-main" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        Industries Served
                    </h2>

                    <div className="industries-interactive-deck">
                        {/* Selector grid */}
                        <div className="industries-grid-selector">
                            {industries.map((ind, idx) => (
                                <button
                                    key={idx}
                                    className={`industry-node-btn ${activeIndIdx === idx ? "active" : ""}`}
                                    onClick={() => setActiveIndIdx(idx)}
                                >
                                    <div className="industry-node-icon">
                                        {getIcon(ind.icon)}
                                    </div>
                                    <span className="industry-node-name">{ind.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Telemetry Pane */}
                        {activeInd && (
                            <div className="industries-telemetry-pane">
                                <div className="telemetry-screen-hdr">
                                    <span className="telemetry-screen-code">VERTEX CERTIFIED SOLUTIONS</span>
                                    <span className="telemetry-live-dot"></span>
                                </div>

                                <div className="telemetry-screen-body">
                                    <span className="telemetry-sub">MARKET SECTOR // 0{activeIndIdx + 1}</span>
                                    <h3 className="telemetry-title">{activeInd.name}</h3>
                                    <p className="telemetry-desc">{activeInd.desc}</p>
                                    
                                    <div className="telemetry-systems-block">
                                        <strong className="telemetry-block-label">Key Systems & Applications</strong>
                                        <div className="telemetry-systems-tag">{activeInd.systems}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 7. NEED A CUSTOM SOLUTION */}
            <section className="custom-solution-cta">
                <div className="container">
                    <div className="custom-cta-card">
                        <h2>{customSolution.title}</h2>
                        <p>{customSolution.desc}</p>

                        <div className="custom-cta-buttons">
                            <Link to="/quote" className="btn btn-cta-blue">
                                Request a Quote <Icons.FaArrowRight size={13} />
                            </Link>
                            <Link to="/contact" className="btn btn-cta-outline-white">
                                Contact Engineering Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FOOTER CTA */}
            <section className="products-footer-cta">
                <div className="container footer-cta-container">
                    <div className="footer-cta-text">
                        <h3>{footerCta.title}</h3>
                        <p>{footerCta.desc}</p>
                    </div>

                    <div className="footer-cta-buttons">
                        <Link to="/downloads" className="btn-footer-outline">
                            Download Datasheets
                        </Link>
                        <Link to="/contact" className="btn-footer-outline">
                            Request Technical Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
