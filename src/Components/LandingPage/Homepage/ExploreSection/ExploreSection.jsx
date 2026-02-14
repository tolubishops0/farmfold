import React from "react";
import { exploreSection } from "./ExploreSection";
import { Box, Typography, Button } from "@mui/material";
import { exploreimg } from "../../../../Constant/AppConstant.js";

function ExploreSection() {
  return (
    <Box sx={exploreSection.background}>
      <Box sx={exploreSection.textcontent}>
        <Box sx={exploreSection.topcontemttext}>
          <Typography sx={exploreSection.header}>AJEOBA MARKETPLACE</Typography>
          <Typography sx={exploreSection.header2}>
            Explore high quality farm products and inputs
          </Typography>
        </Box>
        <Box sx={exploreSection.bottomContent}>
          <Box sx={exploreSection.exploreImageLeftContainer}>
            <img
              src={exploreimg}
              alt="exploreimg"
              style={exploreSection.exploreImageLeft}
            />
          </Box>

          <Box sx={exploreSection.exploreContentright}>
            <Typography sx={exploreSection.exploreContentrightText}>
              At our marketplace, we don’t just sell farm products and inputs;
              we provide a seamless way to connect and transact across the
              agricultural value chain.{" "}
            </Typography>
            <Typography sx={exploreSection.exploreContentrightText}>
              We link buyers and sellers through an interactive B2B/B2C digital
              platform for quality farm produce and inputs. Showcase, trade, and
              manage payments and orders with ease in one virtual space.
            </Typography>
            <Typography sx={exploreSection.exploreContentrightText}>
              Explore Farmfold today and access a wide range of high-quality
              farm products and inputs.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ExploreSection;
