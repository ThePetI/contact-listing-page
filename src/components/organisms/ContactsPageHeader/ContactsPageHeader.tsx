import { useState } from "react";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { ReactComponent as AddIcon } from "icons/Add.svg";
import { ReactComponent as BackArrowIcon } from "icons/Back arrow.svg";
import { ReactComponent as LightModeIcon } from "icons/Light mode.svg";
import { ReactComponent as SettingsIcon } from "icons/Settings.svg";
import { ReactComponent as ProfilePicIcon } from "icons/Profile pic.svg";
import AddEditModal from "../AddEditModal/AddEditModal";
import "./ContactsPageHeader.scss";

function ContactsPageHeader({fetchContacts} : {fetchContacts: () => Promise<void>}) {

    const [openModalAdd, setOpenModalAdd] = useState(false);

    return (
        <Grid item className="ContactsPageHeader">
            <Grid container direction={"column"}>
                <Grid item>
                    <Grid container className="rowGridContainer" direction={"row"}>
                        <Grid item xl={3} lg={3} md={2} sm={1} xs={1} className="rowGridItem border"></Grid>
                        <Grid item xl={6} lg={6} md={8} sm={10} xs={10} className="rowGridItem border"></Grid>
                        <Grid item xl={3} lg={3} md={2} sm={1} xs={1} className="rowGridItem"></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container className="rowGridContainer" direction={"row"}>
                        <Grid item xl={3} lg={3} md={2} sm={1} xs={1} className="rowGridItem border">
                            <Grid container className="verticalCenterContainer" direction={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                                <Grid item>
                                    <IconButton className="secondaryIcon backArrowIconContainer">
                                        <BackArrowIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={6} lg={6} md={8} sm={10} xs={10} className="rowGridItem border">
                            <Grid container className="verticalCenterContainer middle" alignItems={"center"}>
                                <Grid item md={5}>
                                    <Typography className="titleTextContacts">Contacts</Typography>
                                </Grid>
                                <Grid item md={7}>
                                    <Grid container justifyContent={"flex-end"}>
                                        <Grid item>
                                            <IconButton className="secondaryIcon">
                                                <SettingsIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton className="secondaryIcon">
                                                <ProfilePicIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Button className="addNewButton" variant="contained" onClick={() => {setOpenModalAdd(true)}} startIcon={<AddIcon/>}>
                                                Add new
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={3} lg={3} md={2} sm={1} xs={1} className="rowGridItem">
                            <Grid container className="verticalCenterContainer" direction={"row"} alignItems={"center"}>
                                <Grid item>
                                    <IconButton className="secondaryIcon LightModeIconContainer">
                                        <LightModeIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AddEditModal
                open={openModalAdd}
                handleClose={setOpenModalAdd}
                fetchContacts={fetchContacts}
                contact={undefined}
            />
        </Grid>
    );
}

export default ContactsPageHeader;
