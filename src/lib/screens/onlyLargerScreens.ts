import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the screen size is larger (between 1025px and 1440px).
 */
const useBetweenLargeAndXL = () => {
  const [isBetweenLargeAndXL, setIsBetweenLargeAndXL] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBetweenLargeAndXL(
        window.innerWidth > 1024 && window.innerWidth <= 1440
      );
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isBetweenLargeAndXL;
};

export default useBetweenLargeAndXL;
