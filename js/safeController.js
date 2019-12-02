'use strict'

function init() {
    loadUsers();
    if (gUsers.length === 0) createUsers();
    isUserBeenRedirected();
}

function renderUserPage() {

    var elContainer = document.querySelector('.container');
    elContainer.style.display = 'none';
    var elUserPage = document.querySelector('.userpage');
    elUserPage.style.display = 'flex';
    var user = findUserByLoginStatus();
    var str =`<div class="greeting"><span>Hello ${user.name}! How are you?</span>`
    if (user.isAdmin) {
        str+=`<span><a href="admin.html">Admin Page</a></span>`
    }
    str+= `<button class="logout" type="submit" onclick="logOutUser()">Logout</button></div>`;
    str+=`<br><br><img src="https://picsum.photos/900/500">`
    elUserPage.innerHTML = str;
}

function renderError() {

    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var str = `Login failed. Wrong user name or password.<br>Please try again.<br><br>
               <button class="close" onclick="closeModal()">Close</button>`;
    elModal.innerHTML = str;
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function renderLogInPage() {

    var elContainer = document.querySelector('.container');
    elContainer.style.display = 'flex';
    var elUserPage = document.querySelector('.userpage');
    elUserPage.style.display = 'none';
}

function renderAdminPage() {
    var elPanel = document.querySelector('.panel');
    var user = findUserByLoginStatus();
    var str =`<div class="greeting"><span>Hello ${user.name}. You're in admin mode.</span>
              <div class="sortUsers"><select id="status-sort" onchange="onStatusSortChange(this)">
              <option value="name">Name</option>
              <option value="lastLoggedIn">Last Logged In</option>
              </select></div>
              <button class="back" type="submit" onclick="window.location.href='index.html';">Back</button>
              <button class="logout" type="submit" onclick="logOutAdmin()">Logout</button></div>`;
    elPanel.innerHTML = str;
    renderAdminTable();
}

function renderAdminTable() {

    var elTableBody = document.querySelector('.tableBody');
    var users = getUsersToShow();
    var str = users.map(function(user) {
        return `<div class="row"><div class="user">${user.name}</div>
                <div class="password">${user.pass}</div>
                <div class="lastlog">${renderFormattedTime(user)}</div></div>`;
    });
    elTableBody.innerHTML = str.join('');
}

function onStatusSortChange(elStatusSort) {
    var sortByStatus = elStatusSort.value;
    setSortStatus(sortByStatus);
    renderAdminTable();
}

function renderFormattedTime(user) {
    if (!user.lastLoggedIn) return ' ';
    var currentDate = new Date(user.lastLoggedIn);
    var date = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var formatedDate = " " + addZero(date) + "-" + addZero(month) + "-" + currentDate.getFullYear() +
        " at " + addZero(hours) + ":" + addZero(minutes);
    return formatedDate;
}