export const footer = {
  parentbg: {
    backgroundColor: "black",
  },
  parentContainer: {
    width: "90%",
    margin: "0 auto",
    padding: "3rem 0 2rem 0",
  },
  topcontainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    "@media(max-width:1100px)": {
      gap: "3rem",
    },
    "@media(max-width:768px)": {
      flexDirection: "column",
    },
  },
  leftcontainer: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "1rem",
    // "@media(max-width:1100px)": {
    //   width: "60%",
    // },

    "@media(max-width:768px)": {
      width: "90%",
    },
  },
  leftText: {
    fontWeight: "100",
    fontFamily: "DM sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    color: "white",
  },
  socialmediaicons: {
    display: "flex",
    flexDirection: "row",
    gap: "1.5rem",
    alignItems: "center",
  },
  midcontent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  midcontentsheader: {
    fontFamily: "DM sans",
    fontWeight: "700",
    fontSize: "1.3rem",
    lineHeight: "1.6rem",
    color: "white",
  },
  midcontentsText: {
    fontFamily: "DM sans",
    fontWeight: "100",
    fontSize: "1rem",
    lineHeight: "1.8rem",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      color: "#E6F0EB",
    },
  },
  rightcontentsText: {
    fontFamily: "DM sans",
    fontWeight: "100",
    fontSize: "1rem",
    lineHeight: "1.8rem",
    color: "white",
    display: "flex",
    gap: "1rem",
    cursor: "pointer",
    "&:hover": {
      color: "#E6F0EB",
    },
  },
  divider: {
    margin: "2rem auto",
    width: "100%",
    color: "#E6F0EB",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  bottomtopcontent: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
  },
};
