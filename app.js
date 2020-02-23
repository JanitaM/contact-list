// Variables
const
  name = document.getElementById("name"),
  phone = document.getElementById("phone"),
  email = document.getElementById("email"),
  submitBtn = document.getElementById("submit-btn"),
  contacts = document.getElementById("contact-list"),
  searchInput = document.getElementById("search");

// Class Constructors
// Contact List
class Contact {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

// Functions
const addContact = e => {
  // If any inputs are empty, call alert function
  if (name.value === "" || phone.value === "" || email.value === "") {
    alertMessage("Please Enter All Values", "error");
  } else {
    // Instantiate and save to contact variable
    const contact = new Contact(name.value, phone.value, email.value);
    // Pass variable to function that displays on the ui
    addContactToList(contact);
    // Clear inputs after adding to ui
    clearInputs();
  }

  e.preventDefault();
}

const addContactToList = contact => {
  // Variable for contact list
  const contactList = document.getElementById("contact-list");
  // Create a table row
  listItem = document.createElement('tr');
  // Class name to help with search function
  listItem.className = "list-item";
  // Create the table data
  listItem.innerHTML = `
    <td>${contact.name}</td>
    <td>${contact.phone}</td>
    <td>${contact.email}</td>
    <td><button class="delete-btn">Delete</button></td>
    <td><button class="edit-btn">Edit</button></td>
  `;
  // Append data to contact list
  contactList.appendChild(listItem);
  // Show sucess message
  alertMessage("Contact Added", "success");
}

const alertMessage = (message, className) => {
  // Create a div
  alertDiv = document.createElement('div');
  // Add class names
  alertDiv.className = `${className} .u-full-width`;
  // Add message
  alertDiv.innerHTML = `${message}`;
  // Variable for the container (parent)
  const container = document.querySelector(".container");
  // Variable for h1 tag
  const header = document.querySelector(".header");
  // Insert above h1 tag
  container.insertBefore(alertDiv, header);

  // Remove after 2 seconds
  setTimeout(() => document.querySelector(`.${className}`).remove(), 2000);
}

const clearInputs = () => {
  name.value = "";
  phone.value = "";
  email.value = "";
}

// eventually, connect backend
const deleteContact = e => {
  // Target contact list
  if (e.target.className === "delete-btn") {
    e.target.parentElement.parentElement.remove();
  }
  // Show success message
  alertMessage("Contact Removed", "success");

  e.preventDefault();
}

// eventually, connect to backend
const editContact = e => {
  // Target contact list?
  if (e.target.className === "edit-btn") {
    // e.target.parentElement.parentElement.remove();
    // do something
    console.log(`edit btn`)
  }
  // Show sucess message
  alertMessage("Contact Updated", "success");

  e.preventDefault();
}

// eventually, connect to backend
// use filter instead?
const filterContacts = e => {
  // Search input value 
  const text = e.target.value.toLowerCase();
  // Each tr has a class of list-item
  document.querySelectorAll(".list-item").forEach(contact => {
    let item = contact.firstChild.nextSibling.innerHTML;
    // index.of returns -1 if it's NOT a match
    if (item.toLowerCase().indexOf(text) == -1) {
      // Hide it
      contact.style.display = "none";
    } else {
      // Show it
      contact.style.display = "table-row";
    }
  });
}

// Event Listener
submitBtn.addEventListener("click", addContact);
contacts.addEventListener("click", deleteContact);  //connects to backend
searchInput.addEventListener("keyup", filterContacts);
contacts.addEventListener("click", editContact); //connects to backend