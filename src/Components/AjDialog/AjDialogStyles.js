import { BLACK } from "../../Constant/ColorConstant";

export const styles = {
  dialog: {
    height: "35rem",
    width: "45.75rem",
    margin: "auto",
    color: (theme) => theme.palette.grey[500],
    "@media (max-width: 600px)": {
      height: "29rem",
      // width: "48.75rem",
      maxWidth: "90vw",
      maxHeight: "95vh",
    },
  },
  title: {
    fontSize: "0.875rem",
    lineHeight: "4.25rem",
    height: "4.25rem",
    borderBottom: "0.063rem solid #F4F4F4",
    fontWeight: "500",
    paddingLeft: "1rem",
    color: BLACK,
  },
  closeIcon: {
    position: "absolute",
    right: 10,
    top: 24,
    color: BLACK,
    cursor: "pointer",
  },
};
