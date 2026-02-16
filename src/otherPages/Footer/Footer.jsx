import { Box, Typography, Divider, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import { footer } from "./Foter";
import fb from "../../Homepage/Images/fb.svg";
import yt from "../../Homepage/Images/youtube.svg";
import x from "../../Homepage/Images/twitter.svg";
import linkedin from "../../Homepage/Images/linkedin.svg";
import insta from "../../Homepage/Images/instagram.svg";
import phone from "../../Homepage/Images/call.svg";
import location from "../../Homepage/Images/location.svg";
import mail from "../../Homepage/Images/sms.svg";
import logo from "../../Assets/Images/whitelogo.png";

function Footer() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const currYear = new Date().getFullYear();
  return (
    <Box sx={footer.parentbg}>
      <Box sx={footer.parentContainer}>
        <Box sx={footer.topcontainer}>
          <Box sx={footer.leftcontainer}>
            <Typography
            // onClick={() => logoRedirection()}
            // sx={{ width: "30px", height: "30px" }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: "150px", height: "auto" }}
              />
            </Typography>
            <Typography sx={footer.leftText}>
              Farmfold provides digital infrastructure that connects and
              streamlines activities across the agricultural value chain.
            </Typography>
            <Typography sx={footer.socialmediaicons}>
              <a href="#">
                <img
                  src={fb}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <a href="#">
                {" "}
                <img
                  src={insta}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>

              <a href="#">
                {" "}
                <img
                  src={x}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <a href="#">
                {" "}
                <img
                  src={linkedin}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <a href="#">
                {" "}
                <img
                  src={yt}
                  alt="facebook logo"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </Typography>
          </Box>
          <Box sx={footer.midcontent}>
            <Typography sx={footer.midcontentsheader}>
              {!isSmallScreen ? "About Farmfold" : "More"}
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
                +234 800000122
              </Typography>
            </a>
            <a href="#" style={{ textDecoration: "none" }}>
              <Typography sx={footer.rightcontentsText}>
                <img src={mail} alt="email icon" />
                admin@farmfold.com{" "}
              </Typography>
            </a>
            <a href="#" style={{ textDecoration: "none" }}>
              <Typography sx={footer.rightcontentsText}>
                <img src={location} alt="address icon" />
                Lagos, Nigeria
              </Typography>{" "}
            </a>
          </Box>
        </Box>
        <Divider sx={footer.divider} />
        <Box sx={footer.bottomContainer}>
          {isSmallScreen && (
            <Box sx={footer.bottomtopcontent}>
              <Typography sx={footer.midcontentsText}>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Terms & Conditions
                </Link>
              </Typography>
              <Typography sx={footer.midcontentsText}>
                {" "}
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Data Privacy
                </Link>
              </Typography>{" "}
            </Box>
          )}

          <Typography sx={footer.midcontentsText}>
            Copyright ©️ {currYear} Farmfold. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
