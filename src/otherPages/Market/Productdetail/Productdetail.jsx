import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Divider,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { styles } from "../MarketStyle.js";
import { marketplacefloer } from "../../../Constant/AppConstant.js";
import { AjRating } from "../../../Components/AjRating.jsx";
import { textCapitalize } from "../../../Services/commonService/commonService.js";
import AjDialog from "../../../Components/AjDialog/AjDialog.jsx";
import notFound from "../../../Homepage/Images/search-PsilkjW4cC.png";
import { useProducts } from "../../../chore/ProductContext.jsx";
import MarketViewMoreList from "../MarketViewMoreList.jsx";

const RightDetails = ({ productDetail, loading }) => (
  <>
    {loading ? (
      <Box sx={{ ...styles.proddetailtextSekeleton }}>
        <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="20%" />
        <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="40%" />
        <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="60%" />
      </Box>
    ) : (
      <Box sx={{ ...styles.proddetailtext }}>
        <Box sx={{ ...styles.proddetailnameandrating }}>
          <Typography sx={{ ...styles.proddetailname }}>
            {textCapitalize(productDetail?.product_name)}
          </Typography>
          <Box sx={{ ...styles.ratingContainer }}>
            <Typography sx={{ ...styles.ratingdetails }}>
              {productDetail?.rating}
            </Typography>
            <AjRating
              defaultValue={productDetail?.rating}
              readOnly
              size="small"
            />
            <Typography sx={{ ...styles.ratecount }}>
              ({productDetail?.rating_count})
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ ...styles.proddetailseller }}>
          <Box
            component="span"
            sx={{ ...styles.proddetailsellernamecontainer }}>
            <Typography
              component="span"
              sx={{ ...styles.proddetailsellername }}>
              Quantity:{" "}
            </Typography>
            <Typography component="span" sx={{ ...styles.proddetailseller1 }}>
              {productDetail?.available_quantity}{" "}
              {textCapitalize(productDetail?.unit_of_measurement)}
            </Typography>
          </Box>
          <Box
            component="span"
            sx={{ ...styles.proddetailsellernamecontainer }}>
            <Typography
              component="span"
              sx={{ ...styles.proddetailsellername }}>
              Seller:{" "}
            </Typography>
            <Typography component="span" sx={{ ...styles.proddetailseller1 }}>
              {`${productDetail?.first_name} ${productDetail?.last_name}`}
            </Typography>
          </Box>
        </Typography>

        <Typography sx={{ ...styles.proddetaildescription }}>
          {productDetail?.desc}
        </Typography>
        <Divider sx={{ ...styles.proddetaildivider }} />

        <Typography sx={{ ...styles.proddetailcostcontainer }}>
          <Typography sx={{ ...styles.proddetailcost }}>
            {productDetail?.price_per_unit}
          </Typography>
          <Typography sx={{ ...styles.proddetailsellerqty }}>
            {textCapitalize(`(per ${productDetail?.unit_of_measurement})`)}
          </Typography>
        </Typography>
        <Button sx={{ ...styles.proddetailbuy }}>Buy Now</Button>
      </Box>
    )}
  </>
);

const SideImage = ({
  newImgArr,
  handleImageClick,
  isimageActive,
  setExpandImage,
}) => (
  <Box sx={{ ...styles.leftimgs }}>
    {newImgArr?.slice(0, 4)?.map((item, index) => (
      <Box sx={styles.bottomimgMultpleContainer} key={index}>
        <Box sx={styles.bottomimgMultpleimg}>
          {newImgArr?.length > 4 && index === 3 && (
            <div
              style={styles.overlayStyles}
              onClick={() => setExpandImage(true)}>
              +{newImgArr.length - index}
            </div>
          )}
          <img
            src={item.file_path}
            alt="thumb"
            style={{ ...styles.imglg }}
            onClick={() => handleImageClick(index, item.file_path)}
          />
        </Box>
        <Typography
          sx={styles.scrollbarBottomimg(index === isimageActive)}></Typography>
      </Box>
    ))}
  </Box>
);

const MiddleImage = ({
  productDetail,
  loading,
  activeImageUrl,
  handleImageClickOnPopup,
  isimageActive,
  newImgArr,
  handleImageClick,
  setExpandImage,
}) => (
  <Box sx={{ ...styles.leftimagescontainer }}>
    <Box sx={{ ...styles.productimgContainer }}>
      {loading ? (
        <Skeleton
          sx={{ bgcolor: "rgba(245, 245, 245, 1)", borderRadius: "8px" }}
          height="23rem"
          variant="rectangular"
        />
      ) : (
        <img
          src={activeImageUrl || productDetail?.file_path}
          alt="product"
          style={{ ...styles.imglg }}
          onClick={() =>
            handleImageClickOnPopup(
              isimageActive,
              activeImageUrl || productDetail?.file_path,
            )
          }
        />
      )}
    </Box>
    <SideImage
      newImgArr={newImgArr}
      handleImageClick={handleImageClick}
      isimageActive={isimageActive}
      setExpandImage={setExpandImage}
    />
  </Box>
);

function Productdetail() {
  const navigate = useNavigate();
  const products = useProducts();
  const { id } = useParams();
  const productId = Number(id);
  const isSmallScreen = useMediaQuery("(max-width: 991px)");

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProductUnAvailable, setIsProductUnAvailable] = useState(false);
  const [isimageActive, setisimageActive] = useState(0);
  const [activeImageUrl, setActiveImageUrl] = useState(null);
  const [activeImageUrlOnPopUp, setactiveImageUrlOnPopUp] = useState(null);
  const [expandImage, setExpandImage] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setLoading(true);
    const foundProduct = products?.find((p) => p.id === productId);

    if (foundProduct) {
      const mappedProduct = {
        ...foundProduct,
        product_name: foundProduct.name,
        file_path: foundProduct.image,
        desc: foundProduct.description,
        price_per_unit: foundProduct.price,
        currency: "₦",
        available_quantity: "In Stock",
        unit_of_measurement: foundProduct.unit.replace("per ", ""),
        rating_count: "10+",
        first_name: "Alihu",
        last_name: "Garba",
      };
      setProductDetail(mappedProduct);
      setActiveImageUrl(mappedProduct.file_path);
      setactiveImageUrlOnPopUp(mappedProduct.file_path);
      setIsProductUnAvailable(false);
    } else {
      setIsProductUnAvailable(true);
    }
    setLoading(false);
  }, [productId, products]);

  const handleImageClick = (index, url) => {
    setisimageActive(index);
    setActiveImageUrl(url);
  };

  const handleImageClickOnPopup = (url) => {
    setactiveImageUrlOnPopUp(url);
    setExpandImage(true);
  };

  const handleScroll = (event) => {
    const scrollPosition = event.currentTarget.scrollLeft;
    const itemWidth = event.currentTarget.offsetWidth;
    const index = Math.round(scrollPosition / itemWidth);
    setActiveStep(index);
  };

  const newImgArr = useMemo(() => {
    const defaultImg = productDetail
      ? [{ file_path: productDetail.file_path }]
      : [];
    const otherImgs =
      productDetail?.other_images?.map((img) => ({ file_path: img })) || [];
    return [...defaultImg, ...otherImgs];
  }, [productDetail]);

  const otherProd = useMemo(() => {
    return products?.filter((prod) => prod.id !== productId);
  }, [products, productId]);

  return (
    <Box sx={{ backgroundColor: "#F8F8F8", position: "relative" }}>
      {!isSmallScreen && (
        <img src={marketplacefloer} alt="" style={styles.flowerimg} />
      )}

      <Box sx={{ ...styles.proddetailbg }}>
        <Box sx={{ ...styles.proddetailbginnerContainer }}>
          {!isProductUnAvailable ? (
            <Box
              sx={{
                ...styles.proddetailstop(productDetail?.other_images || []),
              }}>
              {!isSmallScreen && (
                <MiddleImage
                  productDetail={productDetail}
                  loading={loading}
                  activeImageUrl={activeImageUrl}
                  handleImageClickOnPopup={handleImageClickOnPopup}
                  isimageActive={isimageActive}
                  newImgArr={newImgArr}
                  handleImageClick={handleImageClick}
                  setExpandImage={setExpandImage}
                />
              )}

              {isSmallScreen && (
                <Box sx={{ width: "100%", backgroundColor: "#F8F8F8", pb: 2 }}>
                  <Box
                    onScroll={handleScroll}
                    sx={{
                      width: "100%",
                      height: "22rem",
                      display: "flex",
                      overflowX: "auto",
                      scrollSnapType: "x mandatory",
                      "&::-webkit-scrollbar": { display: "none" },
                      scrollbarWidth: "none",
                    }}>
                    {(newImgArr.length > 0
                      ? newImgArr
                      : [{ file_path: notFound }]
                    ).map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          minWidth: "100%",
                          height: "100%",
                          scrollSnapAlign: "start",
                          display: "flex",
                          justifyContent: "center",
                        }}>
                        <img
                          src={item.file_path}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                          alt="product"
                        />
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}>
                    {(newImgArr.length > 0
                      ? newImgArr
                      : [{ file_path: notFound }]
                    ).map((index) => (
                      <Box
                        key={index}
                        sx={{
                          width: index === activeStep ? "24px" : "12px",
                          height: "4px",
                          borderRadius: "2px",
                          backgroundColor:
                            index === activeStep ? "#006D33" : "#C4C4C4",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              <RightDetails productDetail={productDetail} loading={loading} />
            </Box>
          ) : (
            <ProductNotFound navigate={navigate} />
          )}
        </Box>
        <MarketViewMoreList
          alladsloading={loading}
          allOpenMarketPlaceProducts={otherProd}
        />
      </Box>

      <AjDialog
        open={expandImage}
        closeModal={setExpandImage}
        title={"Product Images"}>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={activeImageUrlOnPopUp}
            style={{
              width: "90%",
              height: "50vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
            alt="zoom"
          />
          <Box
            sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto", ml: 4 }}>
            {newImgArr.map((item, index) => (
              <img
                key={index}
                src={item.file_path}
                onClick={() => setactiveImageUrlOnPopUp(item.file_path)}
                style={{
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  objectFit: "cover",
                  objectPosition: "top",
                  border:
                    activeImageUrlOnPopUp === item.file_path
                      ? "2px solid green"
                      : "1px solid #ddd",
                }}
                alt="thumb"
              />
            ))}
          </Box>
        </Box>
      </AjDialog>
    </Box>
  );
}

const ProductNotFound = ({ navigate }) => (
  <Box
    sx={{
      ...styles.proddetailstopNoProductFount,
      textAlign: "center",
      py: 10,
    }}>
    <img src={notFound} alt="not found" style={{ width: "150px" }} />
    <Typography sx={styles.pageNotFounfText}>Oops!! No item found.</Typography>
    <Typography
      onClick={() => navigate("/view-marketplace")}
      sx={styles.pageNotFoundButton}>
      Go to Marketplace
    </Typography>
  </Box>
);

export default Productdetail;
