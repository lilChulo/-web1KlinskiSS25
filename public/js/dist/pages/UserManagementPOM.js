var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AbstractPOM } from './AbstractPOM.js';
export class UserManagementPOM extends AbstractPOM {
    constructor(appManager) {
        super(appManager);
        console.log('UserManagementPOM: Instanziert');
    }
    showPage() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('UserManagementPOM: showPage aufgerufen');
            const app = document.getElementById('app');
            const topMenu = document.getElementById('TopMenu');
            if (!app || !topMenu)
                return;
            try {
                const res = yield fetch('/html/user-management.html');
                if (!res.ok)
                    throw new Error('Fehler beim Laden der User Management HTML');
                app.innerHTML = yield res.text();
            }
            catch (error) {
                console.error('UserManagementPOM: Fehler beim Laden der Seite:', error);
                app.innerHTML = '<p>Fehler beim Laden der Benutzerverwaltung.</p>';
                return;
            }
            // Benutzer laden und Tabelle füllen
            yield this.refreshUserTable();
            this.renderTopMenu();
            this.attachEventListeners();
            console.log('UserManagementPOM: HTML eingefügt und Event-Listener angehängt');
        });
    }
    refreshUserTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.appManager.fetchUsers();
            const tbody = document.querySelector('#TableUsers tbody');
            if (!tbody)
                return;
            tbody.innerHTML = users.map(user => `
      <tr>
        <td>${user.userId}</td>
        <td>${user.firstName || ''}</td>
        <td>${user.lastName || ''}</td>
        <td>
          <button class="btn btn-sm btn-primary" disabled>Edit</button>
          <button class="btn btn-sm btn-danger" disabled>Delete</button>
        </td>
      </tr>
    `).join('');
        });
    }
    renderTopMenu() {
        const topMenu = document.getElementById('TopMenu');
        if (!topMenu)
            return;
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
    }
    attachEventListeners() {
        var _a, _b, _c, _d;
        // Navigation Links
        (_a = document.getElementById('LinkRoot')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', e => {
            e.preventDefault();
            this.appManager.showStartPage();
        });
        (_b = document.getElementById('LinkImpressum')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', e => {
            e.preventDefault();
            this.appManager.showImpressumPage();
        });
        (_c = document.getElementById('LinkUserManagement')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', e => {
            e.preventDefault();
            this.appManager.showUserManagementPage();
        });
        (_d = document.getElementById('LinkLogout')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', e => {
            e.preventDefault();
            this.appManager.logout();
        });
        // Button User hinzufügen
        const btnAddUser = document.getElementById('ButtonAddUser');
        const formAddUser = document.getElementById('FormAddUser');
        btnAddUser === null || btnAddUser === void 0 ? void 0 : btnAddUser.addEventListener('click', () => {
            if (formAddUser) {
                formAddUser.style.display = 'block';
            }
        });
        // Formular Abbrechen
        const btnCancel = document.getElementById('FormAddUserCancel');
        btnCancel === null || btnCancel === void 0 ? void 0 : btnCancel.addEventListener('click', () => {
            if (formAddUser) {
                formAddUser.style.display = 'none';
            }
            this.clearAddUserForm();
        });
        //User hinzufügen
        const form = document.getElementById('AddUserForm');
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const userId = document.getElementById('FormAddUserUsername').value.trim();
            const password = document.getElementById('FormAddUserPassword').value.trim();
            const firstName = document.getElementById('FormAddUserFirstName').value.trim();
            const lastName = document.getElementById('FormAddUserLastName').value.trim();
            if (!userId || !password) {
                this.appManager.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
                return;
            }
            const success = yield this.appManager.registerUser(userId, password, firstName, lastName);
            if (success) {
                this.appManager.showToast('User erfolgreich hinzugefügt.', true);
                if (formAddUser)
                    formAddUser.style.display = 'none';
                this.clearAddUserForm();
                yield this.refreshUserTable();
            }
            else {
                this.appManager.showToast('Fehler beim Hinzufügen des Users.', false);
            }
        }));
    }
    clearAddUserForm() {
        document.getElementById('FormAddUserUsername').value = '';
        document.getElementById('FormAddUserPassword').value = '';
        document.getElementById('FormAddUserFirstName').value = '';
        document.getElementById('FormAddUserLastName').value = '';
    }
}
