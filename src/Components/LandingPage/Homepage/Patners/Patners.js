export const patnersstyle = {
  parentcontainer: {},
  container: {
    width: "90%",
    margin: "3rem auto",
    "@media(max-width: 768px)": {
      margin: "8vw auto",
    },
  },
  topcontemttext: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    "@media(max-width: 768px)": {
      gap: "0.5rem",
    },
  },
  header: {
    color: "#6D9E3F",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    textTransform: "uppercase",
  },
  header2: {
    color: "black",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.75rem",
    lineHeight: "3rem",
    textTransform: "capitalize",
    textAlign: "center",
    "@media(max-width: 768px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
      textAlign: "center",
    },
    "@media(max-width: 600px)": {
      lineHeight: "2rem",
      fontSize: "1.2rem",
    },
  },
  carousecontainerlimage: {
    marginTop: "4rem",
    maxWidth: "40%",
    width: "100%",
    height: "auto",
  },

  carouselimage: {
    maxWidth: "40%",
    width: "100%",
    height: "50%",
  },
};
