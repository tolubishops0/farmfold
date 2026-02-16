import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { aboutUs } from "../AboutUs";

import { corevalues } from "../../../Constant/AppConstant";

function CoreValues() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box sx={aboutUs.parentContainer}>
      <Box sx={aboutUs.innerContainer}>
        <Box sx={aboutUs.toptext}>
          <Typography sx={aboutUs.header}> Farmfold’s Core Values</Typography>
          <Typography sx={aboutUs.bottomtextdd}>
            Our core values focus on building user-centered solutions powered by
            skilled people and reliable technology. We operate with strong
            ethical standards and continuously improve through digital
            innovation and modern tools.
          </Typography>
        </Box>
        <Box sx={aboutUs.corevaluebottom}>
          {corevalues.map((item, index) => (
            <Box
              key={index}
              sx={aboutUs.corevalueimgs(
                isMobile,
                index === corevalues.length - 1,
              )}>
              <img src={item.img} alt="img" style={aboutUs.bannerimgcovalues} />
              <Typography sx={aboutUs.corvalname}>{item.name}</Typography>
              <Typography sx={aboutUs.corvaltext}>{item.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CoreValues;
