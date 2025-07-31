import { useEffect, useState } from "react";
import MobileRoutes from "./routes/MobileRoutes";
import WebRoutes from "./routes/WebRoutes";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileRoutes /> : <WebRoutes />;
}

export default App;
