var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var bookmarks = [];
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput");
var alertName = document.getElementById("alertName");
var alertURL = document.getElementById("alertURL");
var bookmarkIndex = 0;
if (JSON.parse(localStorage.getItem("bookmarksList"))) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    displayBookmarks();
}

submitBtn.onclick = function () {
    if (submitBtn.innerHTML == "Update Bookmark") {
        // Update Bookmark
        updateBookmark();
    } else {
        // Push bookmark to bookmarks array
        addBookmark();
    }
    // Display data
    displayBookmarks();
    // Clear Form
    clearForm();
};
function addBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}
function displayBookmarks() {
    var cartona = "";
    for (var i = 0; i < bookmarks.length; i++) {
        cartona += `<div class="row bookmark">
                        <div class="col-lg-4">
                            <h2>${bookmarks[i].name}</h2>
                        </div>
                        <div class="col-lg-4">
                            <a href="${bookmarks[i].url}" target="_blank" class="btn btn-primary">Visit</a>
                            <button class="btn btn-warning" onclick=getBookmark(${i})>Update</button>
                            <button class="btn btn-danger" onclick=deleteBookmark(${i})>Delete</button>
                        </div>
                    </div>`;
    }
    // console.log("cartona:", cartona);
    document.getElementById("Bookmarks").innerHTML = cartona;
}
function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmarks();
}
function getBookmark(index) {
    siteName.value = bookmarks[index].name;
    siteUrl.value = bookmarks[index].url;
    submitBtn.innerHTML = "Update Bookmark";
    bookmarkIndex = index;
}
function updateBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value,
    };
    bookmarks[bookmarkIndex] = bookmark;
    submitBtn.innerHTML = "Submit";
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}
searchInput.onkeyup = function () {
    console.log("searchInput:", searchInput.value);
    var cartona = "";
    for (var i = 0; i < bookmarks.length; i++) {
        if (
            bookmarks[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
        ) {
            cartona += `<div class="row bookmark">
                        <div class="col-lg-4">
                            <h2>${bookmarks[i].name}</h2>
                        </div>
                        <div class="col-lg-4">
                            <a href="${bookmarks[i].url}" target="_blank" class="btn btn-primary">Visit</a>
                            <button class="btn btn-warning" onclick=getBookmark(${i})>Update</button>
                            <button class="btn btn-danger" onclick=deleteBookmark(${i})>Delete</button>
                        </div>
                    </div>`;
        }
    }
    document.getElementById("Bookmarks").innerHTML = cartona;
};
siteName.onkeyup = function () {
    var siteNameValue = siteName.value;
    checkNameValidOrNot(siteNameValue);
    checkBtnStatus();
};
siteUrl.onkeyup = function () {
    var siteUrlValue = siteUrl.value;
    checkURLValidOrNot(siteUrlValue);
    checkBtnStatus();
};
function checkNameValidOrNot(siteNameValue) {
    if (siteNameValue) {
        console.log(siteNameValue);
        var nameRegex = /^(?!\d)\w{4,40}$/;
        console.log(nameRegex.test(siteNameValue));
        if (nameRegex.test(siteNameValue)) {
            // Valid name
            siteName.classList.add("is-valid");
            siteName.classList.remove("is-invalid");
            alertName.classList.add('d-none');
            return true;
        } else {
            // In-Valid name
            siteName.classList.add("is-invalid");
            siteName.classList.remove("is-valid");
            alertName.classList.remove('d-none');
            return false;
        }
    }
    else {
        siteName.classList.remove("is-invalid");
        siteName.classList.remove("is-valid");
        alertName.classList.add('d-none');
        return false;
    }
}
function checkURLValidOrNot(siteUrlValue) {
    if (siteUrlValue) {
        console.log(siteUrlValue);
        // var urlRegex = /^(https:\/\/|http:\/\/)(www\.)?\w{1,20}\.?[a-z]{3}\/?$/;
        // var urlRegex = /^(https:\/\/|http:\/\/)(www\.)?[a-zA-Z0-9\/_-]{1,200}\.?[a-z]{3}\/?[a-zA-Z0-9\/_-]{1,200}$/;
        var urlRegex = /^(https:\/\/|http:\/\/)(www\.)?[a-zA-Z0-9\.\/_-]{1,400}$/;
        // console.log(urlRegex.test(siteUrlValue));
        if (urlRegex.test(siteUrlValue)) {
            // Valid URL
            siteUrl.classList.add("is-valid");
            siteUrl.classList.remove("is-invalid");
            alertURL.classList.add('d-none');
            return true;
        } else {
            // In-Valid URL
            siteUrl.classList.add("is-invalid");
            siteUrl.classList.remove("is-valid");
            alertURL.classList.remove('d-none');
            return false;
        }
    }
    else {
        siteUrl.classList.remove("is-invalid");
        siteUrl.classList.remove("is-valid");
        alertURL.classList.add('d-none');
        return false;
    }
}
function checkBtnStatus() {
    var siteNameValidFlag = siteName.classList.contains('is-valid');
    console.log('siteNameValidFlag:', siteNameValidFlag);
    var siteUrlValidFlag = siteUrl.classList.contains('is-valid');
    console.log('siteUrlValidFlag:', siteUrlValidFlag);
    if (siteNameValidFlag && siteUrlValidFlag) {
        submitBtn.removeAttribute('disabled');
    }
    else {
        submitBtn.disabled = true;
    }
}