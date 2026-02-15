import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  GlobalStyles,
} from "@mui/material";
import { useNavigate } from "react-router";

import bannerav1 from "../Images/bannerav1.png";
import bannerav2 from "../Images/qabanner.svg";
import bannerav3 from "../Images/qabanner.svg";

import { bannerStyle } from "./Banner.js";
import bannerlg from "../Images/Banner.svg";
import bannersm from "../Images/bannerhomepagesm.svg";

function Banner() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  // Added 'delay' property to stagger the bobbling
  const bannerAvData1 = [
    {
      image: bannerav1,
      text: "Farming Associations",
      positionX: isSmallScreen ? "left" : "right",
      positionY: "top",
      valueX: isSmallScreen ? 5 : 10,
      valueY: isSmallScreen ? 75 : 40,
      delay: "0s",
    },
    {
      image: bannerav2,
      text: "Input Suppliers",
      positionX: "right",
      positionY: "bottom",
      valueX: isSmallScreen ? 7 : 41,
      valueY: isSmallScreen ? 25 : 20,
      delay: "0.6s",
    },
    {
      image: bannerav3,
      text: "Finance Companies",
      positionX: "right",
      positionY: "bottom",
      valueX: isSmallScreen ? 43 : 8,
      valueY: isSmallScreen ? 5 : 12,
      delay: "1.2s",
    },
  ];

  const bannerAvData2 = [
    {
      image: bannerav2,
      text: "Logistics Companies",
      positionX: isSmallScreen ? "left" : "right",
      positionY: "top",
      valueX: isSmallScreen ? 5 : 10,
      valueY: isSmallScreen ? 75 : 40,
      delay: "0.3s",
    },
    {
      image: bannerav1,
      text: "Quality Assurance",
      positionX: "right",
      positionY: "bottom",
      valueX: isSmallScreen ? 7 : 41,
      valueY: isSmallScreen ? 25 : 20,
      delay: "0.9s",
    },
    {
      image: bannerav3,
      text: "Corporate Buyers",
      positionX: "right",
      positionY: "bottom",
      valueX: isSmallScreen ? 43 : 8,
      valueY: isSmallScreen ? 5 : 12,
      delay: "1.5s",
    },
  ];

  const [currentAvData, setCurrentAvData] = useState(bannerAvData1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const switchAvatarLoop = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentAvData((prev) =>
          prev === bannerAvData1 ? bannerAvData2 : bannerAvData1,
        );
        setIsVisible(true);
      }, 1000);
    }, 6000); // 6 seconds loop

    return () => clearInterval(switchAvatarLoop);
  }, [isSmallScreen]);

  return (
    <>
      {/* 3. Injected CSS-in-JS Animation */}
      <GlobalStyles
        styles={{
          "@keyframes bobble": {
            "0%, 100%": { transform: "translateY(0) scale(1)" },
            "50%": { transform: "translateY(-12px) scale(1)" },
          },
        }}
      />

      <Box
        sx={{
          ...bannerStyle.background,
          position: "relative",
          overflow: "hidden",
          height: isSmallScreen ? "auto" : "calc(100vh - 88px)",
          // minHeight: isSmallScreen ? "600px" : "auto",
        }}>
        <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src={isSmallScreen ? bannersm : bannerlg}
            alt="Banner Background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={
            isSmallScreen
              ? bannerStyle.parentContainersm
              : bannerStyle.bannerContentContainer
          }>
          <Box
            sx={
              isSmallScreen
                ? bannerStyle.bannerTextContainersm
                : bannerStyle.bannerTextContainer
            }>
            <Typography
              sx={
                isSmallScreen
                  ? bannerStyle.bannerTextHeadersm
                  : bannerStyle.bannerTextHeader
              }>
              Farm Management Made Simple With Smart Technology.
            </Typography>

            <Typography
              sx={
                isSmallScreen
                  ? bannerStyle.bannerTextSubtextsm
                  : bannerStyle.bannerTextSubtext
              }>
              We strive to transform how farms operate, produce, and sell goods
              across Africa.
            </Typography>

            <Button
              sx={
                isSmallScreen
                  ? bannerStyle.bannerTextButtonsm
                  : bannerStyle.bannerTextButton
              }>
              Get Started
            </Button>
          </Box>

          {/* Avatar Container */}
          <Box sx={{ ...bannerStyle.avatarContainer, zIndex: 2 }}>
            {currentAvData.map((item, index) => (
              <Box
                key={`${item.text}-${index}`}
                sx={{
                  ...(isSmallScreen
                    ? bannerStyle.avatarBoxsm
                    : bannerStyle.avatarBox),
                  position: "absolute",
                  [item.positionX]: `${item.valueX}%`,
                  [item.positionY]: `${item.valueY}%`,

                  // Animation Logic
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.8s ease-in-out, transform 0.8s ease-in-out`,

                  // --- BOBBLE LOGIC ---
                  // This applies the infinite bobble and staggers it using the 'delay'
                  animation: `bobble 4s ease-in-out infinite`,
                  animationDelay: item.delay,
                  // ---------------------

                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  // padding: "0.8rem",
                }}>
                <img
                  src={item.image}
                  alt={item.text}
                  style={{
                    // width: isSmallScreen ? "30px" : "60px",
                    height: "auto",
                  }}
                />
                <Typography sx={bannerStyle.avatarBoxText}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Banner;
