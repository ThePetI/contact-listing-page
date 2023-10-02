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

  console.log(contacts);

  return (
    <div className="ContactsPage">
      <Grid container className="columnGridContainer" direction={"column"}>
        <ContactsPageHeader fetchContacts={fetchContacts}/>
        <Grid item>
          <Grid container className="contactsGridContainer" direction={"row"}>
            <Grid item md={3}></Grid>
            { !loading &&
            <Grid item md={6}>
              {contacts.map((contact, index) =>
                <ContactRow
                  key={contact.contactId}
                  contact={contact}
                  fetchContacts={fetchContacts}
                />
              )}
            </Grid>
            }
            <Grid item md={3}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactsPage;
