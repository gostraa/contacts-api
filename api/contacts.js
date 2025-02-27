const fs = require('fs');
const path = require('path');
const contactsFilePath = path.join(__dirname, '../models/contacts.json');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); 
app.use(express.json());


const getContacts = (req, res) => {
  const contacts = JSON.parse(fs.readFileSync(contactsFilePath));
  res.status(200).json(contacts);
};


const addContact = (req, res) => {
  const newContact = req.body;
  const contacts = JSON.parse(fs.readFileSync(contactsFilePath));
  contacts.push(newContact);
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
  res.status(201).json(newContact);
};


const updateContact = (req, res) => {
  const { id } = req.query; 
  const updatedContact = req.body;
  const contacts = JSON.parse(fs.readFileSync(contactsFilePath));
  const index = contacts.findIndex(contact => contact.id === id);

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updatedContact };
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
    res.status(200).json(contacts[index]);
  } else {
    res.status(404).send('Contact not found');
  }
};


const deleteContact = (req, res) => {
  const { id } = req.query;

  let contacts = JSON.parse(fs.readFileSync(contactsFilePath));
  contacts = contacts.filter(contact => contact.id !== id);

  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
  res.status(204).send();
};

module.exports = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getContacts(req, res);
    case 'POST':
      return addContact(req, res);
    case 'PUT':
      return updateContact(req, res);
    case 'DELETE':
      return deleteContact(req, res);
    default:
      res.status(405).send('Method Not Allowed');
  }
};
