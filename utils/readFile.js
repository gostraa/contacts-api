const fs = require('fs');
const path = require('path');
const contactsFilePath = path.join(__dirname, '../data/contacts.json');


const readContactsFromFile = () => {
  const data = fs.readFileSync(contactsFilePath);
  return JSON.parse(data);
};

module.exports = readContactsFromFile;