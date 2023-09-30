const knex = require("./../db");

exports.contactsAll = async (req, res) => {
  knex
    .select("*")
    .from("contacts")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving contacts: ${err}` });
    });
};

exports.contactsAdd = async (req, res) => {
  knex("contacts")
    .insert({
      contactId: req.body.contactId,
      contactName: req.body.contactName,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      contactPicture: req.body.contactPicture,
    })
    .then(() => {
      res.json({
        message: `Contact created: ${req.body.contactName}`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating ${req.body.contactName} contact: ${err}`,
      });
    });
};

exports.contactsRemove = async (req, res) => {
  knex("contacts")
    .where("contactId", req.body.contactId)
    .del()
    .then(() => {
      res.json({ message: `Contact ${req.body.contactId} deleted.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error deleting ${req.body.contactId} contact: ${err}`,
      });
    });
};

exports.contactsUpdate = async (req, res) => {
  knex("contacts")
    .where("contactId", req.body.contactId)
    .update({
      contactName: req.body.contactName,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      contactPicture: req.body.contactPicture,
    })
    .then(() => {
      res.json({ message: `Contact ${req.body.contactName} updated.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error updating ${req.body.contactName} contact: ${err}`,
      });
    });
};
