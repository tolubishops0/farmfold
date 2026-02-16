import React from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { styles } from "./MarketStyle.js";

import { marketplacefloer } from "../../Constant/AppConstant.js";

function MarketBanner() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ position: "relative" }}>
      {isSmallScreen && (
        <img
          src={marketplacefloer}
          alt="marketplacefloer"
          style={styles.flowerimgmrkplcaebanner}
        />
      )}

      <Box
        sx={{
          ...styles.productListcontainer,
        }}>
        <Box sx={{ ...styles.textContainer }}>
          <Typography sx={{ ...styles.header }}>
            Explore Premium Farm Products and Agro Inputs{" "}
          </Typography>
          <Typography sx={{ ...styles.texts }}>
            At Farmfold, we don’t just provide farm products and inputs—we
            create a seamless pathway for transactions across the agricultural
            value chain.<br></br>
            <br></br>
            We connect buyers and sellers through an interactive B2B/B2C digital
            marketplace, offering a virtual space to showcase, trade, and manage
            orders. Enjoy reliable payment processing and real-time tracking for
            every transaction.
          </Typography>
        </Box>
      </Box>
      <img
        src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700038297/Rectangle_70_m7wsui.png"
        alt="digital"
        style={styles.rect}
      />
      <img
        src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1699980709/Frame_1000001902_f46dkz.png"
        alt="digital"
        style={styles.topcrop}
      />
    </Box>
  );
}

export default MarketBanner;
