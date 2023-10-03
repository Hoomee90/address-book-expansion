// Business Logic for AddressBook
class AddressBook {
  constructor() {
    this.contacts = {};
    this.currentId = 0;
  }
  addContact(contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
  }
  assignId() {
    this.currentId += 1;
    return this.currentId;
  }
  findContact(id) {
    if (this.contacts[id] !== undefined) {
      return this.contacts[id];
    }
    return false;
  }
  deleteContact(id) {
    if (this.contacts[id] === undefined) {
      return false;
    }
    delete this.contacts[id];
    return true;
  }
}

// Business Logic for Contacts
class Contact {
  constructor(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;

    this.addresses = {};
    this.currentId = 0;
  }
  addAddress(address) {
    address.id = this.assignId();
    this.addresses[address.id] = address;
  }
  assignId() {
    this.currentId += 1;
    return this.currentId;
  }
  findAddress(id) {
    if (this.addresses[id] !== undefined) {
      return this.addresses[id];
    }
    return false;
  }
  fullName() {
    return this.firstName + " " + this.lastName;
  }
}

// Business Logic for Address
class Address {
  constructor(isEmail, type, address) {
    this.isEmail = isEmail;
    this.type = type;
    this.address = address;
  }
  listFull() {
    return this.type.concat(" ", this.isEmail ? "Email: " : "Address: ", this.address);
  }
}

// User Interface Logic
let addressBook = new AddressBook();

function handleAddingInputElements(event) {
  let inputContainer = document.querySelector("div#" + event.target.getAttribute("data-target"));
  const inputToClone = inputContainer.lastElementChild.cloneNode(true);
  inputContainer.append(inputToClone);
}

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  const deleteButton = document.querySelector("button.delete");
  let addressesList = document.querySelector("#addresses");
  let listDiv = document.createElement("div");
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  addressesList.innerHTML = null;
  Object.keys(contact.addresses).forEach((key) => {
    const address = contact.findAddress(key);
    const p = document.createElement("p");
    p.append(address.listFull());
    listDiv.append(p);
  });
  addressesList.append(listDiv);
  deleteButton.setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmailTypes = document.querySelectorAll("input.new-email-type");
  const inputtedEmailAddresses = document.querySelectorAll("input.new-email-address");
  const inputtedPhysicalTypes = document.querySelectorAll("input.new-physical-type");
  const inputtedPhysicalAddresses = document.querySelectorAll("input.new-physical-address");
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  
  inputtedEmailAddresses.forEach((element, index) => {
    const newEmail = new Address(true, inputtedEmailTypes[index].value, element.value)
    newContact.addAddress(newEmail);
  });
  inputtedPhysicalAddresses.forEach((element, index) => {
    const newPhysical = new Address(false, inputtedPhysicalTypes[index].value, element.value)
    newContact.addAddress(newPhysical);
  });

  addressBook.addContact(newContact);
  listContacts(addressBook);

  document.querySelectorAll("div.input-container").forEach(container => container.replaceChildren(container.lastElementChild));
  event.target.reset();
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
  document.querySelector("button#physical-button").addEventListener("click", handleAddingInputElements);
  document.querySelector("button#email-button").addEventListener("click", handleAddingInputElements);
});