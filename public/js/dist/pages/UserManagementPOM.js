// UserManagementPOM.ts
import { AbstractPOM } from './AbstractPOM.js';
export class UserManagementPOM extends AbstractPOM {
    constructor(appManager) {
        super(appManager);
        console.log('UserManagementPOM: Instanziert'); // Konstruktor wie immer
    }
    showPage() {
        console.log('UserManagementPOM: showPage aufgerufen');
        const app = document.getElementById('app');
        const topMenu = document.getElementById('TopMenu');
        if (app && topMenu) {
            const users = this.appManager.getUsers(); //userliste holen
            let tableRows = ''; //userdaten in tabelenzeilen konvertiren
            users.forEach(user => {
                tableRows += `
          <tr>
            <td id="${user.userId}TableItemUsername">${user.userId}</td>
            <td id="${user.userId}TableItemFirstName">${user.firstName || ''}</td>
            <td id="${user.userId}TableItemLastName">${user.lastName || ''}</td>
            <td>
              <button id="${user.userId}TableItemEditButton" class="edit-button">Edit</button>
              <button id="${user.userId}TableItemDeleteButton" class="delete-button">Delete</button>
            </td>
          </tr>`;
            });
            //tabelle + formulare
            app.innerHTML = `
        <div id="UserManagementPage">
          <h1>User Administration</h1>
          <button id="ButtonAddUser" class="add-button">+</button>
          <table id="TableUsers">
            <thead>
              <tr>
                <th>User-ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <div id="FormAddUser" style="display: none;">
            <h3>User hinzufügen</h3>
            <form>
              <div class="form-group">
                <label for="FormAddUserUsername">User-ID:</label>
                <input type="text" id="FormAddUserUsername" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="FormAddUserPassword">Passwort:</label>
                <input type="password" id="FormAddUserPassword" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="FormAddUserFirstName">Vorname:</label>
                <input type="text" id="FormAddUserFirstName" class="form-control">
              </div>
              <div class="form-group">
                <label for="FormAddUserLastName">Nachname:</label>
                <input type="text" id="FormAddUserLastName" class="form-control">
              </div>
              <button type="submit" id="FormAddUserSubmit" class="btn btn-primary">Hinzufügen</button>
              <button type="button" id="FormAddUserCancel" class="btn btn-secondary">Abbrechen</button>
            </form>
          </div>
          <div id="FormEditUser" style="display: none;">
            <h3>User bearbeiten</h3>
            <form>
              <div class="form-group">
                <label for="FormEditUserUsername">User-ID:</label>
                <input type="text" id="FormEditUserUsername" class="form-control" readonly>
              </div>
              <div class="form-group">
                <label for="FormEditUserPassword">Passwort:</label>
                <input type="password" id="FormEditUserPassword" class="form-control">
              </div>
              <div class="form-group">
                <label for="FormEditUserFirstName">Vorname:</label>
                <input type="text" id="FormEditUserFirstName" class="form-control">
              </div>
              <div class="form-group">
                <label for="FormEditUserLastName">Nachname:</label>
                <input type="text" id="FormEditUserLastName" class="form-control">
              </div>
              <button type="submit" id="FormEditUserSubmit" class="btn btn-primary">Speichern</button>
              <button type="button" id="FormEditUserCancel" class="btn btn-secondary">Abbrechen</button>
            </form>
          </div>
          <button id="backButton" class="btn btn-secondary mt-2">Zurück</button>
        </div>
      `;
            topMenu.innerHTML = `
        <div class="container-fluid">
          <a class="navbar-brand" href="#" id="LinkRoot">WE-1 SPA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkImpressum">Impressum</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkUserManagement">User Management</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkLogout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      `;
            this.attachEventListeners(); //eventhantler binden
            console.log('UserManagementPOM: HTML eingefügt und Event-Listener angehängt');
        }
    }
    attachEventListeners() {
        var _a, _b, _c, _d, _e;
        (_a = document.getElementById('LinkRoot')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('UserManagementPOM: LinkRoot geklickt');
            this.appManager.showStartPage();
        });
        (_b = document.getElementById('LinkImpressum')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('UserManagementPOM: LinkImpressum geklickt');
            this.appManager.showImpressumPage();
        });
        (_c = document.getElementById('LinkUserManagement')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('UserManagementPOM: LinkUserManagement geklickt');
            this.appManager.showUserManagementPage();
        });
        (_d = document.getElementById('LinkLogout')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('UserManagementPOM: LinkLogout geklickt');
            this.appManager.logout();
        });
        (_e = document.getElementById('backButton')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
            console.log('UserManagementPOM: backButton geklickt');
            this.appManager.showStartPage();
        });
    }
}
