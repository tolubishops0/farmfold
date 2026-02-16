import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import { browseCategry } from "./BrowseCategory";
import ProductlistCard from "./ProductlistCard";
import { useProducts } from "../../chore/ProductContext";
import { VIEW_MARKETPLACE } from "../../Routes/Routes";

function BrowseCategory() {
  const navigate = useNavigate();
  const products = useProducts();

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const filters = ["all", "farm-produce", "value-added"];

  const prodList =
    filter === "all"
      ? products
      : products.filter((prod) => prod.category === filter);

  console.log({ prodList });
  console.log({ products }, "from categorits");

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
                onClick={() => navigate(VIEW_MARKETPLACE)}
                sx={browseCategry.viewMore}>
                View all Products
              </Typography>
              <ArrowRightAltSharpIcon size="large" />
            </Box>
          )}
        </Box>
        <ProductlistCard
          loading={loading}
          filterList={filters}
          activeFilter={filter}
          setFilter={setFilter}
          landingPageList={prodList}
          categoryLoading={loading}
        />
        {isSmallScreen && (
          <Box sx={browseCategry.viewMoreContainersm}>
            <Typography
              onClick={() => navigate(VIEW_MARKETPLACE)}
              sx={browseCategry.viewMore}>
              View all Products
            </Typography>
            <ArrowRightAltSharpIcon size="large" color="#003C1C" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BrowseCategory;
