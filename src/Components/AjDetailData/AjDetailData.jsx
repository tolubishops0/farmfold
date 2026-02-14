import React from "react";
import { Box } from "@mui/material";
import { viewProfileStyles } from "../../Containers/GStyles/ViewProfileStyle";
import { commonStyles } from "../../Style/CommonStyle";

const alignStyle = {
  alignItems: "center",
  gap: "0.25rem",
  flexWrap: "wrap",
};

const documentStyle = {
  marginTop: 0,
  marginBottom: "0 !important",
  textDecoration: "none",
};
const flexStyle = {
  display: "flex",
};

const AjDetailData = (props) => {
  const {
    index,
    metaData,
    data,
    documentDownloader, //This props allows you to use document downloader in this component
    fileName,
    fileId,
    styleData,
    Address,
    secondryIndex,
    secondryMetaData,
    secondryData,
    styleData2,
  } = props;
  return (
    <>
      <Box
        sx={{
          ...viewProfileStyles.addressHeading,
          ...alignStyle,
          ...styleData,
        }}
      >
        <Box sx={{ ...flexStyle, ...alignStyle }}>
          <Box
            sx={{
              ...viewProfileStyles.addressLineHeading,
              ...commonStyles.textCapitalize,
            }}
          >
            {metaData} {index}&nbsp;-
          </Box>
          <Box
            sx={[
              viewProfileStyles.subHeadingColor,
              viewProfileStyles.addressContent,
              styleData2,
            ]}
          >
            {data}
          </Box>

        </Box>
        <Box sx={{ ...flexStyle, ...alignStyle }}>
          {Address && (
            <>
              <Box
                sx={{
                  ...viewProfileStyles.addressLineHeading,
                  ...commonStyles.textCapitalize,
                }}
              >
                {secondryMetaData} {secondryIndex}&nbsp;-
              </Box>
              <Box
                sx={[
                  viewProfileStyles.subHeadingColor,
                  viewProfileStyles.addressContent,
                ]}
              >
                {secondryData}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AjDetailData;
