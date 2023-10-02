import * as React from 'react';
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
import DropDownMenu from 'components/molecules/DropDownMenu/DropDownMenu';
import dummyPict from "Timothy.png";
import "./ContactRow.scss";
interface ContactProps {
    contactId: number;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    contactPicture: string;
  }

function ContactRow({contact, fetchContacts} : { contact : ContactProps, fetchContacts: () => Promise<void>  }) {

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

  return (
    <Grid container className="ContactRow">
        <Grid item xs={0.8}>
            <img src={contact.contactPicture} className="contactRowPicture" alt="Profile picture"/>
        </Grid>
        <Grid item xs={9}>
            <Grid container direction={"column"}>
                <Grid item>
                    <Typography className="contactRowName">{contact.contactName}</Typography>
                </Grid>
                <Grid item>
                    <Typography className="contactRowNumber">{contact.contactPhone}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={2.2}>
            <Grid container justifyContent={"flex-end"}>
                <Grid item>
                    <IconButton className={ anchorEl ? "iconsOnHoverOnly open" : "iconsOnHoverOnly"}>
                        <CallIcon/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton className={ anchorEl ? "iconsOnHoverOnly open" : "iconsOnHoverOnly"}>
                        <MuteIcon/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Button
                        className={ anchorEl ? "iconsOnHoverOnly open" : "iconsOnHoverOnly"}
                        id="demo-customized-button"
                        aria-controls={openMore ? 'demo-customized-menu' : undefined}
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
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={openMore}
                        onClose={handleCloseMore}
                    >
                        <MenuItem onClick={handleCloseMore} disableRipple>
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
    </Grid>        
    );
}

export default ContactRow;
