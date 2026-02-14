import React, { useState, useEffect } from "react";
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
import {
  DETAILSPAGE_LIMIT,
  SKIP,
  marketplacefloer,
} from "../../../../Constant/AppConstant.js";
import ProdDetailsviewmore from "./ProdDetailsviewmore.jsx";
import { AjRating } from "../../../AjRating.jsx";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService.js";
import { showToast } from "../../../../Services/toast.js";
import AjDialog from "../../../AjDialog/AjDialog.jsx";
import pageRod from "../../Homepage/Images/pageNotFounfRod.png";
import notFound from "../../Homepage/Images/search-PsilkjW4cC.png";

function ProductDetails() {
  const navigate = useNavigate();
  const { id: productId, productname: productType } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 991px)");

  const [query] = useState({
    limit: DETAILSPAGE_LIMIT,
    skip: SKIP,
  });

  const [allOpenMarketPlaceProducts, setAllOpenMarketPlaceProducts] =
    useState(null);
  const [alladsloading, setAlladsloading] = useState(null);

  const [productDetail, setProductDetail] = useState(null);
  const [productadloadingbyid, setProductAdLoadingById] = useState(null);

  const [inputActiveAdDetail, setInputActiveAdDetail] = useState(null);
  const [inputadloadingbyid, setInputadloadingbyid] = useState(null);

  const [isimageActive, setisimageActive] = useState(0);
  const [ispopupimageActive, setispopupimageActive] = useState(0);

  const [activeImageUrl, setActiveImageUrl] = useState(null);
  const [activeImageUrlOnPopUp, setactiveImageUrlOnPopUp] = useState(null);

  const [expandImage, setExpandImage] = useState(false);
  const [isProductUnAvialable, setIsProductUnAvialable] = useState(false);
  const [imageUrlIndex, setImageUrlIndex] = useState();

  const fetchData = (searchObject) => {
    setAlladsloading(true);
    let q = Object.keys(searchObject)
      .map(
        (k) => encodeURIComponent(k) + "=" + encodeURIComponent(searchObject[k])
      )
      .join("&");

    let url =
      `${process.env.REACT_APP_BASE_URL}/api/public/trading/marketplace?` + q;

    fetch(`${url}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((res) => {
        setAllOpenMarketPlaceProducts(res?.data);
        setAlladsloading(false);
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    fetchData(searchObject);
  }, [query]);

  const fetchDataDetail = (id, endpoint, product_type) => {
    if (product_type === "farmproduce") {
      setProductAdLoadingById(true);
    } else if (product_type === "farminput") {
      setInputadloadingbyid(true);
    }

    let url = `${process.env.REACT_APP_BASE_URL}/${endpoint}/${id}`;

    fetch(`${url}`, {
      method: "get",
      headers: {
        "Context-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.statusText === "Not Found") {
          setIsProductUnAvialable(true);
        } else if (response.statusText === "OK") {
          setIsProductUnAvialable(false);
        }
        return response.json();
      })
      .then((res) => {
        if (product_type === "farmproduce") {
          setProductDetail(res?.data?.AdvertisemetDetail);
          setProductAdLoadingById(false);
        } else if (product_type === "farminput") {
          setInputActiveAdDetail(res?.data?.advertisementDetail);
          setInputadloadingbyid(false);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };

  useEffect(() => {
    if (productType === "farmproduce") {
      fetchDataDetail(
        productId,
        "api/public/trading/advertisement",
        productType
      );
    } else if (productType === "farminput") {
      fetchDataDetail(productId, "api/public/input/advertisement", productType);
    }
  }, [productId, productType]);

  const isDetailLoading = inputadloadingbyid || productadloadingbyid;

  const generateImageUrl = (item) => {
    if (item) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item}`;
    }
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

  const handleImageClick = (index, url) => {
    setisimageActive(index);
    setImageUrlIndex(index);
    setActiveImageUrl(url);
  };

  const handleImageClickOnPopup = (index, url) => {
    setispopupimageActive(index);
    setactiveImageUrlOnPopUp(url);
    setExpandImage(true);
  };


  const defaultImg = [
    {
      file_name:
        productType === "farmproduce"
          ? productDetail?.file_name
          : inputActiveAdDetail?.file_name,

      file_path:
        productType === "farmproduce"
          ? productDetail?.file_path
          : inputActiveAdDetail?.url,
    },
  ];

  const muiltpleimgs =
    (productType === "farmproduce"
      ? productDetail?.other_images
      : inputActiveAdDetail?.other_images) || [];

  const newImgArr = [...defaultImg, ...muiltpleimgs];

  const RightDetails = () => {
    return (
      <>
        {isDetailLoading ? (
          <Box sx={{ ...styles.proddetailtextSekeleton }}>
            <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="20%" />
            <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="40%" />
            <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="60%" />
            <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="60%" />
          </Box>
        ) : (
          <Box sx={{ ...styles.proddetailtext }}>
            <Box sx={{ ...styles.proddetailnameandrating }}>
              <Typography sx={{ ...styles.proddetailname }}>
                {productType === "farmproduce"
                  ? textCapitalize(productDetail?.product_name)
                  : textCapitalize(inputActiveAdDetail?.input_name)}
              </Typography>
              <Box
                sx={{
                  ...styles.ratingContainer,
                }}>
                <Typography sx={{ ...styles.ratingdetails }}>
                  {productType === "farmproduce"
                    ? productDetail?.rating === null
                      ? "0.00"
                      : productDetail?.rating
                    : inputActiveAdDetail?.rating === null
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
                <Typography sx={{ ...styles.ratecount }}>
                  (
                  {productType === "farmproduce"
                    ? productDetail?.rating_count
                    : inputActiveAdDetail?.rating_count}
                  )
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ ...styles.proddetailseller }}>
              <Typography sx={{ ...styles.proddetailsellernamecontainer }}>
                <Typography sx={{ ...styles.proddetailsellername }}>
                  Quantity:{" "}
                </Typography>
                <Typography sx={{ ...styles.proddetailseller1 }}>
                  {productType === "farmproduce"
                    ? productDetail?.available_quantity
                    : inputActiveAdDetail?.available_quantity}{" "}
                  {textCapitalize(
                    productDetail?.unit_of_measurement ||
                      inputActiveAdDetail?.unit_of_measurement
                  )}
                </Typography>
              </Typography>
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
            </Typography>
            {productType === "farmproduce" ? (
              <Typography sx={{ ...styles.proddetaildescription }}>
                {productDetail?.desc}
              </Typography>
            ) : (
              <Typography sx={{ ...styles.proddetaildescription }}>
                {inputActiveAdDetail?.desc}{" "}
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
              <Typography sx={{ ...styles.proddetailsellerqty }}>
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
              onClick={() => handleBuy(productId)}
              sx={{ ...styles.proddetailbuy }}>
              Buy Now
            </Button>
          </Box>
        )}{" "}
      </>
    );
  };

  const SmallscreenImage = () => {
    return (
      <>
        {!isDetailLoading ? (
          <Box
            sx={{
              backgroundColor: "#F8F8F8",
              width: "100%",
              height: "20rem",
              "@media(max-width: 300px)": {
                height: "15rem",
              },
            }}>
            <Box sx={styles.multipleimagessmallscreenContainer}>
              {newImgArr?.map((item, index) => (
                <Box
                  key={index}
                  sx={styles.smallImg}
                  onClick={() =>
                    handleImageClickOnPopup(
                      index,
                      item.file_path,
                      
                    )
                  }>
                  <img
                    src={generateImageUrl(item.file_path)}
                    alt="img"
                    style={{ ...styles.imgsmmg }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: "20rem",
              padding: "1rem",
              "@media(max-width: 300px)": {
                height: "15rem",
              },
            }}>
            <Skeleton
              sx={{ bgcolor: "rgba(245, 245, 245, 1)", height: "100%" }}
              // height="19rem"
              variant="rectangular"
            />
          </Box>
        )}
      </>
    );
  };

  const ProductNotFound = () => {
    return (
      <>
        {!isDetailLoading && (
          <Box sx={{ ...styles.proddetailstopNoProductFount }}>
            <Box sx={{ ...styles.proddetailstopNoProductFounDIcon }}>
              {" "}
              <img
                src={notFound}
                alt="marketplacefloer"
                style={styles.noProductFoundProductIcon}
              />
            </Box>

            {rodImgs.map((item, index) => (
              <Box
                key={index}
                sx={{
                  ...styles.pagenotFoundrod(item.right, item.left, item.top),
                }}>
                <img
                  src={item.img}
                  alt="img"
                  style={styles.noProductFoundProductIcon}
                />
              </Box>
            ))}
            <Typography sx={styles.pageNotFounfText}>
              Oops!! No item found.
            </Typography>
            <Typography
              onClick={() => navigate("/view-marketplace")}
              sx={styles.pageNotFoundButton}>
              Go to Marketplace
            </Typography>
          </Box>
        )}
      </>
    );
  };

  const SideImage = () => {
    return (
      <>
        {!isDetailLoading ? (
          <Box sx={{ ...styles.leftimgs }}>
            {newImgArr?.slice(0, 4)?.map((item, index) => (
              <Box sx={styles.bottomimgMultpleContainer} key={index}>
                <Box sx={styles.bottomimgMultpleimg}>
                  {newImgArr?.length > 4 && index === 3 && (
                    <div
                      style={styles.overlayStyles}
                      onClick={() => setExpandImage(true)}>
                      +{newImgArr && newImgArr?.length - index}
                    </div>
                  )}
                  <img
                    src={generateImageUrl(item.file_path)}
                    alt={item.file_name}
                    style={{
                      ...styles.imglg,
                    }}
                    onClick={() => handleImageClick(index, item.file_path)}
                  />
                </Box>
                <Typography
                  sx={styles.scrollbarBottomimg(
                    index === isimageActive
                  )}></Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: "8px",
              }}
              width="4.5rem"
              height="3.5rem"
              variant="rectangular"
            />
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: "8px",
              }}
              width="4.5rem"
              height="3.5rem"
              variant="rectangular"
            />
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: "8px",
              }}
              width="4.5rem"
              height="3.5rem"
              variant="rectangular"
            />
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: "8px",
              }}
              width="4.5rem"
              height="3.5rem"
              variant="rectangular"
            />
          </Box>
        )}
      </>
    );
  };

  const MiddleImage = () => {
    return (
      <Box sx={{ ...styles.leftimagescontainer }}>
        <Box sx={{ ...styles.productimgContainer }}>
          {isDetailLoading ? (
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: "8px",
              }}
              height="23rem"
              variant="rectangular"
            />
          ) : activeImageUrl ? (
            <img
              src={generateImageUrl(activeImageUrl)}
              alt={"product-name"}
              style={{ ...styles.imglg }}
              onClick={() =>
                handleImageClickOnPopup(imageUrlIndex, activeImageUrl)
              }
            />
          ) : (
            <img
              src={
                productType === "farmproduce"
                  ? generateImageUrl(productDetail?.file_path)
                  : generateImageUrl(inputActiveAdDetail?.url)
              }
              alt={"product-name"}
              style={{ ...styles.imglg }}
              onClick={() =>
                handleImageClickOnPopup(
                  0,
                  inputActiveAdDetail?.url || productDetail?.file_path
                )
              }
            />
          )}
        </Box>
        <SideImage />
      </Box>
    );
  };

  return (
    <Box sx={{ backgroundColor: "#F8F8F8", position: "relative" }}>
      {!isSmallScreen && (
        <img
          src={marketplacefloer}
          alt="marketplacefloer"
          style={styles.flowerimg}
        />
      )}

      <Box sx={{ ...styles.proddetailbg }}>
        <Box sx={{ ...styles.proddetailbginnerContainer }}>
          {!isProductUnAvialable ? (
            <Box sx={{ ...styles.proddetailstop(muiltpleimgs) }}>
              {!isSmallScreen && <MiddleImage />}
              {isSmallScreen && <SmallscreenImage />}
              <RightDetails />
            </Box>
          ) : (
            <ProductNotFound />
          )}{" "}
        </Box>
        <ProdDetailsviewmore
          alladsloading={alladsloading}
          productadloading={productadloadingbyid}
          inputadloading={inputadloadingbyid}
          allOpenMarketPlaceProducts={allOpenMarketPlaceProducts}
        />
      </Box>

      <AjDialog
        open={expandImage}
        closeModal={setExpandImage}
        title={"Product Images"}>
        <Box>
          <Box sx={{ backgroundColor: "#F8F8F8", width: "100%" }}>
            <Box sx={styles.popupimagecontainer}>
              {activeImageUrlOnPopUp && (
                <img
                  src={generateImageUrl(activeImageUrlOnPopUp)}
                  alt={"product-name"}
                  style={{ ...styles.imglgpopup }}
                />
              )}
            </Box>
          </Box>

          <Box sx={styles.imgwithscrollpopupcontainer}>
            {newImgArr?.map((item, index) => (
              <Box sx={styles.imgwithscrollpopup} key={index}>
                <Typography
                  sx={styles.scrollbarpopup(
                    index === ispopupimageActive
                  )}></Typography>
                <Box
                  sx={{
                    width: "4.5rem",
                    height: "3.5rem",
                  }}>
                  <img
                    src={generateImageUrl(item.file_path)}
                    alt="image"
                    style={styles.imglg}
                    onClick={() =>
                      handleImageClickOnPopup(index, item.file_path)
                    }
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </AjDialog>
    </Box>
  );
}

export default ProductDetails;

const rodImgs = [
  {
    img: pageRod,
    top: "20%",
    left: "13%",
  },
  {
    img: pageRod,
    top: "30%",
    left: "25%",
  },
  {
    img: pageRod,
    top: "40%",
    right: "25%",
  },
  {
    img: pageRod,
    top: "50%",
    right: "10%",
  },
];
