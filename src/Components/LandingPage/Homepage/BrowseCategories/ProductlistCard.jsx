import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import {
  textCapitalize,
  numberWithCommas,
} from "../../../../Services/commonService/commonService";
import { useNavigate, useLocation } from "react-router";

import { browseCategry } from "./BrowseCategory";
import { AjRating } from "../../../AjRating";
import { styles } from "../../ProductListing/ProductListingExpanded/ProductList";
import AjTypography from "../../../AjTypography";
import { commonStyles } from "../../../../Style/CommonStyle";
import { Link } from "react-router-dom";
import "../../css/style.css";

function ProductlistCard(props) {
  const navigate = useNavigate();
  const urlLink = (item) => {
    let linkTo;

    if (item?.product_name) {
      linkTo = `/details/farmproduce/${item?.id}`;
    } else if (item?.input_name) {
      linkTo = `/details/farminput/${item?.id}`;
    } else {
      linkTo = `/details/${item?.id}`;
    }
    return linkTo;
  };
  const categoryListings = (item) => {
    if (item?.input_id) {
      navigate(`view-marketplace/farminput/${item.id}`);
    } else {
      navigate(`view-marketplace/farmproduce/${item.name}`);
    }
  };

  const generateImageUrl = (item) => {
    if (item?.image) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item.url}`;
    }
  };

  console.log({ props });
  const SkeletonLoader = () => {
    return (
      <Box sx={browseCategry.activeadlistCard}>
        <Skeleton
          sx={{
            bgcolor: "rgba(245, 245, 245, 1)",
            // borderRadius: ".5rem",
          }}
          height={150}
          variant="rectangular"
        />
        <Box sx={{ ...styles.detailsskeleton, p: 2 }}>
          <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="20%" />
          <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="40%" />
          <Skeleton sx={{ bgcolor: "rgba(245, 245, 245, 1)" }} width="60%" />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={browseCategry.categoryparentContainr}>
      <Box
        sx={{
          ...browseCategry.categoryOptionContainer,
        }}>
        {props?.filterList?.map((item, index) => {
          return (
            <Typography
              onClick={() => props.setFilter(item)}
              key={index}
              sx={browseCategry.categoryOption}>
              {item}
            </Typography>
          );
        })}
      </Box>

      {!props.loading ? (
        <>
          {props?.landingPageList.length > 0 ? (
            <Box sx={browseCategry.activeadlistContainer}>
              {props?.landingPageList?.splice(0, 5)?.map((item) => (
                <Card sx={browseCategry.activeadlistCard} key={item.id}>
                  <Link to={urlLink(item)} style={{ textDecoration: "none" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        // width="300"
                        image={item.image}
                        alt="product"
                      />

                      <CardContent sx={{ ...styles.details }}>
                        <Typography
                          sx={{ ...styles.productname }}
                          gutterBottom
                          variant="h5"
                          component="div">
                          {item?.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".4rem",
                          }}>
                          <Typography
                            sx={{
                              ...styles.productname,
                              marginTop: "3px",
                            }}>
                            {!item?.rating ? "0.00" : item?.rating}
                          </Typography>
                          <AjRating
                            defaultValue={item?.rating}
                            readOnly={true}
                            size="small"
                          />
                          {/* <Typography
                            sx={{ ...styles.ratecount, marginTop: "3px" }}>
                            ({item?.id})
                          </Typography> */}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "baseline" }}>
                          <Typography
                            sx={{ ...styles.productname }}
                            variant="body2"
                            color="text.secondary">
                            {item?.price}
                          </Typography>
                          <Typography
                            sx={{
                              ...styles.productunit,
                            }}>
                            {`( ${textCapitalize(item?.unit)})`}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>{" "}
                  </Link>
                </Card>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                ...commonStyles.noContentBoxLanifnpage,
              }}>
              <AjTypography
                styleData={commonStyles.noDataTextcategories}
                displayText="No data found"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={browseCategry.activeadlistContainer}>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </Box>
      )}
    </Box>
  );
}

export default ProductlistCard;
