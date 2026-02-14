import React, { useState, useEffect } from "react";
import AjCountry from "./AjCountry";

function AjLocation(props) {
  return (
    <div>
      <AjCountry
        countryFilter={props.countryFilter}
        countryFiltersm={props.countryFiltersm}
        stateFilter={props.stateFilter}
        stateFiltersm={props.stateFiltersm}
        isSmallScreen={props.isSmallScreen}
        labelstyle={props.headingLabel}
        required={props.required}
        countryChangeHandler={props.countryChangeHandler}
        countryChangeHandlersm={props.countryChangeHandlersm}
        countryStateIdHandler={props.countryStateIdHandler}
        countryStateIdHandlersm={props.countryStateIdHandlersm}
      />
    </div>
  );
}

export default AjLocation;
