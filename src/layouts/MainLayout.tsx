import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Preloader } from "../components/layout/Preloader";
import { SmoothScroll } from "../components/layout/SmoothScroll";
import { CustomCursor } from "../components/layout/CustomCursor";
import { RoutePreloader } from "../components/layout/RoutePreloader";

const MainLayout = () => {
    return (
        <SmoothScroll>
            <CustomCursor />
            <Preloader />
            <Navbar />

            <main>
                <Suspense fallback={<RoutePreloader />}>
                    <Outlet />
                </Suspense>
            </main>

            <Footer />
        </SmoothScroll>
    );
};

export default MainLayout;