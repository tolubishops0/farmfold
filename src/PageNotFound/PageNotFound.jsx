import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { SIGNIN } from "../Routes/Routes";

import { styles } from "../Containers/Layout/LayoutStyle";
import { styles as viewSupportStyles } from "../Containers/GStyles/ViewSupportStyles";
import { styles as CsvBulkStyle } from "../Containers/GStyles/AjCsvBulkUploaderStyles";
import { pageNotFoundStyle } from "./pageNotFoundStyle";
import { commonStyles } from "../Style/CommonStyle";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`${SIGNIN}`);
  };

  const getText = () => {
    return "Go to Homepage";
  };

  return (
    <Grid>
      <Grid sx={{ ...styles.logoImageContainer }}></Grid>

      <Grid>
        <Grid
          container
          item
          sx={{
            ...viewSupportStyles.gridRadius,
            ...viewSupportStyles.ViewSupportMainContainer,
            ...pageNotFoundStyle.mainGrid,
          }}>
          <Box sx={{ ...commonStyles.relativePosition }}>
            <DescriptionOutlinedIcon
              sx={{ ...pageNotFoundStyle.DescriptionOutlinedIconStyle }}
            />
            <SearchIcon
              sx={{
                ...pageNotFoundStyle.SearchIconStyle,
              }}
            />
          </Box>

          <Box sx={{ ...pageNotFoundStyle.contentBoxStyle }}>
            <Typography
              sx={{
                ...pageNotFoundStyle.notFoundStyle,
              }}>
              Page Not Found
            </Typography>

            <Typography
              sx={{
                ...pageNotFoundStyle.notFoundContentStyle,
              }}>
              We're sorry, the page you requested could not be found. Please go
              back to homepage
            </Typography>
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              ...CsvBulkStyle.uploadButton,

              ...pageNotFoundStyle.uploadedBtn,
            }}
            onClick={handleNavigation}>
            {getText()}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
