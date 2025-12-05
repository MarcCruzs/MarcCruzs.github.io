import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import SeaPortal from "@/pages/sea-portal"
import { ThemeProvider } from "@/utils/ThemeContext";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter:   { opacity: 1, y: 0, transition: { duration: 1 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
    <div className="min-h-full flex flex-col bg-gradient-emerald">
      <Navbar />

      <main className="container-w flex-1 py-6">
        {/* AnimatePresence watches route changes and plays exit/enter */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/projects" element={<Page><Projects /></Page>} />
            <Route path="/projects/sea-portal" element={<Page><SeaPortal /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
    </ThemeProvider>
  );
}
