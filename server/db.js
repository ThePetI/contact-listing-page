const path = require("path");

const dbPath = path.resolve(__dirname, "db/database.sqlite");

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema
  .hasTable("contacts")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("contacts", (table) => {
          table.increments("contactId").primary();
          table.string("contactName").notNullable();
          table.string("contactPhone").notNullable();
          table.string("contactEmail");
          table.binary("contactPicture");
        })
        .then(() => {
          console.log("Table Contacts created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "contacts" table
knex
  .select("*")
  .from("contacts")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

module.exports = knex;
