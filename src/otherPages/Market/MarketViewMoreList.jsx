import React, { useState, useRef, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Skeleton,
} from "@mui/material";
import { AjRating } from "../../Components/AjRating.jsx";
import { styles } from "./MarketStyle.js";

function MarketViewMoreList({ allOpenMarketPlaceProducts, alladsloading }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const newScrollPosition =
      direction === "next"
        ? scrollPosition + container.clientWidth
        : scrollPosition - container.clientWidth;

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });

    setScrollPosition(newScrollPosition);
    updateArrowVisibility(newScrollPosition);
  };

  const updateArrowVisibility = (scrollPos) => {
    const container = containerRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (scrollPos >= maxScrollLeft) {
      document.getElementById("arrowscrollnext").style.display = "none";
    } else {
      document.getElementById("arrowscrollnext").style.display = "block";
    }

    if (scrollPos <= 0) {
      document.getElementById("arrowscrollprev").style.display = "none";
    } else {
      document.getElementById("arrowscrollprev").style.display = "block";
    }
  };

  const urlLink = (item) => {
    let linkTo;
    linkTo = `/details/${item?.id}`;
    return linkTo;
  };

  return (
    <div>
      <Box sx={{ marginTop: "3rem" }}>
        <Box sx={{ ...styles.viewMoreContainer }}>
          <Typography sx={{ ...styles.viewMoreheader }}>
            You may also like
          </Typography>
          <Typography
            onClick={() => navigate("/view-marketplace")}
            sx={{ ...styles.viewMorelink }}>
            SEE ALL
          </Typography>
        </Box>
        {!alladsloading ? (
          <Box sx={{ position: "relative" }}>
            <Box
              ref={containerRef}
              sx={{
                ...styles.listcontainerdetailspage,
              }}>
              {allOpenMarketPlaceProducts?.map((item, index) => (
                <Card sx={{ ...styles.cardDetailspage }} key={index}>
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
                          <Typography sx={{ ...styles.ratecount }}>
                            ({item?.rating_count || 60})
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
                            {item?.unit}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>{" "}
                  </Link>
                </Card>
              ))}
            </Box>
            <Button
              id="arrowscrollnext"
              sx={{ ...styles.arrowscrollnext }}
              onClick={() => handleScroll("next")}>
              <img
                src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700802353/ajeoba%20landingpage%20images/Frame_1000002024_h7wdjr.png"
                alt="arrow left button"
              />
            </Button>
            <Button
              id="arrowscrollprev"
              sx={{ ...styles.arrowscrollprev }}
              onClick={() => handleScroll("prev")}>
              <img
                src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700802353/ajeoba%20landingpage%20images/Frame_1000002024_h7wdjr.png"
                alt="arrow left button"
              />
            </Button>{" "}
          </Box>
        ) : (
          <Box sx={{ ...styles.listcontainerdetailspage }}>
            <Box sx={{ ...styles.cardDetailspage, marginBottom: "1rem" }}>
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
            <Box sx={{ ...styles.cardDetailspage, marginBottom: "1rem" }}>
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
            <Box sx={{ ...styles.cardDetailspage, marginBottom: "1rem" }}>
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
            <Box sx={{ ...styles.cardDetailspage, marginBottom: "1rem" }}>
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
      </Box>
    </div>
  );
}

export default memo(MarketViewMoreList);
