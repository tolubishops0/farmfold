import React from "react";
import { Box, Typography } from "@mui/material";
import { aboutUs } from "../AboutUs";

import { firsrtsection } from "../../../Constant/AppConstant";

function FirstSection() {
  return (
    <Box sx={aboutUs.firstSectionparentcontainer}>
      <Box sx={aboutUs.firstSection}>
        <Box sx={aboutUs.leftSection}>
          <Typography sx={aboutUs.leftSectiontext}>
            Farmfold is an agricultural value-chain digital infrastructure
            provider focused on closing critical gaps across the agricultural
            ecosystem. In alignment with the Sustainable Development Goals,
            Farmfold is building a technology-driven ecosystem for agro-allied
            businesses, designed to replace inefficient physical processes and
            improve coordination across the value chain. The platform serves as
            a central integrator within Africa’s agricultural ecosystem,
            connecting farmers, processors, buyers, and partners through a
            unified digital infrastructure. By applying innovative technology,
            Farmfold aims to improve how agricultural products are grown,
            traded, financed, and delivered across Africa with greater
            transparency, efficiency, and scale.{" "}
          </Typography>
        </Box>
        <Box sx={aboutUs.rightSection}>
          <img src={firsrtsection} alt="img" style={aboutUs.bannerimg} />
        </Box>
      </Box>
    </Box>
  );
}

export default FirstSection;
