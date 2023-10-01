import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { ReactComponent as AddIcon } from "icons/Add.svg";
import { ReactComponent as BackArrowIcon } from "icons/Back arrow.svg";
import { ReactComponent as LightModeIcon } from "icons/Light mode.svg";
import { ReactComponent as SettingsIcon } from "icons/Settings.svg";
import { ReactComponent as ProfilePicIcon } from "icons/Profile pic.svg";
import "./ContactsPageHeader.scss";

function ContactsPageHeader() {
    return (
        <Grid item className="ContactsPageHeader">
            <Grid container direction={"column"}>
                <Grid item>
                    <Grid container className="rowGridContainer" direction={"row"}>
                        <Grid item md={3} className="rowGridItem border"></Grid>
                        <Grid item md={6} className="rowGridItem border"></Grid>
                        <Grid item md={3} className="rowGridItem"></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container className="rowGridContainer" direction={"row"}>
                        <Grid item md={3} className="rowGridItem border">
                            <Grid container className="verticalCenterContainer" direction={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                                <Grid item>
                                    <IconButton className="backArrowIconContainer">
                                        <BackArrowIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={6} className="rowGridItem border">
                            <Grid container className="verticalCenterContainer middle" alignItems={"center"}>
                                <Grid item md={5}>
                                    <Typography className="titleTextContacts">Contacts</Typography>
                                </Grid>
                                <Grid item md={7}>
                                    <Grid container justifyContent={"flex-end"}>
                                        <Grid item>
                                            <IconButton className="">
                                                <SettingsIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton className="">
                                                <ProfilePicIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Button className="addNewButton" variant="contained" startIcon={<AddIcon/>}>
                                                Add new
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} className="rowGridItem">
                            <Grid container className="verticalCenterContainer" direction={"row"} alignItems={"center"}>
                                <Grid item>
                                    <IconButton className="LightModeIconContainer">
                                        <LightModeIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ContactsPageHeader;
