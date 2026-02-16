import bgImage from "../../Assets/Images/backdrop_lc9aix.svg";

export const faqs = {
  container1: (open) => ({
    cursor: "pointer",
    position: "relative",
    margin: "2rem auto 0 auto",
    width: "90%",
    padding: open ? "3rem" : "3rem",
    background: open ? `url(${bgImage})` : "#F0F5EC",
    backgroundSize: "cover",
    transition: "padding 0.5s ease, background 0.5s ease",
    fontFamily: "DM Sans",
    borderRadius: "4px",
    "@media (max-width: 1500px)": {
      padding: open ? "3rem" : "2rem",
    },
    "@media (max-width: 480px)": {
      padding: open ? "1rem" : "1rem",
    },
  }),
  container2: {
    width: "90%",
    textAlign: "left",
    marginLeft: "1rem",
    display: "flex",
    gap: "2.2rem",
    fontFamily: "DM Sans",
    "@media (max-width: 480px)": {
      gap: "1rem",
      marginLeft: "0",
      // width: "70%",
    },
  },
  container3: {
    fontSize: "2.25rem",
    fontWeight: "700",
    lineHeight: "2.3rem",
    color: "white",
    fontFamily: "DM Sans",
    "@media (max-width: 1500px)": {
      fontSize: "2rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.1rem",
      fontWeight: "700",
    },
  },
  container4: {
    fontSize: "2rem",
    fontWeight: "700",
    lineHeight: "2rem",
    color: "white",
    fontFamily: "DM Sans",
    "@media (max-width: 1500px)": {
      fontSize: "1.25rem",
      lineHeight: "1.3rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.1rem",
      fontWeight: "700",
    },
  },
  container5: {
    fontSize: "1.9rem",
    fontWeight: "400",
    lineHeight: "2.625rem",
    color: "white",
    marginTop: "1rem",
    fontFamily: "DM Sans",
    "@media (max-width: 1500px)": {
      fontSize: "1.25rem",
      lineHeight: "1.53rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.875rem",
    },
  },
  container6: {
    textAlign: "left",
    marginLeft: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "2.2rem",
    color: "#003c1c",
    fontFamily: "DM Sans",
    "@media (max-width: 1500px)": {
      width: "90%",
    },
    "@media (max-width: 480px)": {
      marginLeft: ".2rem",
      gap: "1rem",
      width: "100%",
    },
  },
  container7: {
    fontSize: "2.25rem",
    fontWeight: "700",
    lineHeight: "2.19rem",
    color: "#003C1C",
    fontFamily: "DM Sans",
    "@media (max-width: 1500px)": {
      fontSize: "2rem",
      lineHeight: "2.63rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.125rem",
      fontWeight: "700",
    },
  },
  container8: {
    fontFamily: "DM Sans",
    fontWeight: "500",
    fontSize: "2rem",
    lineHeight: "2rem",
    color: "#003C1C",
    "@media (max-width: 1500px)": {
      fontSize: "1.5rem",
      lineHeight: "1.55rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.875rem",
    },
  },
  container9: {
    "@media (max-width:480px)": {
      display: "none",
    },
  },
  container10: {
    position: "absolute",
    top: "50%",
    right: "1.25rem",
    transform: "translateY(-50%)",
  },
  container11: {
    margin: "6rem 0",
    "@media (max-width:480px)": {
      margin: "2rem 0",
    },
  },
  container12: {
    marginBottom: "3rem",
  },
  container13: {
    background: "#F0F5EC",
    gap: "2rem",
  },
  container14: {
    width: "90%",
    margin: "0 auto",
    paddingTop: "1rem",
    "& .MuiTabs-indicator": {
      borderBottomWidth: 2,
    },
    // "& .MuiTabs-scrollable": {
    //   overflowX: "scroll",
    // },
    // "& .MuiTab-root": {
    //   minWidth: 0,
    //   flex: "0 0 auto",
    // },
  },
  container15: {
    fontSize: "1.05rem",
    fontWeight: "500",
    color: "#848484",
    lineHeight: "1.5rem",
    marginRight: ".5rem",
    textTransform: "capitalize",
    "@media (max-width:768px)": {
      fontSize: ".9rem",
      lineHeight: "1rem",
    },
  },
};
