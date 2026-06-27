import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Preloader } from "../components/layout/Preloader";
import { CustomCursor } from "../components/layout/CustomCursor";
import { SmoothScroll } from "../components/layout/SmoothScroll";

const MainLayout = () => {
    return (
        <SmoothScroll>
            <CustomCursor />
            <Preloader />
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </SmoothScroll>
    );
};

export default MainLayout;