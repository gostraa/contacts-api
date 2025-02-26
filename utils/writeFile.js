const fs = require('fs');
const path = require('path');
const contactsFilePath = path.join(__dirname, '../data/contacts.json');

const writeContactsToFile = (contacts) => {
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
};

module.exports = writeContactsToFile;