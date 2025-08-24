import { useEffect, useState } from "react";
import MobileRoutes from "./routes/MobileRoutes";
import WebRoutes from "./routes/WebRoutes";

function App() {
  const [isMobile, setIsMobile] = useState(() => {
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isSmallScreen = window.innerWidth <= 768;

    return isMobileDevice || isSmallScreen;
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isSmallScreen = window.innerWidth <= 768;

      setIsMobile(isMobileDevice || isSmallScreen);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileRoutes /> : <WebRoutes />;
}

export default App;
