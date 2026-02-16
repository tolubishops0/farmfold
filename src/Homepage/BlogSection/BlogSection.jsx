import React, { useState, useEffect } from "react";
import { blogsection } from "./BlogSection";
import { useNavigate } from "react-router";
import { styles } from "../../ProductListing/ProductListingExpanded/ProductList";
import { browseCategry } from "../BrowseCategories/BrowseCategory";
import { showToast } from "../../../../Services/toast";
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
import { formatDate } from "../../../../Services/commonService/commonService";
import usericon from "../Images/user.png";
import readmorearrow from "../Images/arrow-right.svg";
import "../../css/style.css";
import { Link } from "react-router-dom";
import AjTypography from "../../../AjTypography";
import { commonStyles } from "../../../../Style/CommonStyle";
// import { showToast } from "../../../../Services/toast";

function BlogSection() {
  const [query] = useState({ limit: 3, skip: 0 });

  const [blogList, setBlogList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const blogExcerpt = (text) => {
    return `${JSON.parse(text).blocks[0].text.slice(0, 100)}...`;
  };

  const fetchData = (searchObject) => {
    let q = Object.keys(searchObject)
      .map(
        (k) =>
          encodeURIComponent(k) + "=" + encodeURIComponent(searchObject[k]),
      )
      .join("&");

    let url = `${process.env.REACT_APP_BASE_URL}/api/public/blogs?` + q;

    fetch(`${url}`, {
      method: "get",
      headers: {
        "Context-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setBlogList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    let searchObject = {
      limit: 3,
      skip: 0,
    };
    fetchData(searchObject);
  }, [query]);

  const generateImageUrl = (item) => {
    if (item?.url) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item.url}`;
    }
    return (
      <Skeleton
        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
        variant="rectangular"
        height={150}
      />
    );
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
    <>
      <>
        <Box sx={blogsection.container}>
          <Box sx={blogsection.topcontemttext}>
            <Typography sx={blogsection.header}>Recent Blogs</Typography>
            <Typography sx={blogsection.header2}>Our latest news</Typography>
          </Box>

          {!isLoading ? (
            <>
              {blogList?.totalCount > 0 ? (
                <>
                  <Box sx={blogsection.listContainerblog}>
                    {blogList?.blogs?.map((item, index) => (
                      <Card key={index} sx={blogsection.cardblog}>
                        <Link
                          to={`/blog/${item.id}`}
                          style={{ textDecoration: "none" }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="150"
                              loading="lazy"
                              // width="200"
                              image={generateImageUrl(item)}
                              alt="product"
                            />
                            <CardContent sx={blogsection.carddetailsBlog}>
                              <Box sx={blogsection.details}>
                                <img
                                  src={usericon}
                                  alt="usericon"
                                  style={blogsection.usericon}
                                />
                                <Typography sx={blogsection.topicuserdets}>
                                  {item.author}
                                </Typography>
                                <Typography sx={blogsection.topicuserdets}>
                                  .
                                </Typography>
                                <Typography sx={blogsection.topicuserdets}>
                                  {formatDate(item?.created_at)}
                                </Typography>
                              </Box>
                              <Typography sx={blogsection.topic}>
                                {item.title}
                              </Typography>
                              <Typography sx={blogsection.excerpt}>
                                {blogExcerpt(item.blog_text)}
                              </Typography>
                              <Typography
                                // onClick={readBlogDetails(item.id)}
                                sx={blogsection.readmore}>
                                Read More{" "}
                                <span>
                                  <img
                                    src={readmorearrow}
                                    alt="readmore"
                                    style={blogsection.readmorearrow}
                                  />{" "}
                                </span>
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                      </Card>
                    ))}
                  </Box>
                  <Button
                    sx={blogsection.viewmoreButton}
                    // className="slide-bannerTextButton"
                  >
                    <Link
                      to={`/blog`}
                      style={{ textDecoration: "none", color: "white" }}>
                      {" "}
                      view more post
                    </Link>{" "}
                  </Button>
                </>
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
            </Box>
          )}
        </Box>
      </>
    </>
  );
}

export default BlogSection;
