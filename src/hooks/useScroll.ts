import { debounce } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

// Custom hook to track scroll position and reset it
const useScroll = (threshold: number = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  const resetScroll = useCallback(() => {
    window.scrollTo(0, 0);
    setIsScrolled(false);
  }, []);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedScroll, { passive: true });
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [handleScroll]);

  return { isScrolled, resetScroll };
};

export default useScroll;
