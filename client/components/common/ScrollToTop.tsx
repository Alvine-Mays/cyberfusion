import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Fait défiler en haut à chaque changement de route
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}
