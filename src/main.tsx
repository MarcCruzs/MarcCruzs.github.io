import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import App from "./App";
import Showroom from "./pages/Showroom";
import ClientPortal from "./pages/ClientPortal";
import SunriseBakery from "./pages/demo/SunriseBakery";

/** After a route change, scroll to the hash target once the DOM has painted. */
function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Try immediately, then retry after a short delay to handle
    // cross-page navigations where sections haven't mounted yet
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    if (!tryScroll()) {
      const timer = setTimeout(tryScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash, key]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/showroom" element={<Showroom />} />
        <Route path="/portal/:slug" element={<ClientPortal />} />
        <Route path="/demo/sunrise-bakery" element={<SunriseBakery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
