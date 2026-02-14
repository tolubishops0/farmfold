import React, { useEffect, useState } from "react";
import AjnewFilter from "../../../AJFilters/AjnewFilter.jsx";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styles } from "./ProductList.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AjInputBase from "../../../AjInputBase.jsx";
import ProductList from "../ProductList.jsx";
import {
  MARKETPLACELIST_LIMIT,
  SKIP,
} from "../../../../Constant/AppConstant.js";
import { showToast } from "../../../../Services/toast.js";
import CustomPagination from "../../../CustomPagination/CustomPagination.jsx";
import { isTextValid } from "../../../../Services/commonService/commonService.js";
import AjDialog from "../../../AjDialog/AjDialog.jsx";
import AjButton from "../../../AjButton.jsx";
import { commonStyles } from "../../../../Style/CommonStyle.js";
import { products } from "../../../../Components/LandingPage/Homepage/BrowseCategories/db.js";

function ProductListContainer() {
  const navigate = useNavigate();
  const { categoryfilter, producttype: listType } = useParams();

  // backend fetch state
  const [allOpenMarketPlaceProducts, setAllOpenMarketPlaceProducts] = useState(
    [],
  );
  const [dispatchLoading, setDispatchLanding] = useState(false);
  const [query, setQuery] = useState({
    limit: MARKETPLACELIST_LIMIT,
    skip: SKIP,
  });
  const [searchText, setSearchText] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  // filter dialog & selections
  const [openFilter, setOpenFilter] = useState(false);
  const [category, setCategory] = useState("all"); // category filter
  const [ratingFilter, setRatingFilter] = useState(0); // rating filter

  // simulate loading for skeleton
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // handlers for AjnewFilter
  const handleCategorySelect = (category) => setCategory(category);
  const handleCategorySelectsm = (categorysm) => setCategory(categorysm);
  const handleRatingSelect = (rating) => setRatingFilter(rating);
  const handleRatingSelectsm = (ratingsm) => setRatingFilter(ratingsm);

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };
  const handleSearchTextChange = (e) => {
    if (isTextValid(e.target.value)) {
      setSearchText(e.target.value);
      if (e.target.value.length === 0) setSearchClick((prev) => !prev);
    }
  };

  // filter products from local db based on category + rating
  const prodList = products.filter((prod) => {
    const categoryMatch = category === "all" || prod.category === category;
    const ratingMatch = ratingFilter === 0 || prod.rating >= ratingFilter;
    return categoryMatch && ratingMatch;
  });

  return (
    <Box sx={{ ...styles.container }}>
      {/* filters panel */}
      <Box sx={{ ...styles.filterlg }}>
        <Typography sx={{ ...styles.filter }}>
          <img
            src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1699997060/sort_tewxwz.svg"
            alt="filter-icon"
          />
          Filter
        </Typography>

        <Box sx={{ marginTop: "2rem" }}>
          <Divider />
          <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography sx={{ ...styles.filterHeader }}>
                Product type
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
              <AjnewFilter
                allproductTypeFilter={true}
                onCategorySelect={handleCategorySelect}
              />
            </AccordionDetails>
          </Accordion>
          <Divider />

          <Box>
            <Accordion sx={{ ...styles.filtertab }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{ ...styles.filterHeader }}>Ratings</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0" }}>
                <AjnewFilter
                  ratingFilter={true}
                  handleRatingSelect={handleRatingSelect}
                />
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Box>
        </Box>
      </Box>

      {/* search and products */}
      <Box sx={{ ...styles.productContainer }}>
        <Box sx={{ ...styles.searchContainer }}>
          <AjInputBase
            name="Search for products and inputs..."
            value={searchText}
            onKeyPress={onEnterPress}
            onChange={handleSearchTextChange}
            placeholder="Search by name or city"
            endIcon={
              <img
                src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700037960/search-normal_e1dfyg.svg"
                alt="searchicon"
                onClick={() => setSearchClick((prev) => !prev)}
              />
            }
            styleData={{
              ...styles.searchbox,
              ...styles.input,
              ...styles.searchIcon,
            }}
          />
        </Box>

        <Box
          sx={allOpenMarketPlaceProducts?.totalCount && styles.cardcontainer}>
          <ProductList
            products={prodList}
            loading={loading || dispatchLoading}
          />
        </Box>
      </Box>

      {/* mobile filter dialog */}
      <AjDialog open={openFilter} closeModal={setOpenFilter}>
        <Box>
          <Accordion sx={{ ...styles.filtertab }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography sx={{ ...styles.filterHeader }}>
                Product type
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
              <AjnewFilter
                allproductTypeFiltersm={true}
                onCategorySelectsm={handleCategorySelectsm}
              />
            </AccordionDetails>
          </Accordion>
          <Divider />

          <Accordion sx={{ ...styles.filtertab }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography sx={{ ...styles.filterHeader }}>Ratings</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
              <AjnewFilter
                ratingFiltersm={true}
                handleRatingSelectsm={handleRatingSelectsm}
              />
            </AccordionDetails>
          </Accordion>
          <Divider />

          <Box sx={commonStyles.buttonBoxsm}>
            <AjButton
              variant="text"
              displayText="Cancel"
              onClick={() => setOpenFilter(false)}
              styleData={{
                ...commonStyles.buttonStylesmclear,
                ...commonStyles.cancelButton,
              }}
            />
            <AjButton
              variant="text"
              displayText="Apply Filter"
              onClick={() => setOpenFilter(false)}
              styleData={{
                ...commonStyles.buttonStylesmapp,
                ...commonStyles.applyFilterButton,
              }}
            />
          </Box>
        </Box>
      </AjDialog>
    </Box>
  );
}

export default ProductListContainer;
