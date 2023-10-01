import * as React from 'react';
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

function ContactRow() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMore = Boolean(anchorEl);
    const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMore = () => {
      setAnchorEl(null);
    };

  return (
    <Grid container className="ContactRow">
        <Grid item xs={0.8}>
            <img src={dummyPict} className="contactRowPicture" alt="Profile picture"/>
        </Grid>
        <Grid item xs={9}>
            <Grid container direction={"column"}>
                <Grid item>
                    <Typography className="contactRowName">Timothy Lewis</Typography>
                </Grid>
                <Grid item>
                    <Typography className="contactRowNumber">+36 01 234 5678</Typography>
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
                        <MenuItem onClick={handleCloseMore} disableRipple>
                            <FavouriteIcon/>
                            Favourite
                        </MenuItem>
                        <MenuItem onClick={handleCloseMore} disableRipple>
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
