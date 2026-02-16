import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

function AjNewRating(props) {
  return (
    <div>
      <Stack spacing={1}>
        <div sx={{ display: "flex", justifyContent: "center" }}>
          <Checkbox checked={props.checked} onChange={props.onChange} />
          <Rating
            name="size-small"
            defaultValue={props.defaultValue}
            readOnly={true}
            size="small"
            style={{
              color: "rgba(0, 109, 51, 1)",
            }}
          />
        </div>
      </Stack>
    </div>
  );
}

export default AjNewRating;
