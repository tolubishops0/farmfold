import React, { useState } from "react";
import { Box, Typography, Button, Divider, useMediaQuery } from "@mui/material";
import { valueprop } from "./ValueProp.js";
import { useNavigate } from "react-router";

import add from "../Images/add.png";
import minus from "../Images/minus.png";
import valueropquote from "../Images/valueropquotenew.svg";

import {
  valuepropgrrnsmilingmanrightside,
  handholdingmanure,
} from "../../../../Constant/AppConstant.js";
import "../../css/style.css";

const ValueProps = ({ item, index, totalItems, openIndex, setOpenIndex }) => {
  const isOpen = index === openIndex;

  const openAccord = () => {
    setOpenIndex(isOpen ? -1 : index);
  };

  return (
    <>
      <Box
        onClick={openAccord}
        sx={{
          ...valueprop.parentContainer,
          padding: isOpen ? ".5rem 0" : "1rem 0",
          transition: "padding .3s ease-in",
        }}>
        <Box sx={valueprop.innertextContainer}>
          <Box sx={valueprop.outterquestionContainer}>
            <img
              src={isOpen ? minus : add}
              alt="button"
              style={valueprop.iconstyle}
            />
            <Typography sx={valueprop.innerquestionstyle}>
              {item.question}
            </Typography>
          </Box>
          {isOpen ? (
            <Typography sx={valueprop.answerstyle}>{item.answer}</Typography>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

function ValueProp() {
  const totalItems = Props.length;
  const [openIndex, setOpenIndex] = useState(-1);
  const navigate = useNavigate();

  return (
    <>
      <Box sx={valueprop.covercontainer}>
        <Box sx={valueprop.leftsidebackground(openIndex)}>
          <Box sx={valueprop.leftsideContainer}>
            <Box sx={valueprop.valuepropheader}>
              <Typography sx={valueprop.header}>Value Proposition</Typography>
              <Typography sx={valueprop.header2}>Our Offerings</Typography>
            </Box>
            <Box sx={valueprop.leftsideContainermapped}>
              {Props?.map((item, index) => (
                <>
                  <ValueProps
                    key={index}
                    item={item}
                    index={index}
                    totalItems={totalItems}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                  />
                  {index === totalItems - 1 ? null : (
                    <Divider sx={{ backgroundColor: "white" }} />
                  )}
                </>
              ))}
            </Box>

            <Button
              sx={valueprop.viemorebutton}
              // className="slide-bannerTextButton"
              onClick={() => navigate("/our-value-propositions")}>
              {" "}
              View More
            </Button>
          </Box>
        </Box>
        <Box sx={valueprop.rightsidebackground}>
          <img
            src={valuepropgrrnsmilingmanrightside}
            alt="faq header"
            style={{
              width: "100%",
              "@media (min-width: 1500px)": {
                width: "100%",
                objectFit: "cover",
              },
              "@media (max-width: 1499px)": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            }}
          />
        </Box>
      </Box>
      <Box className="lowercontainercontainer">
        <Box className="lowercontainerleft">
          <img src={handholdingmanure} alt="bgleft" style={valueprop.imgleft} />
        </Box>
        <Box className="lowerrighttextcontainer">
          <Box className="lowerrightinnertextcontainer">
            <img
              src={valueropquote}
              alt="bgleft"
              style={valueprop.valueropquote}
            />

            <Typography
              // className="lowercontainertext"
              sx={valueprop.lowercontainertext}>
              Farmfold is built to reshape how agricultural products are grown,
              traded, financed, and delivered across Africa with greater
              transparency and efficiency.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ValueProp;

const Props = [
  {
    question: "Digital Infrastructure",
    answer:
      "Farmfold connects agricultural buyers and sellers through technology, enabling seamless transactions and more efficient supply chain operations.",
  },
  {
    question: "Input Supply",
    answer:
      "Farmfold provides farmers with access to quality agricultural inputs including seeds, fertilizers, pesticides, herbicides, and essential equipment.",
  },
  {
    question: "Financial Services",
    answer:
      "Farmfold helps close financing gaps by connecting farmers to accessible funding options that support productivity and growth.",
  },
  {
    question: "Marketplace Access",
    answer:
      "Farmfold operates a B2B and B2C marketplace that links farmers directly with buyers, making the sale of quality produce simple and reliable.",
  },
  {
    question: "Investment Opportunities",
    answer:
      "Farmfold is building a diversified agricultural investment portfolio that offers sustainable and high-potential opportunities for investors.",
  },
  {
    question: "Data & Insights",
    answer:
      "Farmfold develops agricultural data systems that support forecasting, analytics, and better decision-making across the value chain.",
  },
];
