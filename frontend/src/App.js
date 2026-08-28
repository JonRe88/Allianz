import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import ProductPage from "@/pages/ProductPage";
import AdminPage from "@/pages/AdminPage";
import { PRODUCTS } from "@/data/products";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/seguro-de-vida" element={<ProductPage product={PRODUCTS["seguro-de-vida"]} />} />
          <Route path="/inversion-inteligente" element={<ProductPage product={PRODUCTS["inversion-inteligente"]} />} />
          <Route
            path="/gastos-medicos-mayores"
            element={<ProductPage product={PRODUCTS["gastos-medicos-mayores"]} />}
          />
          <Route path="/auto-y-hogar" element={<ProductPage product={PRODUCTS["auto-y-hogar"]} />} />
          <Route path="/prospectos" element={<AdminPage />} />
        </Routes>
        <WhatsAppFloat />
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
