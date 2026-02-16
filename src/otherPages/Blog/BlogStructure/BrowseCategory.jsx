import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import { browseCategry } from "./BrowseCategory";
import ProductlistCard from "./ProductlistCard";
import { SKIP, LIMITOPENMARKETPLACE } from "../../../../Constant/AppConstant";
import { showToast } from "../../../../Services/toast";

function BrowseCategory() {
  
  const navigate = useNavigate();
  const [query] = useState({
    limit: LIMITOPENMARKETPLACE,
    skip: SKIP,
  });
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [productListLandingPage, setProductListLandingPage] = useState([])
  const [productLoading, setProductLoading] = useState(null)
    const [inputListLandingPage, setInputListLandingPage] = useState([])
    const [inputLoading, setInputLoading] = useState(null)

    const fetchProductData = () => {

      setProductLoading(true)
      let searchObject = {
        limit: query.limit,
        skip: query.skip,
      };
  
      let q = Object.keys(searchObject)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchObject[k]))
               .join('&');
  
      let url = `${process.env.REACT_APP_BASE_URL}/api/public/trading/advertisement?` + q;
  
      fetch(`${url}`, {
        method: "get",
        headers: {
          'Context-Type': 'application/json',
        }
      })
      .then(response => response.json())
        .then((res) => {
          setProductListLandingPage(res?.data)
          setProductLoading(false)
        })
        .catch((err) => {
          showToast(err.message, "error");
        });
      
    }

    const fetchInputData = () => {

      setInputLoading(true)
      let searchObject = {
        limit: query.limit,
        skip: query.skip,
      };
  
      let q = Object.keys(searchObject)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchObject[k]))
               .join('&');
  
      let url = `${process.env.REACT_APP_BASE_URL}/api/public/input/advertisement?` + q;
  
      fetch(`${url}`, {
        method: "get",
        headers: {
          'Context-Type': 'application/json',
        }
      })
      .then(response => response.json())
        .then((res) => {
          setInputListLandingPage(res?.data)
          setInputLoading(false)
        })
        .catch((err) => {
          showToast(err.message, "error");
        });
      
    }

  useEffect(() => {
    fetchProductData()
    fetchInputData()
  }, [query]);

  return (
    <Box sx={browseCategry.brosweParentContainer}>
      <Box sx={browseCategry.brosweCategoryContainer}>
        <Box sx={browseCategry.brosweContentheadersFlex}>
          <Box sx={browseCategry.topcontemttext}>
            <Typography sx={browseCategry.header}>Products category</Typography>
            <Typography sx={browseCategry.header2}>
              Featured Products Category
            </Typography>
          </Box>
          {!isSmallScreen && (
            <Box sx={browseCategry.viewMoreContainer}>
              <Typography
                onClick={() => navigate("/view-marketplace")}
                sx={browseCategry.viewMore}
              >
                View all Products
              </Typography>
              <ArrowRightAltSharpIcon size="large" />
            </Box>
          )}
        </Box>
        <ProductlistCard
          landingPageList={productListLandingPage}
          loading={productLoading}
          filterList={productcateggoty}
        />
        {isSmallScreen && productListLandingPage?.totalCount > 0 && (
          <Box sx={browseCategry.viewMoreContainersm}>
            <Typography
              onClick={() => navigate("/view-marketplace")}
              sx={browseCategry.viewMore}
            >
              View all Products
            </Typography>
            <ArrowRightAltSharpIcon size="large" color="#003C1C" />
          </Box>
        )}

        <Box sx={browseCategry.brosweContentheadersFlex}>
          <Box sx={browseCategry.topcontemttext}>
            <Typography sx={browseCategry.header}>Inputs category</Typography>
            <Typography sx={browseCategry.header2}>
              Featured Inputs Category
            </Typography>
          </Box>
          {!isSmallScreen && (
            <Box sx={browseCategry.viewMoreContainer}>
              <Typography
                onClick={() => navigate("/view-marketplace")}
                sx={browseCategry.viewMore}
              >
                View all Inputs
              </Typography>
              <ArrowRightAltSharpIcon size="large" />
            </Box>
          )}
        </Box>
        <ProductlistCard
          landingPageList={inputListLandingPage}
          loading={inputLoading}
          filterList={inputcateggoty}
        />
        {isSmallScreen && inputListLandingPage?.totalCount > 0 && (
          <Box sx={browseCategry.viewMoreContainersm}>
            <Typography
              onClick={() => navigate("/view-marketplace")}
              sx={browseCategry.viewMore}
            >
              View all Inputs
            </Typography>
            <ArrowRightAltSharpIcon size="large" color="#003C1C" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BrowseCategory;

const productcateggoty = [
  "All Product",
  "Discount",
  "Refridgation",
  "livestocks",
  "grains",
];
const inputcateggoty = [
  "All Input",
  "manure",
  "Horticulture",
  "fertilizer",
  "manure",
];
