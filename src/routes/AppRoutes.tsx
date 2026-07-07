import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "../context/ContentContext";

import MainLayout from "../layouts/MainLayout";

// Route-level Code Splitting (Lazy Loading Pages)
const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Services = lazy(() => import("../pages/Services/Services"));
const Products = lazy(() => import("../pages/Products/Products"));
const Downloads = lazy(() => import("../pages/Downloads/Downloads"));
const Projects = lazy(() => import("../pages/Projects/Projects"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Quote = lazy(() => import("../pages/Quote/Quote"));
const ControlPanels = lazy(() => import("../pages/Services/ControlPanels"));
const IndustrialAutomation = lazy(() => import("../pages/Services/IndustrialAutomation"));
const ElectricalEngineering = lazy(() => import("../pages/Services/ElectricalEngineering"));
const MechanicalEngineering = lazy(() => import("../pages/Services/MechanicalEngineering"));
const SmartInfrastructure = lazy(() => import("../pages/Services/SmartInfrastructure"));
const AIIndustrialIoT = lazy(() => import("../pages/Services/AIIndustrialIoT"));
const EnergyManagement = lazy(() => import("../pages/Services/EnergyManagement"));
const MaintenanceAndOperation = lazy(() => import("../pages/Services/MaintenanceAndOperation"));
const ControlPanelsAutomationProject = lazy(() => import("../pages/Projects/ControlPanelsAutomationProject"));
const PumpStationAutomation = lazy(() => import("../pages/Projects/PumpStationAutomation"));
const ElectricalInfrastructure = lazy(() => import("../pages/Projects/ElectricalInfrastructure"));
const PowerCableInstallation = lazy(() => import("../pages/Projects/PowerCableInstallation"));
const LEDDisplayPower = lazy(() => import("../pages/Projects/LEDDisplayPower"));
const SmartLighting = lazy(() => import("../pages/Projects/SmartLighting"));
const EnergyMonitoring = lazy(() => import("../pages/Projects/EnergyMonitoring"));
const IndustrialIoT = lazy(() => import("../pages/Projects/IndustrialIoT"));
const WaterTreatment = lazy(() => import("../pages/Projects/WaterTreatment"));
const MechanicalInstallation = lazy(() => import("../pages/Projects/MechanicalInstallation"));

// Admin CMS pages
const AdminLogin = lazy(() => import("../pages/Admin/Login"));
const AdminDashboard = lazy(() => import("../pages/Admin/Dashboard"));

const AppRoutes = () => {
    return (
        <ContentProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Site Layout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/control-panels" element={<ControlPanels />} />
                        <Route path="/services/industrial-automation" element={<IndustrialAutomation />} />
                        <Route path="/services/electrical-engineering" element={<ElectricalEngineering />} />
                        <Route path="/services/mechanical-engineering" element={<MechanicalEngineering />} />
                        <Route path="/services/smart-infrastructure" element={<SmartInfrastructure />} />
                        <Route path="/services/ai-iot" element={<AIIndustrialIoT />} />
                        <Route path="/services/energy-management" element={<EnergyManagement />} />
                        <Route path="/services/maintenance-operation" element={<MaintenanceAndOperation />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/downloads" element={<Downloads />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/control-panels-automation" element={<ControlPanelsAutomationProject />} />
                        <Route path="/projects/pump-station-automation" element={<PumpStationAutomation />} />
                        <Route path="/projects/electrical-infrastructure" element={<ElectricalInfrastructure />} />
                        <Route path="/projects/power-cable-installation" element={<PowerCableInstallation />} />
                        <Route path="/projects/led-display-power" element={<LEDDisplayPower />} />
                        <Route path="/projects/smart-lighting" element={<SmartLighting />} />
                        <Route path="/projects/energy-monitoring" element={<EnergyMonitoring />} />
                        <Route path="/projects/industrial-iot" element={<IndustrialIoT />} />
                        <Route path="/projects/water-treatment" element={<WaterTreatment />} />
                        <Route path="/projects/mechanical-installation" element={<MechanicalInstallation />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/quote" element={<Quote />} />
                    </Route>

                    {/* Admin CMS Portal */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </BrowserRouter>
        </ContentProvider>
    );
};

export default AppRoutes;