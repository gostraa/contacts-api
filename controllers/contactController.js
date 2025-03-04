
const readContactsFromFile = require('../utils/readFile')
const writeContactsToFile = require('../utils/writeFile')

exports.getContacts = (req, res) => {
  const contacts = readContactsFromFile();
  res.json(contacts);
};

exports.getContactById = (req, res) => {
  const contactId = req.params.id;
  const contacts = readContactsFromFile();
  const contact = contacts.find(contact => contact.id === contactId);

  if (contact) {
    res.json(contact); 
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
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
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  let contacts = readContactsFromFile();
  const contactToDelete = contacts.find(contact => contact.id === id);
  if (!contactToDelete) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  contacts = contacts.filter(contact => contact.id !== id);
  writeContactsToFile(contacts);


  res.status(200).json({ id: id, message: 'Contact deleted' });
};


