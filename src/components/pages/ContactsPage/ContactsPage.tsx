import Grid from '@mui/material/Grid';
import ContactsPageHeader from 'components/organisms/ContactsPageHeader/ContactsPageHeader';
import ContactRow from 'components/organisms/ContactRow/ContactRow';
import "./ContactsPage.scss";

function ContactsPage() {
  return (
    <div className="ContactsPage">
      <Grid container className="columnGridContainer" direction={"column"}>
        <ContactsPageHeader/>
        <Grid item>
          <Grid container className="contactsGridContainer" direction={"row"}>
            <Grid item md={3}></Grid>
            <Grid item md={6}>
              <ContactRow/>
              <ContactRow/>
              <ContactRow/>
              <ContactRow/>
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactsPage;
