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
import { styles } from "../MarketStyle.js";
import { marketplacefloer } from "../../../Constant/AppConstant.js";
import { AjRating } from "../../../Components/AjRating.jsx";
import { textCapitalize } from "../../../Services/commonService/commonService.js";
import AjDialog from "../../../Components/AjDialog/AjDialog.jsx";
import notFound from "../../../Homepage/Images/search-PsilkjW4cC.png";
import { useProducts } from "../../../chore/ProductContext.jsx";
import MarketViewMoreList from "../MarketViewMoreList.jsx";

function Productdetail() {
  const navigate = useNavigate();
  const products = useProducts();
  const { id } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 991px)");

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProductUnAvailable, setIsProductUnAvailable] = useState(false);

  const [isimageActive, setisimageActive] = useState(0);
  const [ispopupimageActive, setispopupimageActive] = useState(0);
  const [activeImageUrl, setActiveImageUrl] = useState(null);
  const [activeImageUrlOnPopUp, setactiveImageUrlOnPopUp] = useState(null);
  const [expandImage, setExpandImage] = useState(false);
  const productId = Number(id);

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

  const handleImageClickOnPopup = (index, url) => {
    setispopupimageActive(index);
    setactiveImageUrlOnPopUp(url);
    setExpandImage(true);
  };

  const defaultImg = productDetail
    ? [{ file_path: productDetail.file_path }]
    : [];
  const otherImgs =
    productDetail?.other_images?.map((img) => ({ file_path: img })) || [];
  const newImgArr = [...defaultImg, ...otherImgs];

  const otherProd = products?.filter((prod) => prod.id !== productId);

  const RightDetails = () => (
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

  const SideImage = () => (
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
            sx={styles.scrollbarBottomimg(
              index === isimageActive,
            )}></Typography>
        </Box>
      ))}
    </Box>
  );

  const MiddleImage = () => (
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
      <SideImage />
    </Box>
  );

  return (
    <>
      <Box sx={{ backgroundColor: "#F8F8F8", position: "relative" }}>
        {!isSmallScreen && (
          <img src={marketplacefloer} alt="" style={styles.flowerimg} />
        )}

        <Box sx={{ ...styles.proddetailbg }}>
          <Box sx={{ ...styles.proddetailbginnerContainer }}>
            {!isProductUnAvailable ? (
              <Box sx={{ ...styles.proddetailstop(otherImgs) }}>
                {!isSmallScreen && <MiddleImage />}
                {isSmallScreen && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "20rem",
                      backgroundColor: "#F8F8F8",
                    }}>
                    <img
                      src={activeImageUrl}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      alt="prod"
                    />
                  </Box>
                )}
                <RightDetails />
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
              style={{ maxWidth: "100%", maxHeight: "60vh" }}
              alt="zoom"
            />
            <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto" }}>
              {newImgArr.map((item, index) => (
                <img
                  key={index}
                  src={item.file_path}
                  onClick={() => handleImageClickOnPopup(index, item.file_path)}
                  style={{
                    width: "60px",
                    height: "60px",
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
    </>
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
