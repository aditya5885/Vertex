export interface ServiceSubpageData {
    seo: {
        title: string;
        description: string;
    };
    hero: {
        badgeText: string;
        title: string;
        lead: string;
    };
    overview: {
        subTag: string;
        title: string;
        lead: string;
        body: string;
        imageSrc: string;
    };
    solutions: Array<{
        icon: string;
        title: string;
        desc: string;
        features: string[];
    }>;
    whyChoose: Array<{
        icon: string;
        title: string;
        desc: string;
    }>;
    cta: {
        title: string;
        desc: string;
        phone: string;
        email: string;
        location: string;
    };
}

export interface ProjectSubpageData {
    seo: {
        title: string;
        description: string;
    };
    hero: {
        badgeText: string;
        title: string;
        lead: string;
    };
    overview: {
        subTag: string;
        title: string;
        lead: string;
        imageSrc: string;
        statusText: string;
        locationText: string;
        objectives: Array<{
            icon: string;
            title: string;
            desc: string;
        }>;
        scopeTags: string[];
    };
    servicesDelivered: Array<{
        icon: string;
        title: string;
        desc: string;
    }>;
    highlights: Array<{
        icon: string;
        title: string;
        value: string;
    }>;
    gallery: Array<{
        src: string;
        caption: string;
    }>;
    cta: {
        title: string;
        desc: string;
        phone: string;
        email: string;
    };
}

// ----------------------------------------------------
// DEFAULT SERVICES SUBPAGES DATA
// ----------------------------------------------------
export const defaultServicesSubpages: Record<string, ServiceSubpageData> = {
    "control-panels": {
        seo: {
            title: "Automation & Control Systems | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls designs, programs, and integrates custom PLC, SCADA, and HMI control systems in the UAE. ISO-compliant industrial automation services."
        },
        hero: {
            badgeText: "Core Service Prototype",
            title: "Automation & Control Systems",
            lead: "Empowering industrial operations with cutting-edge PLC programming, SCADA telemetry, and custom control panel integration built for maximum uptime and efficiency."
        },
        overview: {
            subTag: "End-to-End Automation",
            title: "Optimized Industrial Operations",
            lead: "At Vertex Controls, we specialize in transforming raw industrial processes into highly efficient, automated workflows that keep operations running 24/7.",
            body: "Our engineering team designs and deploys comprehensive systems utilizing elite hardware components and custom logic configurations. From legacy console upgrades to greenfield facility launches, we deliver robust, ISO-compliant architectures tailored to your plant's demands.",
            imageSrc: "/Images/Project/scada_showcase.webp"
        },
        solutions: [
            {
                icon: "FaMicrochip",
                title: "PLC Programming",
                desc: "Robust logic control configuration for Siemens, Rockwell, Schneider, and ABB systems to automate sequential and continuous industrial processes.",
                features: ["Custom Logic Design", "Safety PLC Integration", "PID Loop Tuning", "Multi-platform Conversion"]
            },
            {
                icon: "FaServer",
                title: "SCADA Systems",
                desc: "Comprehensive plant-wide monitoring platforms providing real-time data visualization, telemetry analysis, and historical reporting.",
                features: ["Interactive Dashboards", "Alarms & Notifications", "SQL Database Logging", "Custom Reporting Modules"]
            },
            {
                icon: "FaTv",
                title: "HMI Development",
                desc: "Intuitive touch-screen interfaces designed with ergonomic workflows, clear alarm management, and real-time process graphics.",
                features: ["Ergonomic UI/UX Layouts", "Local Diagnostics Screens", "Multi-language Support", "Trend & Graph Displays"]
            },
            {
                icon: "FaIndustry",
                title: "Industrial Automation",
                desc: "Complete process optimization, sensor-to-cloud integration, and automated loop controls for manufacturing, utilities, and plants.",
                features: ["Sensor Array Calibrations", "Telemetry & Networking", "Pneumatic Control Loops", "Energy Saving Protocols"]
            },
            {
                icon: "FaCloud",
                title: "Remote Monitoring",
                desc: "Cloud-connected telemetry systems allowing secure remote diagnostics, real-time mobile alerts, and off-site machinery status tracking.",
                features: ["IIoT Gateway Setup", "Email & SMS Alerting", "Secure VPN Access", "Web-based Dashboards"]
            },
            {
                icon: "FaCogs",
                title: "Control Panel Integration",
                desc: "Custom assembly, wiring, and rigorous type-testing of certified enclosures containing PLCs, VFDs, and power distribution components.",
                features: ["CAD Wiring Diagrams", "Component Selection", "Factory Acceptance Tests", "IP65 Rated Enclosures"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Decades of combined engineering execution delivering complex automated systems across critical UAE infrastructure sectors."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "100% factory acceptance testing (FAT) using premium, certified components from elite global automation brands."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Full compliance with local Civil Defense rules, utility guidelines (DEWA/ADDC), and IEC international safety standards."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "SLA response coverage, emergency on-site diagnostics, logic debugging, and prompt component replacement."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored automation logic and panel dimensions built specifically around your facility's requirements."
            }
        ],
        cta: {
            title: "Ready to Discuss Your Project?",
            desc: "Whether you need PLC programming configurations, SCADA visualization panels, custom HMI designs, or remote data setups, Vertex Controls delivers expert systems engineered for uptime.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    },
    "industrial-automation": {
        seo: {
            title: "Industrial Automation & SCADA Solutions | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls designs and deploys high-performance industrial automation, PLC programming, SCADA systems, HMI development, and industrial IoT solutions across the UAE."
        },
        hero: {
            badgeText: "Systems Integration",
            title: "Industrial Automation & SCADA",
            lead: "Orchestrating plant-wide efficiency and transparency through high-performance PLC programming, SCADA telemetry, and process automation solutions."
        },
        overview: {
            subTag: "Operational Excellence",
            title: "Reliable Process & SCADA Telemetry",
            lead: "At Vertex Controls, we deliver state-of-the-art industrial automation solutions that empower businesses to optimize process loops and telemetry streams.",
            body: "Our engineering crew designs and configures robust logical control cores, intuitive HMI visualization screens, and secure MQTT gateways. We optimize legacy architectures and build new process platforms conforming to strict international ISO standards.",
            imageSrc: "/Images/Project/scada_showcase.webp"
        },
        solutions: [
            {
                icon: "FaMicrochip",
                title: "PLC Programming",
                desc: "Robust logic control configuration for Siemens, Rockwell, Schneider, and ABB systems to automate sequential and continuous industrial processes.",
                features: ["Custom Logic Design", "Safety PLC Integration", "PID Loop Tuning", "Multi-platform Conversion"]
            },
            {
                icon: "FaServer",
                title: "SCADA Integration",
                desc: "Comprehensive plant-wide monitoring platforms providing real-time data visualization, telemetry analysis, and historical reporting.",
                features: ["Interactive Dashboards", "Alarms & Notifications", "SQL Database Logging", "Custom Reporting Modules"]
            },
            {
                icon: "FaTv",
                title: "HMI Development",
                desc: "Intuitive touch-screen interfaces designed with ergonomic workflows, clear alarm management, and real-time process graphics.",
                features: ["Ergonomic UI/UX Layouts", "Local Diagnostics Screens", "Multi-language Support", "Trend & Graph Displays"]
            },
            {
                icon: "FaIndustry",
                title: "Process Automation",
                desc: "Complete process optimization, sensor-to-cloud integration, and automated feedback loops to regulate temp, pressure, and chemical dosing.",
                features: ["Cascade Controls", "Telemetry & Networking", "Pneumatic Control Loops", "Energy Saving Protocols"]
            },
            {
                icon: "FaCloud",
                title: "IIoT Gateways",
                desc: "Cloud-connected telemetry systems allowing secure remote diagnostics, real-time mobile alerts, and off-site machinery status tracking.",
                features: ["Edge Computing Setup", "Email & SMS Alerting", "Secure VPN Access", "Web-based Dashboards"]
            },
            {
                icon: "FaTools",
                title: "Commissioning Services",
                desc: "On-site electrical and mechanical mounting, loop checks, sensor calibration, and start-up execution.",
                features: ["Field Ingress Checking", "Signal Loop Validation", "FAT & SAT Certifications", "Post-startup Handover"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Over 15 years integrating complex industrial machinery, water loops, and chemical dosing systems across the UAE."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "100% factory acceptance testing (FAT) using premium, certified components from elite global automation brands."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Full compliance with local Civil Defense rules, utility guidelines (DEWA/ADDC), and IEC international safety standards."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "SLA response coverage, emergency on-site diagnostics, logic debugging, and prompt component replacement."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored automation logic and panel dimensions built specifically around your facility's requirements."
            }
        ],
        cta: {
            title: "Ready to Discuss Your Project?",
            desc: "Whether you need industrial IoT edge gateways, secure cloud databases, vibration diagnostic modeling, or custom analytical dashboards, Vertex Controls delivers expert systems engineered for uptime.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    },
    "electrical-engineering": {
        seo: {
            title: "Electrical Engineering Services | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls designs and builds industrial LV switchgears, MDB panels, SMDBs, DB assemblies, motor controls, power factor controllers in Dubai, UAE."
        },
        hero: {
            badgeText: "Power & Distribution",
            title: "Electrical Engineering Services",
            lead: "Designing, manufacturing, testing, and commissioning heavy-duty low-voltage switchgears, power distribution assemblies, and energy optimization solutions in the UAE."
        },
        overview: {
            subTag: "Power Infrastructure",
            title: "Certified LV Panel Engineering",
            lead: "At Vertex Controls, we design robust electrical power configurations built around safety, load reliability, and utility code compliance.",
            body: "Our technicians build type-tested LV MDBs, SMDBs, distribution boards, VFD starter panels, and capacitor banks. We guarantee absolute compliance with DEWA, ADDC, SEWA, and international IEC directives to protect your plant operations.",
            imageSrc: "/Images/Project/mcc_showcase.webp"
        },
        solutions: [
            {
                icon: "FaCogs",
                title: "Main Distribution Boards (MDB)",
                desc: "Heavy-duty power entrance and protection panels built for primary facility current lines up to 4000A.",
                features: ["ACB & MCCB Protection", "Form 4 Enclosures", "Busbar Configurations", "Custom Metering Nodes"]
            },
            {
                icon: "FaSlidersH",
                title: "Sub-MDBs & DBs",
                desc: "Intermediate distribution assemblies feeding specific zones or sub-equipment arrays safely.",
                features: ["Compact Dimensions", "Easy Cable Entrance", "MCB Distribution Links", "IP55/65 Ingress Marks"]
            },
            {
                icon: "FaIndustry",
                title: "VFD & Starter Panels",
                desc: "Motor control cabinets containing Variable Frequency Drives, soft starters, and logic overrides.",
                features: ["Harmonic Line Filters", "Bypass Control Relays", "Vibration Cool Fans", "Modbus Command Links"]
            },
            {
                icon: "FaServer",
                title: "Capacitor Banks (APFC)",
                desc: "Automatic power factor controllers regulating reactive current loads to prevent utility penalty charges.",
                features: ["Detuned Reactor Coils", "Microprocessor Relays", "Step-switching Safety", "Reduced Carbon Footprint"]
            },
            {
                icon: "FaCloud",
                title: "ATS Panel Systems",
                desc: "Automatic Transfer Switches linking standby diesel generators to grid mains during power failures.",
                features: ["Dual-source Interlocks", "Grid Loss Sensing", "Cool-down Timer Logic", "Phase Synchrony Checks"]
            },
            {
                icon: "FaTools",
                title: "Retrofitting & Upgrades",
                desc: "Modernizing older switchgears by replacing worn breakers, adding digital monitoring, and rebuilding busbars.",
                features: ["Busbar Extensions", "Digital Multimeter Additions", "Relay Replacements", "Short Shutdown Schedules"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Expert panel builders and electrical engineers executing major power distribution systems across the GCC."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "Type-tested and fully certified panels utilizing top-grade components from Siemens, Schneider, and ABB."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Strict compliance with utility rules (DEWA, ADDC, SEWA) and international safety standards."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "Active response support, routine thermal inspections, power quality audits, and breakdown repairs."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored panel dimensions and component selections built around the exact load constraints of your plant."
            }
        ],
        cta: {
            title: "Ready to Discuss Your Power Needs?",
            desc: "Whether you require custom low-voltage MDBs, VFD control panels, ATS units, or power factor capacitor banks, Vertex Controls delivers expert power systems.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    },
    "mechanical-engineering": {
        seo: {
            title: "Mechanical & MEP Solutions | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls designs and installs industrial chiller piping, pump assemblies, HVAC ductwork, ventilation systems, booster pumps in Dubai, UAE."
        },
        hero: {
            badgeText: "HVAC & Piping",
            title: "Mechanical & MEP Solutions",
            lead: "Deploying high-performance chiller piping, HVAC assemblies, heavy pump manifolds, and ducting systems engineered for heavy-duty commercial facility uptime."
        },
        overview: {
            subTag: "Mechanical Excellence",
            title: "Industrial Plumbing & Manifolds",
            lead: "At Vertex Controls, we design robust mechanical fluid loops and HVAC ductwork built to endure extreme UAE climatic demands.",
            body: "Our welders and fitters fabricate carbon/stainless steel chiller pipes, configure variable-speed pump skids, and mount central ventilation plants. We deliver high-efficiency, insulated HVAC flow lines that conform to regional green building codes.",
            imageSrc: "/Images/Project/lighting_showcase.webp"
        },
        solutions: [
            {
                icon: "FaCogs",
                title: "Chiller Piping & Welds",
                desc: "Welded heavy-gauge steel and copper piping loops circulating cold water between chillers and AHUs.",
                features: ["TIG & ARC Certified Welds", "Armaflex Foam Insulation", "Pressure Safety Valves", "Flow Balance Manifolds"]
            },
            {
                icon: "FaIndustry",
                title: "Pump Manifold Skids",
                desc: "Fabricated booster pump networks and transfer skids fitted with variable-speed control overrides.",
                features: ["Anti-vibration Bases", "Non-return Valve Blocks", "Pressure Transducers", "Heavy Bypass Flanges"]
            },
            {
                icon: "FaSlidersH",
                title: "HVAC Duct Fabrication",
                desc: "GI and pre-insulated duct configurations providing optimal airflow distribution inside large halls.",
                features: ["Acoustic Duct Liners", "Fire Damper Actuators", "Volume Control Dampers", "Leakage Testing Checks"]
            },
            {
                icon: "FaServer",
                title: "Ventilation Plants",
                desc: "Installation of heavy roof-mounted extract fans, fresh air handling units, and smoke extraction loops.",
                features: ["Vibration Isolators", "Carbon Filter Banks", "Star-Delta Panel Feeds", "CO Sensor Linked Controls"]
            },
            {
                icon: "FaCloud",
                title: "Air Handling Units (AHU)",
                desc: "Mounting, piping, and wiring of custom air handlers regulating cooling, heating, and indoor humidity levels.",
                features: ["Motorized Valve Actuators", "Condensate Drain Loops", "Prefilter Grids", "BMS Communication Hooks"]
            },
            {
                icon: "FaTools",
                title: "Plumbing & Drainage skids",
                desc: "Installing hot/cold water supply lines, municipal water booster pumps, and graywater treatment piping.",
                features: ["PPR & HDPE Pipe Fusions", "Water Filter Manifolds", "Dual Booster Overrides", "Sump Pump Level Loops"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Skilled pipefitters and mechanical supervisors executing demanding HVAC piping and plumbing systems."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "Premium, certified steel and copper piping, valves, and insulation materials from elite global manufacturers."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Full compliance with local Civil Defense rules, municipality plumbing guidelines, and international ASME piping standards."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "Active response support, routine flow and pressure checks, chiller line flushing, and pump rebuilds."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored manifold fabrications and pipe routing configurations designed around the space limits of your facility."
            }
        ],
        cta: {
            title: "Ready to Discuss Your MEP Project?",
            desc: "Whether you require custom chiller piping manifolds, variable speed booster skids, HVAC ductwork, or ventilation system installations, Vertex Controls is ready to assist.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    },
    "smart-infrastructure": {
        seo: {
            title: "Smart Infrastructure & ELV Systems | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls designs and builds smart building management systems (BMS), structured cabling, CCTV security, access control in Dubai, UAE."
        },
        hero: {
            badgeText: "ELV & Automation",
            title: "Smart Infrastructure & ELV",
            lead: "Integrating intelligent Building Management Systems (BMS), structured network cabling, secure IP CCTV systems, and fiber-optic communication grids."
        },
        overview: {
            subTag: "Smart Buildings",
            title: "Connected Building Systems",
            lead: "At Vertex Controls, we design robust extra-low voltage (ELV) networks that make building management simple, secure, and energy-efficient.",
            body: "Our network engineers deploy fiber backbones, program BMS controllers (DDC panels), mount high-resolution IP cameras, and configure card access systems. We guarantee absolute compatibility with SIRA guidelines, Du/Etisalat codes, and international safety protocols.",
            imageSrc: "/Images/Project/lighting_showcase.webp"
        },
        solutions: [
            {
                icon: "FaCogs",
                title: "Building Management (BMS)",
                desc: "Centralized DDC controller networks logging HVAC, lighting, and power loads to minimize energy footprint.",
                features: ["BACnet/Modbus Protocols", "DDC Panel Configuration", "Interactive UI Overviews", "Energy Trend Reports"]
            },
            {
                icon: "FaSlidersH",
                title: "IP CCTV Surveillance",
                desc: "High-resolution camera networks with high-capacity network video recorders (NVR) and smart analytics.",
                features: ["SIRA Compliant Setups", "Fiber-optic Video Paths", "Low-light Analytics", "Failover Storage Arrays"]
            },
            {
                icon: "FaIndustry",
                title: "Structured Cabling",
                desc: "Category 6A and fiber-optic horizontal cabling loops supporting building network backbones.",
                features: ["Du/Etisalat Approvals", "Fluke Performance Tests", "Patch Panel Assemblies", "Rack Cable Management"]
            },
            {
                icon: "FaServer",
                title: "Access Control Systems",
                desc: "Secure card readers, biometric scanners, electromagnetic locks, and gate barriers.",
                features: ["Central Management Apps", "Fire Panel Integration", "Biometric Scan Nodes", "Tailgate Alert Triggers"]
            },
            {
                icon: "FaCloud",
                title: "Smart Lighting Control",
                desc: "Programmable dimmers, occupancy sensors, and DALI ballasts configured for scheduled utility saving cycles.",
                features: ["DALI Protocol Loops", "Sensing Occupancy Grids", "Time-clock Dim Runs", "BMS Integration Hooks"]
            },
            {
                icon: "FaTools",
                title: "Audio Visual & PA/GA",
                desc: "Public address speakers, emergency notification audio, background music setups, and meeting room AV.",
                features: ["Zoned Audio Amps", "Evac Alarm Overrides", "Sound Level Mapping", "Smart Display Panels"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Certified ELV engineers and fiber technicians executing complex smart building systems across UAE hubs."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "100% certified copper and fiber runs using materials from CommScope, Schneider, Honeywell, and Hikvision."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Full compliance with local Civil Defense rules, SIRA security directives, and Du/Etisalat communication codes."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "Active response support, routine sensor calibration checks, backup power audits, and software updates."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored network topologies and BMS programming built specifically around the functional scale of your facility."
            }
        ],
        cta: {
            title: "Ready to Discuss Your Smart Building Project?",
            desc: "Whether you require a custom BMS installation, structured network cabling, IP CCTV surveillance, or zoned PA/GA units, Vertex Controls is ready to assist.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    },
    "ai-iot": {
        seo: {
            title: "AI & Industrial IoT Solutions | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls integrates AI monitoring, Edge Industrial IoT gateways, wireless sensors, cloud database logging, and predictive maintenance in UAE."
        },
        hero: {
            badgeText: "IIoT Telemetry",
            title: "AI & Industrial IoT",
            lead: "Integrating edge telemetry devices, cloud data gateways, predictive asset diagnostics, and AI monitoring for proactive operations."
        },
        overview: {
            subTag: "Asset Diagnostics",
            title: "Data-Driven Industrial Intelligence",
            lead: "At Vertex Controls, we deploy advanced AI-driven Industrial IoT (IIoT) platforms that unlock real-time insight from your machinery.",
            body: "Our engineers install edge telemetry gateways and cloud databases that track vibration, temperature, and current loads. We apply intelligent diagnostic algorithms to predict mechanical failures, minimize downtime, and extend equipment lifespans.",
            imageSrc: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp"
        },
        solutions: [
            {
                icon: "FaSatelliteDish",
                title: "Edge Telemetry Gateways",
                desc: "Heavy-duty communication nodes capturing Modbus, Profibus, and MQTT data streams from field automation devices.",
                features: ["Multi-protocol Support", "Secure Edge Computing", "Data Buffering Store", "Isolated RS485 Ports"]
            },
            {
                icon: "FaServer",
                title: "Cloud Data Lakes",
                desc: "Secure cloud database systems storing millions of telemetry logs for historical trend analysis and deep diagnostics.",
                features: ["InfluxDB/SQL Databases", "Secure TLS Encryption", "REST API Connectivity", "Backup Mirror Grids"]
            },
            {
                icon: "FaMicrochip",
                title: "Predictive Diagnostics",
                desc: "Machine learning algorithms profiling motor vibration anomalies to forecast mechanical failures.",
                features: ["Vibration Frequency FFT", "Temperature Trend Maps", "Failure Probability Logs", "Early warning Alerting"]
            },
            {
                icon: "FaWifi",
                title: "Remote Asset Tracking",
                desc: "Live GPS coordinates and operational performance metrics of mobile field machinery displayed on active maps.",
                features: ["Cellular GPS Nodes", "Geofencing Alert Scripts", "Battery Voltage Logs", "Engine Hour Registers"]
            },
            {
                icon: "FaCloud",
                title: "Smart Sensor Clusters",
                desc: "Wireless industrial sensors logging environmental metrics in remote plant structures without structural cables.",
                features: ["LoRaWAN Signal Paths", "Battery Lifespan 5+ Yrs", "IP67 Ingress Ratings", "Ambient Humidity Sensors"]
            },
            {
                icon: "FaChartArea",
                title: "Analytical Dashboards",
                desc: "Interactive web-based and mobile screens showing real-time Overall Equipment Effectiveness (OEE) and efficiency targets.",
                features: ["Grafana Graphic Visuals", "Custom Downtime Codes", "KPI Calculation Engines", "Shift Report Generators"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Qualified smart telemetry integrators and database architects executing complex industrial networks."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "100% factory acceptance testing (FAT) using premium, certified components from elite global automation brands."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Full compliance with local Civil Defense rules, utility guidelines (DEWA/ADDC), and IEC international safety standards."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "SLA response coverage, emergency on-site diagnostics, logic debugging, and prompt component replacement."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored automation logic and panel dimensions built specifically around your facility's requirements."
            }
        ],
        cta: {
            title: "Ready to Discuss Your Project?",
            desc: "Whether you need industrial IoT edge gateways, secure cloud databases, vibration diagnostic modeling, or custom analytical dashboards, Vertex Controls delivers expert systems engineered for uptime.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    },
    "energy-management": {
        seo: {
            title: "Energy Management Solutions | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls integrates power quality monitoring, smart energy meters, energy audits, load shedding controls in Dubai, UAE."
        },
        hero: {
            badgeText: "Sustainability & Audits",
            title: "Energy Management Solutions",
            lead: "Optimizing electrical usage, eliminating utility penalty rates, and logging power quality profiles via advanced telemetry networks."
        },
        overview: {
            subTag: "Utility Optimization",
            title: "Smart Power Auditing & Analytics",
            lead: "At Vertex Controls, we install smart energy metering nodes and automated capacitor banks to optimize facility power efficiency.",
            body: "Our engineers configure power analytics dashboards, deploy automatic load-shedding relays, and run full-scale power quality audits. We help facilities conform to regional green building codes, minimize reactive power waste, and reduce utility billing overhead.",
            imageSrc: "/Images/Project/mcc_showcase.webp"
        },
        solutions: [
            {
                icon: "FaCogs",
                title: "Smart Power Metering",
                desc: "Installing high-accuracy Modbus/BACnet power analyzers in MDB panels to monitor voltage, current, and harmonics.",
                features: ["Class 0.5S Analyzers", "BACnet IP Integration", "Live Current Monitors", "Harmonic Distortion Logs"]
            },
            {
                icon: "FaSlidersH",
                title: "Power Factor Correction",
                desc: "Fabricating and deploying capacitor banks containing detuned reactors to eliminate reactive load billing penalties.",
                features: ["Detuned Reactor Chokes", "Microprocessor Step Relays", "Vibration Cool Fans", "Reduced KVA Demand"]
            },
            {
                icon: "FaIndustry",
                title: "Load Shedding Systems",
                desc: "Programming automated logic loops that disconnect non-critical utility sub-loads during peak demand intervals.",
                features: ["PLC Override Priority", "Motor Soft Starter Links", "Automatic Transfer Logic", "Peak Current Interlocks"]
            },
            {
                icon: "FaServer",
                title: "Harmonic Auditing & Filters",
                desc: "Measuring power line harmonic distortion (THD) and deploying active or passive filters to protect sensitive electronics.",
                features: ["Active Harmonic Filters", "IEEE 519 Compliant Audits", "Thermal Scan Reporting", "Frequency Domain FFTs"]
            },
            {
                icon: "FaCloud",
                title: "Energy Management SCADA",
                desc: "Cloud-connected Grafana and WinCC dashboards tracking historical carbon emissions and utility costs.",
                features: ["Carbon Footprint Track", "Automated Utility Invoice", "Peak-Demand Email Alerts", "Grafana Web Dashboard"]
            },
            {
                icon: "FaTools",
                title: "Sub-metering networks",
                desc: "Deploying individual tenant and equipment sub-meters to track utility allocations across large complexes.",
                features: ["M-Bus/Modbus Networks", "Automated Billing Runs", "Pulse Counter Relays", "Compact Enclosure Fits"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Certified energy auditors and electrical engineers executing complex power diagnostics across the UAE."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "100% type-tested capacitor banks using premium components from Schneider, Siemens, and Socomec."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Full compliance with local Civil Defense rules, utility codes (DEWA/ADDC), and international IEEE guidelines."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "Active response support, routine capacitor health audits, thermal inspections, and software updates."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored energy management schemes designed specifically around the power factor and load limits of your facility."
            }
        ],
        cta: {
            title: "Ready to Discuss Your Energy Project?",
            desc: "Whether you require custom power factor capacitor banks, sub-metering setups, active harmonic filters, or energy management SCADA dashboards, Vertex Controls is ready to assist.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    },
    "maintenance-operation": {
        seo: {
            title: "Annual Maintenance Contracts (AMC) | Vertex Controls Electromechanical LLC",
            description: "Vertex Controls offers electromechanical AMCs, 24/7 emergency troubleshooting, PLC SCADA diagnostics, preventive maintenance in Dubai, UAE."
        },
        hero: {
            badgeText: "24/7 SLA Support",
            title: "Annual Maintenance Contracts",
            lead: "Minimizing operational downtime through routine preventive inspection cycles, remote logic debug support, and 24/7 emergency on-site response."
        },
        overview: {
            subTag: "Lifecycle Support",
            title: "SLA Electromechanical AMC plans",
            lead: "At Vertex Controls, we design robust preventive maintenance contracts built around the specific uptime targets of your facility.",
            body: "Our service technicians run routine physical switchgear thermal scans, calibrate water loop instruments, test generator transfer switches, and audit SCADA alarm logs. We guarantee priority response hours to secure your plant infrastructure.",
            imageSrc: "/Images/maintanenace.jpeg"
        },
        solutions: [
            {
                icon: "FaCogs",
                title: "Preventive Inspection",
                desc: "Conducting scheduled monthly or quarterly site audits tracking instrument calibrations and electrical terminations.",
                features: ["Terminal Thermal Imaging", "Sensor Calibrations", "UPS Battery Tests", "Fan Filter Cleanings"]
            },
            {
                icon: "FaSlidersH",
                title: "24/7 Emergency Support",
                desc: "Providing priority on-call response with emergency dispatch technicians deployed across the UAE.",
                features: ["SLA Response Options", "24/7 Technical Hotline", "On-site Spares Support", "Emergency Bypass Setup"]
            },
            {
                icon: "FaIndustry",
                title: "PLC & SCADA Debugging",
                desc: "Diagnosing logic loops, restoring database connections, and recovering lost SCADA visualization panels.",
                features: ["VPN Remote Logic Checks", "Firmware Safeguards", "Database Backup Mirroring", "Code Adaptation Steps"]
            },
            {
                icon: "FaServer",
                title: "HVAC & Pump Maintenance",
                desc: "Checking booster pump currents, flushing chiller piping loops, and balancing duct airflow currents.",
                features: ["Motor Current Monitoring", "Bearing Lubing Runs", "Pressure Differential Check", "AHU Control Audits"]
            },
            {
                icon: "FaCloud",
                title: "BMS & ELV Calibration",
                desc: "Testing CCTV video storage retention, verifying card reader relays, and auditing BMS heating/cooling logic.",
                features: ["NVR Raid Array Testing", "BMS Logic Loop Scans", "Access Lock Cleanings", "DALI Ballast Swaps"]
            },
            {
                icon: "FaTools",
                title: "Calibration & Reports",
                desc: "Calibrating flow meters, temperature transmitters, and level sensors, and delivering compliant validation logs.",
                features: ["Ultrasonic Flow Auditing", "Certified Test Equipment", "Municipal Inspection Logs", "Calibration Certificate"]
            }
        ],
        whyChoose: [
            {
                icon: "FaTools",
                title: "Experience",
                desc: "Qualified site engineers and programmers managing critical plant maintenance across Dubai and Abu Dhabi."
            },
            {
                icon: "FaCheckCircle",
                title: "Quality",
                desc: "Detailed maintenance reports, clear diagnostic checklists, and premium certified replacement components."
            },
            {
                icon: "FaShieldAlt",
                title: "Safety",
                desc: "Full compliance with local Civil Defense rules, municipality codes, and international safety protocols."
            },
            {
                icon: "FaClock",
                title: "Technical Support",
                desc: "Active response support, routine logic and database backups, and scheduled site visits."
            },
            {
                icon: "FaSlidersH",
                title: "Customized Solutions",
                desc: "Tailored AMC agreements and priority SLA response bounds designed specifically around your facility's operational limits."
            }
        ],
        cta: {
            title: "Ready to Secure Your Operations?",
            desc: "Whether you require a custom electromechanical AMC plan, 24/7 emergency troubleshooting support, or scheduled calibration services, Vertex Controls is ready to assist.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com",
            location: "Dubai, UAE"
        }
    }
};

// ----------------------------------------------------
// DEFAULT PROJECTS SUBPAGES DATA
// ----------------------------------------------------
export const defaultProjectsSubpages: Record<string, ProjectSubpageData> = {
    "control-panels-automation": {
        seo: {
            title: "Control Panels Automation Project | Vertex Controls Electromechanical LLC",
            description: "Case study of a control panel automation project with Siemens PLC, MCC and SCADA integration in Dubai, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Control Panels Automation",
            lead: "Designing custom MCC panels, PLC panels, and integrating centralized SCADA monitoring for UAE industrial plants."
        },
        overview: {
            subTag: "Project Scoping",
            title: "Control Panels Modernization",
            lead: "Vertex Controls upgraded an older industrial MCC panel network with intelligent PLC nodes and SCADA systems in Dubai.",
            imageSrc: "/Images/Project/mcc_showcase.webp",
            statusText: "STATUS: COMPLETED",
            locationText: "LOCATION: DUBAI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Centralized Monitoring", desc: "Consolidated all local control panels into one SCADA interface room." },
                { icon: "FaCheckCircle", title: "Automated Control", desc: "Integrated automated loop sequences to regulate pump speeds based on line pressure." },
                { icon: "FaCheckCircle", title: "Improved Protection", desc: "Added high-quality electronic overloads and phase monitors to prevent motor burnouts." }
            ],
            scopeTags: ["Electrical Drafting", "Panel Assembly", "Siemens S7 PLC", "SCADA Design", "On-site Wiring", "Commissioning"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Electrical Schematics", desc: "Drafting complete panel wiring diagrams, layout schematics, and terminal schedules in CAD." },
            { icon: "FaBolt", title: "Panel Assembly", desc: "Fabricating and wiring IP65 enclosures, power busbars, contactors, and Siemens PLC nodes." },
            { icon: "FaCogs", title: "PLC Loop Programming", desc: "Programming sequential control logic, safety interlock overrides, and alarm boundaries in TIA Portal." },
            { icon: "FaServer", title: "SCADA Screen Setup", desc: "Developing plant overview graphics, real-time value logs, alarm banners, and trend sheets." },
            { icon: "FaTools", title: "On-Site Instrument Fitting", desc: "Mounting panels, pulling armored cables, terminate field instrumentation and motors." },
            { icon: "FaCheckCircle", title: "Testing & Validation", desc: "Performing factory acceptance checks (FAT), dry loop tests, and final commissioning validation." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Industrial Manufacturing & Assembly" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Al Quoz Industrial Area, Dubai, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Siemens S7-1200 PLC, KTP700 HMIs, WinCC SCADA, ABB VFDs" },
            { icon: "FaChartLine", title: "Key Benefits", value: "15% lower energy consumption, zero motor downtime since install, and detailed alarm logging." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Delivered on schedule during weekend shutdown window, fully approved, and active." }
        ],
        gallery: [
            { src: "/Images/Project/mcc_showcase.webp", caption: "Main LV Power Control Enclosure Assembly" },
            { src: "/Images/Project/scada_showcase.webp", caption: "Centralized WinCC SCADA Plant Visuals" },
            { src: "/Images/Project/lighting_showcase.webp", caption: "Process Pump VFD Inverters Bank" },
            { src: "/Images/booth_exib.webp", caption: "On-Site Acceptance Handover Inspection" }
        ],
        cta: {
            title: "Need custom control panels or automation services?",
            desc: "Contact Vertex Controls today. Our panel engineers and automation programmers in Dubai will design, construct, program, and commission custom systems conforming to utility regulations.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "pump-station-automation": {
        seo: {
            title: "Pump Station Automation Project | Vertex Controls Electromechanical LLC",
            description: "Case study detailing pump station automation, telemetry, remote monitoring, and PLC integration in Abu Dhabi, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Pump Station Automation",
            lead: "Deploying automated booster skids, RTU panels, and remote GSM SCADA monitoring for water distribution networks in UAE."
        },
        overview: {
            subTag: "Project Scoping",
            title: "Telemetry & Flow Control",
            lead: "Vertex Controls commissioned an advanced pump station control system linking remote sites via secure wireless RTUs in Abu Dhabi.",
            imageSrc: "/Images/Project/scada_showcase.webp",
            statusText: "STATUS: ACTIVE",
            locationText: "LOCATION: ABU DHABI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Constant Line Pressure", desc: "Regulated pump speed loops using analog pressure transmitters to eliminate water hammer." },
                { icon: "FaCheckCircle", title: "Wireless Telemetry", desc: "Transmitted level, flow, and run statuses to a central city office via secure GSM/GPRS routes." },
                { icon: "FaCheckCircle", title: "Emergency Shutdowns", desc: "Programmed safety locks shutting off booster units during low suction or high pressure warnings." }
            ],
            scopeTags: ["RTU Assembly", "GSM Telemetry", "VFD Control Skids", "SCADA Database", "Sensor Calibration", "On-site Handover"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Telemetry Schematics", desc: "Designing communication boards, power back-ups, and field wiring loops." },
            { icon: "FaBolt", title: "VFD Panel Build", desc: "Assembling control panels featuring high-power VFDs and PLC units." },
            { icon: "FaCogs", title: "RTU Programming", desc: "Configuring Modbus polling registers and remote data transmission codes." },
            { icon: "FaServer", title: "SCADA Core Setup", desc: "Adding stations to centralized monitoring SCADA with historical reporting." },
            { icon: "FaTools", title: "Instrument Mounting", desc: "Installing electromagnetic flow meters, level probes, and pressure sensors." },
            { icon: "FaCheckCircle", title: "Commissioning Runs", desc: "Checking wireless communications, flow calibrations, and safety shutdowns." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Municipal Water Distribution & Telemetry" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Al Ain Region, Abu Dhabi, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Schneider M340 PLC, Trio Wireless Radios, ClearSCADA Host, Danfoss VFDs" },
            { icon: "FaChartLine", title: "Key Benefits", value: "Continuous water supply pressure logs, remote alarm warnings, and lower line pipe wear." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Fully operational, approved by utility authorities, and integrated into SCADA grid." }
        ],
        gallery: [
            { src: "/Images/Project/scada_showcase.webp", caption: "Centralized SCADA Mimic Dashboard Overview" },
            { src: "/Images/Project/mcc_showcase.webp", caption: "Heavy Booster Pump Motor Inverters Bank" },
            { src: "/Images/Project/lighting_showcase.webp", caption: "RTU Enclosure with Battery Backup Unit" },
            { src: "/Images/booth_exib.webp", caption: "Outdoor Field Instrumentation Calibration Run" }
        ],
        cta: {
            title: "Need expert pump station automation or telemetry services?",
            desc: "Contact Vertex Controls today. Our water telemetry and automation engineers will construct, program, and commission remote RTU grids conforming to utilities standards.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "electrical-infrastructure": {
        seo: {
            title: "Electrical Infrastructure Project | Vertex Controls Electromechanical LLC",
            description: "Case study showcasing electrical grid extension, MDB installations, cabling, and switchgear commissioning in Dubai, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Electrical Infrastructure",
            lead: "Installing high-capacity low-voltage switchgears, cabling networks, and power distribution systems for commercial complexes."
        },
        overview: {
            subTag: "Project Scoping",
            title: "Grid Extension & Cabling",
            lead: "Vertex Controls executed a turnkey power distribution and switchgear commissioning project for a commercial infrastructure hub in Dubai.",
            imageSrc: "/Images/Project/mcc_showcase.webp",
            statusText: "STATUS: COMPLETED",
            locationText: "LOCATION: DUBAI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Type-Tested Distribution", desc: "Installed fully certified Form 4 LV switchgears rated for high short-circuit levels." },
                { icon: "FaCheckCircle", title: "Armored Cable Trays", desc: "Laid hundreds of meters of armored power cables on structural cable ladder networks." },
                { icon: "FaCheckCircle", title: "Utility Approval", desc: "Completed all electrical tests required for official DEWA power connection approvals." }
            ],
            scopeTags: ["Switchgear Install", "Cable Ladder Run", "Cable Terminations", "APFC Panel Setup", "DEWA Inspection", "Load Testing"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Power Schematics", desc: "Drafting detailed power single-line diagrams (SLD) and cable routing maps." },
            { icon: "FaBolt", title: "Switchgear Rigging", desc: "Offloading, positioning, and joining main LV distribution panel sections on site." },
            { icon: "FaCogs", title: "Relay Configuration", desc: "Programming electronic breaker trip curves and digital power quality meters." },
            { icon: "FaServer", title: "APFC Commissioning", desc: "Installing and testing automatic power factor capacitor banks." },
            { icon: "FaTools", title: "Cable Gland Crimping", desc: "Glanding, terminating, and testing high-cross-section copper cables." },
            { icon: "FaCheckCircle", title: "DEWA Compliance Checks", desc: "Performing insulation checks, earth loop tests, and hosting municipal inspectors." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Commercial Power Distribution Networks" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Dubai Investments Park (DIP), Dubai, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "ABB Emax Air Breakers, Socomec Meters, Schneider Varset APFC" },
            { icon: "FaChartLine", title: "Key Benefits", value: "Type-tested power lines security, power factor maintained at 0.98, and safe load distributions." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Successfully energized after passing DEWA inspections, running stable under load." }
        ],
        gallery: [
            { src: "/Images/Project/mcc_showcase.webp", caption: "Form 4 LV Switchboard Array Commissioned" },
            { src: "/Images/Project/scada_showcase.webp", caption: "Digital Power Quality Metering Dashboard" },
            { src: "/Images/Project/lighting_showcase.webp", caption: "Automatic Power Factor Correction Bank" },
            { src: "/Images/booth_exib.webp", caption: "Primary Feed Cable Glanding terminations" }
        ],
        cta: {
            title: "Need robust power distribution or switchgear installations?",
            desc: "Contact Vertex Controls today. Our LV switchboard specialists in Dubai will design, install, test, and commission power distribution boards conforming to utilities directives.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "power-cable-installation": {
        seo: {
            title: "Power Cable Installation Project | Vertex Controls Electromechanical LLC",
            description: "Case study detailing high-voltage power cable laying, excavation, glanding, and insulation testing in Sharjah, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Power Cable Installation",
            lead: "Executing heavy armored power cable laying, containment structures, glanding, and insulation testing in Sharjah, UAE."
        },
        overview: {
            subTag: "Project Scoping",
            title: "High-Voltage Routing",
            lead: "Vertex Controls managed a complex power cable laying and termination project for an industrial processing site in Sharjah.",
            imageSrc: "/Images/Project/mcc_showcase.webp",
            statusText: "STATUS: COMPLETED",
            locationText: "LOCATION: SHARJAH, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Heavy Containment Layout", desc: "Mounted heavy-duty galvanized cable ladders across high roofs and utility bridges." },
                { icon: "FaCheckCircle", title: "Safe Cable Pulling", desc: "Pulled multi-core XLPE insulated armored copper cables using synchronized pullers." },
                { icon: "FaCheckCircle", title: "Insulation Verification", desc: "Executed high-voltage insulation checks (Megger test) to verify line safety before hook-up." }
            ],
            scopeTags: ["Cable Ladder Rig", "Armored Cable Pull", "Cable Glanding", "Megger Insulation Check", "Utility Approvals", "Load Testing"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Cable Route Planning", desc: "Mapping cable tray routing paths, load calculations, and structural layouts in CAD." },
            { icon: "FaBolt", title: "Tray & Ladder Install", desc: "Assembling galvanized steel cable ladders, elbows, and roof supports." },
            { icon: "FaCogs", title: "Cable Pull Setup", desc: "Setting up cable rollers, guides, and pull winches to prevent wire tension damage." },
            { icon: "FaServer", title: "Gland terminations", desc: "Capping, glanding, and crimping cable lugs to MDB breaker studs." },
            { icon: "FaTools", title: "Dielectric Testing", desc: "Running insulation megohm checks and phase rotation audits." },
            { icon: "FaCheckCircle", title: "Municipal Sign-off", desc: "Coordinating inspections with local utility teams for final approval." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Heavy Industrial Plant Power Grid Routing" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Sajaa Industrial Area, Sharjah, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "4-Core 240mm² XLPE Cables, Megger Testers, Hydraulic Crimpers" },
            { icon: "FaChartLine", title: "Key Benefits", value: "Reliable power feed line to factory, no line drop, and fully code-compliant terminations." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Energized successfully without shutdown issues, approved by municipal inspection." }
        ],
        gallery: [
            { src: "/Images/Project/mcc_showcase.webp", caption: "Heavy Power Cables Laid on Cable Ladders" },
            { src: "/Images/Project/scada_showcase.webp", caption: "Multi-point Cable Terminations in MDB Panel" },
            { src: "/Images/Project/lighting_showcase.webp", caption: "Industrial Cable Tray Bridge Structure" },
            { src: "/Images/booth_exib.webp", caption: "Pre-energization Megger Insulation Verification" }
        ],
        cta: {
            title: "Need expert power cable laying or termination services?",
            desc: "Contact Vertex Controls today. Our electrical cable specialists in Dubai will design, install, test, and commission power connections conforming to utility directives.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "led-display-power": {
        seo: {
            title: "LED Display Power Grid Project | Vertex Controls Electromechanical LLC",
            description: "Case study of a digital signage power grid project with custom distribution boards and control panel design in Dubai, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "LED Display Power Grid",
            lead: "Assembling power distribution panels, control interfaces, and fiber-optic networks for large digital screens in UAE."
        },
        overview: {
            subTag: "Project Scoping",
            title: "Digital Signage Grid",
            lead: "Vertex Controls engineered and commissioned the specialized power supply and cooling system for a massive LED billboard in Dubai.",
            imageSrc: "/Images/Project/lighting_showcase.webp",
            statusText: "STATUS: COMPLETED",
            locationText: "LOCATION: DUBAI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Smart Surge Protection", desc: "Installed sensitive transient surge suppressors to safeguard expensive screen electronics." },
                { icon: "FaCheckCircle", title: "Temperature Regulation", desc: "Integrated fans and temperature controllers to prevent screen heat-damage." },
                { icon: "FaCheckCircle", title: "BMS Power Control", desc: "Linked power control switches to the central BMS interface for scheduled screen cycles." }
            ],
            scopeTags: ["DB Panel Assembly", "Surge Protection", "Cooling Control", "BMS Integration", "Fiber Setup", "Testing"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Signage Grid Drafting", desc: "Designing electrical schematics, overload checks, and board layouts in CAD." },
            { icon: "FaBolt", title: "Custom DB Assembly", desc: "Wiring specialized power panels with surge protection and output contactors." },
            { icon: "FaCogs", title: "Ventilation Logic Setup", desc: "Programming thermostat controls regulating panel cooling fans." },
            { icon: "FaServer", title: "BMS Connectivity", desc: "Wiring remote control relays linked to the building automation system." },
            { icon: "FaTools", title: "Cable terminations", desc: "Terminating power feeds and structured signal cables to display cards." },
            { icon: "FaCheckCircle", title: "Function Testing", desc: "Testing current load balances, surge units, and running thermal scans." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Smart Advertising & Commercial Displays" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Sheikh Zayed Road, Dubai, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Vertex DB Panel, Phoenix Surge Arresters, Siemens Relays" },
            { icon: "FaChartLine", title: "Key Benefits", value: "Full surge protection, scheduled night dim controls, and remote panel status logging." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Completed within tight deadline, fully functional, and approved by safety inspectors." }
        ],
        gallery: [
            { src: "/Images/Project/lighting_showcase.webp", caption: "Custom Advertising Signage Power Panel" },
            { src: "/Images/Project/mcc_showcase.webp", caption: "Power Surge Protectors bank" },
            { src: "/Images/Project/scada_showcase.webp", caption: "Display Power Control Interface Setup" },
            { src: "/Images/booth_exib.webp", caption: "Final Commissioned LED Screen On-Site Check" }
        ],
        cta: {
            title: "Need custom power panels or signage grid services?",
            desc: "Contact Vertex Controls today. Our panel engineers in Dubai will design, construct, test, and commission power distribution boards conforming to utility regulations.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "smart-lighting": {
        seo: {
            title: "Smart Lighting Project | Vertex Controls Electromechanical LLC",
            description: "Case study of a smart lighting control system project with DALI and building management system integration in Dubai, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Smart Lighting Systems",
            lead: "Integrating smart DALI lighting controllers, occupancy sensor networks, and central BMS screens for corporate offices."
        },
        overview: {
            subTag: "Project Scoping",
            title: "Lighting Command Center",
            lead: "Vertex Controls designed and programmed a smart office lighting system linking thousands of lamps in Dubai.",
            imageSrc: "/Images/Project/lighting_showcase.webp",
            statusText: "STATUS: COMPLETED",
            locationText: "LOCATION: DUBAI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Lower Utility Waste", desc: "Integrated occupancy and daylight sensors to turn off lights in empty offices." },
                { icon: "FaCheckCircle", title: "Flexible Scheduling", desc: "Programmed calendar-based control loops dimming office zones during weekends." },
                { icon: "FaCheckCircle", title: "DALI Bulb Diagnostic", desc: "Mapped individual ballast logs to report failed lightbulbs immediately on SCADA." }
            ],
            scopeTags: ["DALI Controller Setup", "Sensor Calibration", "Dimming Panels Build", "BMS Integration", "Testing", "Commissioning"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Lighting Loop Design", desc: "Drafting electrical loop schematics, network diagrams, and DALI channel schedules." },
            { icon: "FaBolt", title: "Dimmer Panel Build", desc: "Wiring panels containing DALI gateways, relays, and network switches." },
            { icon: "FaCogs", title: "Control Setup", desc: "Configuring sensor trigger timers, brightness levels, and wall-switch scenes." },
            { icon: "FaServer", title: "BMS Screen Mapping", desc: "Mapping DALI points to BMS screens for centralized management." },
            { icon: "FaTools", title: "Field Wiring terminate", desc: "Terminating signal loops to sensors, dimmers, and drivers." },
            { icon: "FaCheckCircle", title: "System Commissioning", desc: "Testing sensor ranges, dimmer performance, and running utility load tests." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Smart Building Systems & Commercial Offices" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Downtown Dubai Commercial District, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Helvar DALI Gateways, Tridonic Ballasts, BACnet BMS link" },
            { icon: "FaChartLine", title: "Key Benefits", value: "30% lower lighting utility costs, instant bulb failure warnings, and custom zone control." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Fully operational, approved by building consultants, and integrated with building BMS." }
        ],
        gallery: [
            { src: "/Images/Project/lighting_showcase.webp", caption: "Centralized Smart Office Lighting Command Setup" },
            { src: "/Images/Project/mcc_showcase.webp", caption: "DALI Dimmer and Control Panels Array" },
            { src: "/Images/Project/scada_showcase.webp", caption: "BMS Lighting Control Interface Screen" },
            { src: "/Images/booth_exib.webp", caption: "Ceiling Sensor Array Commissioning Run" }
        ],
        cta: {
            title: "Need professional smart lighting or BMS integrations?",
            desc: "Contact Vertex Controls today. Our building automation specialists in Dubai will design, construct, program, and commission custom systems conforming to green building codes.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "energy-monitoring": {
        seo: {
            title: "Energy Monitoring SCADA Project | Vertex Controls Electromechanical LLC",
            description: "Case study detailing energy monitoring SCADA, power analyzers integration, and load optimization in Abu Dhabi, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Energy Monitoring SCADA",
            lead: "Deploying smart power quality analyzers, data gateway networks, and central power telemetry screens for large complexes."
        },
        overview: {
            subTag: "Project Scoping",
            title: "Power Monitoring SCADA",
            lead: "Vertex Controls designed and programmed a comprehensive energy tracking SCADA system linking power meters in Abu Dhabi.",
            imageSrc: "/Images/Project/scada_showcase.webp",
            statusText: "STATUS: ACTIVE",
            locationText: "LOCATION: ABU DHABI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Live Power Diagnostics", desc: "Captured current, voltage, frequency, and harmonic profiles from primary feeders." },
                { icon: "FaCheckCircle", title: "Utility Bill Audits", desc: "Generated daily load profile logs to identify reactive current billing penalties." },
                { icon: "FaCheckCircle", title: "Active Alarm Alerts", desc: "Programmed email alerts warning technicians about phase imbalances or overloads." }
            ],
            scopeTags: ["Power Analyzer Setup", "Modbus Gateway Wiring", "Database Setup", "Grafana Dashboard", "Auditing", "Handover"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Meter Loop Planning", desc: "Mapping electrical SLDs, instrument listings, and network schedules in CAD." },
            { icon: "FaBolt", title: "Meters Retrofitting", desc: "Installing digital meters inside existing main distribution switchboard compartments." },
            { icon: "FaCogs", title: "Gateway Setup", desc: "Wiring serial RS485 loops to Modbus TCP communication gateways." },
            { icon: "FaServer", title: "Database Setup", desc: "Setting up database systems to store historical power logs." },
            { icon: "FaTools", title: "Dashboard Programming", desc: "Configuring power dashboards, line load curves, and custom alerts." },
            { icon: "FaCheckCircle", title: "System Calibration", desc: "Validating current transformer (CT) values and meter reading accuracy." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Industrial Utilities & Energy Management" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Mussafah Industrial Zone, Abu Dhabi, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Schneider PM8000 Meters, Moxa Gateways, InfluxDB, Grafana SCADA" },
            { icon: "FaChartLine", title: "Key Benefits", value: "Detailed power quality telemetry, zero power factor penalties, and early overload warnings." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Fully operational, approved by utility energy managers, and actively saving costs." }
        ],
        gallery: [
            { src: "/Images/Project/scada_showcase.webp", caption: "Centralized Power Quality SCADA Overview" },
            { src: "/Images/Project/mcc_showcase.webp", caption: "Feeder Switchboards Retrofitted with Meters" },
            { src: "/Images/Project/lighting_showcase.webp", caption: "Modbus TCP Data Gateway Panel Enclosure" },
            { src: "/Images/booth_exib.webp", caption: "Load Calibration and Diagnostic Handover Check" }
        ],
        cta: {
            title: "Need expert energy monitoring or power factor services?",
            desc: "Contact Vertex Controls today. Our energy engineers will design, construct, program, and commission custom systems conforming to utility regulations.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "industrial-iot": {
        seo: {
            title: "Industrial IoT Gateway Project | Vertex Controls Electromechanical LLC",
            description: "Case study detailing industrial IoT edge gateway installations, wireless sensor networks, and MQTT data logging in Dubai, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Industrial IoT Gateways",
            lead: "Installing secure edge gateways, wireless sensor networks, and cloud telemetry databases for remote plants."
        },
        overview: {
            subTag: "Project Scoping",
            title: "IoT Gateway Installation",
            lead: "Vertex Controls deployed a secure cloud-connected telemetry system linking remote sensors for a logistics facility in Dubai.",
            imageSrc: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp",
            statusText: "STATUS: COMPLETED",
            locationText: "LOCATION: DUBAI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Edge Data Buffering", desc: "Buffered telemetry data locally during internet losses to prevent log failures." },
                { icon: "FaCheckCircle", title: "Wireless Sensor Grids", desc: "Laid low-power wireless sensors tracking temperature in remote stores." },
                { icon: "FaCheckCircle", title: "Encrypted Cloud Sync", desc: "Sent field data securely to a cloud database via HTTPS and MQTT tunnels." }
            ],
            scopeTags: ["Edge Gateway Setup", "LoRaWAN Sensors", "MQTT Cloud Tunnel", "Cloud Database Setup", "Mobile Dashboard", "Commissioning"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Network Route Design", desc: "Mapping sensor locations, network topologies, and data loops in CAD." },
            { icon: "FaBolt", title: "Gateway Panel Build", desc: "Assembling compact IP66 panels containing edge servers and UPS backups." },
            { icon: "FaCogs", title: "Edge Logic Config", desc: "Programming data filters, sensor polling schedules, and alarm triggers." },
            { icon: "FaServer", title: "Cloud Database Setup", desc: "Configuring cloud databases and security keys." },
            { icon: "FaTools", title: "Sensor Installation", desc: "Mounting wireless sensors and setting up gateway receiver grids." },
            { icon: "FaCheckCircle", title: "System Commissioning", desc: "Testing sensor battery health, transmission paths, and cloud sync loops." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Smart Warehousing & Cold Chain Logistics" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Jebel Ali Free Zone (JAFZA), Dubai, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Advantech IoT Gateways, Milesight Sensors, MQTT Cloud, Node-RED" },
            { icon: "FaChartLine", title: "Key Benefits", value: "Continuous temperature logs, email/SMS warning alerts, and battery lifespans of 5+ years." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Fully operational, approved by quality compliance auditors, and active." }
        ],
        gallery: [
            { src: "/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp", caption: "Edge Industrial IoT Gateway Panel Installed" },
            { src: "/Images/Project/mcc_showcase.webp", caption: "Wireless Temperature Sensor Mounted in Warehouse" },
            { src: "/Images/Project/scada_showcase.webp", caption: "Cloud Database Telemetry Graphic Dashboard" },
            { src: "/Images/booth_exib.webp", caption: "Field Wireless Signal Path Validation Test" }
        ],
        cta: {
            title: "Need secure industrial IoT or remote telemetry skids?",
            desc: "Contact Vertex Controls today. Our IoT technicians in Dubai will design, construct, program, and commission custom remote systems conforming to security protocols.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "water-treatment": {
        seo: {
            title: "Water Treatment & Process Control Projects | Vertex Controls Electromechanical LLC",
            description: "Case study showcasing PLC process control, chemical dosing loops automation, and SCADA alarm systems by Vertex Controls in Dubai, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Water Treatment & Control",
            lead: "Engineering precise chemical dosing loops, water tank level PLC automations, and centralized SCADA process monitoring dashboards in the UAE."
        },
        overview: {
            subTag: "Case Study Scoping",
            title: "Project Overview & Objectives",
            lead: "Vertex Controls commissioned an advanced process control loop and chemical dosing automation system for a wastewater recycling facility in Dubai, UAE.",
            imageSrc: "/Images/Project/scada_showcase.webp",
            statusText: "STATUS: ONLINE",
            locationText: "LOCATION: DUBAI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "Consistent Water Purity", desc: "Ensure chemical dosing variables are regulated automatically to maintain target pH and chlorine thresholds." },
                { icon: "FaCheckCircle", title: "Fail-Safe Dosing Control", desc: "Integrate safety interlocks to automatically stop pumps during feed line sensor blockage warnings." },
                { icon: "FaCheckCircle", title: "Regulation Compliance", desc: "Ensure water recycling outputs fully conform to local environmental safety regulations and municipal codes." }
            ],
            scopeTags: ["Electrical Schematics", "Control Panels Assembly", "Automation Programming", "Central Monitoring System", "Factory Validation Testing", "On-Site Setup & Handover"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Process Engineering", desc: "Designing process flow diagrams (PFDs), defining instrument input/output indexes, and planning chemical loop safeties." },
            { icon: "FaBolt", title: "Control Panel Assembly", desc: "Building specialized water-resistant PLC panels and pneumatic valve control blocks in our workshop." },
            { icon: "FaCogs", title: "PLC Loop Programming", desc: "Programming robust feedback logic loops (PID control) to regulate acid, base, and chlorine dosing valves." },
            { icon: "FaServer", title: "SCADA Screen Setup", desc: "Customizing SCADA overview screens showing live tank levels, flow rate history, and dosing status alerts." },
            { icon: "FaTools", title: "On-Site Instrument Fitting", desc: "Installing pH transmitters, conductivity probes, ultrasonic level sensors, and wiring terminations." },
            { icon: "FaCheckCircle", title: "Testing & Validation", desc: "Executing dry logic checks, sensor chemical calibrations, flow-path validations, and municipal inspections." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Industrial Wastewater Recycling & Treatment" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Jebel Ali Free Zone (JAFZA), Dubai, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Siemens S7 PLC, WinCC Runtime, pH/Conductivity probes, Modbus dosing pumps" },
            { icon: "FaChartLine", title: "Key Benefits", value: "100% compliant chemical pH bounds, reduced manual checking labor, and continuous recycling output logs." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Approved by municipal environmental inspection teams, completed within the shutdown timeframe, and fully active." }
        ],
        gallery: [
            { src: "/Images/Project/mcc_showcase.webp", caption: "Low-Voltage MCC & VFD Cabinets" },
            { src: "/Images/Project/scada_showcase.webp", caption: "SCADA Control Interface Console" },
            { src: "/Images/Project/lighting_showcase.webp", caption: "Smart Facility Control Center" },
            { src: "/Images/booth_exib.webp", caption: "Electromechanical Commissioning Site" }
        ],
        cta: {
            title: "Need a Reliable Automation Solution for Your Water System?",
            desc: "Contact Vertex Controls today. Our chemical and water automation engineers in Dubai will design, construct, program, and commission custom loops conforming to environmental regulations.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    },
    "mechanical-installation": {
        seo: {
            title: "Mechanical Installation Project | Vertex Controls Electromechanical LLC",
            description: "Case study detailing HVAC chiller piping welds, booster pump manifolds installation, and mechanical commissioning in Dubai, UAE."
        },
        hero: {
            badgeText: "Case Study Showcase",
            title: "Mechanical Installations",
            lead: "Fabricating chiller piping networks, pump manifolds skids, and ventilation duct installations in commercial halls."
        },
        overview: {
            subTag: "Project Scoping",
            title: "HVAC & Mechanical Piping",
            lead: "Vertex Controls completed a heavy mechanical piping and pump manifolds installation project for a commercial facility in Dubai.",
            imageSrc: "/Images/Project/lighting_showcase.webp",
            statusText: "STATUS: COMPLETED",
            locationText: "LOCATION: DUBAI, UAE",
            objectives: [
                { icon: "FaCheckCircle", title: "High-Pressure Piping", desc: "Welded heavy-gauge carbon steel lines circulating chilled water loops safely." },
                { icon: "FaCheckCircle", title: "Variable Booster Skids", desc: "Fabricated manifold skids for water booster pumps with anti-vibration footings." },
                { icon: "FaCheckCircle", title: "Civic Compliance", desc: "Passed all hydrostatic pressure tests and thermal insulation checks by municipal inspectors." }
            ],
            scopeTags: ["Chiller Steel Welds", "Pump Manifold Build", "VFD Booster Setup", "Thermal Insulation", "Pressure Testing", "Handover"]
        },
        servicesDelivered: [
            { icon: "FaDraftingCompass", title: "Piping Line Drafting", desc: "Mapping isometric pipe schematics, flow calculations, and support frames in CAD." },
            { icon: "FaBolt", title: "Steel pipe Welding", desc: "TIG and ARC welding heavy chiller pipe junctions and flanges on site." },
            { icon: "FaCogs", title: "Skid Assembly", desc: "Fabricating skid structures and mounting high-power booster pump units." },
            { icon: "FaServer", title: "AHU Piping hookups", desc: "Connecting piping loops to air handling unit coils and valve grids." },
            { icon: "FaTools", title: "Pressure Testing Runs", desc: "Running hydrostatic pressure tests at 1.5x design pressure to check line integrity." },
            { icon: "FaCheckCircle", title: "Insulation wrapping", desc: "Wrapping lines with Armaflex foam shielding to prevent thermal losses." }
        ],
        highlights: [
            { icon: "FaIndustry", title: "Industry", value: "Commercial HVAC Piping & Plant MEP" },
            { icon: "FaMapMarkerAlt", title: "Location", value: "Jebel Ali Industrial Area, Dubai, UAE" },
            { icon: "FaMicrochip", title: "Technologies Used", value: "Carbon Steel Pipes, ARC Welds, Armaflex Insulation, Grundfos Pumps" },
            { icon: "FaChartLine", title: "Key Benefits", value: "Highly efficient chilled water loops, zero flow leaks, and reliable pressure stability." },
            { icon: "FaCheckCircle", title: "Project Outcome", value: "Hydrostatic tests approved on first run, completed within outage window, active." }
        ],
        gallery: [
            { src: "/Images/Project/lighting_showcase.webp", caption: "Fabricated booster Pump Manifold Skid" },
            { src: "/Images/Project/mcc_showcase.webp", caption: "HVAC Chilled Water Steel Piping lines" },
            { src: "/Images/Project/scada_showcase.webp", caption: "AHU Motorized Valve controls Array" },
            { src: "/Images/booth_exib.webp", caption: "System Hydrostatic Pressure Testing run" }
        ],
        cta: {
            title: "Need professional HVAC piping or pump skids?",
            desc: "Contact Vertex Controls today. Our mechanical engineers in Dubai will design, construct, weld, and commission custom piping manifolds conforming to municipality guidelines.",
            phone: "+971 55 496 2866",
            email: "Sales@vertex-controls.com"
        }
    }
};
