const express = require("express");

const contactsRoutes = require("./../controllers/contacts-controller.js");

const router = express.Router();

router.get("/all", contactsRoutes.contactsAll);
router.post("/add", contactsRoutes.contactsAdd);
router.put("/remove", contactsRoutes.contactsRemove);
router.put("/update", contactsRoutes.contactsUpdate);

module.exports = router;
