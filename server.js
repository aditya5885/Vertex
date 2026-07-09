import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manual .env loader (Ensures configurations load even if started with plain 'node server.js')
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
    try {
        const envContent = fs.readFileSync(envPath, "utf8");
        envContent.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith("#")) {
                const parts = trimmed.split("=");
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    let val = parts.slice(1).join("=").trim();
                    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
                    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
                    process.env[key] = val;
                }
            }
        });
        console.log(`[Env Loader] Successfully loaded environment configurations.`);
    } catch (e) {
        console.error(`[Env Loader] Error reading .env file:`, e);
    }
}

const PORT = process.env.PORT || 5001;
const IS_VERCEL = !!process.env.VERCEL;

// Cloudinary Dynamic Configuration
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const isCloudinaryConfigured = !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);

// Vercel KV Dynamic Configuration
const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;
const isKvConfigured = !!(KV_REST_API_URL && KV_REST_API_TOKEN);

// Define base paths
const BUNDLED_CONTENT_PATH = path.join(__dirname, "src", "data", "siteContent.json");
const BUNDLED_SUBMISSIONS_PATH = path.join(__dirname, "src", "data", "submissions.json");

const CONTENT_FILE_PATH = IS_VERCEL 
    ? "/tmp/siteContent.json"
    : BUNDLED_CONTENT_PATH;

const SUBMISSIONS_FILE_PATH = IS_VERCEL
    ? "/tmp/submissions.json"
    : BUNDLED_SUBMISSIONS_PATH;

const UPLOAD_DIR_PATH = IS_VERCEL
    ? "/tmp/uploads"
    : path.join(__dirname, "public", "Images", "uploads");

const STATIC_DIR_PATH = path.join(__dirname, "dist");

// Secret password for admin panel (can be configured via ENV)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_TOKEN = "vertex-super-secure-token-hash-2026";

// Email Sender Utility
const sendEmailNotification = async (subject, htmlContent, attachment) => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpTo = process.env.SMTP_TO || "adityashvkmr@gmail.com, Sales@vertex-controls.com";

    console.log(`[Email System] Preparing to send email notification to: ${smtpTo}`);
    console.log(`[Email System] Subject: ${subject}`);

    if (smtpHost && smtpUser && smtpPass) {
        try {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: parseInt(smtpPort),
                secure: parseInt(smtpPort) === 465,
                auth: {
                    user: smtpUser,
                    pass: smtpPass
                }
            });

            const mailOptions = {
                from: `"Vertex Controls Portal" <${smtpUser}>`,
                to: smtpTo,
                subject: subject,
                html: htmlContent
            };

            if (attachment) {
                if (attachment.path) {
                    mailOptions.attachments = [{
                        filename: attachment.filename,
                        path: attachment.path
                    }];
                } else if (attachment.content) {
                    mailOptions.attachments = [{
                        filename: attachment.filename,
                        content: Buffer.from(attachment.content.split(";base64,").pop(), "base64")
                    }];
                }
            }

            const info = await transporter.sendMail(mailOptions);
            console.log(`[Email System] Email sent successfully: ${info.messageId}`);
            return true;
        } catch (error) {
            console.error(`[Email System] Error sending email via SMTP:`, error);
            return false;
        }
    } else {
        console.warn(`[Email System] SMTP credentials not set. Creating automatic Ethereal Email test mailbox...`);
        try {
            const testAccount = await nodemailer.createTestAccount();
            
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });

            const mailOptions = {
                from: `"Vertex Controls (Test)" <sender@example.com>`,
                to: smtpTo,
                subject: `[TESTING MAIL] ${subject}`,
                html: htmlContent
            };

            if (attachment) {
                if (attachment.path) {
                    mailOptions.attachments = [{
                        filename: attachment.filename,
                        path: attachment.path
                    }];
                } else if (attachment.content) {
                    mailOptions.attachments = [{
                        filename: attachment.filename,
                        content: Buffer.from(attachment.content.split(";base64,").pop(), "base64")
                    }];
                }
            }

            const info = await transporter.sendMail(mailOptions);
            const previewUrl = nodemailer.getTestMessageUrl(info);
            
            console.log(`\n=======================================================`);
            console.log(`✉️  [TEST EMAIL DISPATCHED]`);
            console.log(`🔗 Click the link below to view your test email:`);
            console.log(`👉 ${previewUrl}`);
            console.log(`=======================================================\n`);
            
            return previewUrl;
        } catch (error) {
            console.error(`[Email System] Ethereal test email error:`, error);
            return false;
        }
    }
};

// HTML Email Layout Generator (Mobile Optimized & Responsive)
const buildEmailTemplate = (title, fields, message, referenceId, date) => {
    const tableRows = fields.map(field => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 14px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; width: 140px; vertical-align: top;">
                ${field.label}
            </td>
            <td style="padding: 14px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #0f172a; vertical-align: top; word-break: break-all;">
                ${field.value}
            </td>
        </tr>
    `).join("");

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                @media only screen and (max-width: 480px) {
                    .container { width: 100% !important; border-radius: 0 !important; }
                    .content-card { padding: 25px 15px !important; }
                    td { display: block !important; width: 100% !important; padding: 4px 0 !important; }
                    tr { display: block !important; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
                }
            </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f6f8; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 30px 15px;">
                <tr>
                    <td align="center">
                        <table class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #eef2f5; border-collapse: collapse;">
                            <!-- Header Banner -->
                            <tr>
                                <td style="background-color: #050c1a; padding: 35px 20px; text-align: center; border-bottom: 4px solid #00e5ff;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 0.1em;">
                                                VERTEX <span style="color: #00e5ff;">CONTROLS</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; margin-top: 8px; display: block;">
                                                ELECTROMECHANICAL & AUTOMATION
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Content Card Body -->
                            <tr>
                                <td class="content-card" style="padding: 40px 35px; background-color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                    <!-- Title -->
                                    <h2 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 700; color: #050c1a;">
                                        ${title}
                                    </h2>
                                    <p style="margin: 0 0 30px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                                        A new inquiry has been submitted on the web portal. Detailed parameters are structured below:
                                    </p>
                                    
                                    <!-- Structured Fields Table -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 30px;">
                                        ${tableRows}
                                    </table>
                                    
                                    <!-- Message/Details Box -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-left: 4px solid #00e5ff; border-radius: 0 8px 8px 0; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding: 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                                <div style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
                                                    PROJECT DETAILS / MESSAGE DETAILS
                                                </div>
                                                <div style="font-size: 14px; line-height: 1.6; color: #0f172a; white-space: pre-wrap; font-style: italic;">
                                                    ${message}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Brand Footer (Light High-Contrast Theme) -->
                            <tr>
                                <td style="background-color: #f8fafc; padding: 30px 20px; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border-top: 1px solid #eef2f5;">
                                    <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.5; font-weight: 600;">
                                        Vertex Controls Electromechanical LLC &bull; Dubai, UAE
                                    </p>
                                    <p style="margin: 6px 0 0 0; font-size: 12px; color: #475569;">
                                        <a href="mailto:Sales@vertex-controls.com" style="color: #0f6fff; text-decoration: underline; font-weight: bold;">Sales@vertex-controls.com</a> &bull; +971 55 496 2866
                                    </p>
                                    <p style="margin: 20px 0 0 0; font-size: 11px; color: #64748b; border-top: 1px solid #eef2f5; padding-top: 15px; letter-spacing: 0.02em;">
                                        Reference: <strong style="color: #0f172a;">${referenceId}</strong> &bull; Date Received: ${new Date(date).toLocaleString()}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
};

// Ensure directories exist
try {
    if (!fs.existsSync(path.dirname(CONTENT_FILE_PATH))) {
        fs.mkdirSync(path.dirname(CONTENT_FILE_PATH), { recursive: true });
    }
    if (!fs.existsSync(UPLOAD_DIR_PATH)) {
        fs.mkdirSync(UPLOAD_DIR_PATH, { recursive: true });
    }
} catch (err) {
    console.warn("[Dir Creator] Warning: Failed to ensure directories exist:", err.message);
}

// Default fallback content block
const defaultContent = {
  navbar: {
    logoUrl: "/Vertex_logo.png",
    navLinks: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      {
        name: "Services",
        path: "/services",
        submenus: [
          { name: "Automation & Control Systems", path: "/services/control-panels" },
          { name: "Industrial Automation & SCADA", path: "/services/industrial-automation" },
          { name: "Electrical Engineering", path: "/services/electrical-engineering" },
          { name: "Mechanical & MEP Services", path: "/services/mechanical-engineering" },
          { name: "Smart Infrastructure & BMS", path: "/services/smart-infrastructure" },
          { name: "AI & Industrial IoT", path: "/services/ai-iot" },
          { name: "Energy Management", path: "/services/energy-management" },
          { name: "Maintenance & Operation", path: "/services/maintenance-operation" }
        ]
      },
      { name: "Products", path: "/products" },
      {
        name: "Projects",
        path: "/projects",
        submenus: [
          { name: "Control Panels & Automation", path: "/projects/control-panels-automation" },
          { name: "Pump Station Automation", path: "/projects/pump-station-automation" },
          { name: "Electrical Infrastructure", path: "/projects/electrical-infrastructure" },
          { name: "Power Cable Installation", path: "/projects/power-cable-installation" },
          { name: "LED Display Power Supply", path: "/projects/led-display-power" },
          { name: "Smart Lighting Systems", path: "/projects/smart-lighting" },
          { name: "Energy Monitoring & Metering", path: "/projects/energy-monitoring" },
          { name: "Industrial IoT Solutions", path: "/projects/industrial-iot" },
          { name: "Water Treatment & Control", path: "/projects/water-treatment" },
          { name: "Mechanical Installation", path: "/projects/mechanical-installation" }
        ]
      },
      { name: "Downloads", path: "/downloads" }
    ]
  },
  footer: {
    address: "Vertex Controls Electromechanical LLC, Dubai, UAE",
    phone: "+971 55 496 2866",
    email: "Sales@vertex-controls.com",
    whatsapp: "+971554962866",
    companyName: "Vertex Controls LLC",
    copyright: "© 2026 Vertex Controls Electromechanical LLC. All rights reserved."
  },
  home: {
    hero: {
      badge: "Electromechanical & Automation Engineering in UAE",
      title: "Engineering Reliable",
      highlightText: "Control & Automation Solutions",
      lead: "End-to-end Design, Supply, Installation, Testing, Commissioning, and Maintenance of mission-critical Electrical, Automation, and SCADA control panels across the United Arab Emirates."
    },
    stats: [
      { num: "500+", label: "Projects Completed" },
      { num: "150+", label: "Clients Served" },
      { num: "100%", label: "UAE Coverage" },
      { num: "15+ Yrs", label: "Engineering Expertise" }
    ],
    aboutShort: {
      subTag: "Pioneering Industrial Engineering",
      title: "Who We Are",
      lead: "Vertex Controls is a premier electromechanical and industrial automation engineering firm based in Dubai, UAE. We specialize in delivering mission-critical control solutions that drive operational reliability and efficiency.",
      body: "From complex PLC/SCADA control panel integration to predictive maintenance, IoT telemetry, and turnkey MEP services, our intelligent engineering approach ensures safety, precision, and peak performance."
    },
    whyChoose: [
      "Experienced Engineering Team",
      "End-to-End Project Delivery",
      "Innovative Technology Solutions",
      "Quality & Safety Focused",
      "Rapid Technical Support",
      "Cost-Effective Solutions"
    ],
    solutions: [
      { title: "MCC Panels", cat: "Power Distribution", spec: "IEC 61439 Certified", image: "/Images/Products/control_panels.png" },
      { title: "PLC Control Panels", cat: "Automation", spec: "Real-time Logic", image: "/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp" },
      { title: "SCADA Systems", cat: "Telemetry & Software", spec: "HMI Dashboards", image: "/Images/Products/3b41b48b-793d-4b06-b872-8a701ecd05d0.webp" },
      { title: "Energy Monitoring", cat: "Smart Grid", spec: "AI Power Analytics", image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp" },
      { title: "Smart Lighting", cat: "ELV Integration", spec: "DALI Protocols", image: "/Images/Products/61b16c79-0f71-4ee6-87c5-396b8123796c.webp" },
      { title: "Industrial IoT", cat: "Cloud Gateways", spec: "Telemetry Sensors", image: "/Images/Products/ai_industrial_iot.webp" }
    ],
    process: [
      { title: "Site Assessment", desc: "Detailed inspection & requirements gathering." },
      { title: "Engineering Design", desc: "Custom CAD blueprints & logic programming." },
      { title: "Installation", desc: "Expert on-site execution & integration." },
      { title: "Testing", desc: "Rigorous commissioning & safety checks." },
      { title: "Maintenance", desc: "24/7 support & predictive monitoring." }
    ],
    projectHighlights: [
      {
        title: "Pump Station Automation",
        cat: "Infrastructure",
        location: "Dubai Water Authority",
        desc: "Mission-critical SCADA telemetry & automated pump sequencing for municipal water management.",
        image: "/Images/Products/control_panels.png"
      },
      {
        title: "Electrical Power Distribution",
        cat: "Power Systems",
        location: "Industrial City, Sharjah",
        desc: "Turnkey MV/LV switchgear assembly, power factor correction, and smart distribution panels.",
        image: "/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp"
      },
      {
        title: "Smart Lighting Automation",
        cat: "ELV Systems",
        location: "Commercial Complex, Abu Dhabi",
        desc: "DALI intelligent lighting integration with daylight harvesting and centralized scheduling.",
        image: "/Images/Project/57045811-01db-4a79-8406-f8398676e32e.webp"
      },
      {
        title: "Industrial Energy Telemetry",
        cat: "IoT Solutions",
        location: "Logistics Hub, Dubai",
        desc: "Cloud IoT sensors and AI predictive analytics dashboard for automated power optimization.",
        image: "/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.webp"
      }
    ],
    contactPreview: {
      address: "Office No-5, L1/6A, 1st Floor\nReef Mall, Al Murqabat, Deira\nDubai, UAE",
      phone: "+971 55 496 2866",
      email: "Sales@vertex-controls.com",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0330010638054!2d55.32087537489523!3d25.269475277664476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5da8878c837f%3A0xa5adb301b301eeaa!2sVertex%20controls%20Electromechanical%20llc!5e0!3m2!1sen!2sin!4v1782545529440!5m2!1sen!2sin"
    }
  },
  about: {
    hero: {
      badge: "Vertex Controls Operations & Scope",
      title: "About Vertex Controls",
      lead: "We design, build, and maintain electromechanical panels, PLC programs, and utilities automation across Dubai and the UAE."
    },
    mission: {
      title: "Our Mission",
      body: "To deliver top-tier engineering solutions, customized control panels, and automation infrastructure that guarantee operational reliability, safety, and energy efficiency for critical industrial infrastructure across the UAE."
    },
    vision: {
      title: "Our Vision",
      body: "To be the leading electromechanical and automation engineering contractor in the GCC region, recognized for engineering innovation, precision manufacturing, and complete client reliability."
    },
    overview: {
      title: "Driving Industrial Evolution In Dubai",
      body: "Founded in Dubai, Vertex Controls Electromechanical LLC has established itself as a trusted partner for turnkey industrial automation, electrical distribution, and smart infrastructure engineering. Our multidisciplinary team of senior engineers, SCADA programmers, and MEP specialists combine deep technical domain knowledge with state-of-the-art technologies to ensure maximum operational uptime, energy efficiency, and safety across manufacturing facilities, municipal water authorities, and commercial projects.",
      image: "/Images/booth_exib.webp",
      badgeText: "Certified Systems Integrator\nPLC, SCADA & Switchgears"
    },
    values: [
      { title: "Engineering Excellence", desc: "Rigorous standards, cutting-edge SCADA logic, and precision execution in every panel and deployment." },
      { title: "Innovation & AI", desc: "Integrating smart IoT telemetry and predictive maintenance to future-proof infrastructure." },
      { title: "Integrity & Trust", desc: "Transparent client partnerships built on honest engineering, clear timelines, and dependability." },
      { title: "Safety First", desc: "Uncompromising compliance with international electrical codes and UAE safety regulations." },
      { title: "Uncompromising Quality", desc: "Using top-tier components and thorough factory acceptance testing (FAT) prior to commissioning." },
      { title: "Customer Commitment", desc: "Dedicated 24/7 technical support and rapid response teams ensuring uninterrupted operations." }
    ],
    whyChoose: [
      "Experienced Team of Senior SCADA & MEP Engineers",
      "Complete Turnkey Execution (Design, Assembly, Testing & Commissioning)",
      "Advanced PLC, HMI & IoT Telemetry Expertise",
      "Strict Adherence to ISO & UAE Electrical Safety Standards",
      "Reliable 24/7 On-Call Technical Support & Maintenance",
      "Proven Track Record in Major UAE Industrial & Infrastructure Projects"
    ],
    stats: [
      { value: 250, suffix: "+", label: "Projects Delivered" },
      { value: 120, suffix: "+", label: "Enterprise Clients" },
      { value: 15, suffix: "+", label: "Years Experience" },
      { value: 24, suffix: "/7", label: "Technical Support" },
      { value: 10, suffix: "+", label: "Industries Served" }
    ],
    cta: {
      title: "Let's Build Smarter Engineering Solutions Together",
      desc: "Partner with Dubai's premier electromechanical systems integrator for your next control or automation project."
    }
  },
  services: {
    hero: {
      title: "Our Engineering Services",
      lead: "We deliver design, supply, testing, and commissioning of control panels, electrical infrastructure, industrial automation, and MEP services."
    },
    list: [
      {
        title: "Automation & Control Systems",
        desc: "Custom low-voltage switchgear panels, motor control centers (MCC), and variable frequency drive (VFD) panels.",
        link: "/services/control-panels"
      },
      {
        title: "Industrial Automation & SCADA",
        desc: "High-reliability programmable logic control (PLC) programming, customized SCADA supervision, and telemetry upgrades.",
        link: "/services/industrial-automation"
      },
      {
        title: "Electrical Engineering",
        desc: "Complete electrical power systems designs, sub-main distribution boards (SMDB) installation, and load analysis audits.",
        link: "/services/electrical-engineering"
      },
      {
        title: "Mechanical & MEP Services",
        desc: "Integrated electromechanical, HVAC piping, fluid booster pumps, and sprinkler system contracting for industrial facilities.",
        link: "/services/mechanical-engineering"
      },
      {
        title: "Smart Infrastructure & BMS",
        desc: "Centralized Building Management Systems (BMS) and intelligent smart lighting grids running under KNX and DALI protocols.",
        link: "/services/smart-infrastructure"
      },
      {
        title: "AI & Industrial IoT",
        desc: "Deploying Edge IIoT telemetry transmitters, machine vibration diagnostic sensors, and cloud analytics software.",
        link: "/services/ai-iot"
      },
      {
        title: "Energy Management",
        desc: "Smart departmental sub-metering systems, automatic power factor correction banks, and active harmonic filtration grids.",
        link: "/services/energy-management"
      },
      {
        title: "Maintenance & Operation",
        desc: "Comprehensive Preventive, Corrective and Predictive Maintenance Services for Electrical, Electronics and Mechanical Systems.",
        link: "/services/maintenance-operation"
      }
    ],
    workflow: [
      { title: "Consultation", desc: "Understanding client specifications & operational demands." },
      { title: "Engineering Design", desc: "Detailed layout drawings, logic configurations, and load analysis." },
      { title: "Procurement", desc: "Sourcing premium-grade, certified materials from top brands." },
      { title: "Installation", desc: "On-site electrical and mechanical mounting & integration." },
      { title: "Testing & Commissioning", desc: "Rigorous loop checks, functional testing, and startup approvals." },
      { title: "Maintenance & Support", desc: "Continuous 24/7 SLA monitoring, SLAs, and regular diagnostics." }
    ],
    whyChoose: [
      { title: "Experienced Engineers", desc: "Certified engineering crew with decades of combined execution experience in the Middle East." },
      { title: "Customized Solutions", desc: "Bespoke automation layouts designed specifically around your facilities' capacity." },
      { title: "High Quality Workmanship", desc: "Zero compromises on component quality, assembly standards, and wire management." },
      { title: "Safety First", desc: "100% compliant with local civil defense, DEWA, ADDC utility rules, and IEC safety standards." },
      { title: "Fast Project Delivery", desc: "Streamlined logistics and production systems to guarantee timelines are respected." },
      { title: "Industry Best Practices", desc: "Utilizing state-of-the-art diagnostic, design, and calculation tools." },
      { title: "24/7 Technical Support", desc: "SLA response coverage for emergency support, hotlines, and quick site deployments." },
      { title: "Long Term Maintenance", desc: "Customized annual maintenance contracts (AMCs) to shield your system investments." }
    ],
    industries: [
      "Water & Wastewater",
      "Industrial Plants",
      "Commercial Buildings",
      "Infrastructure",
      "Oil & Gas",
      "Utilities",
      "Manufacturing",
      "Government Projects"
    ],
    technologies: [
      "PLC Systems", "SCADA Integration", "HMI Styling", "Industrial IoT",
      "AI Monitoring", "Smart Sensors", "VFD Systems", "Energy Monitoring",
      "Predictive Maintenance", "Cloud Integration"
    ],
    capabilities: [
      "Design", "Supply", "Installation", "Programming",
      "Testing", "Commissioning", "Maintenance", "Upgrades"
    ]
  },
  projects: {
    hero: {
      title: "Our Engineering Portfolio",
      lead: "Explore our successfully commissioned electromechanical control systems, SCADA systems, custom panel integration, and electrical switchgear installations across the UAE and GCC."
    },
    categories: [
      {
        title: "Automation & Control Systems",
        desc: "Custom low-voltage switchgear panels, variable frequency drive (VFD) starters, and smart motor control center assembly.",
        scope: "Factory Assembly, FAT Commissioning, Component Integration, Thermal Auditing",
        image: "/Images/Project/mcc_showcase.webp"
      },
      {
        title: "PLC & SCADA Projects",
        desc: "High-reliability programmable logic control programming and customized SCADA supervision telemetry for municipal utility loops.",
        scope: "Logic Development, HMI Interface Design, Network Loop Testing, Telemetry Upgrades",
        image: "/Images/Project/scada_showcase.webp"
      },
      {
        title: "Electrical Engineering",
        desc: "Complete electrical power systems designs, sub-main distribution boards installation, cabling routing, and load analysis audits.",
        scope: "Cable Sizing, Schematics Auditing, DEWA Drawings Submission, Load Calculation",
        image: "/Images/Project/57045811-01db-4a79-8406-f8398676e32e.webp"
      },
      {
        title: "MEP Services",
        desc: "Integrated electromechanical, HVAC piping, fluid booster pumps, and sprinkler system contracting for industrial facilities.",
        scope: "HVAC Installation, Pump Alignment, Drain Grid Plumbing, Civil Defense Approvals",
        image: "/Images/booth_exib.webp"
      },
      {
        title: "Smart Infrastructure",
        desc: "Centralized Building Management Systems (BMS) and intelligent smart lighting grids running under KNX and DALI protocols.",
        scope: "Sensor Mapping, Light Bus Configurations, BMS Control Dashboard Setup",
        image: "/Images/Project/lighting_showcase.webp"
      },
      {
        title: "ELV & Security Systems",
        desc: "Plant-wide CCTV surveillance layouts, biometric door locks, card readers, and structured high-speed network fiber cabling.",
        scope: "Cat6A Cabling runs, NVR Storage Tuning, Security Panel Terminations",
        image: "/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.webp"
      },
      {
        title: "AI & IoT Solutions",
        desc: "Deploying Edge IIoT telemetry transmitters, vibration diagnostic sensors, and cloud analytical software systems.",
        scope: "MQTT Gateway Integrations, Machine Vibration Profiling, Cloud Database Setup",
        image: "/Images/Products/ai_industrial_iot.webp"
      },
      {
        title: "Energy Management",
        desc: "Smart departmental sub-metering systems, automatic power factor correction banks, and active harmonic filtration grids.",
        scope: "Capacitor Bank Assembly, Active Filtering Calibration, Power Quality Auditing",
        image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp"
      }
    ],
    videos: [
      {
        title: "SCADA Telemetry System Walkthrough",
        desc: "Live walkthrough of our Siemens SCADA telemetry console supervising municipal pump utilities.",
        bgImage: "/Images/Project/scada_showcase.webp",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31911-large.mp4",
        handle: "@vertex.automation",
        tagline: "LIVE PROCESS TELEMETRY"
      },
      {
        title: "Custom MCC Panel Test Cycle",
        desc: "Rigorous thermal inspection and automation logic test of custom VFD and MCC starter panels.",
        bgImage: "/Images/Project/mcc_showcase.webp",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-details-and-components-animation-43187-large.mp4",
        handle: "@vertex.panels",
        tagline: "FAT TESTING CYCLE"
      },
      {
        title: "Skyscraper Smart Facade Commissioning",
        desc: "Live commissioning of intelligent DALI smart lighting protocols supervising decorative LED installations.",
        bgImage: "/Images/Project/lighting_showcase.webp",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-buildings-in-a-financial-district-at-night-42340-large.mp4",
        handle: "@vertex.smartcity",
        tagline: "DALI PROTOCOLS TEST"
      }
    ],
    portfolio: [
      {
        title: "Dubai Infrastructure Control Upgrades",
        category: "Industrial Automation",
        desc: "Designed and deployed custom PLC panels and SCADA integration for key wastewater and telemetry systems in Dubai."
      },
      {
        title: "Northern Emirates District Cooling MCCs",
        category: "Electromechanical Installation",
        desc: "Assembly, testing, and commissioning of modular motor control centers (MCC) and heavy VFD panels for commercial facilities."
      },
      {
        title: "GCC Smart Grid Integration Project",
        category: "Power & Energy Distribution",
        desc: "Synchronized low-voltage switchgears and capacitor bank panel arrays to improve power factor and load control efficiency."
      }
    ],
    overview: {
      title: "Complete Project Lifecycle",
      lead: "At Vertex Controls, we design, build, test, and maintain turnkey engineering systems that secure high performance for utilities and corporations across the UAE.",
      body: "Our senior team bridges the gap between field instrumentation and smart cloud monitoring, delivering custom LV panels, logic automation loops, and MEP contracting built to international standards."
    },
    industries: [
      { title: "Industrial Facilities", desc: "Factories, assembly warehouses, and heavy engineering production mills." },
      { title: "Commercial Buildings", desc: "Premium skyscrapers, corporate offices, and mixed-use retail malls." },
      { title: "Infrastructure", desc: "Public transport grids, highway lighting systems, and remote telemetry gates." },
      { title: "Water & Wastewater", desc: "Municipal pump stations, treatment plants, and irrigation pipeline networks." },
      { title: "Manufacturing", desc: "Automated production loops, chemical blending sites, and batch processes." },
      { title: "Utilities", desc: "Electrical substations, power distribution networks, and smart metering loops." },
      { title: "Government Projects", desc: "Public sector utility plants, secure structures, and municipal buildings." }
    ],
    deliverySteps: [
      { title: "Consultation", desc: "Comprehensive site audits, detailed load surveys, feasibility assessments, and technical parameter definitions." },
      { title: "Engineering Design", desc: "Creation of bespoke schematics (SLDs), CAD routing path drawings, panel layouts, and logical control flowcharts." },
      { title: "Installation", desc: "Custom workshop panel assembly, on-site heavy equipment positioning, cable terminations, and system integration." },
      { title: "Testing & Commissioning", desc: "Rigorous signal loop checks, sensor calibration, and Factory/Site Acceptance Testing (FAT/SAT) under compliance codes." },
      { title: "Maintenance & Support", desc: "Recurring diagnostics, logic backups, preventative maintenance checkups, and 24/7 SLA emergency callout coverage." }
    ]
  },
  products: {
    hero: {
      title: "Products",
      lead: "Explore our range of automation, electrical, electromechanical and smart technology solutions designed for industrial, commercial and infrastructure applications."
    },
    categories: [
      "All",
      "Control Panels",
      "Automation Systems",
      "Energy Management",
      "Smart Infrastructure",
      "Security Systems",
      "Industrial IoT",
      "Embedded Systems",
      "R&D Solutions"
    ],
    productList: [
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
        image: "/Images/Products/control_panels.png",
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
        image: "/Images/Products/energy_monitoring.png",
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
        image: "/Images/Products/access_control.png",
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
        image: "/Images/Products/industrial_iot.png",
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
        image: "/Images/Products/embedded_systems.png",
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
        image: "/Images/Products/electronic_controller.png",
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
        image: "/Images/Products/rd_solutions.png",
        features: [
          "Hardware-in-the-loop (HIL) simulators",
          "Custom testing instrumentation mounts",
          "Comprehensive validation engineering data"
        ]
      }
    ],
    featuredProduct: {
      title: "PLC Control Panels",
      image: "/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp",
      overview: "Vertex PLC Control Panels are the brains of modern industrial processes, facilitating automation across various sectors in the UAE. Engineered using controllers from Siemens, Allen-Bradley, and Schneider Electric, our panels are engineered to deliver reliable automation logic in demanding B2B environments.",
      applications: [
        "Municipal water pumping stations & filtration plants",
        "Industrial manufacturing assembly lines",
        "HVAC chiller control groups & smart ventilation"
      ],
      specs: [
        { name: "Processor Options", value: "Siemens S7-1500 / Allen-Bradley ControlLogix / Schneider M580" },
        { name: "Enclosure rating", value: "IP65 Rated Double-Door Steel cabinet (Form 2 / Form 4 options)" },
        { name: "I/O Capacity", value: "Up to 1024 digital/analog points per controller rack" },
        { name: "Supply Voltage", value: "230V AC / 24V DC auxiliary control circuits" },
        { name: "Certifications", value: "IEC 61439 standard type-tested, CE Compliant" }
      ]
    },
    whyChooseList: [
      {
        icon: "FaIndustry",
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
        icon: "FaCheckCircle",
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
        icon: "FaCogs",
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
        icon: "FaTools",
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
    ],
    industries: [
      {
        icon: "FaIndustry",
        name: "Manufacturing",
        desc: "Custom control cabinets, conveyor line synchronization, and automated logic units for factory environments.",
        systems: "MCC Panels, PLC Cabinets, remote HMI screens"
      },
      {
        icon: "FaTint",
        name: "Water Treatment",
        desc: "Intelligent pump control panels, sewage pipeline telemetry, and reservoir level automation systems.",
        systems: "Pump automation panels, level sensors, SCADA telemetry"
      },
      {
        icon: "FaBolt",
        name: "Utilities",
        desc: "Substation power control, switchgears distribution, and automatic capacitor banks for utilities supply.",
        systems: "Capacitor banks, sub-station panels, protection relays"
      },
      {
        icon: "FaBuilding",
        name: "Commercial Buildings",
        desc: "Smart lighting controller cabinets, central BMS interfaces, and ventilation controls for offices & towers.",
        systems: "DALI controllers, BMS gateways, ventilation starters"
      },
      {
        icon: "FaRoad",
        name: "Road & Infrastructure",
        desc: "Power supply panels, road lighting networks control, and municipal utilities electrical boards.",
        systems: "Main distribution boards, sub-distribution panels, timers"
      },
      {
        icon: "FaGasPump",
        name: "Oil & Gas",
        desc: "Intrinsically safe control interfaces, pressure monitoring telemetry, and redundant controller setups.",
        systems: "Ex-proof panels, RTU telemetry nodes, safety interlocks"
      },
      {
        icon: "FaLandmark",
        name: "Government",
        desc: "Rigorous certification compliance and turnkey installations for public works, infrastructure, and parks.",
        systems: "IEC type-tested switchgears, telemetry links"
      },
      {
        icon: "FaPowerOff",
        name: "Energy",
        desc: "Smart power meter networks, harmonics suppression panels, and generator automatic transfer switch (ATS) sets.",
        systems: "Power monitoring software, ATS panels, active filters"
      }
    ],
    customSolution: {
      title: "Need a Custom Solution?",
      desc: "Can't find the product you need? Our engineering team designs and manufactures customized automation, control and electrical solutions tailored to your project requirements."
    },
    footerCta: {
      title: "Need Technical Specifications?",
      desc: "Download our technical catalogs or get engineering help for design integrations."
    }
  },
  downloads: {
    hero: {
      title: "Technical Downloads",
      lead: "Access our company profile, product brochures, technical datasheets, manuals, certifications, and engineering resources. Browse and download the latest documentation to support your projects."
    },
    categories: [
      {
        index: "01",
        icon: "FaBuilding",
        title: "Company Profile",
        desc: "Learn more about Vertex Controls, our expertise, industries served, capabilities and engineering solutions.",
        targetFilter: "Company Documents"
      },
      {
        index: "02",
        icon: "FaBookOpen",
        title: "Product Brochures",
        desc: "Overview brochures covering automation systems, electrical engineering, MEP services, smart infrastructure and industrial technologies.",
        targetFilter: "Brochures"
      },
      {
        index: "03",
        icon: "FaFileAlt",
        title: "Technical Datasheets",
        desc: "Detailed specifications, performance data and product information for control panels, PLC systems, MCC panels, energy monitoring systems and industrial equipment.",
        targetFilter: "Datasheets"
      },
      {
        index: "04",
        icon: "FaListAlt",
        title: "Catalogues",
        desc: "Comprehensive product catalogues with available engineering solutions, components and system configurations.",
        targetFilter: "Catalogues"
      },
      {
        index: "05",
        icon: "FaWrench",
        title: "Operation & Maintenance Manuals",
        desc: "Installation guides, user manuals, maintenance instructions and operational documentation.",
        targetFilter: "Manuals"
      },
      {
        index: "06",
        icon: "FaCertificate",
        title: "Certifications & Company Documents",
        desc: "Trade License, VAT Registration, Quality Certificates, Compliance Documents and other official company documentation.",
        targetFilter: "Certificates"
      }
    ],
    documents: [
      {
        title: "Vertex Controls Corporate Profile",
        category: "Company Documents",
        desc: "Learn more about Vertex Controls, our expertise, industries served, capabilities and engineering solutions.",
        size: "4.8 MB",
        updatedDate: "May 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Industrial Automation Brochure",
        category: "Brochures",
        desc: "Detailed overview of automation solutions, PLC logic programming, and custom SCADA interfaces.",
        size: "3.2 MB",
        updatedDate: "Jun 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Type-Tested Control Panel Catalogue",
        category: "Catalogues",
        desc: "Technical specification sheets and dimensions for MDB, SMDB, capacitor bank, and control panels.",
        size: "12.5 MB",
        updatedDate: "Apr 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "PLC & SCADA Systems Solutions Guide",
        category: "Brochures",
        desc: "Detailed systems engineering guide explaining telemetry integrations, network protocols, and SCADA control layouts.",
        size: "6.7 MB",
        updatedDate: "Jun 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Electrical & MEP Services Brochure",
        category: "Brochures",
        desc: "Our engineering capabilities for electrical installations, switchgear modifications, testing, and commissioning.",
        size: "2.9 MB",
        updatedDate: "May 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "AI-Driven Predictive Maintenance Overview",
        category: "Brochures",
        desc: "Introduction to smart industrial IoT telemetry sensors and cloud diagnostics to prevent machine downtime.",
        size: "1.8 MB",
        updatedDate: "Jun 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Energy Management Solutions Datasheet",
        category: "Datasheets",
        desc: "Detailed specifications and data sheets for automatic capacitor banks, power factor controllers, and active filters.",
        size: "2.4 MB",
        updatedDate: "Mar 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Industrial IoT Telemetry Solutions Datasheet",
        category: "Datasheets",
        desc: "Product specs for telemetry gateway units, wireless RTU nodes, cloud databases, and industrial sensors.",
        size: "3.5 MB",
        updatedDate: "Feb 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Annual Maintenance Contracts (AMC) Services Catalogue",
        category: "Catalogues",
        desc: "Comprehensive catalogue of preventative service plans, SLA frameworks, and 24/7 technical on-call services.",
        size: "4.1 MB",
        updatedDate: "May 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Smart Infrastructure & BMS Solutions Guide",
        category: "Brochures",
        desc: "Technical implementation guide for central SCADA, DALI lighting controllers, and integrated building automation systems.",
        size: "5.3 MB",
        updatedDate: "Apr 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "Vertex Controls Official Trade License",
        category: "Certificates",
        desc: "Official business license copy certified by the Dubai Department of Economy and Tourism (DET).",
        size: "1.2 MB",
        updatedDate: "Jan 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      },
      {
        title: "VAT Registration Certificate",
        category: "Certificates",
        desc: "Official VAT tax registration certificate issued by the Federal Tax Authority (FTA) of the United Arab Emirates.",
        size: "0.85 MB",
        updatedDate: "Jan 2026",
        downloadUrl: "/downloads/vertex_document.pdf"
      }
    ],
    whyFeatures: [
      {
        icon: "FaCheckCircle",
        title: "Latest Technical Information",
        desc: "Get access to up-to-date specifications, drawing details and catalogs approved by our engineering leads."
      },
      {
        icon: "FaCertificate",
        title: "Engineering Approved Documentation",
        desc: "All drawings, datasheets and guides conform to international electromechanical safety codes and UAE standards."
      },
      {
        icon: "FaLock",
        title: "Easy PDF Downloads",
        desc: "One-click downloads. No subscription, no login gateways, just raw technical resources for engineering professionals."
      },
      {
        icon: "FaSyncAlt",
        title: "Regularly Updated Resources",
        desc: "Our design team updates documentation frequently to align with component modifications, certification additions and software iterations."
      }
    ]
  },
  contact: {
    hero: {
      pulseBadge: "Electromechanical & Automation UAE",
      title: "Contact Us",
      subtitle: "Let's Connect",
      lead: "Whether you're planning a new engineering project, upgrading existing systems, or seeking expert technical support, the team at Vertex Controls Electromechanical LLC is ready to assist. Contact us today to discuss your requirements, request a quotation, or learn more about our engineering solutions.",
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
      lead: "Looking for a trusted, certified engineering partner in the UAE? Get in touch with us to receive custom blueprints, SLAs, or competitive commercial tenders for:",
      servicesList: [
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
      ]
    },
    bentoHeader: {
      subTag: "The Vertex Advantage",
      title: "Engineered for Reliability",
      desc: "Vertex Controls LLC brings automated precision, technical transparency, and top-tier industrial safety standards to MEP, energy, and SCADA engineering."
    },
    bentoItems: [
      {
        icon: "FaClock",
        title: "Rapid Response",
        description: "Immediate critical support. We ensure 24/7 technical hotline access and rapid response teams deployed across Dubai and the Northern Emirates.",
        colSpan: "bento-cols-4"
      },
      {
        icon: "FaTools",
        title: "Engineering Expertise",
        description: "Our engineers specialize in high-end PLC programming, complex MCC panels, SCADA dashboards, mechanical systems, and telemetry optimization designed to withstand harsh industrial environments.",
        colSpan: "bento-cols-8"
      },
      {
        icon: "FaBuilding",
        title: "Customized Solutions",
        description: "No generic templates. We conduct detailed site assessments to construct bespoke electromechanical schematics tailored to the precise specifications of your facility.",
        colSpan: "bento-cols-6"
      },
      {
        icon: "FaHeadset",
        title: "Reliable Support",
        description: "Strict SLA compliance. From testing and commissioning to preventive maintenance cycles, we guarantee active support to keep your operations running at peak performance.",
        colSpan: "bento-cols-6"
      },
      {
        icon: "FaShieldAlt",
        title: "Industry Experience",
        description: "Integrated partner with key industrial and infrastructure hubs across the GCC. We deliver ISO-compliant, certified electromechanical systems engineered to highest safety standards.",
        colSpan: "bento-cols-8"
      },
      {
        icon: "FaLightbulb",
        title: "Innovation",
        description: "Pioneering smart engineering. We embed intelligent IoT gateways and predictive maintenance systems that monitor electrical grids and prevent downtime.",
        colSpan: "bento-cols-4"
      }
    ],
    finalCta: {
      title: "We're Here to Help",
      desc: "At Vertex Controls Electromechanical LLC, we are committed to delivering innovative engineering solutions, reliable technical expertise, and exceptional customer service. Whether your project is large or small, our team is ready to help you achieve efficient, intelligent, and sustainable results.",
      tagline: "Engineering Intelligence. // Automated Excellence.",
      phoneUrl: "tel:+971554962866",
      phoneText: "Call Now"
    }
  },
  quote: {
    hero: {
      title: "Request a Quote",
      subtitle: "Tell us about your project and our engineering team will prepare a tailored quotation."
    },
    infoCard: {
      title: "Vertex Controls Advantage",
      lead: "Partner with a certified electromechanical systems integrator in the UAE.",
      features: [
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
      ],
      phoneLabel: "Talk to an Engineer directly",
      phoneUrl: "tel:+971554962866",
      phoneText: "+971 55 496 2866",
      whatsappUrl: "https://wa.me/971554962866",
      whatsappText: "Chat on WhatsApp"
    }
  },
  servicesSubpages: {},
  projectsSubpages: {}
};

// Copy bundled content to /tmp if running on Vercel
if (IS_VERCEL) {
    try {
        if (!fs.existsSync(CONTENT_FILE_PATH)) {
            if (fs.existsSync(BUNDLED_CONTENT_PATH)) {
                fs.copyFileSync(BUNDLED_CONTENT_PATH, CONTENT_FILE_PATH);
                console.log("[Vercel Init] Copied bundled siteContent.json to /tmp");
            } else {
                fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(defaultContent, null, 2), "utf8");
                console.log("[Vercel Init] Created siteContent.json in /tmp with defaults");
            }
        }
        if (!fs.existsSync(SUBMISSIONS_FILE_PATH)) {
            if (fs.existsSync(BUNDLED_SUBMISSIONS_PATH)) {
                fs.copyFileSync(BUNDLED_SUBMISSIONS_PATH, SUBMISSIONS_FILE_PATH);
                console.log("[Vercel Init] Copied bundled submissions.json to /tmp");
            } else {
                fs.writeFileSync(SUBMISSIONS_FILE_PATH, "[]", "utf8");
                console.log("[Vercel Init] Created empty submissions.json in /tmp");
            }
        }
    } catch (err) {
        console.error("[Vercel Init] Error copying files to /tmp:", err);
    }
} else {
    // Check if content file exists, create with default if missing
    if (!fs.existsSync(CONTENT_FILE_PATH)) {
        fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(defaultContent, null, 2), "utf8");
    }
}

// Helper to load content data (from KV if configured, otherwise fallback to local filesystem)
async function loadContentData() {
    if (isKvConfigured) {
        try {
            const kvRes = await fetch(`${KV_REST_API_URL}/get/siteContent`, {
                headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` }
            });
            if (kvRes.ok) {
                const kvData = await kvRes.json();
                if (kvData.result) {
                    return JSON.parse(kvData.result);
                }
            }
        } catch (err) {
            console.error("[KV Loader] Error reading siteContent from Vercel KV:", err);
        }
    }
    try {
        if (fs.existsSync(CONTENT_FILE_PATH)) {
            const fileData = fs.readFileSync(CONTENT_FILE_PATH, "utf8");
            return JSON.parse(fileData);
        }
    } catch (err) {
        console.error("[File Loader] Error reading content from file:", err);
    }
    return defaultContent;
}

// Helper to save content data
async function saveContentData(contentObj) {
    if (isKvConfigured) {
        try {
            const kvRes = await fetch(KV_REST_API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${KV_REST_API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(["set", "siteContent", JSON.stringify(contentObj)])
            });
            if (!kvRes.ok) {
                console.error("[KV Writer] Failed to save siteContent to Vercel KV:", await kvRes.text());
            }
        } catch (err) {
            console.error("[KV Writer] Error writing siteContent to Vercel KV:", err);
        }
    }
    try {
        fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(contentObj, null, 2), "utf8");
    } catch (err) {
        console.error("[File Writer] Error writing content to file:", err);
    }
}

// Helper to load submissions
async function loadSubmissionsData() {
    if (isKvConfigured) {
        try {
            const kvRes = await fetch(`${KV_REST_API_URL}/get/submissions`, {
                headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` }
            });
            if (kvRes.ok) {
                const kvData = await kvRes.json();
                if (kvData.result) {
                    return JSON.parse(kvData.result);
                }
            }
        } catch (err) {
            console.error("[KV Loader] Error reading submissions from Vercel KV:", err);
        }
    }
    try {
        if (fs.existsSync(SUBMISSIONS_FILE_PATH)) {
            const fileData = fs.readFileSync(SUBMISSIONS_FILE_PATH, "utf8");
            return JSON.parse(fileData);
        }
    } catch (err) {
        console.error("[File Loader] Error reading submissions from file:", err);
    }
    return [];
}

// Helper to save submissions
async function saveSubmissionsData(submissionsArray) {
    if (isKvConfigured) {
        try {
            const kvRes = await fetch(KV_REST_API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${KV_REST_API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(["set", "submissions", JSON.stringify(submissionsArray)])
            });
            if (!kvRes.ok) {
                console.error("[KV Writer] Failed to save submissions to Vercel KV:", await kvRes.text());
            }
        } catch (err) {
            console.error("[KV Writer] Error writing submissions to Vercel KV:", err);
        }
    }
    try {
        fs.writeFileSync(SUBMISSIONS_FILE_PATH, JSON.stringify(submissionsArray, null, 2), "utf8");
    } catch (err) {
        console.error("[File Writer] Error writing submissions to file:", err);
    }
}

// Asynchronously initialize Vercel KV with content if empty
if (isKvConfigured) {
    (async () => {
        try {
            const kvRes = await fetch(`${KV_REST_API_URL}/get/siteContent`, {
                headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` }
            });
            if (kvRes.ok) {
                const kvData = await kvRes.json();
                if (!kvData.result) {
                    let initialContent = defaultContent;
                    try {
                        const contentToLoad = fs.existsSync(BUNDLED_CONTENT_PATH) ? BUNDLED_CONTENT_PATH : CONTENT_FILE_PATH;
                        if (fs.existsSync(contentToLoad)) {
                            initialContent = JSON.parse(fs.readFileSync(contentToLoad, "utf8"));
                        }
                    } catch (readErr) {
                        console.error("[KV Init] Failed to read fallback siteContent:", readErr);
                    }
                    await fetch(KV_REST_API_URL, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${KV_REST_API_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(["set", "siteContent", JSON.stringify(initialContent)])
                    });
                    console.log("[KV Init] Successfully initialized Vercel KV with site content database.");
                }
            }
        } catch (err) {
            console.error("[KV Init] Error during Vercel KV initialization check:", err);
        }
    })();
}

// Function to handle JSON response
const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};

// Mime types helper for static files
const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".mp4": "video/mp4",
    ".pdf": "application/pdf"
};

// Create Native HTTP Server
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // Enable CORS header for development environment
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // API ENDPOINT: GET /api/content
    if (url.pathname === "/api/content" && req.method === "GET") {
        loadContentData().then(contentData => {
            sendJSON(res, 200, contentData);
        }).catch(err => {
            console.error("GET /api/content error:", err);
            sendJSON(res, 500, { message: "Error reading site content database." });
        });
        return;
    }

    // API ENDPOINT: POST /api/content (Requires Authorization token check)
    if (url.pathname === "/api/content" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk; });
        req.on("end", async () => {
            const authHeader = req.headers["authorization"] || "";
            const token = authHeader.replace("Bearer ", "").trim();

            if (token !== SESSION_TOKEN) {
                return sendJSON(res, 401, { message: "Unauthorized admin session. Please log in again." });
            }

            try {
                const parsedContent = JSON.parse(body);
                await saveContentData(parsedContent);
                sendJSON(res, 200, { message: "Site content updated successfully!" });
            } catch (err) {
                sendJSON(res, 400, { message: "Malformed JSON payload structure." });
            }
        });
        return;
    }

    // API ENDPOINT: POST /api/contact
    if (url.pathname === "/api/contact" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk; });
        req.on("end", async () => {
            try {
                const { name, company, email, phone, service, message } = JSON.parse(body);
                if (!name || !email || !message) {
                    return sendJSON(res, 400, { message: "Name, email, and message are required." });
                }

                // Strict email format validation
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email.trim())) {
                    return sendJSON(res, 400, { message: "Please provide a valid email address." });
                }

                // Phone is optional but validated if provided
                if (phone && phone.trim() !== "") {
                    const cleanPhone = phone.replace(/[\s()-]/g, "");
                    const phoneRegex = /^\+?[0-9]{7,15}$/;
                    if (!phoneRegex.test(cleanPhone)) {
                        return sendJSON(res, 400, { message: "Please provide a valid phone number (7 to 15 digits)." });
                    }
                }

                const submission = {
                    id: `VTX-CONTACT-${Date.now()}`,
                    type: "contact",
                    date: new Date().toISOString(),
                    name,
                    company: company || "N/A",
                    email,
                    phone: phone || "Not Provided",
                    service: service || "General Inquiry",
                    message
                };

                const submissions = await loadSubmissionsData();
                submissions.unshift(submission);
                await saveSubmissionsData(submissions);

                const fields = [
                    { label: "Name", value: name },
                    { label: "Company", value: company || "N/A" },
                    { label: "Email", value: `<a href="mailto:${email}" style="color: #0f6fff; text-decoration: underline; font-weight: bold;">${email}</a>` },
                    { label: "Phone", value: `<a href="tel:${phone}" style="color: #0f6fff; text-decoration: underline; font-weight: bold;">${phone}</a>` },
                    { label: "Service Interest", value: `<span style="color: #050c1a; font-weight: bold;">${service}</span>` }
                ];

                const emailHtml = buildEmailTemplate("New Contact Us Inquiry", fields, message, submission.id, submission.date);

                await sendEmailNotification(`[Contact Inquiry] ${service} - from ${name}`, emailHtml);

                sendJSON(res, 200, { message: "Contact request submitted successfully!", id: submission.id });
            } catch (err) {
                console.error("Error processing contact submission:", err);
                sendJSON(res, 500, { message: "Internal server error processing submission." });
            }
        });
        return;
    }

    // API ENDPOINT: POST /api/quote
    if (url.pathname === "/api/quote" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk; });
        req.on("end", async () => {
            try {
                const { companyName, contactPerson, email, phone, serviceRequired, projectLocation, projectDetails, fileName, fileData } = JSON.parse(body);
                if (!companyName || !contactPerson || !email || !phone || !serviceRequired || !projectLocation || !projectDetails) {
                    return sendJSON(res, 400, { message: "Missing required fields." });
                }

                // Strict email and phone format validation
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email.trim())) {
                    return sendJSON(res, 400, { message: "Please provide a valid email address." });
                }

                const cleanPhone = phone.replace(/[\s()-]/g, "");
                const phoneRegex = /^\+?[0-9]{7,15}$/;
                if (!phoneRegex.test(cleanPhone)) {
                    return sendJSON(res, 400, { message: "Please provide a valid phone number (7 to 15 digits)." });
                }

                const submission = {
                    id: `VTX-RFQ-${Date.now()}`,
                    type: "quote",
                    date: new Date().toISOString(),
                    companyName,
                    contactPerson,
                    email,
                    phone,
                    serviceRequired,
                    projectLocation,
                    projectDetails,
                    fileName: fileName || null
                };

                const submissions = await loadSubmissionsData();
                submissions.unshift(submission);
                await saveSubmissionsData(submissions);

                const fields = [
                    { label: "Company Name", value: companyName },
                    { label: "Contact Person", value: contactPerson },
                    { label: "Email", value: `<a href="mailto:${email}" style="color: #0f6fff; text-decoration: underline; font-weight: bold;">${email}</a>` },
                    { label: "Phone", value: `<a href="tel:${phone}" style="color: #0f6fff; text-decoration: underline; font-weight: bold;">${phone}</a>` },
                    { label: "Service Required", value: `<span style="color: #050c1a; font-weight: bold;">${serviceRequired}</span>` },
                    { label: "Project Location", value: projectLocation },
                    { label: "Attached File", value: fileName ? `<strong>${fileName}</strong> (Attached to this email)` : "No attachment" }
                ];

                const emailHtml = buildEmailTemplate("New Request For Quote (RFQ)", fields, projectDetails, submission.id, submission.date);

                let emailAttachment = null;
                if (fileName && fileData) {
                    emailAttachment = {
                        filename: fileName,
                        content: fileData
                    };
                }

                await sendEmailNotification(`[RFQ Quote Request] ${serviceRequired} - from ${companyName}`, emailHtml, emailAttachment);

                sendJSON(res, 200, { message: "Quote request submitted successfully!", id: submission.id });
            } catch (err) {
                console.error("Error processing quote submission:", err);
                sendJSON(res, 500, { message: "Internal server error processing quote request." });
            }
        });
        return;
    }

    // API ENDPOINT: POST /api/login
    if (url.pathname === "/api/login" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk; });
        req.on("end", () => {
            try {
                const { password } = JSON.parse(body);
                if (password === ADMIN_PASSWORD) {
                    sendJSON(res, 200, { token: SESSION_TOKEN });
                } else {
                    sendJSON(res, 401, { message: "Incorrect password attempt." });
                }
            } catch (err) {
                sendJSON(res, 400, { message: "Invalid payload request." });
            }
        });
        return;
    }

    // API ENDPOINT: POST /api/upload
    if (url.pathname === "/api/upload" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk; });
        req.on("end", async () => {
            const authHeader = req.headers["authorization"] || "";
            const token = authHeader.replace("Bearer ", "").trim();

            if (token !== SESSION_TOKEN) {
                return sendJSON(res, 401, { message: "Unauthorized. Please log in." });
            }

            try {
                const { filename, fileData } = JSON.parse(body);
                if (!filename || !fileData) {
                    return sendJSON(res, 400, { message: "Filename and fileData are required." });
                }

                // 1. Cloudinary upload if configured
                if (isCloudinaryConfigured) {
                    try {
                        const ext = path.extname(filename).toLowerCase();
                        const rawExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".zip", ".txt", ".csv"];
                        const resourceType = rawExtensions.includes(ext) ? "raw" : "image";

                        const timestamp = Math.round(new Date().getTime() / 1000);
                        const folder = "vertex_uploads";

                        // Generate clean unique filename
                        const cleanBase = path.basename(filename, ext).replace(/[^a-zA-Z0-9.\-_]/g, "_");
                        const uniqueSuffix = Math.round(Math.random() * 1e5);
                        const uniqueBase = `${cleanBase}_${uniqueSuffix}`;
                        const publicId = resourceType === "raw" ? `${uniqueBase}${ext}` : uniqueBase;

                        // Sort parameters alphabetically: folder, public_id, timestamp
                        const stringToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
                        const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

                        const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`, {
                             method: "POST",
                             headers: {
                                 "Content-Type": "application/json"
                             },
                             body: JSON.stringify({
                                 file: fileData,
                                 timestamp: timestamp.toString(),
                                 api_key: CLOUDINARY_API_KEY,
                                 signature: signature,
                                 folder: folder,
                                 public_id: publicId
                             })
                         });

                        if (!cloudRes.ok) {
                            const errBody = await cloudRes.text();
                            console.error("[Cloudinary API Error]", errBody);
                            return sendJSON(res, 500, { message: `Cloudinary upload failed: ${errBody}` });
                        }

                        const cloudData = await cloudRes.json();
                        return sendJSON(res, 200, { url: cloudData.secure_url });
                    } catch (cloudErr) {
                        console.error("[Cloudinary catch error]", cloudErr);
                        return sendJSON(res, 500, { message: `Cloudinary upload exception: ${cloudErr.message}` });
                    }
                }

                // 2. Vercel fallback (base64)
                if (IS_VERCEL) {
                    return sendJSON(res, 200, { url: fileData });
                }

                // 3. Local filesystem write
                const base64Data = fileData.split(";base64,").pop();
                const buffer = Buffer.from(base64Data, "base64");

                // Prevent directory traversal attacks
                const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "");
                const uniqueFilename = `${Date.now()}-${safeFilename}`;
                const uploadPath = path.join(UPLOAD_DIR_PATH, uniqueFilename);

                fs.writeFile(uploadPath, buffer, (err) => {
                    if (err) {
                        return sendJSON(res, 500, { message: "Failed to write media asset to disk." });
                    }
                    sendJSON(res, 200, { url: `/Images/uploads/${uniqueFilename}` });
                });
            } catch (err) {
                sendJSON(res, 400, { message: "Invalid upload request metadata." });
            }
        });
        return;
    }

    // STATIC FILE SERVING (Production fallback)
    // Serve uploaded files
    if (url.pathname.startsWith("/Images/uploads/")) {
        const filePath = path.join(UPLOAD_DIR_PATH, path.basename(url.pathname));
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Image not found");
                return;
            }
            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
            res.end(content);
        });
        return;
    }

    // Default static file serving (for index.html, static assets inside dist)
    if (process.env.NODE_ENV === "production" || fs.existsSync(STATIC_DIR_PATH)) {
        let filePath = path.join(STATIC_DIR_PATH, url.pathname);
        if (url.pathname === "/") {
            filePath = path.join(STATIC_DIR_PATH, "index.html");
        }

        // If file doesn't exist, serve index.html (SPA client-side router support)
        if (!fs.existsSync(filePath)) {
            filePath = path.join(STATIC_DIR_PATH, "index.html");
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error serving static assets.");
                return;
            }
            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "text/html" });
            res.end(content);
        });
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Resource not found. API routes are operational.");
});

server.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  Vertex CMS Server Running on Port ${PORT}`);
    console.log(`  Access Site Content API at http://localhost:${PORT}/api/content`);
    console.log(`===============================================`);
});
