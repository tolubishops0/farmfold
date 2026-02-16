import * as React from "react";
import { Link } from "react-router-dom";
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
import { AjRating } from "../../Components/AjRating";
import { styles } from "./MarketStyle";
import AjTypography from "../../Components/AjTypography";
import { commonStyles } from "../../Style/CommonStyle";

function MarketListings({ products, loading }) {
  const urlLink = (item) => {
    let linkTo;
    linkTo = `/details/${item?.id}`;
    return linkTo;
  };

  return (
    <div>
      {!loading ? (
        <>
          {products?.length > 0 ? (
            <Box sx={{ ...styles.listcontainer }}>
              {products?.map((item, index) => (
                <Card sx={{ ...styles.card }} key={index}>
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
                            sx={{ ...styles.productname, marginTop: "3px" }}>
                            {!item?.rating ? "0.00" : item?.rating}
                          </Typography>
                          <AjRating
                            defaultValue={item?.rating}
                            readOnly={true}
                            size="small"
                          />
                          <Typography sx={{ ...styles.ratecount }}>
                            ({item?.rating})
                          </Typography>
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
                            }}
                            variant="body2"
                            color="text.secondary">
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
                ...commonStyles.noContentBox,
              }}>
              <AjTypography
                styleData={commonStyles.noDataText}
                displayText="No data found"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ ...styles.listcontainer }}>
          <Box sx={{ ...styles.card, marginBottom: "1rem" }}>
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: ".5rem",
              }}
              height={200}
              variant="rectangular"
            />
            <Box sx={{ ...styles.detailsskeleton, p: 2 }}>
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
            </Box>
          </Box>
          <Box sx={{ ...styles.card, marginBottom: "1rem" }}>
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: ".5rem",
              }}
              height={200}
              variant="rectangular"
            />
            <Box sx={{ ...styles.detailsskeleton, p: 2 }}>
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
            </Box>
          </Box>
          <Box sx={{ ...styles.card, marginBottom: "1rem" }}>
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: ".5rem",
              }}
              height={200}
              variant="rectangular"
            />
            <Box sx={{ ...styles.detailsskeleton, p: 2 }}>
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
            </Box>
          </Box>
          <Box sx={{ ...styles.card, marginBottom: "1rem" }}>
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: ".5rem",
              }}
              height={200}
              variant="rectangular"
            />
            <Box sx={{ ...styles.detailsskeleton, p: 2 }}>
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
            </Box>
          </Box>
          <Box sx={{ ...styles.card, marginBottom: "1rem" }}>
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: ".5rem",
              }}
              height={200}
              variant="rectangular"
            />
            <Box sx={{ ...styles.detailsskeleton, p: 2 }}>
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
            </Box>
          </Box>
          <Box sx={{ ...styles.card, marginBottom: "1rem" }}>
            <Skeleton
              sx={{
                bgcolor: "rgba(245, 245, 245, 1)",
                borderRadius: ".5rem",
              }}
              height={200}
              variant="rectangular"
            />
            <Box sx={{ ...styles.detailsskeleton, p: 2 }}>
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
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default MarketListings;
