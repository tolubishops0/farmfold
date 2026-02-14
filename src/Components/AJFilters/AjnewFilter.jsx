import React, { useState, useEffect, useCallback } from "react";
import { Grid, useMediaQuery } from "@mui/material";

import { styles } from "./AjFilterStyles";
import { allProductOptions } from "../../Constant/AppConstant";
import AjCheckbox from "../AjCheckBox";
import AjNewRating from "../AjNewRating";
import AjLocation from "../AjLocation/AjLocation";

function AjnewFilter({
  countryFilter,
  countryFiltersm,
  stateFilter,
  stateFiltersm,
  allproductTypeFilter, //for open marketplace
  allproductTypeFiltersm,
  ratingFilter,
  ratingFiltersm,
  onCategorySelect,
  onCategorySelectsm,
  onCountrySelect,
  onCountrySelectsm,
  onStateSelect,
  onStateSelectsm,
  handleRatingSelect,
  handleRatingSelectsm,
  // filtersActive,
}) {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [stateValue, setStateValue] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState(null);

  const allproductTypeChangeHandler = (value) => {
    const newSelectedProductType = selectedProductType === value ? null : value;
    setSelectedProductType(newSelectedProductType);
    onCategorySelect(newSelectedProductType);
  };

  const allproductTypeChangeHandlersm = (value) => {
    const newSelectedProductType = selectedProductType === value ? null : value;
    setSelectedProductType(newSelectedProductType);
    onCategorySelectsm(newSelectedProductType);
  };

  const countryChangeHandler = (selectedCountry) => {
    onCountrySelect(selectedCountry.countryId);
  };

  const countryChangeHandlersm = (selectedCountry) => {
    onCountrySelectsm(selectedCountry.countryId);
  };

  const countryStateIdHandler = (selectedState) => {
    setStateValue(selectedState.stateId);
    onStateSelect(selectedState.stateId);
  };
  const countryStateIdHandlersm = (selectedState) => {
    setStateValue(selectedState.stateId);
    onStateSelectsm(selectedState.stateId);
  };

  const allRateChangehandlere = (rating) => {
    const newSelectedRating = selectedRatings === rating ? null : rating;
    setSelectedRatings(newSelectedRating);
    if (isSmallScreen) {
      handleRatingSelectsm(newSelectedRating);
    } else {
      handleRatingSelect(newSelectedRating);
    }
  };

  // console.log(filtersActive);
  return (
    <div>
      {allproductTypeFilter && (
        <Grid sx={{ marginTop: "-1.125rem" }}>
          {allProductOptions.map((option) => (
            <AjCheckbox
              key={option.value}
              label={option.label}
              id={option.id}
              name={option.name}
              value={option.value}
              // checked={
              //   filtersActive ? selectedProductType === option.value : false
              // }
              checked={selectedProductType === option.value}
              onChange={() => allproductTypeChangeHandler(option.value)}
              headingLabel={option.headingLabel}
            />
          ))}
        </Grid>
      )}
      {allproductTypeFiltersm && (
        <Grid sx={{ marginTop: "-2.125rem" }}>
          {allProductOptions.map((option) => (
            <AjCheckbox
              key={option.value}
              label={option.label}
              id={option.id}
              name={option.name}
              value={option.value}
              checked={selectedProductType === option.value}
              onChange={() => allproductTypeChangeHandlersm(option.value)}
              headingLabel={option.headingLabel}
            />
          ))}
        </Grid>
      )}

      <AjLocation
        required={false}
        isSmallScreen={isSmallScreen}
        labelStyle={styles.headingLabel}
        countryFilter={countryFilter}
        countryFiltersm={countryFiltersm}
        value={stateValue}
        stateFilter={stateFilter}
        stateFiltersm={stateFiltersm}
        countryChangeHandler={countryChangeHandler}
        countryChangeHandlersm={countryChangeHandlersm}
        countryStateIdHandler={countryStateIdHandler}
        countryStateIdHandlersm={countryStateIdHandlersm}
      />

      {ratingFilter && (
        <Grid sx={{ marginTop: "-.8rem" }}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <AjNewRating
              key={rating}
              checked={selectedRatings === rating}
              // checked={filtersActive ? selectedRatings === rating : false}
              defaultValue={rating}
              onChange={() => allRateChangehandlere(rating)}
              styleData={styles.ratingStar}
            />
          ))}
        </Grid>
      )}

      {ratingFiltersm && (
        <Grid sx={{ marginTop: "-.8rem" }}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <AjNewRating
              key={rating}
              checked={selectedRatings === rating}
              defaultValue={rating}
              onChange={() => allRateChangehandlere(rating)}
              styleData={styles.ratingStar}
            />
          ))}
        </Grid>
      )}
    </div>
  );
}

export default AjnewFilter;
