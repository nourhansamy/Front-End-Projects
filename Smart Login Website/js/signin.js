var loginBtn = document.getElementById("loginBtn");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var alertMsg = document.getElementById("alertMsg");
var inputs = document.getElementsByClassName("form-control");
var users = [];
if (JSON.parse(localStorage.getItem("users")) != null) {
    users = JSON.parse(localStorage.getItem("users"));
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", checkAlert);
}
function checkAlert() {
    if (!alertMsg.classList.contains("d-none")) {
        alertMsg.classList.add("d-none");
    }
}
function getUser(email) {
    var storedUsers = JSON.parse(localStorage.getItem("users"));
    console.log("storedUsers:", storedUsers);
    var user;
    if (storedUsers) {
        for (var i = 0; i < storedUsers.length; i++) {
            if (storedUsers[i].email == email) {
                user = storedUsers[i];
                break;
            }
        }
    }
    console.log("getUser:", user);
    return user;
}

loginBtn.addEventListener("click", login);
function login() {
    // Get inputs values
    var emailValue = emailInput.value;
    var passwordValue = passwordInput.value;
    if (emailValue == "" || passwordValue == "") {
        // Display the alert component
        alertMsg.classList.remove("d-none");
        alertMsg.innerHTML = "All Inputs Are Required";
        alertMsg.style.cssText = "color:#dc3545 !important;";
    } else {
        // get Email and Password
        var user = getUser(emailValue);
        console.log("user:", user);
        if (user) {
            // Check Password
            var storedPassword = user.password;
            if (storedPassword == passwordValue) {
                // Success
                console.log("success login!");
                loginBtn.href = "home.html";
                localStorage.setItem("loggedInUser", user.name);
            } else {
                alertMsg.innerHTML = "Incorrect E-mail Or Password";
                alertMsg.style.cssText = "color:#dc3545 !important;";
                alertMsg.classList.remove("d-none");
            }
        } else {
            // // User Doesn't Exist
            // alertMsg.innerHTML = "User Doesn't Exist";
            // alertMsg.style.cssText = "color:#dc3545 !important;";
            // alertMsg.classList.remove("d-none");
            alertMsg.innerHTML = "Incorrect E-mail Or Password";
            alertMsg.style.cssText = "color:#dc3545 !important;";
            alertMsg.classList.remove("d-none");
        }
    }
}
