import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import { ReactComponent as AddIcon } from "icons/Add.svg";
import { ReactComponent as ChangeIcon } from "icons/Change.svg";
import { ReactComponent as RemoveIcon } from "icons/Delete.svg";
import CustomLabelledTextField from "components/molecules/CustomLabelledTextField/CustomLabelledTextField";
import DefaultPict from "pictures/Default.png";
import "./AddEditModal.scss";
import variables from "styles/variables.module.scss";

interface ContactProps {
  contactId: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactPicture: string;
}

function AddEditModal({ open, contact, handleClose, fetchContacts } : { open: boolean, contact?: ContactProps, handleClose:  React.Dispatch<React.SetStateAction<boolean>>, fetchContacts: () => Promise<void> }) {
  const styleBox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 364,
    height: 540,
    bgcolor: variables.grey100,
    borderRadius: "8px",
    padding: "24px 0px 0px 0px",
  };

  const styleMainGrid = {
    margin: "24px"
  }

  const styleTitle = {
    color: variables.maxWhite,
    fontFamily: "Glysa",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "40px",
    paddingBottom: "20px",
    marginTop: "-20px"
  };

  const stylePictureGrid = {
    height: "92px",
    width: "88px"
  }

  const styleAddPictureButton = {
    fontFamily: "LexendDeca",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17.5px",
    color: variables.maxWhite,
    bgcolor: variables.grey60,
    borderRadius: "8px",
    padding: "8px 16px 8px 12px",
    marginLeft: "15px",
    '&:hover': {
        backgroundColor: variables.grey50,
      },
    '&:active': {
      backgroundColor: variables.grey40,
    },
  }

  const styleRemoveIcon = {
    padding: "8px",
    borderRadius: "8px",
    bgcolor: variables.grey60,
    marginLeft: "8px",
    '&:hover': {
      backgroundColor: variables.grey50,
    },
    '&:active': {
      backgroundColor: variables.grey40,
    },
  }

  const styleFinishButtonGrid = {
    paddingRight: "50px",
    paddingTop: "50px"
  }

  const styleFinishButtonDone = {
    color: variables.maxWhite,
    bgcolor: variables.grey60,
    height: "40px",
    fontFamily: "LexendDeca",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17.5px",
    marginLeft: "15px",
    '&:hover': {
        backgroundColor: variables.grey50,
      },
    '&:active': {
      backgroundColor: variables.grey40,
    },
  }

  const styleFinishButtonCancel = {
    color: variables.maxWhite,
    height: "40px",
    fontFamily: "LexendDeca",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17.5px",
    '&:hover': {
      backgroundColor: variables.grey90,
    },
    '&:active': {
      backgroundColor: variables.grey80,
    },
  }

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPicture, setSelectedPicture] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(!contact){
      return;
    }
    setName(contact.contactName);
    setPhoneNumber(contact.contactPhone);
    setEmail(contact.contactEmail);
    setSelectedPicture(contact.contactPicture);
  }, [contact]);

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

  const handleContactUpdate = () => {
    axios.put('http://localhost:4001/contacts/update', {
      contactId: contact?.contactId,
      contactName: name,
      contactPhone: phoneNumber,
      contactEmail: email,
      contactPicture: selectedPicture
    })
    .then(() => {
      fetchContacts();
      handleInputsReset();
      handleClose(false);
    })
    .catch(error => console.error(`There was an error updating the contact: ${error}`))
  }

  return (
    <Modal open={open}>
      <Box sx={styleBox}>
        <Grid container className="AddEditModal" direction={"column"} sx={styleMainGrid}>
          <Grid item>
            <Typography sx={styleTitle}>{contact ? "Edit contact" : "Add contact"}</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
                <Grid item sx={stylePictureGrid}>
                    <img
                        id="profile-picture"
                        src={selectedPicture || DefaultPict}
                        alt="Profile"
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
                    <Button variant="contained" sx={styleAddPictureButton} startIcon={contact? <ChangeIcon/> : <AddIcon/>} onClick={handleClickAddPicture}>
                        {contact ? "Change picture" : "Add picture"}
                    </Button>
                </Grid>
                {contact &&
                  <Grid item>
                    <IconButton sx={styleRemoveIcon}>
                      <RemoveIcon/>
                    </IconButton>
                  </Grid>}
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
                    <Button variant="contained" sx={styleFinishButtonDone} onClick={ contact ? handleContactUpdate : handleContactCreate}>
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
