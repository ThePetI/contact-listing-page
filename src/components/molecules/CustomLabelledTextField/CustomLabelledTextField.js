import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomTextField from "components/atoms/CustomTextField/CustomTextField";
import "./CustomLabelledTextField.scss";

function CustomLabelledTextField({ inputwidth, ...props }) {
  return (
    <div className="CustomLabelledTextField">
      <Grid container direction={"column"}>
        <Grid item>
          <Typography className="label">{props.label}</Typography>
        </Grid>
        <Grid item>
          <CustomTextField
            className="textField"
            {...props}
            inputwidth={inputwidth}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomLabelledTextField;
