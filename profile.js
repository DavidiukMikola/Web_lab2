class Contact {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}

class ContactView {
    constructor(contactList) {
        this.contactList = contactList;
    }

    renderContacts(contacts) {
        this.contactList.innerHTML = '';
        contacts.forEach(contact => {
            const contactItem = document.createElement('li');
            contactItem.className = 'list-group-item';
            contactItem.innerHTML = `Ім'я: ${contact.name}, Номер: ${contact.phone}`;
            this.contactList.appendChild(contactItem);
        });
    }
}

class ContactManager {
    constructor() {
        this.contactList = document.getElementById('contactList');
        this.contactView = new ContactView(this.contactList);
        this.loadContacts(); 
    }

    loadContacts() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        const contacts = currentUser.contacts || [];
        this.contactView.renderContacts(contacts);
    }

    saveContacts(contacts) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        currentUser.contacts = contacts;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
}

document.addEventListener("DOMContentLoaded", function () {
    window.contactManager = new ContactManager();
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        contactManager.saveContacts(); // Зберігаємо контакти перед виходом
        window.location.href = 'login.html';
    });
});
