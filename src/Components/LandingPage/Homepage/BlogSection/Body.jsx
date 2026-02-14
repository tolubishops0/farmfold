import React, { useState, useEffect } from "react";
import { LIMIT, CARD_LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { Box, Button } from "@mui/material";
import AjTypography from "../../../AjTypography";
import Grid from "@mui/material/Unstable_Grid2";
import PostList from "./PostList";
import { commonStyles } from "../../../../Style/CommonStyle.js";
import { blogCSS } from "../blogStyles.js";
import BlogBanner from "./BlogBanner.jsx";
import { showToast } from "../../../../Services/toast.js";


const Body = () => {
  
  const [query, setQuery] = useState({ limit: CARD_LIMIT, skip: SKIP });
  const [searchBlog, setSearchBlog] = useState("");
  let limit = LIMIT;

  const [blogList, setBlogList] = useState([]);
  const [spottedBlog, setSpottedBlog] = useState(null);
  const [show, setShow] = useState(true);

  const handlePagination = () => {
    setQuery((prev) => ({
      ...prev,
      skip: prev.skip + limit,
    }));
  };

  const fetchData = () => {

    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };

    let q = Object.keys(searchObject)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(searchObject[k]))
             .join('&');

    let url = `${process.env.REACT_APP_BASE_URL}/api/public/blogs?` + q;

    fetch(`${url}`, {
      method: "get",
      headers: {
        'Context-Type': 'application/json',
      }
    })
    .then(response => response.json())
      .then((res) => {
        setBlogList(res?.data);
        setSpottedBlog(res?.data?.blogs[0])
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
    
  }

  useEffect(() => {fetchData()}, [query])


  const filterBlog = (key) => {
    setSearchBlog(key);
  };

  const search = (data) => {
    return data?.blogs?.filter((blog) =>
      blog.title.toLowerCase().includes(searchBlog.toLowerCase())
    );
  };

  return (
    <>
      <BlogBanner bannerInfo={spottedBlog} filterBlog={filterBlog} show={show} setShow={setShow} />

      <Grid container>
        {blogList?.totalCount !== 0 ? (
          <Box sx={{ ...blogCSS.orientation }}>
            <Box sx={{ ...blogCSS.blog_cards }}>
              <PostList blogContents={search(blogList)} />
            </Box>

            {blogList?.totalCount > 10 && (
              <Box sx={{ ...blogCSS.more_btn_container }}>
                <Button
                  sx={{ ...blogCSS.load_more_btn }}
                  onClick={handlePagination}
                >
                  Load More
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              ...commonStyles.noContentBox,
            }}
          >
            <AjTypography
              styleData={commonStyles.noDataText}
              displayText="No data found"
            />
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Body;
