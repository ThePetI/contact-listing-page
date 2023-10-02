import TextField from "@mui/material/TextField";

function CustomTextField(props) {
  return (
    <div className="CustomTextField">
      <TextField
        {...props}
        required={true}
        size={"small"}
        style={{
          width: props.inputwidth,
        }}
      />
    </div>
  );
}

export default CustomTextField;
