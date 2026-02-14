import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Head from './BlogStructure/Head'
import Footer from '../Footer/Footer'
import { Box, CssBaseline, Typography } from '@mui/material'
import { blogCSS } from './blogStyles'
import { user_icon } from '../../../Constant/AppConstant'
// import { showToast } from '../../../../../ajeoba-frontend/src/Services/toast'
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";


const SingleBlogPage = () => {
    const { id } = useParams()

    const [blogDetail, setBlogDetail] = useState(null);

      const fetchData = (url) => {
    
        fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
          method: "get",
          headers: {
            'Context-Type': 'application/json',
          }
        })
        .then(response => response.json())
          .then((res) => {
            setBlogDetail(res?.data?.blog);
          })
          .catch((err) => {
            console.log("Error: ", err.message);
          });
        
      }

    useEffect(() => {  
        fetchData(`api/public/blog/${parseInt(id)}`)  
    }, [id]);

    const getHtmlFromRaw = (data) => {
        const editorState = convertFromRaw(JSON.parse(data));
        const htmlContent = convertToHTML(editorState);
        return htmlContent;
      };

    return (
        <>
            <CssBaseline />
            <Head/>
            <Box sx={{ ...blogCSS.single_wrapper }}>
                <Box sx={{ ...blogCSS.inner_wrapper }}>
                    <Box sx={{ ...blogCSS.bannerTopTitle }}>
                        <Typography sx={{ ...blogCSS.title }}>{blogDetail?.title}</Typography>
                        <Box sx={{ ...blogCSS.info }}>
                            <img 
                                style={{ ...(blogCSS.topmost_image_dim) }} 
                                src={user_icon} 
                                alt="Post image" 
                            />
                            <Typography>{blogDetail?.author}</Typography>
                            <ul style={{ ...(blogCSS.info_min) }}>
                                <li>{blogDetail?.created_at.substring(0, 10)}</li>
                                <li>{blogDetail?.reading_minutes} {
                                blogDetail?.reading_minutes > 1 ?  
                                    "mins" : "min"
                                }</li>
                            </ul>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ ...blogCSS.inner_wrapper, ...blogCSS.inner_wrapper_last }}>
                    
                    <Box>
                        <img 
                            src={`${process.env.REACT_APP_IMAGE_URL}/${blogDetail?.url}`}
                            alt={blogDetail?.title} 
                            style={{...(blogCSS.blog_image_single_blog)}}
                        /> 
                    </Box>
                    <Box>
                        <Typography 
                            sx={{ 
                                    ...blogCSS.general_para, textAlign: "justify", 
                                }}>
                            { blogDetail && <div
                                dangerouslySetInnerHTML={{
                                    __html: getHtmlFromRaw(blogDetail?.blog_text),
                                }}
                            />}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default SingleBlogPage