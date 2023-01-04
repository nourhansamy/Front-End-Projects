var signUpBtn = document.getElementById("signUpBtn");
var loginBtn = document.getElementById("loginBtn");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var alertMsg = document.getElementById("alertMsg");
var inputs = document.getElementsByClassName("form-control");

var users = [];
if (JSON.parse(localStorage.getItem("users")) != null) {
    users = JSON.parse(localStorage.getItem("users"));
}
signUpBtn.addEventListener("click", signUp);
function signUp() {
    // Get inputs values
    var nameValue = nameInput.value;
    var emailValue = emailInput.value;
    var passwordValue = passwordInput.value;
    if (nameValue == "" || emailValue == "" || passwordValue == "") {
        // Display the alert component
        alertMsg.classList.remove("d-none");
    }
    // Check if email exists
    else if (checkEmail(emailValue)) {
        alertMsg.innerHTML = "Email already exists";
        alertMsg.style.cssText = "color:#dc3545 !important;";
        alertMsg.classList.remove("d-none");
    } else {
        // Push to the array
        var user = {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
        };
        users.push(user);
        // Update Local Storage
        localStorage.setItem("users", JSON.stringify(users));
        alertMsg.innerHTML = "Success";
        alertMsg.style.cssText = "color:#28a745 !important;";
        alertMsg.classList.remove("d-none");
    }
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", checkAlert);
}
function checkAlert() {
    if (!alertMsg.classList.contains("d-none")) {
        alertMsg.classList.add("d-none");
    }
}
function checkEmail(email) {
    var storedUsers = JSON.parse(localStorage.getItem("users"));
    console.log("storedUsers:", storedUsers);
    var existFlag = false;
    if (storedUsers) {
        for (var i = 0; i < storedUsers.length; i++) {
            if (storedUsers[i].email == email) {
                existFlag = true;
                break;
            }
        }
    }
    console.log("checkEmail:", existFlag);
    return existFlag;
}
