'use strict'
var gUsers = [], gNextID = 1, gSortBy = 'name';

function createUser(name, pass, isAdmin, ) {

    var user = {
        name,
        pass,
        isAdmin,
        isLoggedIn: false,
        id: gNextID++
    }
    saveToStorage('gNextID', gNextID);
    return user;
}

function createUsers() {

    gUsers.push(createUser('paolo', '1234', true));
    gUsers.push(createUser('pupu', '4455', false));
    gUsers.push(createUser('nulu', '6767', true));
    gUsers.push(createUser('boss', '1111', false));
    saveUsers();
}

function saveUsers() {
    saveToStorage('users', gUsers);
}

function loadUsers() {

    gUsers = loadFromStorage('users', []);
    gNextID = loadFromStorage('gNextID', 1);
}

function doLogin() {

    var elPassword = document.querySelector('.pass');
    var pass = elPassword.value;
    var elUserName = document.querySelector('.user');
    var userName = elUserName.value;

    if (checkCredentials(userName, pass)) {
        userLogIn(userName);
        renderUserPage();
    } else {
        renderError();
    }
}

function checkCredentials(userName, pass) {

    var isValid = gUsers.find(function (gUser) {
        if (gUser.name === userName && gUser.pass === pass) {
            return true;
        } else { return false };
    });
    return isValid;
}

function logOutUser() {
    var user = findUserByLoginStatus();
    user.isLoggedIn = !user.isLoggedIn;
    saveUsers();
    renderLogInPage();
}

function userLogIn(userName) {

    var user = findUserByName(userName);
    user.isLoggedIn = !user.isLoggedIn;
    user.lastLoggedIn = Date.now();
    saveUsers();
}

function findUserByName(userName) {

    return gUsers.find(function (gUser) {
        return gUser.name === userName;
    });
}

function findUserByLoginStatus() {

    return gUsers.find(function (gUser) {
        return gUser.isLoggedIn;
    });
}

function isUserBeenRedirected() {

    var user = findUserByLoginStatus();
    if (user === undefined) return;
    (user.isLoggedIn) ? renderUserPage() : renderLogInPage();
}

function getUsersToShow() {
    return gUsers.sort(function (user1, user2) {
        return user1[gSortBy] > user2[gSortBy] ? 1 : (user1[gSortBy] < user2[gSortBy] ? -1 : 0);
    });
}

function setSortStatus(sortByStatus) {
    gSortBy = sortByStatus
}

function addZero(i) {
    if (i < 10) i = "0" + i;
    return i;
}