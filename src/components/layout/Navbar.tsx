import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp, FaPhoneAlt, FaChevronDown } from "react-icons/fa";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { 
        name: "Services", 
        path: "/services",
        submenus: [
            { name: "Industrial Automation", path: "/services" },
            { name: "Building Management Systems", path: "/services" },
            { name: "Electrical Engineering", path: "/services" },
            { name: "Mechanical Solutions", path: "/services" },
            { name: "Control Panel Assembly", path: "/services" }
        ]
    },
    { name: "Products", path: "/products" },
    { 
        name: "Projects", 
        path: "/projects",
        submenus: [
            { name: "Infrastructure & Water", path: "/projects" },
            { name: "Power Systems & Switchgear", path: "/projects" },
            { name: "Smart Lighting & ELV", path: "/projects" },
            { name: "Industrial IoT Telemetry", path: "/projects" }
        ]
    },
    { name: "Downloads", path: "/downloads" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        <>
            <motion.header
                className={`navbar ${scrolled ? "scrolled" : ""}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container nav-container">
                    <motion.div
                        className="logo"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link to="/">
                            <img src="/Vertex_logo.png" alt="Vertex Controls Logo" />
                        </Link>
                    </motion.div>

                    <nav className="desktop-nav">
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                                }
                            }}
                        >
                            {navLinks.map((link) => (
                                <motion.li 
                                    key={link.name} 
                                    variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                                    className={link.submenus ? "has-dropdown" : ""}
                                    onMouseEnter={() => link.submenus && setActiveDropdown(link.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link to={link.path} className={location.pathname === link.path ? "active" : ""}>
                                        {link.name}
                                        {link.submenus && <FaChevronDown className="dropdown-arrow" size={10} />}
                                    </Link>

                                    {link.submenus && (
                                        <AnimatePresence>
                                            {activeDropdown === link.name && (
                                                <motion.div 
                                                    className="dropdown-menu"
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="dropdown-header">
                                                        <span>Top {link.name}</span>
                                                    </div>
                                                    <ul>
                                                        {link.submenus.map((sub, idx) => (
                                                            <li key={idx}>
                                                                <Link to={sub.path} onClick={() => setActiveDropdown(null)}>
                                                                    {sub.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </nav>

                    <motion.div
                        className="nav-actions"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/contact" className="btn btn-primary">Request a Quote</Link>
                        </motion.div>
                    </motion.div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        <ul>
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="mobile-nav-item"
                                >
                                    <div className="mobile-link-header">
                                        <Link to={link.path}>{link.name}</Link>
                                    </div>

                                    {link.submenus && (
                                        <ul className="mobile-submenu">
                                            {link.submenus.map((sub, idx) => (
                                                <li key={idx}>
                                                    <Link to={sub.path}>└ {sub.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                        <motion.div
                            className="mobile-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
                            <Link to="/contact" className="btn btn-primary">Request a Quote</Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="floating-actions">
                <motion.a
                    href="tel:+971554962866"
                    className="floating-phone"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
                >
                    <FaPhoneAlt size={24} />
                </motion.a>

                <motion.a
                    href="https://wa.me/971554962866"
                    target="_blank"
                    rel="noreferrer"
                    className="floating-whatsapp"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
                >
                    <FaWhatsapp size={32} />
                </motion.a>
            </div>
        </>
    );
};

export default Navbar;