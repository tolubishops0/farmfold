import { PRIMARY_GREEN } from "../../Constant/ColorConstant";
export const styles = {
  cardMainContainer: {
    margin: "1rem",
    border: "1px solid rgb(23 34 45 / 5%)",
    boxShadow: "0 0.375rem 0.75rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    padding: "1rem",
    maxHeight: "35rem",
    background: "rgb(23 34 45 / 5%)",
    "@media(max-width:600px)": {
      maxWidth: "20rem",
    },
  },
  detailsContainer: {
    marginTop: "0.75rem",
  },
  detailsContainerLandingPage: {
    margin: "0 1rem",
    
  },
  // buyButtonStyle: {
  //   marginTop: "0rem",
  //   maxWidth: "10rem",
  // },

  priceStyle: {
    fontWeight: "500",
    fontSize: "1rem",
    lineHeight: "1.313rem",
    color: PRIMARY_GREEN,
    margin: "0.5rem 0rem",
  },
  productListStyle: {
    fontWeight: "600",
    fontSize: "1.1rem",
    color: PRIMARY_GREEN,
    textAlign: "center",
    margin: ".8rem 0",
  },
  imageContainer: {
    width: "18.5rem",
    height: "11rem",
    "@media(max-width:600px)": {
      maxWidth: "20rem",
    },
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainerLandingPage: {

  },

  productNameHeadingWidth: {
    maxWidth: "18.5rem",
  },
  productNameTextWidth: {
    maxWidth: "9.5rem",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};
