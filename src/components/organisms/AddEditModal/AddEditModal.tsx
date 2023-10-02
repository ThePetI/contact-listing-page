import { useState, useRef } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ReactComponent as AddIcon } from "icons/Add.svg";
import CustomLabelledTextField from "components/molecules/CustomLabelledTextField/CustomLabelledTextField";
import DefaultPict from "pictures/Default.png";
//import variables from "styles/variables.scss";

function AddEditModal({ open, handleClose, fetchContacts }: { open: boolean, handleClose:  React.Dispatch<React.SetStateAction<boolean>>, fetchContacts: () => Promise<void> }) {
  const styleBox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 364,
    height: 540,
    bgcolor: "rgba(20, 20, 20, 1)",
    borderRadius: "8px",
    padding: "24px 0px 0px 0px"
  };

  const styleMainGrid = {
    margin: "24px"
  }

  const styleTitle = {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Glysa",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "40px",
    paddingBottom: "20px",
    marginTop: "-20px"
  };

  const styleAddPictureButton = {
    fontFamily: "LexendDeca",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17.5px",
    color: "rgba(255, 255, 255, 1)",
    bgcolor: "rgba(45, 45, 45, 1)",
    borderRadius: "8px",
    padding: "8px 16px 8px 12px",
    marginLeft: "15px",
    '&:hover': {
        backgroundColor: "rgba(35, 35, 35, 1)",
      },
  }

  const styleFinishButtonGrid = {
    paddingRight: "50px",
    paddingTop: "50px"
  }

  const styleFinishButtonDone = {
    color: "rgba(255, 255, 255, 1)",
    bgcolor: "rgba(38, 38, 38, 1)",
    height: "40px",
    fontFamily: "LexendDeca",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17.5px",
    marginLeft: "15px",
    '&:hover': {
        backgroundColor: "rgba(35, 35, 35, 1)",
      },
  }

  const styleFinishButtonCancel = {
    color: "rgba(255, 255, 255, 1)",
    height: "40px",
    fontFamily: "LexendDeca",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17.5px",
  }

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPicture, setSelectedPicture] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickAddPicture = () => {
    inputRef.current?.click();
  };

  const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files?.[0];
    if (!fileObj) {
      return;
    }

    setSelectedPicture(URL.createObjectURL(fileObj));
    event.target.value = "";
  };

  const handleInputsReset = () => {
    setName("");
    setPhoneNumber("");
    setEmail("");
    setSelectedPicture("");
  }

  const closeModal = () => {
    handleInputsReset();
    handleClose(false);
  }

  const handleContactCreate = () => {
    axios
      .post('http://localhost:4001/contacts/add', {
        contactName: name,
        contactPhone: phoneNumber,
        contactEmail: email,
        contactPicture: selectedPicture
      })
      .then(res => {
        fetchContacts();
        handleInputsReset();
        handleClose(false);
      })
      .catch(error => console.error(`There was an error creating the ${name} contact: ${error}`))
  }

  return (
    <Modal open={open}>
      <Box sx={styleBox}>
        <Grid container direction={"column"} sx={styleMainGrid}>
          <Grid item>
            <Typography sx={styleTitle}>Add contact</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
                <Grid item>
                    <img
                        id="profile-picture"
                        src={selectedPicture || DefaultPict}
                        alt="Profile picture"
                        style={{
                            borderRadius: "50%",
                            height: 88,
                            width: 88,
                        }}
                    />
                </Grid>
                <Grid item>
                    <input
                        style={{display: 'none'}}
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="file-input"
                    />
                    <Button variant="contained" sx={styleAddPictureButton} startIcon={<AddIcon/>} onClick={handleClickAddPicture}>
                        Add picture
                    </Button>
                </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CustomLabelledTextField
                value={name}
                label={"Name"}
                inputwidth={"316px"}
                type={"text"}
                InputLabelProps={{ shrink: false }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <CustomLabelledTextField
                value={phoneNumber}
                label={"Phone Number"}
                inputwidth={"316px"}
                type={"text"}
                InputLabelProps={{ shrink: false }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item>
            <CustomLabelledTextField
                value={email}
                label={"Email adress"}
                inputwidth={"316px"}
                type={"text"}
                InputLabelProps={{ shrink: false }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent={"flex-end"} sx={styleFinishButtonGrid}>
                <Grid item>
                    <Button variant="text" sx={styleFinishButtonCancel} onClick={closeModal}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" sx={styleFinishButtonDone} onClick={handleContactCreate}>
                        Done
                    </Button>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default AddEditModal;
