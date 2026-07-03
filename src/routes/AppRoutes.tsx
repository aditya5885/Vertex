import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/quote" element={<Quote />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;