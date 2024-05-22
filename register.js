class UserModel {
    validateUserData(userData) {
        const { name, password, email } = userData;

        if (password.length < 4) {
            alert("Пароль повинен містити принаймні 4 символи!");
            return false;
        }

        if (!this.isValidEmail(email)) {
            alert("Будь ласка, введіть дійсну адресу електронної пошти!");
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    checkExistingAccount(userData) {
        const { email } = userData;
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

        const existingAccount = accounts.find(
            (account) => account.email === email
        );

        if (existingAccount) {
            alert("Обліковий запис з такою адресою електронної пошти вже існує!");
            return false;
        }

        return true;
    }

    saveUserData(userData) {
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        accounts.push(userData);
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    registerUser(userData) {
        if (!this.validateUserData(userData)) {
            return false;
        }

        if (!this.checkExistingAccount(userData)) {
            return false;
        }

        this.saveUserData(userData);
        return true;
    }

    getUserByEmail(email) {
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        return accounts.find(account => account.email === email);
    }
}

class UserView {
    getUserData() {
        return {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
    }

    showRegistrationSuccessMessage() {
        alert("Ви успішно зареєструвалися!");
    }

    redirectToMainPage() {
        window.location.href = "index.html";
    }
}

class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.registrationButton = document.getElementById("registrationButton");
        this.registrationButton.addEventListener("click", (event) => this.handleSignUp(event));
    }

    handleSignUp(event) {
        event.preventDefault();
        const userData = this.view.getUserData();
        this.saveDataToLocalStorage(userData);
    }

    saveDataToLocalStorage(userData) {
        if (!this.model.validateUserData(userData)) {
            return;
        }

        if (!this.model.checkExistingAccount(userData)) {
            return;
        }

        this.model.saveUserData(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        this.view.showRegistrationSuccessMessage();
        this.view.redirectToMainPage();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const model = new UserModel();
    const view = new UserView();
    const controller = new UserController(model, view);
});
