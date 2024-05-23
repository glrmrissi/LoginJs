

// function Login() { 
//     const email = document.getElementById("email");
//     const password = document.getElementById("password");
//     if (email.value === "admin@gmail.com" && password.value === "admin") {
//         console.log("tudo certo");
//         location.href = "admin.html";
//     } else {
//         return
//     }
// }

// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         window.location.href = "pages/home/home.html"
//     }
// })

function onChangeEmail() {
    toggleButtonsDisabled();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisabled();
    togglePasswordErrors();
}

function login() {
    showLoading()
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        hideLoading()
        console.log('success', response);
        window.location.href = "/pages/home/home.html"
    }).catch(error => {
        hideLoading()
        alert(getErrorMessage(error))
        console.log('error', error);
    });
}


function getErrorMessage(error) {
    const knownErrors = [
        "auth/invalid-email",
        "auth/user-disabled",
        "auth/user-not-found",
        "auth/wrong-password",
        "auth/invalid-credential"
    ]

    if(knownErrors.includes(error)) {
       return "Ocorreu um erro de autenticação. Por favor, verifique suas credenciais e tente novamente."
    } else {
       // return "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde."
       return error.message
    }
}

function register() {
    window.location.href = "/pages/register/register.html"
}


function recoverPassword() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        alert('Por favor, insira um email válido.');
        hideLoading();
        return;
    }
    showLoading();
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
function isEmailValid() {
    const email = form.email().value;
    if(!email) {
        return false
    }   
    return validateEmail(email)
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

}

function togglePasswordErrors() {
    const password = form.password().value;

    form.passwordRequiredError().style.display = password ? "none" : "block"
}


function toggleButtonsDisabled() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid
    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid   
}

function isPasswordValid() {
    return form.password().value ? true : false
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPasswordButton: () => document.getElementById("recover-password-button")
}