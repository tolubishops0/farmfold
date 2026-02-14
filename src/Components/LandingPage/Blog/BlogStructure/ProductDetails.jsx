import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Divider,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { styles } from "../ProductListingExpanded/ProductList.js";
import { DETAILSPAGE_LIMIT, SKIP } from "../../../../Constant/AppConstant.js";
import ProdDetailsviewmore from "./ProdDetailsviewmore.jsx";
import { AjRating } from "../../../AjRating.jsx";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService.js";
import { showToast } from "../../../../Services/toast.js";

function ProductDetails() {
  
  const navigate = useNavigate();
  const { id: productId, productname: productType } = useParams();
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  const [query] = useState({
    limit: DETAILSPAGE_LIMIT,
    skip: SKIP,
  });

  const [allOpenMarketPlaceProducts, setAllOpenMarketPlaceProducts] = useState(null)
  const [alladsloading, setAlladsloading] = useState(null)

  const [productDetail, setProductDetail] = useState(null)
  const [productadloadingbyid, setProductAdLoadingById] = useState(null)

  const [inputActiveAdDetail, setInputActiveAdDetail] = useState(null)
  const [inputadloadingbyid, setInputadloadingbyid] = useState(null)

  const fetchData = (searchObject) => {

    setAlladsloading(true)
    let q = Object.keys(searchObject)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchObject[k]))
             .join('&');

    let url = `${process.env.REACT_APP_BASE_URL}/api/public/trading/marketplace?` + q;

    fetch(`${url}`, {
      method: "get",
      headers: {
        'Context-Type': 'application/json',
      }
    })
    .then(response => response.json())
      .then((res) => {
        setAllOpenMarketPlaceProducts(res?.data);
        setAlladsloading(false)
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
    
  }

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    fetchData(searchObject)
  }, []);

  const fetchDataDetail = (id, endpoint, product_type) => {

    if (product_type === "farmproduce") {
      setProductAdLoadingById(true)
    } else if (product_type === "farminput") {
      setInputadloadingbyid(true)
    }
    
    let url = `${process.env.REACT_APP_BASE_URL}/${endpoint}/${id}`;

    fetch(`${url}`, {
      method: "get",
      headers: {
        'Context-Type': 'application/json',
      }
    })
    .then(response => response.json())
      .then((res) => {
        if (product_type === "farmproduce") {
          setProductDetail(res?.data?.AdvertisemetDetail);
          setProductAdLoadingById(false)
        } else if (product_type === "farminput") {
          setInputActiveAdDetail(res?.data?.advertisementDetail);
          setInputadloadingbyid(false)
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  }

  useEffect(() => {
    if (productType === "farmproduce") {
      fetchDataDetail(productId, "api/public/trading/advertisement", productType)
    } else if (productType === "farminput") {
      fetchDataDetail(productId, "api/public/input/advertisement", productType)
    }
  }, [productId, productType]);

  const isDetailLoading = inputadloadingbyid || productadloadingbyid;

  const generateImageUrl = (item) => {
    if (item) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item}`;
    }
    return (
      <Skeleton
        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
        height={200}
        background="red"
        variant="rectangular"
      />
    );
  };

  const handleBuy = (productId) => {
    if (productType === "farmproduce") {
      sessionStorage.setItem("productSelected", productId);
      localStorage.setItem("unregistered", "corperate_buyer");
      //navigate("/signup-buyer");
    } else if (productType === "farminput") {
      if (sessionStorage.getItem("productSelected"))
        sessionStorage.removeItem("productSelected");
      sessionStorage.setItem("inputSelected", productId);
      localStorage.setItem("unregistered", "input_buyer");
      //navigate("/signup-buyer");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#C7C7C7" }}>
      <Box sx={{ ...styles.proddetailbg }}>
        <Box sx={{ ...styles.proddetailstop }}>
          <Box sx={{ ...styles.productimgContainer }}>
            {isSmallScreen ? (
              <>
                {isDetailLoading ? (
                  <Skeleton
                    sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                    height={200}
                    background="red"
                    variant="rectangular"
                  />
                ) : (
                  <img
                    src={
                      productType === "farmproduce"
                        ? generateImageUrl(productDetail?.file_path)
                        : generateImageUrl(
                            inputActiveAdDetail?.url
                          )
                    }
                    alt={"product-name"}
                    style={{ ...styles.imgsm }}
                  />
                )}
              </>
            ) : (
              <>
                {isDetailLoading ? (
                  <Skeleton
                    sx={{
                      bgcolor: "rgba(245, 245, 245, 1)",
                      borderRadius: ".5rem",
                    }}
                    height="30rem"
                    variant="rectangular"
                  />
                ) : (
                  <img
                    src={
                      productType === "farmproduce"
                        ? generateImageUrl(productDetail?.file_path)
                        : generateImageUrl(
                            inputActiveAdDetail?.url
                          )
                    }
                    alt={"product-name"}
                    style={{ ...styles.imglg }}
                  />
                )}
              </>
            )}
          </Box>
          {isDetailLoading ? (
            <Box sx={{ ...styles.proddetailtext }}>
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="20%"
              />
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="40%"
              />
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="60%"
              />
              <Skeleton
                sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                width="60%"
              />
            </Box>
          ) : (
            <Box sx={{ ...styles.proddetailtext }}>
              <Typography sx={{ ...styles.proddetailname }}>
                {productType === "farmproduce"
                  ? textCapitalize(productDetail?.product_name)
                  : textCapitalize(
                      inputActiveAdDetail?.input_name
                    )}
              </Typography>
              <Typography sx={{ ...styles.proddetailseller }}>
                <Typography sx={{ ...styles.proddetailsellernamecontainer }}>
                  <Typography sx={{ ...styles.proddetailsellername }}>
                    Seller:{" "}
                  </Typography>
                  <Typography sx={{ ...styles.proddetailseller1 }}>
                    {productType === "farmproduce"
                      ? productDetail?.association_name ||
                        `${productDetail?.first_name}` +
                          ` ${productDetail?.last_name}`
                      : inputActiveAdDetail?.input_supplier_name}
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    ...styles.ratingContainer,
                  }}
                >
                  <Typography sx={{ ...styles.rating }}>
                    {productType === "farmproduce"
                      ? productDetail?.rating === null
                        ? "0.00"
                        : productDetail?.rating
                      : inputActiveAdDetail?.rating ===
                        null
                      ? "0.00"
                      : inputActiveAdDetail?.rating}
                  </Typography>
                  <AjRating
                    defaultValue={
                      productType === "farmproduce"
                        ? productDetail?.rating
                        : inputActiveAdDetail?.rating
                    }
                    readOnly={true}
                    size="small"
                  />
                </Box>
              </Typography>
              {productType === "farmproduce" ? (
                <Typography sx={{ ...styles.proddetaildescription }}>
                  Discover the unparalleled freshness of our locally sourced
                  farm produce. Handpicked and delivered straight to you, our
                  products embody the essence of quality and flavor.{" "}
                </Typography>
              ) : (
                <Typography sx={{ ...styles.proddetaildescription }}>
                  Elevate your farming experience with our premium agricultural
                  inputs. Specially curated for optimal yield and
                  sustainability.{" "}
                </Typography>
              )}

              <Divider sx={{ ...styles.proddetaildivider }} />
              <Typography sx={{ ...styles.proddetailcostcontainer }}>
                <Typography sx={{ ...styles.proddetailcost }}>
                  {" "}
                  {productType === "farmproduce"
                    ? numberWithCommas(
                        productDetail?.price_per_unit,
                        productDetail?.currency
                      )
                    : numberWithCommas(
                        inputActiveAdDetail?.price_per_unit,
                        inputActiveAdDetail?.currency
                      )}
                </Typography>
                <Typography
                  sx={{ ...styles.proddetailsellerqty, marginLeft: 1 }}
                >
                  {productType === "farmproduce"
                    ? textCapitalize(
                        `(per ${productDetail?.unit_of_measurement})`
                      )
                    : textCapitalize(
                        `(per ${inputActiveAdDetail?.unit_of_measurement})`
                      )}
                </Typography>
              </Typography>
              <Button
                onClick={() => {
                  handleBuy(productId)
                  window.location.href="https://ajeoba.com"

                }
                }
                sx={{ ...styles.proddetailbuy }}
              >
                Buy Now
              </Button>
            </Box>
          )}{" "}
        </Box>
        <ProdDetailsviewmore
          alladsloading={alladsloading}
          productadloading={productadloadingbyid}
          inputadloading={inputadloadingbyid}
          allOpenMarketPlaceProducts={allOpenMarketPlaceProducts}
        />
      </Box>
    </Box>
  );
}

export default ProductDetails;
