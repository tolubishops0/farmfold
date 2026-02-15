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
import AjnewFilter from "../../../AJFilters/AjnewFilter.jsx";
import AjInputBase from "../../../AjInputBase.jsx";
import AjDialog from "../../../AjDialog/AjDialog.jsx";
import AjButton from "../../../AjButton.jsx";
import ProductList from "../ProductList.jsx";
import { styles } from "./ProductList.js";
import { commonStyles } from "../../../../Style/CommonStyle.js";
import { products } from "../../../../Components/LandingPage/Homepage/BrowseCategories/db.js";
import { isTextValid } from "../../../../Services/commonService/commonService.js";

function ProductListContainer() {
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
  }, [category, ratingFilter, searchClick]);

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
          <ProductList products={prodList} loading={loading} />
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

export default ProductListContainer;

// import AjnewFilter from "../../../AJFilters/AjnewFilter.jsx";

// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Typography,
//   Box,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import { styles } from "./ProductList.js";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AjInputBase from "../../../AjInputBase.jsx";
// import ProductList from "../ProductList.jsx";
// import {
//   MARKETPLACELIST_LIMIT,
//   SKIP,
// } from "../../../../Constant/AppConstant.js";
// import { showToast } from "../../../../Services/toast.js";
// // import { getAllOpenMarketPlaceProductsActions } from "../../../../Redux/CorporateBuyer/Trading/tradingActions.js";
// import CustomPagination from "../../../CustomPagination/CustomPagination.jsx";
// import { isTextValid } from "../../../../Services/commonService/commonService.js";
// import AjDialog from "../../../AjDialog/AjDialog.jsx";
// import AjButton from "../../../AjButton.jsx";
// import { commonStyles } from "../../../../Style/CommonStyle.js";
// import { products } from "../../../../Components/LandingPage/Homepage/BrowseCategories/db.js";

// function ProductListContainer() {
//   const navigate = useNavigate();

//   const { categoryfilter, producttype: listType } = useParams();

//   const [query, setQuery] = useState({
//     limit: MARKETPLACELIST_LIMIT,
//     skip: SKIP,
//   });
//   const [searchClick, setSearchClick] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const [category, setCategory] = useState("");
//   const [categorysm, setCategorysm] = useState("");
//   const [country, setCountry] = useState("");
//   const [countrysm, setCountrysm] = useState("");
//   const [selectedstate, setSelectedstate] = useState("");
//   const [selectedstatesm, setSelectedstatesm] = useState("");
//   const [selectedrate, setSelectedrate] = useState("");
//   const [selectedratesm, setSelectedratesm] = useState("");
//   const [dataInfo, setDataInfo] = useState({});
//   const [openFilter, setOpenFilter] = useState(false);

//   const [allOpenMarketPlaceProducts, setAllOpenMarketPlaceProducts] = useState(
//     [],
//   );
//   const [dispatchLoading, setDispatchLanding] = useState(false);

//   const fetchData = (searchObject) => {
//     let q = Object.keys(searchObject)
//       .map(
//         (k) =>
//           encodeURIComponent(k) + "=" + encodeURIComponent(searchObject[k]),
//       )
//       .join("&");

//     let url =
//       `${process.env.REACT_APP_BASE_URL}/api/public/trading/marketplace?` + q;

//     fetch(`${url}`, {
//       method: "GET",
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         setDispatchLanding(false);
//         setAllOpenMarketPlaceProducts(res?.data);
//       })
//       .catch((err) => {
//         showToast(err.message, "error");
//       });
//   };

//   useEffect(() => {
//     setDispatchLanding(true);
//     let searchObject = {
//       limit: query.limit,
//       skip: query.skip,
//     };
//     if (selectedstate) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         state: selectedstate,
//       };
//     }
//     if (country) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         country: country,
//       };
//     }

//     if (category) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         ...(category === "INPUT" ? null : { productType: category }),
//         listType: category === "INPUT" ? "INPUT_LIST" : "PRODUCT_LIST",
//       };
//     }
//     if (categoryfilter && listType) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
//         ...(listType === "farminput"
//           ? { inputType: categoryfilter.toUpperCase() }
//           : { productType: categoryfilter.toUpperCase() }),
//       };
//     }
//     if (listType && !categoryfilter) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
//       };
//     }
//     if (selectedrate) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         rating: selectedrate,
//       };
//     }
//     if (searchText.length) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         filterText: searchText,
//       };
//     }
//     fetchData(searchObject);
//   }, [query, dataInfo, searchClick]);

//   const handleCategorySelect = (category) => {
//     setCategory(category);
//     setDataInfo(category);
//     navigate("/view-marketplace");
//   };

//   const handleCategorySelectsm = (categorysm) => {
//     setCategorysm(categorysm);
//     navigate("/view-marketplace");
//   };

//   const handleCountrySelect = (country) => {
//     setCountry(country);
//     setDataInfo(country);
//   };
//   const handleCountrySelectsm = (countrysm) => {
//     setCountrysm(countrysm);
//   };
//   const handleStateSelect = (state) => {
//     setSelectedstate(state);
//     setDataInfo(state);
//   };

//   const handleStateSelectsm = (statesm) => {
//     setSelectedstatesm(statesm);
//   };

//   const handleRatingSelect = (rating) => {
//     setSelectedrate(rating);
//     setDataInfo(rating);
//   };
//   const handleRatingSelectsm = (ratingsm) => {
//     setSelectedratesm(ratingsm);
//   };

//   const onEnterPress = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       setSearchClick((prev) => !prev);
//     }
//   };

//   const handleSearchFilter = () => {
//     setSearchClick((prev) => !prev);
//   };

//   const handleSearchTextChange = (e) => {
//     if (isTextValid(e.target.value)) {
//       setSearchText(e.target.value);
//       if (e.target.value.length === 0) {
//         setSearchClick((prev) => !prev);
//       }
//     }
//   };
//   const handleResetFilter = () => {
//     // setSearchText("");
//     // setCategory("");
//     // setDataInfo({});
//     // if (
//     //   selectedstate ||
//     //   country ||
//     //   category ||
//     //   categoryfilter ||
//     //   listType ||
//     //   selectedrate ||
//     //   searchText.length
//     // ) {
//     //   setSelectedstate("");
//     //   setSelectedstatesm("");
//     //   setCountry("");
//     //   setCountrysm("");
//     //   setCategory("");
//     //   setCategorysm("");
//     //   setSelectedrate("");
//     //   setSelectedratesm("");
//     //   setSearchText("");
//     //   setDataInfo({});
//     //   // fetchData({ limit: query.limit, skip: query.skip });
//     // }
//     setOpenFilter(false);
//   };

//   // const areFiltersActive = () => {
//   //   return (
//   //     selectedstate !== null ||
//   //     country !== null ||
//   //     category !== null ||
//   //     categoryfilter !== null ||
//   //     listType !== null ||
//   //     selectedrate !== null ||
//   //     searchText.length !== null
//   //   );
//   // };
//   // const filtersActive = areFiltersActive();
//   // console.log("Filters active:", filtersActive);

//   const applyFilter = () => {
//     let searchObject = {
//       limit: query.limit,
//       skip: query.skip,
//     };
//     if (categorysm) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         ...(categorysm === "INPUT" ? null : { productType: categorysm }),
//         listType: categorysm === "INPUT" ? "INPUT_LIST" : "PRODUCT_LIST",
//       };
//     }
//     if (categoryfilter && listType) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
//         ...(listType === "farminput"
//           ? { inputType: categoryfilter.toUpperCase() }
//           : { productType: categoryfilter.toUpperCase() }),
//       };
//     }
//     if (listType && !categoryfilter) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         listType: listType === "farmproduce" ? "PRODUCT_LIST" : "INPUT_LIST",
//       };
//     }
//     if (countrysm) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         country: countrysm,
//       };
//     }
//     if (selectedstatesm) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         state: selectedstatesm,
//       };
//     }
//     if (selectedratesm) {
//       searchObject = {
//         ...searchObject,
//         limit: MARKETPLACELIST_LIMIT,
//         skip: SKIP,
//         rating: selectedratesm,
//       };
//     }
//     fetchData(searchObject);
//     setOpenFilter(false);
//   };

//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState("all");
//     const filters = ["all", "farm-produce", "value-added"];

//     const prodList =
//       filter === "all"
//         ? products
//         : products.filter((prod) => prod.category === filter);

//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setLoading(false);
//       }, 2500);

//       return () => clearTimeout(timer);
//     }, []);

//   return (
//     <Box
//       sx={{
//         ...styles.container,
//       }}>
//       <Box sx={{ ...styles.filterlg }}>
//         <div>
//           <Typography
//             sx={{
//               ...styles.filter,
//               // cursor: filtersActive ? "pointer" : "default",
//             }}
//             // onClick={filtersActive ? handleResetFilter : null}
//           >
//             <img
//               src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1699997060/sort_tewxwz.svg"
//               alt="filter-icon"
//             />
//             Filter
//           </Typography>

//           <Box>
//             <Box
//               sx={{
//                 marginTop: "2rem",
//                 "@media(max-width: 1500px)": {
//                   marginTop: "1.5rem",
//                 },
//               }}>
//               <Divider />
//               <Accordion sx={{ boxShadow: "none" }}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1a-content"
//                   id="panel1a-header"
//                   sx={{ boxShadow: "0" }}>
//                   <Typography
//                     sx={{
//                       ...styles.filterHeader,
//                     }}>
//                     Product type
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
//                   <AjnewFilter
//                     allproductTypeFilter={true}
//                     onCategorySelect={handleCategorySelect}
//                     // filtersActive={filtersActive}
//                   />
//                 </AccordionDetails>
//               </Accordion>
//               <Divider />
//             </Box>

//             <AjnewFilter
//               onCountrySelect={handleCountrySelect}
//               onStateSelect={handleStateSelect}
//               countryFilter={true}
//               stateFilter={true}
//             />

//             <Box>
//               <Accordion sx={{ ...styles.filtertab }}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1a-content"
//                   id="panel1a-header"
//                   sx={{ boxShadow: "0" }}>
//                   <Typography
//                     sx={{
//                       ...styles.filterHeader,
//                     }}>
//                     Ratings
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
//                   <AjnewFilter
//                     ratingFilter={true}
//                     handleRatingSelect={handleRatingSelect}
//                   />
//                 </AccordionDetails>
//               </Accordion>
//               <Divider />
//             </Box>
//           </Box>
//         </div>
//       </Box>

//       <Box sx={{ ...styles.productContainer }}>
//         <Box sx={{ ...styles.searchContainersm }}>
//           <AjInputBase
//             name="Search for products and inputs..."
//             value={searchText}
//             onKeyPress={onEnterPress}
//             onChange={handleSearchTextChange}
//             styleData={{
//               ...styles.searchbox,
//               ...styles.input,
//               ...styles.searchIcon,
//               backgroundColor: "transparent",
//               border: "1px solid rgba(234, 234, 234, 1)",
//               borderRadius: "8px",
//             }}
//             placeholder="Search by name or city"
//             endIcon={
//               <img
//                 src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700037960/search-normal_e1dfyg.svg"
//                 alt="searchicon"
//                 onClick={handleSearchFilter}
//               />
//             }
//           />
//         </Box>

//         <Box sx={{ ...styles.filterContainersm }}>
//           <Typography
//             onClick={() => setOpenFilter(true)}
//             sx={{ ...styles.filtericonsm }}>
//             <img
//               src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700087311/filter-search_pxi4fi.svg"
//               alt="filter-icon"
//             />{" "}
//             Filter
//           </Typography>
//           {!dispatchLoading ? (
//             <Typography sx={{ ...styles.searchCountsm }}>
//               {`Showing ${allOpenMarketPlaceProducts?.result?.length} ${
//                 allOpenMarketPlaceProducts?.totalCount > 1 ? "items" : "item"
//               }`}
//             </Typography>
//           ) : (
//             <Typography sx={{ ...styles.searchCountsm }}>
//               Showing 0 item
//             </Typography>
//           )}
//         </Box>

//         <Box sx={{ ...styles.searchContainer }}>
//           {!dispatchLoading ? (
//             <Typography sx={{ ...styles.searchCount }}>
//               {`Showing ${allOpenMarketPlaceProducts?.result?.length} ${
//                 allOpenMarketPlaceProducts?.totalCount > 1 ? "items" : "item"
//               }`}
//             </Typography>
//           ) : (
//             <Typography sx={{ ...styles.searchCount }}>
//               Showing 0 item
//             </Typography>
//           )}

//           <Box sx={{ width: "40%" }}>
//             <AjInputBase
//               name="Search for products and inputs..."
//               value={searchText}
//               onKeyPress={onEnterPress}
//               onChange={handleSearchTextChange}
//               styleData={{
//                 ...styles.searchbox,
//                 ...styles.input,
//                 ...styles.searchIcon,
//               }}
//               placeholder="Search by name or city"
//               endIcon={
//                 <img
//                   src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700037960/search-normal_e1dfyg.svg"
//                   alt="searchicon"
//                   onClick={handleSearchFilter}
//                 />
//               }
//             />
//           </Box>
//         </Box>
//         <Box
//           sx={allOpenMarketPlaceProducts?.totalCount && styles.cardcontainer}>
//           <ProductList products={prodList} loading={dispatchLoading} />
//         </Box>
//         {!!allOpenMarketPlaceProducts?.totalCount && (
//           <CustomPagination
//             totalCount={allOpenMarketPlaceProducts?.totalCount}
//             query={query}
//             setQuery={setQuery}
//             customLimit={MARKETPLACELIST_LIMIT}
//           />
//         )}
//       </Box>
//       <AjDialog
//         open={openFilter}
//         closeModal={setOpenFilter}
//         title={`Showing ${allOpenMarketPlaceProducts?.result?.length} ${
//           allOpenMarketPlaceProducts?.totalCount > 1 ? "items" : "item"
//         }`}>
//         <Box>
//           <Box>
//             <Accordion sx={{ ...styles.filtertab }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//                 sx={{ boxShadow: "0" }}>
//                 <Typography
//                   sx={{
//                     ...styles.filterHeader,
//                   }}>
//                   Product type
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
//                 <AjnewFilter
//                   onCategorySelectsm={handleCategorySelectsm}
//                   allproductTypeFiltersm={true}
//                 />
//               </AccordionDetails>
//             </Accordion>
//             <Divider />
//           </Box>
//           <AjnewFilter
//             onStateSelectsm={handleStateSelectsm}
//             onCountrySelectsm={handleCountrySelectsm}
//             countryFiltersm={true}
//             stateFiltersm={true}
//           />
//           <Box>
//             <Accordion sx={{ ...styles.filtertab }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//                 sx={{ boxShadow: "0" }}>
//                 <Typography
//                   sx={{
//                     ...styles.filterHeader,
//                   }}>
//                   Ratings
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails sx={{ padding: "0", boxShadow: "0" }}>
//                 <AjnewFilter
//                   ratingFiltersm={true}
//                   handleRatingSelectsm={handleRatingSelectsm}
//                 />
//               </AccordionDetails>
//             </Accordion>
//             <Divider />
//           </Box>
//           <Box sx={commonStyles.buttonBoxsm}>
//             <AjButton
//               variant="text"
//               displayText="Cancel"
//               styleData={{
//                 ...commonStyles.buttonStylesmclear,
//                 ...commonStyles.cancelButton,
//               }}
//               onClick={handleResetFilter}
//             />

//             <AjButton
//               variant="text"
//               styleData={{
//                 ...commonStyles.buttonStylesmapp,
//                 ...commonStyles.applyFilterButton,
//               }}
//               displayText="Apply Filter"
//               onClick={applyFilter}
//             />
//           </Box>{" "}
//         </Box>
//       </AjDialog>
//     </Box>
//   );
// }

// export default ProductListContainer;
