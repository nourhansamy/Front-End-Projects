var loggedInUser = localStorage.getItem("loggedInUser");
var welcomeMsg = document.getElementById("welcomeMsg");
var logoutBtn = document.getElementById("logoutBtn");
console.log("loggedInUser:", loggedInUser);
welcomeMsg.innerHTML = `Welcome ${loggedInUser}`;

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
});
