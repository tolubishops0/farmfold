import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AjnewFilter from "../../Components/AJFilters/AjnewFilter.jsx";
import AjInputBase from "../../Components/AjInputBase.jsx";
import AjDialog from "../../Components/AjDialog/AjDialog.jsx";
import AjButton from "../../Components/AjButton.jsx";
import MarketListings from "./MarketListings.jsx";
import { styles } from "./MarketStyle.js";
import { commonStyles } from "../../Style/CommonStyle.js";
import { useProducts } from "../../chore/ProductContext.jsx";
import { isTextValid } from "../../Services/commonService/commonService.js";

function MarketListBlock() {
  const products = useProducts();
  const [searchText, setSearchText] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const [openFilter, setOpenFilter] = useState(false);
  const [category, setCategory] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchClick((p) => !p);
    }
  };

  const handleSearchTextChange = (e) => {
    if (isTextValid(e.target.value)) {
      setSearchText(e.target.value);
      if (!e.target.value.length) setSearchClick((p) => !p);
    }
  };

  const prodList = React.useMemo(() => {
    return products.filter((prod) => {
      const categoryMatch = category === "all" || prod.category === category;
      const ratingMatch = ratingFilter === 0 || prod.rating === ratingFilter;

      const searchMatch =
        !searchText ||
        prod.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        prod.city?.toLowerCase().includes(searchText.toLowerCase());

      return categoryMatch && ratingMatch && searchMatch;
    });
  }, [category, ratingFilter, searchText, products]);

  const handleResetFilter = () => {
    setSearchText("");
    setCategory("all");
    setRatingFilter(0);
    setOpenFilter(false);
  };

  return (
    <Box sx={styles.container}>
      {/* DESKTOP FILTER */}
      <Box sx={styles.filterlg}>
        <Typography sx={styles.filter}>
          <img
            src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1699997060/sort_tewxwz.svg"
            alt="filter"
          />
          Filter
        </Typography>

        <Divider />

        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={styles.filterHeader}>Product type</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <AjnewFilter
              allproductTypeFilter
              onCategorySelect={(c) => setCategory(c)}
            />
          </AccordionDetails>
        </Accordion>

        <Divider />

        <Accordion sx={styles.filtertab}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={styles.filterHeader}>Ratings</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <AjnewFilter
              ratingFilter
              handleRatingSelect={(r) => setRatingFilter(r)}
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={styles.productContainer}>
        <Box sx={styles.searchContainersm}>
          <AjInputBase
            value={searchText}
            onKeyPress={onEnterPress}
            onChange={handleSearchTextChange}
            placeholder="Search by name or city"
            styleData={{
              ...styles.searchbox,
              ...styles.input,
              ...styles.searchIcon,
              backgroundColor: "transparent",
              border: "1px solid rgba(234, 234, 234, 1)",
              borderRadius: "8px",
            }}
            endIcon={
              <img
                src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700037960/search-normal_e1dfyg.svg"
                alt="search"
                onClick={() => setSearchClick((p) => !p)}
              />
            }
          />
        </Box>
        <Box sx={styles.filterContainersm}>
          <Typography
            onClick={() => setOpenFilter(true)}
            sx={styles.filtericonsm}>
            <img
              src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700087311/filter-search_pxi4fi.svg"
              alt="filter"
            />
            Filter
          </Typography>

          <Typography sx={styles.searchCountsm}>
            Showing {prodList.length} {prodList.length === 1 ? "item" : "items"}
          </Typography>
        </Box>

        {/* MOBILE SEARCH INPUT */}

        <Box sx={styles.searchContainer}>
          <Typography sx={styles.searchCount}>
            Showing {prodList.length} {prodList.length === 1 ? "item" : "items"}
          </Typography>

          <Box sx={{ width: "40%" }}>
            <AjInputBase
              value={searchText}
              onKeyPress={onEnterPress}
              onChange={handleSearchTextChange}
              placeholder="Search by name or city"
              styleData={{
                ...styles.searchbox,
                ...styles.input,
                ...styles.searchIcon,
              }}
              endIcon={
                <img
                  src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700037960/search-normal_e1dfyg.svg"
                  alt="search"
                  onClick={() => setSearchClick((p) => !p)}
                />
              }
            />
          </Box>
        </Box>

        <Box sx={styles.cardcontainer}>
          <MarketListings products={prodList} loading={loading} />
        </Box>
      </Box>

      {/* MOBILE FILTER DIALOG */}
      <AjDialog open={openFilter} closeModal={setOpenFilter}>
        <Box>
          <Accordion sx={styles.filtertab}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={styles.filterHeader}>Product type</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <AjnewFilter
                allproductTypeFiltersm
                onCategorySelectsm={(c) => setCategory(c)}
              />
            </AccordionDetails>
          </Accordion>

          <Divider />

          <Accordion sx={styles.filtertab}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={styles.filterHeader}>Ratings</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <AjnewFilter
                ratingFiltersm
                handleRatingSelectsm={(r) => setRatingFilter(r)}
              />
            </AccordionDetails>
          </Accordion>

          <Box sx={commonStyles.buttonBoxsm}>
            <AjButton
              variant="text"
              displayText="Cancel"
              onClick={handleResetFilter}
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

export default MarketListBlock;
