import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { whoneeds } from "./WhoNeedsTheSoftware.js";

import {
  whoneedsbannermobile,
  whoneedsbannerdesktop,
} from "../../Constant/AppConstant.js";

function Banner() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <Box sx={whoneeds.bannerContainer}>
      {!isSmallScreen ? (
        <img
          src={whoneedsbannerdesktop}
          alt="banner"
          style={whoneeds.bannerimg}
        />
      ) : (
        <img
          src={whoneedsbannermobile}
          alt="banner"
          style={whoneeds.bannerimg}
        />
      )}
    </Box>
  );
}

export default Banner;
