import React, { useEffect, useRef, useState } from "react";
import { Box, GlobalStyles } from "@mui/material";

// This goes at the top of your HomePage.js or a separate file
export const revealStyles = (
  <GlobalStyles
    styles={{
      ".reveal-hidden": {
        opacity: 0,
        transform: "translateY(50px)", // Slide up from 50px below
        transition: "all 0.8s ease-out",
      },
      ".reveal-visible": {
        opacity: 1,
        transform: "translateY(0)",
      },
    }}
  />
);

export function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Only animate once
        }
      });
    });

    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={domRef}
      className={isVisible ? "reveal-visible" : "reveal-hidden"}>
      {children}
    </Box>
  );
}
