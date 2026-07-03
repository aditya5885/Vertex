import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaArrowRight, FaCheckCircle, FaFilePdf, FaIndustry, FaTint,
    FaBolt, FaBuilding, FaRoad, FaGasPump, FaLandmark, FaPowerOff,
    FaCogs, FaTools, FaAngleRight
} from "react-icons/fa";
import "./Products.css";

interface ProductItem {
    name: string;
    category: string;
    desc: string;
    image: string;
    features: string[];
}

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [activeWhyIdx, setActiveWhyIdx] = useState<number>(0);
    const [activeIndIdx, setActiveIndIdx] = useState<number>(0);

    // Comprehensive list of 12 engineering products
    const productList: ProductItem[] = [
        {
            name: "Motor Control Centers (MCC)",
            category: "Control Panels",
            desc: "Type-tested smart MCC panels designed for ventilation, HVAC, pumping stations, and heavy industrial motor systems.",
            image: "/Images/Project/mcc_showcase.webp",
            features: [
                "VFD & Soft Starter integration",
                "Modbus, Profibus & Ethernet telemetry",
                "IEC 61439 compliant Form 4 segregation"
            ]
        },
        {
            name: "Control Panels",
            category: "Control Panels",
            desc: "Custom low voltage (LV) panels, switchgears, SMDBs, and main distribution boards built for heavy infrastructure applications.",
            image: "/Images/Products/08d07495-ea3a-4a50-8291-b81c2c99f4a9.webp",
            features: [
                "Type-tested components and assemblies",
                "ASTA certified copper busbar designs",
                "Schneider Electric / ABB / Siemens components"
            ]
        },
        {
            name: "PLC Control Panels",
            category: "Automation Systems",
            desc: "High-performance PLC cabinets integrated with human-machine interfaces (HMI) for real-time process automation.",
            image: "/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp",
            features: [
                "Siemens S7 / Rockwell Allen-Bradley PLCs",
                "Custom I/O layout schematics",
                "Pre-commissioned & factory accepted (FAT)"
            ]
        },
        {
            name: "SCADA Systems",
            category: "Automation Systems",
            desc: "Bespoke supervisor control dashboards, telemetry visualization interfaces, and SQL plant database logs.",
            image: "/Images/Project/scada_showcase.webp",
            features: [
                "Real-time animated plant graphics",
                "Automated alarm email / SMS notifications",
                "Redundant server-client SCADA platforms"
            ]
        },
        {
            name: "Energy Monitoring Systems",
            category: "Energy Management",
            desc: "Power monitoring systems, automatic power quality analysis tools, and smart energy meter gateways.",
            image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp",
            features: [
                "Capacitor bank automatic stage switching",
                "Active harmonic filter integrations",
                "ISO 50001 compliance reporting metrics"
            ]
        },
        {
            name: "Smart Lighting Controllers",
            category: "Smart Infrastructure",
            desc: "Central lighting panels using DALI, KNX, and BACnet protocols for building automation and smart grids.",
            image: "/Images/Project/lighting_showcase.webp",
            features: [
                "Daylight harvesting logic protocols",
                "Astronomic schedule based controls",
                "BMS interface dashboard compatibility"
            ]
        },
        {
            name: "CCTV & Access Control Systems",
            category: "Security Systems",
            desc: "IP-CCTV surveillance cabinets, door controllers, and biometric panels for plant security integrations.",
            image: "/Images/Project/57045811-01db-4a79-8406-f8398676e32e.webp",
            features: [
                "High-definition IP NVR setups",
                "Biometric, RFID and license plate scanning",
                "Central security control room configurations"
            ]
        },
        {
            name: "Industrial IoT Devices",
            category: "Industrial IoT",
            desc: "Smart cellular gateway modems, cloud transmitter units, and battery-powered field telemetry hardware.",
            image: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp",
            features: [
                "LTE/4G cellular fallback arrays",
                "Ultra-low power sleep states",
                "MQTT, Modbus TCP & REST API transfers"
            ]
        },
        {
            name: "Remote Terminal Units (RTU)",
            category: "Industrial IoT",
            desc: "Robust field RTU panels deployed in pipelines, municipal water reservoirs, and electrical substations.",
            image: "/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.webp",
            features: [
                "DNP3 & IEC 60870-5-104 telemetry",
                "Hardened chassis for harsh temperatures",
                "Digital and analog loop diagnostic tools"
            ]
        },
        {
            name: "Embedded Systems",
            category: "Embedded Systems",
            desc: "Microcontroller based custom logic controller boards for specialized machinery automation tasks.",
            image: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp",
            features: [
                "Bespoke firmware logic development",
                "Galvanically isolated I/O interfaces",
                "Compact DIN rail mount dimensions"
            ]
        },
        {
            name: "Customized Electronic Controllers",
            category: "R&D Solutions",
            desc: "Custom electronic logic and PCB solutions designed for specialized electromechanical process controls.",
            image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp",
            features: [
                "Custom schematic and multi-layer PCB design",
                "Prototyping and environmental stress tests",
                "High noise immunity industrial components"
            ]
        },
        {
            name: "Research & Development Solutions",
            category: "R&D Solutions",
            desc: "Custom automated simulator rigs, validation testing panels, and control testing beds.",
            image: "/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp",
            features: [
                "Hardware-in-the-loop (HIL) simulators",
                "Custom testing instrumentation mounts",
                "Comprehensive validation engineering data"
            ]
        }
    ];

    // Categories tab mapping
    const categories = [
        "All",
        "Control Panels",
        "Automation Systems",
        "Energy Management",
        "Smart Infrastructure",
        "Security Systems",
        "Industrial IoT",
        "Embedded Systems",
        "R&D Solutions"
    ];

    // Why Choose Features list
    const whyChooseList = [
        {
            icon: FaIndustry,
            title: "Engineered for Industrial Applications",
            desc: "Designed to operate reliably in high ambient temperatures, dusty conditions, and electromagnetic environments.",
            compliance: "IEC 61439 compliant panels",
            percentage: 100,
            bullets: [
                "IP65 enclosure ingress protection testing",
                "High-grade ventilation and cooling integration",
                "Electromagnetic compatibility (EMC) shielded cabinets"
            ]
        },
        {
            icon: FaCheckCircle,
            title: "Reliable Performance Components",
            desc: "We exclusively integrate components from globally recognized brands to prevent failure cycles.",
            compliance: "CE certified assemblies",
            percentage: 100,
            bullets: [
                "Siemens PLC units & smart protective circuits",
                "Schneider Electric breaker groups & MCC switchgears",
                "ABB Variable Frequency Drives & soft starters"
            ]
        },
        {
            icon: FaCogs,
            title: "Customized Engineering Solutions",
            desc: "No off-the-shelf templates. Every automation solution and panel layout is engineered to fit your IO list.",
            compliance: "Custom CAD blueprints",
            percentage: 100,
            bullets: [
                "Custom physical dimensions to match site gaps",
                "Bespoke PLC logic custom programmed",
                "Integrated auxiliary power and control circuits"
            ]
        },
        {
            icon: FaTools,
            title: "Technical Engineering Support",
            desc: "Full technical lifecycle support from drafting schematics to commissioning, testing, and AMC SLA support.",
            compliance: "24/7 Deployed SLA Support",
            percentage: 100,
            bullets: [
                "Workshop Factory Acceptance Testing (FAT)",
                "Site Acceptance Testing (SAT) diagnostics",
                "Preventative overhauls and remote SCADA monitoring logs"
            ]
        }
    ];

    // Industries Served listing
    const industries = [
        { 
            icon: FaIndustry, 
            name: "Manufacturing", 
            desc: "Custom control cabinets, conveyor line synchronization, and automated logic units for factory environments.",
            systems: "MCC Panels, PLC Cabinets, remote HMI screens"
        },
        { 
            icon: FaTint, 
            name: "Water Treatment", 
            desc: "Intelligent pump control panels, sewage pipeline telemetry, and reservoir level automation systems.",
            systems: "Pump automation panels, level sensors, SCADA telemetry"
        },
        { 
            icon: FaBolt, 
            name: "Utilities", 
            desc: "Substation power control, switchgears distribution, and automatic capacitor banks for utilities supply.",
            systems: "Capacitor banks, sub-station panels, protection relays"
        },
        { 
            icon: FaBuilding, 
            name: "Commercial Buildings", 
            desc: "Smart lighting controller cabinets, central BMS interfaces, and ventilation controls for offices & towers.",
            systems: "DALI controllers, BMS gateways, ventilation starters"
        },
        { 
            icon: FaRoad, 
            name: "Infrastructure", 
            desc: "Power supply panels, road lighting networks control, and municipal utilities electrical boards.",
            systems: "Main distribution boards, sub-distribution panels, timers"
        },
        { 
            icon: FaGasPump, 
            name: "Oil & Gas", 
            desc: "Intrinsically safe control interfaces, pressure monitoring telemetry, and redundant controller setups.",
            systems: "Ex-proof panels, RTU telemetry nodes, safety interlocks"
        },
        { 
            icon: FaLandmark, 
            name: "Government", 
            desc: "Rigorous certification compliance and turnkey installations for public works, infrastructure, and parks.",
            systems: "IEC type-tested switchgears, telemetry links"
        },
        { 
            icon: FaPowerOff, 
            name: "Energy", 
            desc: "Smart power meter networks, harmonics suppression panels, and generator automatic transfer switch (ATS) sets.",
            systems: "Power monitoring software, ATS panels, active filters"
        }
    ];

    // Filter product grid items
    const filteredProducts = productList.filter((prod) => {
        return selectedCategory === "All" || prod.category === selectedCategory;
    });

    const handleDownloadDatasheet = (productName: string) => {
        alert(`Downloading Technical Datasheet for: ${productName}`);
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

                        <h1 className="products-hero-title">Products</h1>

                        <p className="products-hero-subtitle">
                            Explore our range of automation, electrical, electromechanical and smart technology solutions designed for industrial, commercial and infrastructure applications.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. CATEGORY NAVIGATION TABS */}
            <section className="products-nav-section">
                <div className="container">
                    <div className="products-tab-container">
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
                </div>
            </section>

            {/* 3. PRODUCTS GRID */}
            <section className="products-grid-section">
                <div className="container">
                    <div className="products-grid">
                        {filteredProducts.map((prod, idx) => (
                            <div key={idx} className="product-card">
                                <div className="product-card-image-box">
                                    <img src={prod.image} alt={prod.name} />
                                </div>
                                <div className="product-card-content">
                                    <span className="product-card-category">{prod.category}</span>
                                    <h3 className="product-card-title">{prod.name}</h3>
                                    <p className="product-card-desc">{prod.desc}</p>
                                    
                                    <ul className="product-card-features-list">
                                        {prod.features.map((feat, fidx) => (
                                            <li key={fidx}>
                                                <FaCheckCircle className="feature-bullet-icon" />
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
                            <img src="/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp" alt="PLC Control Panels" />
                        </div>
                        <div className="featured-product-details">
                            <span className="featured-label">Featured Product</span>
                            <h2 className="featured-title">PLC Control Panels</h2>
                            <p className="featured-overview">
                                Vertex PLC Control Panels are the brains of modern industrial processes, facilitating automation across various sectors in the UAE. Engineered using controllers from Siemens, Allen-Bradley, and Schneider Electric, our panels are engineered to deliver reliable automation logic in demanding B2B environments.
                            </p>

                            <h4 className="featured-sub-title">Applications</h4>
                            <ul className="featured-specs-list" style={{ marginBottom: "2rem" }}>
                                <li><FaAngleRight className="feature-bullet-icon" style={{ color: "var(--prod-accent-blue)" }} /> Municipal water pumping stations & filtration plants</li>
                                <li><FaAngleRight className="feature-bullet-icon" style={{ color: "var(--prod-accent-blue)" }} /> Industrial manufacturing assembly lines</li>
                                <li><FaAngleRight className="feature-bullet-icon" style={{ color: "var(--prod-accent-blue)" }} /> HVAC chiller control groups & smart ventilation</li>
                            </ul>

                            <h4 className="featured-sub-title">Technical Specifications</h4>
                            <div className="featured-specs-table-container">
                                <table className="specs-table">
                                    <tbody>
                                        <tr>
                                            <td className="spec-name">Processor Options</td>
                                            <td>Siemens S7-1500 / Allen-Bradley ControlLogix / Schneider M580</td>
                                        </tr>
                                        <tr>
                                            <td className="spec-name">Enclosure rating</td>
                                            <td>IP65 Rated Double-Door Steel cabinet (Form 2 / Form 4 options)</td>
                                        </tr>
                                        <tr>
                                            <td className="spec-name">I/O Capacity</td>
                                            <td>Up to 1024 digital/analog points per controller rack</td>
                                        </tr>
                                        <tr>
                                            <td className="spec-name">Supply Voltage</td>
                                            <td>230V AC / 24V DC auxiliary control circuits</td>
                                        </tr>
                                        <tr>
                                            <td className="spec-name">Certifications</td>
                                            <td>IEC 61439 standard type-tested, CE Compliant</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="featured-buttons">
                                <button
                                    onClick={() => handleDownloadDatasheet("PLC Control Panels")}
                                    className="btn-featured-download"
                                >
                                    <FaFilePdf /> Download Datasheet
                                </button>
                                <Link
                                    to={`/quote?product=${encodeURIComponent("PLC Control Panels")}`}
                                    className="btn-featured-quote"
                                >
                                    Request Quote <FaArrowRight size={12} />
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
                        <div className="why-interactive-pane">
                            <div className="pane-header">
                                <span className="pane-compliance-tag">{whyChooseList[activeWhyIdx].compliance}</span>
                                <div className="pane-icon-circle">
                                    {React.createElement(whyChooseList[activeWhyIdx].icon)}
                                </div>
                            </div>
                            
                            <h3 className="pane-heading">{whyChooseList[activeWhyIdx].title}</h3>
                            <p className="pane-paragraph">{whyChooseList[activeWhyIdx].desc}</p>
                            
                            <div className="pane-testing-bar">
                                <div className="testing-bar-label">
                                    <span>FACTORY QUALITY RATING</span>
                                    <span>{whyChooseList[activeWhyIdx].percentage}% QUALITY LEVEL</span>
                                </div>
                                <div className="testing-bar-track">
                                    <div className="testing-bar-fill" style={{ width: `${whyChooseList[activeWhyIdx].percentage}%` }}></div>
                                </div>
                            </div>

                            <ul className="pane-spec-bullets">
                                {whyChooseList[activeWhyIdx].bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>
                                        <FaCheckCircle className="pane-bullet-check" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                        {/* 8 Sector nodes */}
                        <div className="industries-grid-selector">
                            {industries.map((ind, idx) => (
                                <button
                                    key={idx}
                                    className={`industry-node-btn ${activeIndIdx === idx ? "active" : ""}`}
                                    onClick={() => setActiveIndIdx(idx)}
                                >
                                    <div className="industry-node-icon">
                                        {React.createElement(ind.icon)}
                                    </div>
                                    <span className="industry-node-name">{ind.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Telemetry Pane */}
                        <div className="industries-telemetry-pane">
                            <div className="telemetry-screen-hdr">
                                <span className="telemetry-screen-code">VERTEX CERTIFIED SOLUTIONS</span>
                                <span className="telemetry-live-dot"></span>
                            </div>

                            <div className="telemetry-screen-body">
                                <span className="telemetry-sub">MARKET SECTOR // 0{activeIndIdx + 1}</span>
                                <h3 className="telemetry-title">{industries[activeIndIdx].name}</h3>
                                <p className="telemetry-desc">{industries[activeIndIdx].desc}</p>
                                
                                <div className="telemetry-systems-block">
                                    <strong className="telemetry-block-label">Key Systems & Applications</strong>
                                    <div className="telemetry-systems-tag">{industries[activeIndIdx].systems}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. NEED A CUSTOM SOLUTION */}
            <section className="custom-solution-cta">
                <div className="container">
                    <div className="custom-cta-card">
                        <h2>Need a Custom Solution?</h2>
                        <p>
                            Can't find the product you need? Our engineering team designs and manufactures customized automation, control and electrical solutions tailored to your project requirements.
                        </p>

                        <div className="custom-cta-buttons">
                            <Link to="/quote" className="btn btn-cta-blue">
                                Request a Quote <FaArrowRight size={13} />
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
                        <h3>Need Technical Specifications?</h3>
                        <p>Download our technical catalogs or get engineering help for design integrations.</p>
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
