import { useState, useEffect } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';
import ContactsPageHeader from 'components/organisms/ContactsPageHeader/ContactsPageHeader';
import ContactRow from 'components/organisms/ContactRow/ContactRow';
import "./ContactsPage.scss";

function ContactsPage() {

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    axios
      .get('http://localhost:4001/contacts/all')
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the contact list: ${error}`))
  }

  return (
    <div className="ContactsPage">
      <Grid container className="columnGridContainer" direction={"column"}>
        <ContactsPageHeader fetchContacts={fetchContacts}/>
        <Grid item>
          <Grid container className="contactsGridContainer" direction={"row"}>
            <Grid item xl={3} lg={3} md={2} sm={1} xs={0}></Grid>
            { !loading &&
            <Grid item xl={6} lg={6} md={8} sm={10} xs={12} className="contactsGridContainerCenter">
              {contacts.map((contact, index) =>
                <ContactRow
                  key={contact.contactId}
                  contact={contact}
                  fetchContacts={fetchContacts}
                />
              )}
            </Grid>
            }
            <Grid item xl={3} lg={3} md={2} sm={1} xs={0}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactsPage;
