import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import { browseCategry } from "./BrowseCategory";
import ProductlistCard from "./ProductlistCard";
import { SKIP, LIMITOPENMARKETPLACE } from "../../../../Constant/AppConstant";
import { products } from "./db";

function BrowseCategory() {
  const navigate = useNavigate();
  const [query] = useState({
    limit: LIMITOPENMARKETPLACE,
    skip: SKIP,
  });
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const filters = ["all", "farm-produce", "value-added"];

  const prodList =
    filter === "all"
      ? products
      : products.filter((prod) => prod.category === filter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={browseCategry.brosweParentContainer}>
      <Box sx={browseCategry.brosweCategoryContainer}>
        <Box sx={browseCategry.brosweContentheadersFlex}>
          <Box sx={browseCategry.topcontemttext}>
            <Typography sx={browseCategry.header}>Products category</Typography>
            <Typography sx={browseCategry.header2}>
              Check our products
            </Typography>
          </Box>
          {!isSmallScreen && (
            <Box sx={browseCategry.viewMoreContainer}>
              <Typography
                onClick={() => navigate("/view-marketplace/farmproduce")}
                sx={browseCategry.viewMore}>
                View all Products
              </Typography>
              <ArrowRightAltSharpIcon size="large" />
            </Box>
          )}
        </Box>
        <ProductlistCard
          landingPageList={prodList}
          loading={loading}
          categoryLoading={loading}
          filterList={filters}
          setFilter={setFilter}
        />
        {isSmallScreen && (
          <Box sx={browseCategry.viewMoreContainersm}>
            <Typography
              onClick={() => navigate("/view-marketplace/farmproduce")}
              sx={browseCategry.viewMore}>
              View all Products
            </Typography>
            <ArrowRightAltSharpIcon size="large" color="#003C1C" />
          </Box>
        )}

        {/* <Box sx={browseCategry.brosweContentheadersFlex}>
          <Box sx={browseCategry.topcontemttext}>
            <Typography sx={browseCategry.header}>Inputs category</Typography>
            <Typography sx={browseCategry.header2}>
              Featured Inputs Category
            </Typography>
          </Box>
          {!isSmallScreen && (
            <Box sx={browseCategry.viewMoreContainer}>
              <Typography
                onClick={() => navigate("/view-marketplace/farminput")}
                sx={browseCategry.viewMore}>
                View all Inputs
              </Typography>
              <ArrowRightAltSharpIcon size="large" />
            </Box>
          )}
        </Box>
        <ProductlistCard
          landingPageList={prodList}
          loading={loading}
          categoryLoading={loading}
          filterList={filters}
        />
        {isSmallScreen && inputListLandingPage?.totalCount > 0 && (
          <Box sx={browseCategry.viewMoreContainersm}>
            <Typography
              onClick={() => navigate("/view-marketplace/farminput")}
              sx={browseCategry.viewMore}>
              View all Inputs
            </Typography>
            <ArrowRightAltSharpIcon size="large" color="#003C1C" />
          </Box>
        )} */}
      </Box>
    </Box>
  );
}

export default BrowseCategory;
