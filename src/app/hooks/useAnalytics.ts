import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("config", "G-JM73WRQGHC", {
      page_path: location.pathname + location.search,
    });
  }, [location]);
};
