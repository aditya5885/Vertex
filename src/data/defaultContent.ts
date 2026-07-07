import type { ServiceSubpageData, ProjectSubpageData } from "./subpageDefaults";

export interface SiteContent {
  navbar: {
    logoUrl: string;
    navLinks: Array<{
      name: string;
      path: string;
      submenus?: Array<{ name: string; path: string }>;
    }>;
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    companyName: string;
    copyright: string;
  };
  home: {
    hero: {
      badge: string;
      title: string;
      highlightText: string;
      lead: string;
    };
    stats: Array<{ num: string; label: string }>;
    aboutShort: {
      subTag: string;
      title: string;
      lead: string;
      body: string;
    };
    whyChoose: string[];
    solutions: Array<{ title: string; cat: string; spec: string; image: string }>;
    process: Array<{ title: string; desc: string }>;
    projectHighlights: Array<{ title: string; cat: string; location: string; desc: string; image: string }>;
    contactPreview: { address: string; phone: string; email: string; mapEmbedUrl: string };
  };
  about: {
    hero: {
      badge: string;
      title: string;
      lead: string;
    };
    mission: {
      title: string;
      body: string;
    };
    vision: {
      title: string;
      body: string;
    };
    overview: { title: string; body: string; image: string; badgeText: string };
    values: Array<{ title: string; desc: string }>;
    whyChoose: string[];
    stats: Array<{ value: number; suffix: string; label: string }>;
    cta: { title: string; desc: string };
  };
  services: {
    hero: {
      title: string;
      lead: string;
    };
    list: Array<{
      title: string;
      desc: string;
      link: string;
    }>;
    workflow: Array<{ title: string; desc: string }>;
    whyChoose: Array<{ title: string; desc: string }>;
    industries: string[];
    technologies: string[];
    capabilities: string[];
  };
  projects: {
    hero: {
      title: string;
      lead: string;
    };
    categories: Array<{
      title: string;
      desc: string;
      scope: string;
      image: string;
    }>;
    videos: Array<{
      title: string;
      desc: string;
      bgImage: string;
      videoUrl: string;
      handle: string;
      tagline: string;
    }>;
    portfolio: Array<{
      title: string;
      category: string;
      desc: string;
    }>;
    overview: { title: string; lead: string; body: string };
    industries: Array<{ title: string; desc: string }>;
    deliverySteps: Array<{ title: string; desc: string }>;
  };
  products: {
    hero: {
      title: string;
      lead: string;
    };
    categories: string[];
    productList: Array<{
      name: string;
      category: string;
      desc: string;
      image: string;
      features: string[];
      datasheetText?: string;
      datasheetUrl?: string;
      quoteText?: string;
      quoteUrl?: string;
    }>;
    featuredProduct: {
      title: string;
      image: string;
      overview: string;
      applications: string[];
      specs: Array<{ name: string; value: string }>;
      datasheetText?: string;
      datasheetUrl?: string;
      quoteText?: string;
      quoteUrl?: string;
    };
    whyChooseList: Array<{
      icon: string;
      title: string;
      desc: string;
      compliance: string;
      percentage: number;
      bullets: string[];
    }>;
    industries: Array<{
      icon: string;
      name: string;
      desc: string;
      systems: string;
    }>;
    customSolution: {
      title: string;
      desc: string;
      btn1Text?: string;
      btn1Url?: string;
      btn2Text?: string;
      btn2Url?: string;
    };
    footerCta?: {
      title: string;
      desc: string;
    };
  };
  downloads: {
    hero: {
      title: string;
      lead: string;
    };
    categories: Array<{
      index: string;
      icon: string;
      title: string;
      desc: string;
      targetFilter: string;
    }>;
    documents: Array<{
      title: string;
      category: string;
      desc: string;
      size: string;
      updatedDate: string;
      downloadUrl: string;
    }>;
    whyFeatures: Array<{
      icon: string;
      title: string;
      desc: string;
    }>;
  };
  contact: {
    hero: {
      pulseBadge: string;
      title: string;
      subtitle: string;
      lead: string;
      phoneUrl: string;
      phoneText: string;
    };
    infoCard: {
      title: string;
      companyName: string;
      address: string;
      country: string;
      phone: string;
      email: string;
      website: string;
    };
    hoursCard: {
      title: string;
      weekDaysTitle: string;
      weekDaysHours: string;
      sundayTitle: string;
      sundayHours: string;
      disclaimer: string;
    };
    mapCard: {
      title: string;
      embedUrl: string;
    };
    quoteSection: {
      title: string;
      lead: string;
      servicesList: string[];
    };
    bentoHeader: {
      subTag: string;
      title: string;
      desc: string;
    };
    bentoItems: Array<{
      icon: string;
      title: string;
      description: string;
      colSpan: string;
    }>;
    finalCta: {
      title: string;
      desc: string;
      tagline: string;
      phoneUrl: string;
      phoneText: string;
    };
  };
  quote: {
    hero: {
      title: string;
      subtitle: string;
    };
    infoCard: {
      title: string;
      lead: string;
      features: Array<{
        title: string;
        desc: string;
      }>;
      phoneLabel: string;
      phoneUrl: string;
      phoneText: string;
      whatsappUrl: string;
      whatsappText: string;
    };
  };
  servicesSubpages?: Record<string, ServiceSubpageData>;
  projectsSubpages?: Record<string, ProjectSubpageData>;
}

export const defaultContent: SiteContent = {
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
      { title: "MCC Panels", cat: "Power Distribution", spec: "IEC 61439 Certified", image: "/Images/Products/08d07495-ea3a-4a50-8291-b81c2c99f4a9.webp" },
      { title: "PLC Control Panels", cat: "Automation", spec: "Real-time Logic", image: "/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp" },
      { title: "SCADA Systems", cat: "Telemetry & Software", spec: "HMI Dashboards", image: "/Images/Products/3b41b48b-793d-4b06-b872-8a701ecd05d0.webp" },
      { title: "Energy Monitoring", cat: "Smart Grid", spec: "AI Power Analytics", image: "/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp" },
      { title: "Smart Lighting", cat: "ELV Integration", spec: "DALI Protocols", image: "/Images/Products/61b16c79-0f71-4ee6-87c5-396b8123796c.webp" },
      { title: "Industrial IoT", cat: "Cloud Gateways", spec: "Telemetry Sensors", image: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp" }
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
        image: "/Images/Products/08d07495-ea3a-4a50-8291-b81c2c99f4a9.webp"
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
        image: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp"
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
        downloadUrl: ""
      },
      {
        title: "Industrial Automation Brochure",
        category: "Brochures",
        desc: "Detailed overview of automation solutions, PLC logic programming, and custom SCADA interfaces.",
        size: "3.2 MB",
        updatedDate: "Jun 2026",
        downloadUrl: ""
      },
      {
        title: "Type-Tested Control Panel Catalogue",
        category: "Catalogues",
        desc: "Technical specification sheets and dimensions for MDB, SMDB, capacitor bank, and control panels.",
        size: "12.5 MB",
        updatedDate: "Apr 2026",
        downloadUrl: ""
      },
      {
        title: "PLC & SCADA Systems Solutions Guide",
        category: "Brochures",
        desc: "Detailed systems engineering guide explaining telemetry integrations, network protocols, and SCADA control layouts.",
        size: "6.7 MB",
        updatedDate: "Jun 2026",
        downloadUrl: ""
      },
      {
        title: "Electrical & MEP Services Brochure",
        category: "Brochures",
        desc: "Our engineering capabilities for electrical installations, switchgear modifications, testing, and commissioning.",
        size: "2.9 MB",
        updatedDate: "May 2026",
        downloadUrl: ""
      },
      {
        title: "AI-Driven Predictive Maintenance Overview",
        category: "Brochures",
        desc: "Introduction to smart industrial IoT telemetry sensors and cloud diagnostics to prevent machine downtime.",
        size: "1.8 MB",
        updatedDate: "Jun 2026",
        downloadUrl: ""
      },
      {
        title: "Energy Management Solutions Datasheet",
        category: "Datasheets",
        desc: "Detailed specifications and data sheets for automatic capacitor banks, power factor controllers, and active filters.",
        size: "2.4 MB",
        updatedDate: "Mar 2026",
        downloadUrl: ""
      },
      {
        title: "Industrial IoT Telemetry Solutions Datasheet",
        category: "Datasheets",
        desc: "Product specs for telemetry gateway units, wireless RTU nodes, cloud databases, and industrial sensors.",
        size: "3.5 MB",
        updatedDate: "Feb 2026",
        downloadUrl: ""
      },
      {
        title: "Annual Maintenance Contracts (AMC) Services Catalogue",
        category: "Catalogues",
        desc: "Comprehensive catalogue of preventative service plans, SLA frameworks, and 24/7 technical on-call services.",
        size: "4.1 MB",
        updatedDate: "May 2026",
        downloadUrl: ""
      },
      {
        title: "Smart Infrastructure & BMS Solutions Guide",
        category: "Brochures",
        desc: "Technical implementation guide for central SCADA, DALI lighting controllers, and integrated building automation systems.",
        size: "5.3 MB",
        updatedDate: "Apr 2026",
        downloadUrl: ""
      },
      {
        title: "Vertex Controls Official Trade License",
        category: "Certificates",
        desc: "Official business license copy certified by the Dubai Department of Economy and Tourism (DET).",
        size: "1.2 MB",
        updatedDate: "Jan 2026",
        downloadUrl: ""
      },
      {
        title: "VAT Registration Certificate",
        category: "Certificates",
        desc: "Official VAT tax registration certificate issued by the Federal Tax Authority (FTA) of the United Arab Emirates.",
        size: "0.85 MB",
        updatedDate: "Jan 2026",
        downloadUrl: ""
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
