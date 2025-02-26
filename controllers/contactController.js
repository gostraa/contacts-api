
const readContactsFromFile = require('../utils/readFile')
const writeContactsToFile = require('../utils/writeFile')

exports.getContacts = (req, res) => {
  const contacts = readContactsFromFile();
  res.json(contacts);
};

exports.addContact = (req, res) => {
  const newContact = req.body;
  const contacts = readContactsFromFile();
  contacts.push(newContact);
  writeContactsToFile(contacts);
  res.status(201).json(newContact);
};

exports.updateContact = (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;
  const contacts = readContactsFromFile();

  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts[index] = updatedContact;
    writeContactsToFile(contacts);
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};


exports.deleteContact = (req, res) => {
  const { id } = req.params;
  let contacts = readContactsFromFile();

  contacts = contacts.filter(contact => contact.id !== id);
  writeContactsToFile(contacts);

  res.status(200).json({ message: 'Contact deleted' });
};
