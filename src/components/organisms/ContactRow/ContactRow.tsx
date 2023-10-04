import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import { ReactComponent as EditIcon } from "icons/Settings.svg";
import { ReactComponent as FavouriteIcon } from "icons/Favourite.svg";
import { ReactComponent as RemoveIcon } from "icons/Delete.svg";
import { ReactComponent as CallIcon } from "icons/Call.svg";
import { ReactComponent as MuteIcon } from "icons/Mute.svg";
import { ReactComponent as MoreIcon } from "icons/More.svg";
import DefaultPict from "pictures/Default.png";
import DropDownMenu from 'components/molecules/DropDownMenu/DropDownMenu';
import AddEditModal from "../AddEditModal/AddEditModal";
import "./ContactRow.scss";
interface ContactProps {
    contactId: number;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    contactPicture: string;
  }

function ContactRow({contact, fetchContacts} : { contact : ContactProps, fetchContacts: () => Promise<void>  }) {

    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMore = Boolean(anchorEl);
    const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMore = () => {
      setAnchorEl(null);
    };

  const handleContactRemove = (id: number) => {
    axios
      .put('http://localhost:4001/contacts/remove', { contactId: id })
      .then(() => {
        fetchContacts();
        setAnchorEl(null);
      })
      .catch(error => console.error(`There was an error removing the contact: ${error}`))
  }

  const openEditModal = () => {
    setOpenModalEdit(true);
    handleCloseMore();
  }

  return (
    <Grid container className="ContactRow">
        <Grid item xl={0.9} lg={1.1} md={1.1} sm={1.3} xs={1.5} className="contactRowPictureItemContainer">
            <img src={contact.contactPicture || DefaultPict} className="contactRowPicture" alt="Prof Pict"/>
        </Grid>
        <Grid item xl={8.9} lg={8.1} md={8.1} sm={7.3} xs={7.1}>
            <Grid container direction={"column"}>
                <Grid item>
                    <Typography className="contactRowName">{contact.contactName}</Typography>
                </Grid>
                <Grid item>
                    <Typography className="contactRowNumber">{contact.contactPhone}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xl={2.2} lg={2.8} md={2.8} sm={3.4} xs={3.4} className="iconsOnHoverOnlyContainer">
            <Grid container justifyContent={"flex-end"}>
                <Grid item>
                    <IconButton className={ anchorEl ? "iconsOnHoverOnly open hideOnSmall" : "iconsOnHoverOnly hideOnSmall"}>
                        <CallIcon/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton className={ anchorEl ? "iconsOnHoverOnly open hideOnSmall" : "iconsOnHoverOnly hideOnSmall"}>
                        <MuteIcon/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Button
                        className={ anchorEl ? "iconsOnHoverOnly open" : "iconsOnHoverOnly"}
                        id="customized-button"
                        aria-controls={openMore ? 'customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMore ? 'true' : undefined}
                        variant="text"
                        sx={{
                            width: 40,
                            minWidth: 40,
                            paddingTop: 1,
                          }}
                        disableElevation
                        onClick={handleClickMore}
                        endIcon={<MoreIcon/>}
                    />
                    <DropDownMenu
                        id="customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={openMore}
                        onClose={handleCloseMore}
                    >
                        <MenuItem disableRipple className="hideOnLarge">
                            <CallIcon/>
                            Call
                        </MenuItem>
                        <MenuItem disableRipple className="hideOnLarge">
                            <MuteIcon/>
                            Mute
                        </MenuItem>
                        <MenuItem onClick={openEditModal} disableRipple>
                            <EditIcon />
                            Edit
                        </MenuItem>
                        <MenuItem disableRipple>
                            <FavouriteIcon/>
                            Favourite
                        </MenuItem>
                        <MenuItem onClick={() => handleContactRemove(contact.contactId)} disableRipple>
                            <RemoveIcon/>
                            Remove
                        </MenuItem>
                    </DropDownMenu>
                </Grid>
            </Grid>
        </Grid>
        <AddEditModal
            open={openModalEdit}
            handleClose={setOpenModalEdit}
            fetchContacts={fetchContacts}
            contact={contact}
        />
    </Grid>        
    );
}

export default ContactRow;
