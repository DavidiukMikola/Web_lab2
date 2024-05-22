class Contact {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}

class ContactView {
    constructor() {
        this.contactList = document.getElementById('contactList');
        this.addContactForm = document.getElementById('addContactForm');
        this.addContactForm.addEventListener('submit', this.handleAddContact.bind(this));
    }

    displayContacts(contacts) {
        this.contactList.innerHTML = '';
        contacts.forEach(contact => {
            const contactItem = document.createElement('li');
            contactItem.className = 'list-group-item';
            contactItem.innerHTML = `Ім'я: <span>${contact.name}</span>, Номер: ${contact.phone}`;
            this.contactList.appendChild(contactItem);
        });
    }

    handleAddContact(event) {
        event.preventDefault();
        const name = document.getElementById('nameInput').value;
        const phone = document.getElementById('phoneInput').value;
        this.onAddContact(new Contact(name, phone));
    }

    onAddContact(contact) {
    }
}

class ContactManager {
    constructor(view) {
        this.view = view;
        this.contacts = [];

        this.loadContacts();

        this.view.onAddContact = this.addContact.bind(this);
    }

    loadContacts() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        this.contacts = currentUser.contacts || [];
        this.renderContacts();
    }

    saveContacts(contacts) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        currentUser.contacts = contacts;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    addContact(contact) {
        const existingContact = this.contacts.find(c => c.phone === contact.phone);
        if (existingContact) {
            alert("Контакт з таким номером телефону вже існує!");
            return;
        }

        this.contacts.push(contact);
        this.saveContacts(this.contacts);
        this.renderContacts();
    }

    deleteContact(name) {
        this.contacts = this.contacts.filter(contact => contact.name !== name);
        this.saveContacts(this.contacts);
        this.renderContacts();
    }

    renderContacts() {
        this.view.displayContacts(this.contacts);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const contactView = new ContactView();
    window.contactManager = new ContactManager(contactView);

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        contactManager.saveContacts(contactManager.contacts);
        window.location.href = 'login.html';
    });
});
