'use strict'

function initAdminPage() {
    loadUsers();
    var user = findUserByLoginStatus();
    if (user === undefined) return window.location.href = "index.html";
    (isAdmin(user)) ? renderAdminPage() : window.location.href = "index.html";
}


function isAdmin(user) {
    return (user.isAdmin) ? true : false;
}

function logOutAdmin() {
    var user = findUserByLoginStatus();
    user.isLoggedIn = !user.isLoggedIn;
    saveUsers();
    window.location.href = "index.html";
    renderLogInPage();
}