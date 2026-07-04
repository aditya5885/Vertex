import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaArrowRight } from "react-icons/fa";

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="footer">
            <div className="container">
                <motion.div 
                    className="footer-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div className="footer-col" variants={itemVariants}>
                        <img src="/Vertex_logo.png" alt="Vertex Controls Logo" className="footer-logo" />
                        <p className="tagline">Engineering Intelligence. Automated Excellence.</p>
                        <p className="description">
                            Leading provider of advanced electromechanical solutions, automation, and intelligent engineering services for modern enterprises.
                        </p>
                    </motion.div>

                    <motion.div className="footer-col" variants={itemVariants}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/downloads">Downloads</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div className="footer-col" variants={itemVariants}>
                        <h3>Top Services</h3>
                        <ul style={{ marginBottom: "1.25rem" }}>
                            <li><Link to="/services/control-panels">Control Panels & Automation</Link></li>
                            <li><Link to="/services/industrial-automation">Industrial Automation & SCADA</Link></li>
                            <li><Link to="/services/electrical-engineering">Electrical Engineering</Link></li>
                            <li><Link to="/services/mechanical-engineering">Mechanical & MEP Services</Link></li>
                        </ul>
                        <h3>Featured Projects</h3>
                        <ul>
                            <li><Link to="/projects/control-panels-automation">Control Panels & Automation</Link></li>
                            <li><Link to="/projects/pump-station-automation">Pump Station Automation</Link></li>
                            <li><Link to="/projects/electrical-infrastructure">Electrical Infrastructure</Link></li>
                            <li><Link to="/projects/smart-lighting">Smart Lighting Controllers</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div className="footer-col" variants={itemVariants}>
                        <h3>Contact Us</h3>
                        <ul className="contact-info">
                            <li><FaMapMarkerAlt /> <span>Office No-5, L1/6A, 1st Floor<br/>Reef Mall, Al Murqabat, Deira<br/>Dubai, UAE</span></li>
                            <li><FaPhoneAlt /> <a href="tel:+971554962866">+971 55 496 2866</a></li>
                            <li><FaEnvelope /> <a href="mailto:Sales@vertex-controls.com">Sales@vertex-controls.com</a></li>
                        </ul>
                        <Link 
                            to="/quote"
                            className="footer-cta-btn"
                        >
                            Request a Quote <FaArrowRight size={12} />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p>&copy; 2026 Vertex Controls Electromechanical LLC. All rights reserved.</p>
                    <div className="social-links">
                        {[
                            { icon: FaFacebookF, url: "https://facebook.com/VertexControls" },
                            { icon: FaInstagram, url: "https://instagram.com/vertexcontrols" },
                            { icon: FaLinkedinIn, url: "https://linkedin.com/company/vertex-controls-electromechanical-llc" },
                            { icon: FaYoutube, url: "https://youtube.com/@VertexControls" },
                            { icon: FaTwitter, url: "https://twitter.com/VertexControls" }
                        ].map((social, idx) => (
                            <motion.a 
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -5, scale: 1.1, color: "var(--primary)" }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;