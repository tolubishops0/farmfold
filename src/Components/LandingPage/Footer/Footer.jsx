import * as React from "react";
import { Box, Grid, Typography, Divider, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { logoRedirection } from "../../../Services/commonService/commonService";

import { footer } from "./Foter";
import fb from "../Homepage/Images/fb.svg";
import yt from "../Homepage/Images/youtube.svg";
import x from "../Homepage/Images/twitter.svg";
import linkedin from "../Homepage/Images/linkedin.svg";
import insta from "../Homepage/Images/instagram.svg";
import phone from "../Homepage/Images/call.svg";
import location from "../Homepage/Images/location.svg";
import mail from "../Homepage/Images/sms.svg";

function Footer() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const currYear = new Date().getFullYear();
  return (
    <Box sx={footer.parentbg}>
      <Box sx={footer.parentContainer}>
        <Box sx={footer.topcontainer}>
          <Box sx={footer.leftcontainer}>
            <Typography onClick={() => logoRedirection()}>
              <img
                src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/logo_ax0dgb.svg"
                alt="logo"
              />
            </Typography>
            <Typography sx={footer.leftText}>
              Ajeoba is an agriculture value-chain digital infrastructure
              provider focused on bridging various gaps identified in the
              agricultural value chain.
            </Typography>
            <Typography sx={footer.socialmediaicons}>
              <a href="https://www.facebook.com/ajeobaex/">
                <img
                  src={fb}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <a href="https://www.instagram.com/ajeobaex/">
                <img
                  src={insta}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <a href="https://www.youtube.com/@ajeoba">
                <img
                  src={yt}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <a href="https://www.twitter.com/ajeobaex">
                <img
                  src={x}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <a href="https://www.linkedin.com/ajeobaex">
                <img
                  src={linkedin}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </Typography>
          </Box>
          <Box sx={footer.midcontent}>
            <Typography sx={footer.midcontentsheader}>
              {!isSmallScreen ? "About Ajeoba" : "More"}
            </Typography>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Typography sx={footer.midcontentsText}>About Us</Typography>
            </Link>
            <Link to="/faqs" style={{ textDecoration: "none" }}>
              <Typography sx={footer.midcontentsText}>FAQs </Typography>
            </Link>
            <Link to="/blog" style={{ textDecoration: "none" }}>
              <Typography sx={footer.midcontentsText}>Blog </Typography>
            </Link>
          </Box>
          {!isSmallScreen && (
            <Box sx={footer.midcontent}>
              <Typography sx={footer.midcontentsheader}>More</Typography>
              <Link to="#" style={{ textDecoration: "none" }}>
                <Typography sx={footer.midcontentsText}>
                  Terms & Conditions{" "}
                </Typography>
              </Link>{" "}
              <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                <Typography sx={footer.midcontentsText}>
                  Data Privacy{" "}
                </Typography>
              </Link>
            </Box>
          )}

          <Box sx={footer.midcontent}>
            <Typography sx={footer.midcontentsheader}> Contact Us</Typography>
            <a href="tel:+2349070534510" style={{ textDecoration: "none" }}>
              <Typography sx={footer.rightcontentsText}>
                <img src={phone} alt="call icon" />
                +234 9070534510
              </Typography>
            </a>
            <a
              href="mailto:admin@ajeoba.com"
              style={{ textDecoration: "none" }}>
              <Typography sx={footer.rightcontentsText}>
                <img src={mail} alt="email icon" />
                admin@ajeoba.com{" "}
              </Typography>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=13+Okotie+Eboh+Street,+Ikoyi,+Lagos+State"
              style={{ textDecoration: "none" }}>
              <Typography sx={footer.rightcontentsText}>
                <img src={location} alt="address icon" />
                13 Okotie Eboh Street, Ikoyi, Lagos State
              </Typography>{" "}
            </a>
          </Box>
        </Box>
        <Divider sx={footer.divider} />
        <Box sx={footer.bottomContainer}>
          {isSmallScreen && (
            <Box sx={footer.bottomtopcontent}>
              <Typography sx={footer.midcontentsText}>
                <Link
                  to="/terms-and-conditions"
                  style={{ color: "white", textDecoration: "none" }}>
                  Terms & Conditions
                </Link>
              </Typography>
              <Typography sx={footer.midcontentsText}>
                {" "}
                <Link
                  to="/privacy-policy"
                  style={{ color: "white", textDecoration: "none" }}>
                  Data Privacy
                </Link>
              </Typography>{" "}
            </Box>
          )}

          <Typography sx={footer.midcontentsText}>
            Copyright ©️ {currYear} Ajeoba. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
