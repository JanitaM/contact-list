const { ContactModel } = require("../models/contactModel");

const path = require("path");

// GET ALL CONTACTS Request
const getAllContacts = async (request, response) => {
  try {
    console.log("GET CONTACTS");
    let contactInstance = await ContactModel.find({});
    console.log(contactInstance)
    let contactMap = {};
    contactInstance.map(contact =>
      contactMap[contact.id] = contact
    );
    response.send(contactMap);
  } catch (error) {
    response.status(500).send(error);
  }
}

// GET Request
const getContact = async (request, response) => {
  try {
    console.log("GET CONTACT");
    let contactInstance = await ContactModel.find(request.query);
    console.log(contactInstance);
    response.send(contactInstance);
  } catch (error) {
    response.status(500).send(error);
  }
}

// POST Request
const postContact = async (request, response) => {
  try {
    console.log("POST CONTACT");
    let contactInstance = new ContactModel(request.body);
    console.log(contactInstance);
    const created = await ContactModel.create(contactInstance);
    response.send(created);
  } catch (error) {
    response.status(500).send(error);
  }
}

// PUT Request
const putContact = async (request, response) => {
  try {
    console.log("PUT CONTACT");
    let contactInstance = await ContactModel.findOneAndUpdate(
      request.query,
      request.body,
      { useFindAndModify: false }
    );
    console.log(contactInstance);
    response.send(contactInstance);
  } catch (error) {
    response.status(500).send(error);
  }
}

// DELETE Request 
const deleteContact = async (request, response) => {
  try {
    console.log("DELETE CONTACT");
    let contactInstance = await ContactModel.findOneAndDelete(
      request.query,
      { useFindAndModify: false }
    );
    console.log(contactInstance);
    response.send(contactInstance);
  } catch (error) {
    response.status(500).send(error);
  }
}

// GET logout.html
const getLogout = async (request, response) => {
  try {
    console.log("SEND LOG OUT PAGE");
    response.sendFile(path.join(__dirname + "/../views/logout.html"));
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
}

// GET signin.html
const getSignin = async (request, response) => {
  try {
    console.log("SEND SIGN IN PAGE");
    console.log(path.join(__dirname + "/../views/signin.html"));

    response.sendFile(path.join(__dirname + "/../views/signin.html"));
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
}

module.exports = { getAllContacts, getContact, postContact, putContact, deleteContact, getLogout, getSignin };