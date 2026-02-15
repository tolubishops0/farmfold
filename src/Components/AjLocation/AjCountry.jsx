import React, { useEffect, useState } from "react";
import AjInputLabel from "../AjInputLabel";
import AjSearchInput from "../AjSearchInput";
import { showToast } from "../../Services/toast";

import { commonStyles } from "../../Style/CommonStyle";
import * as _ from "lodash";
import {
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AjnewFilter from "../AJFilters/AjnewFilter";
import { styles } from "../LandingPage/ProductListing/ProductListingExpanded/ProductList.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AjCountry(props) {
  // console.log(props);
  const [myCountry, setMyCountry] = useState(null);
  const [countryMenuOptions, setCountryMenuOptions] = useState([]);
  const [myState, setMyState] = useState(null);
  const [stateMenuOptions, setStateMenuOptions] = useState(null);

  // const fetchCountries = () => {
  //   let url = `${process.env.REACT_APP_BASE_URL}/api/public/countries`;

  //   fetch(`${url}`, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((res) => {
  //       const country = res?.result?.map((item) => {
  //         return {
  //           countryId: item.id,
  //           countryName: item.name,
  //           countryCode: item.phone_code,
  //           codeOfCountry: item.country_code,
  //           label:
  //             item.phone_code +
  //             "             " +
  //             item.name +
  //             " (" +
  //             item.country_code +
  //             ")",
  //         };
  //       });
  //       setCountryMenuOptions(country);
  //     })
  //     .catch((err) => {
  //       showToast(err.message, "error");
  //     });
  // };

  // useEffect(() => {
  //   if (!countryMenuOptions.length) {
  //     fetchCountries();
  //   }
  // }, [countryMenuOptions]);

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    // console.log(selectedCountry, "selectedcountry");
    setMyCountry(selectedCountry);
    if (selectedCountry) {
      if (props.isSmallScreen) {
        props.countryChangeHandlersm(selectedCountry);
      } else {
        props.countryChangeHandler(selectedCountry);
      }
    }
  };

  // console.log(myCountry, "old");

  const fetchStates = (countryCode) => {
    // console.log(countryCode, "from states");
    let url = `${process.env.REACT_APP_BASE_URL}/api/public/states`;
    const dataToSend = {
      countryCode: countryCode,
    };
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((res) => {
        const states = res?.result?.map((item) => {
          return {
            stateId: item.id,
            stateName: item.name,
            stateCode: item.state_code,
            label:
              item.state_code +
              "             " +
              item.name +
              " (" +
              item.state_code +
              ")",
          };
        });
        setStateMenuOptions(states);
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };

  useEffect(() => {
    if (myCountry?.codeOfCountry) {
      fetchStates(myCountry?.codeOfCountry);
    }
  }, [myCountry?.codeOfCountry]);

  const stateCodeChangeHandler = (_event, selectedState) => {
    // console.log(selectedState, "selectedcountry");
    setMyState(selectedState);
    if (selectedState) {
      if (props.isSmallScreen) {
        props.countryStateIdHandlersm(selectedState);
      } else {
        props.countryStateIdHandler(selectedState);
      }
    }
  };

  return (
    <>
      {props.countryFilter && (
        <Box>
          <Accordion sx={{ ...styles.filtertab }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ boxShadow: "0" }}>
              <Typography
                sx={{
                  ...styles.filterHeader,
                }}>
                Country
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: "0", boxShadow: "0", marginTop: "-1.125rem" }}>
              <>
                <AjInputLabel
                  displayText={props.displayText}
                  required={props.required === false ? false : true}
                  styleData={props.labelStyle || commonStyles.inputLabel}
                />
                <AjSearchInput
                  clearIcon={<></>}
                  id="country"
                  name="country"
                  value={myCountry}
                  displayText="Type to search"
                  styleData={{
                    ...commonStyles.searchDropdownInput,
                    ...props.styleData,
                  }}
                  uneditable={props.uneditable}
                  onChange={countryCodeChangeHandler}
                  source="countryName"
                  options={countryMenuOptions || []}
                />
              </>
            </AccordionDetails>
          </Accordion>
          <Divider />
        </Box>
      )}
      {props.countryFiltersm && (
        <Box>
          <Accordion sx={{ ...styles.filtertab }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ boxShadow: "0" }}>
              <Typography
                sx={{
                  ...styles.filterHeader,
                }}>
                Country
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: "0", boxShadow: "0", marginTop: "-1.125rem" }}>
              <>
                <AjInputLabel
                  displayText={props.displayText}
                  required={props.required === false ? false : true}
                  styleData={props.labelStyle || commonStyles.inputLabel}
                />
                <AjSearchInput
                  clearIcon={<></>}
                  id="country"
                  name="country"
                  value={myCountry}
                  displayText="Type to search"
                  styleData={{
                    ...commonStyles.searchDropdownInput,
                    ...props.styleData,
                  }}
                  uneditable={props.uneditable}
                  onChange={countryCodeChangeHandler}
                  source="countryName"
                  options={countryMenuOptions || []}
                />
              </>
            </AccordionDetails>
          </Accordion>
          <Divider />
        </Box>
      )}
      {props.stateFilter && (
        <Box>
          <Accordion sx={{ ...styles.filtertab }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ boxShadow: "0" }}>
              <Typography
                sx={{
                  ...styles.filterHeader,
                }}>
                State
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: "0", boxShadow: "0", marginTop: "-1.125rem" }}>
              <>
                <AjInputLabel
                  displayText={props.displayText}
                  required={props.required === false ? false : true}
                  styleData={props.labelStyle || commonStyles.inputLabel}
                />
                <AjSearchInput
                  displayText="Type to search"
                  id="state"
                  name="state"
                  value={myState}
                  onChange={stateCodeChangeHandler}
                  styleData={{
                    ...commonStyles.searchDropdownInput,
                    ...props.styleData,
                  }}
                  source="stateName"
                  readOnly={props.readOnly}
                  options={stateMenuOptions || []}
                />
              </>
            </AccordionDetails>
          </Accordion>
          <Divider />
        </Box>
      )}
      {props.stateFiltersm && (
        <Box>
          <Accordion sx={{ ...styles.filtertab }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ boxShadow: "0" }}>
              <Typography
                sx={{
                  ...styles.filterHeader,
                }}>
                State
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: "0", boxShadow: "0", marginTop: "-1.125rem" }}>
              <>
                <AjInputLabel
                  displayText={props.displayText}
                  required={props.required === false ? false : true}
                  styleData={props.labelStyle || commonStyles.inputLabel}
                />
                <AjSearchInput
                  displayText="Type to search"
                  id="state"
                  name="state"
                  value={myState}
                  onChange={stateCodeChangeHandler}
                  styleData={{
                    ...commonStyles.searchDropdownInput,
                    ...props.styleData,
                  }}
                  source="stateName"
                  readOnly={props.readOnly}
                  options={stateMenuOptions || []}
                />
              </>
            </AccordionDetails>
          </Accordion>
          <Divider />
        </Box>
      )}
    </>
  );
}

export default AjCountry;
