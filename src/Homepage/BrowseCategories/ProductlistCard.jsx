import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { textCapitalize } from "../../Services/commonService/commonService";
import AjTypography from "../../Components/AjTypography";

import { browseCategry } from "./BrowseCategory";
import { AjRating } from "../../Components/AjRating";
import { styles } from "../../otherPages/Market/MarketStyle";

import { commonStyles } from "../../Style/CommonStyle";
import { Link } from "react-router-dom";
import "../../otherPages/css/style.css";

function ProductlistCard(props) {
  const urlLink = (item) => {
    let linkTo;
    linkTo = `/details/${item?.id}`;
    return linkTo;
  };

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
              sx={
                props.activeFilter === item
                  ? browseCategry.activeFilter
                  : browseCategry.categoryOption
              }>
              {item}
            </Typography>
          );
        })}
      </Box>

      {!props.loading ? (
        <>
          {" "}
          {props?.landingPageList?.length > 0 ? (
            <Box sx={browseCategry.activeadlistContainer}>
              {props?.landingPageList?.slice(0, 5)?.map((item) => (
                <Card sx={browseCategry.activeadlistCard} key={item.id}>
                  <Link to={urlLink(item)} style={{ textDecoration: "none" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        // width="300"
                        loading="lazy"
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
