class UserModel {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    authenticateUser(userData) {
        const { email, password } = userData;
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

        const user = accounts.find(
            (account) => account.email === email && account.password === password
        );

        if (!user) {
            alert("Неправильний логін або пароль!");
            return false;
        }
        return true;
    }
    saveUserData(userData) {
        localStorage.setItem("currentUser", JSON.stringify(userData));
    }
}

class UserView {
    constructor() {
        this.emailInput = document.getElementById("email");
        this.passwordInput = document.getElementById("password");
        this.loginButton = document.querySelector("button.btn-primary");
    }

    showLoginSuccessMessage() {
        alert("Ви успішно увійшли!");
    }

    redirectToMainPage() {
        window.location.href = "profile.html";
    }

    getUserData() {
        return {
            email: this.emailInput.value,
            password: this.passwordInput.value,
        };
    }
}

class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.loginButton.addEventListener("click", this.handleLogin.bind(this));
    }

    login() {
	localStorage.removeItem("currentUser");
        const userData = this.view.getUserData();

        if (!this.model.authenticateUser(userData)) {
            return;
        }

        this.view.showLoginSuccessMessage();
        this.model.saveUserData(userData); 
        this.view.redirectToMainPage();
    }

    handleLogin(event) {
        event.preventDefault();
        this.login();
    }
    
}

document.addEventListener("DOMContentLoaded", function () {
    const model = new UserModel();
    const view = new UserView();
    const controller = new UserController(model, view);
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", controller.handleLogout.bind(controller));
});
