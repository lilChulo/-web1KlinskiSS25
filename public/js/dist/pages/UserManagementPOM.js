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
            yield this.refreshUserTable();
            this.renderTopMenu();
            this.attachEventListeners();
            console.log('UserManagementPOM: HTML eingefügt und Event-Listener angehängt');
        });
    }
    refreshUserTable() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const users = yield this.appManager.fetchUsers();
            const tbody = document.querySelector('#TableUsers tbody');
            if (!tbody)
                return;
            tbody.innerHTML = users.map(user => `
      <tr data-userid="${user.userId}">
        <td>${user.userId}</td>
        <td>${user.firstName || ''}</td>
        <td>${user.lastName || ''}</td>
        <td>
          <button class="btn btn-sm btn-primary btn-edit">Edit</button>
          <button class="btn btn-sm btn-danger btn-delete">Delete</button>
        </td>
      </tr>
    `).join('');
            // Event Listener für Edit/Delete Buttons
            tbody.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                    const tr = e.target.closest('tr');
                    if (!tr)
                        return;
                    const userId = tr.getAttribute('data-userid');
                    if (!userId)
                        return;
                    const confirmed = confirm(`User "${userId}" wirklich löschen?`);
                    if (!confirmed)
                        return;
                    const success = yield this.appManager.deleteUser(userId);
                    if (success) {
                        this.appManager.showToast('User gelöscht.', true);
                        yield this.refreshUserTable();
                    }
                    else {
                        this.appManager.showToast('Löschen fehlgeschlagen.', false);
                    }
                }));
            });
            tbody.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                    const tr = e.target.closest('tr');
                    if (!tr)
                        return;
                    const userId = tr.getAttribute('data-userid');
                    if (!userId)
                        return;
                    const user = users.find(u => u.userId === userId);
                    if (!user)
                        return;
                    const formEdit = document.getElementById('FormEditUser');
                    if (!formEdit)
                        return;
                    // Felder setzen
                    document.getElementById('FormEditUserUsername').value = user.userId;
                    document.getElementById('FormEditUserFirstName').value = user.firstName || '';
                    document.getElementById('FormEditUserLastName').value = user.lastName || '';
                    document.getElementById('FormEditUserPassword').value = '';
                    formEdit.style.display = 'block';
                }));
            });
            // Edit-Formular: Event-Handler sicherstellen
            const editForm = document.getElementById('EditUserForm');
            editForm === null || editForm === void 0 ? void 0 : editForm.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const userId = document.getElementById('FormEditUserUsername').value;
                const firstName = document.getElementById('FormEditUserFirstName').value;
                const lastName = document.getElementById('FormEditUserLastName').value;
                const password = document.getElementById('FormEditUserPassword').value;
                const user = {
                    userId,
                    password,
                    firstName,
                    lastName,
                };
                const success = yield this.appManager.updateUser(user);
                if (success) {
                    this.appManager.showToast('User aktualisiert.', true);
                    document.getElementById('FormEditUser').style.display = 'none';
                    yield this.refreshUserTable();
                }
                else {
                    this.appManager.showToast('Aktualisierung fehlgeschlagen.', false);
                }
            }));
            (_a = document.getElementById('FormEditUserCancel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                const formEdit = document.getElementById('FormEditUser');
                if (formEdit)
                    formEdit.style.display = 'none';
            });
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
        var _a, _b, _c, _d, _e;
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
        const btnAddUser = document.getElementById('ButtonAddUser');
        const formAddUser = document.getElementById('FormAddUser');
        btnAddUser === null || btnAddUser === void 0 ? void 0 : btnAddUser.addEventListener('click', () => {
            if (formAddUser)
                formAddUser.style.display = 'block';
        });
        (_e = document.getElementById('FormAddUserCancel')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
            if (formAddUser)
                formAddUser.style.display = 'none';
            this.clearAddUserForm();
        });
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
