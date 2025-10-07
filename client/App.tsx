import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Devis from "./pages/Devis";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import Formations from "./pages/Formations";
import Careers from "./pages/Careers";
import ScrollToTop from "@/components/common/ScrollToTop";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
// Réutilise le root existant pour éviter l'avertissement React
let root = (window as any).__app_root as ReturnType<typeof createRoot> | undefined;
if (!root) {
  root = createRoot(container);
  (window as any).__app_root = root;
}
root.render(<App />);

// HMR: démonter correctement pour éviter les doublons et erreurs DOM
if (import.meta && (import.meta as any).hot) {
  (import.meta as any).hot.accept?.();
  (import.meta as any).hot.dispose?.(() => {
    try { root?.unmount(); } catch {}
  });
}
