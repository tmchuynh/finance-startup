import { useEffect, useState } from "react";
import { debounce } from "../debounce";

/**
 * A custom hook that returns a boolean indicating whether the screen width is large (>= 1024 pixels).
 * It listens to the window resize event and updates the state accordingly.
 *
 * @returns {boolean} - `true` if the screen width is 1024 pixels or larger, `false` otherwise.
 *
 * @example
 * const isLargeScreen = useLargeScreensOnly();
 * console.log(isLargeScreen); // true or false based on the screen width
 */
const useLargeScreensOnly = (): boolean => {
  const [IsLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    const debouncedHandleResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedHandleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return IsLargeScreen;
};

export default useLargeScreensOnly;
