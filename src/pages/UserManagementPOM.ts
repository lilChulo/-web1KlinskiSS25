import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';
import { User } from '@domain/User';

export class UserManagementPOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log('UserManagementPOM: Instanziert');
  }

  public async showPage(): Promise<void> {
    console.log('UserManagementPOM: showPage aufgerufen');

    const app = document.getElementById('app');
    const topMenu = document.getElementById('TopMenu');

    if (!app || !topMenu) return;

    try {
      const res = await fetch('/html/user-management.html');
      if (!res.ok) throw new Error('Fehler beim Laden der User Management HTML');
      app.innerHTML = await res.text();
    } catch (error) {
      console.error('UserManagementPOM: Fehler beim Laden der Seite:', error);
      app.innerHTML = '<p>Fehler beim Laden der Benutzerverwaltung.</p>';
      return;
    }

    await this.refreshUserTable();
    this.renderTopMenu();
    this.attachEventListeners();

    console.log('UserManagementPOM: HTML eingefügt und Event-Listener angehängt');
  }

  private async refreshUserTable(): Promise<void> {
    const users: User[] = await this.appManager.fetchUsers();
    const tbody = document.querySelector('#TableUsers tbody');
    if (!tbody) return;

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
      btn.addEventListener('click', async (e) => {
        const tr = (e.target as HTMLElement).closest('tr');
        if (!tr) return;
        const userId = tr.getAttribute('data-userid');
        if (!userId) return;

        const confirmed = confirm(`User "${userId}" wirklich löschen?`);
        if (!confirmed) return;

        const success = await this.appManager.deleteUser(userId);
        if (success) {
          this.appManager.showToast('User gelöscht.', true);
          await this.refreshUserTable();
        } else {
          this.appManager.showToast('Löschen fehlgeschlagen.', false);
        }
      });
    });

    tbody.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const tr = (e.target as HTMLElement).closest('tr');
        if (!tr) return;
        const userId = tr.getAttribute('data-userid');
        if (!userId) return;

        const user = users.find(u => u.userId === userId);
        if (!user) return;

        const formEdit = document.getElementById('FormEditUser') as HTMLDivElement;
        if (!formEdit) return;

        // Felder setzen
        (document.getElementById('FormEditUserUsername') as HTMLInputElement).value = user.userId;
        (document.getElementById('FormEditUserFirstName') as HTMLInputElement).value = user.firstName || '';
        (document.getElementById('FormEditUserLastName') as HTMLInputElement).value = user.lastName || '';
        (document.getElementById('FormEditUserPassword') as HTMLInputElement).value = '';

        formEdit.style.display = 'block';
      });
    });

    // Edit-Formular: Event-Handler sicherstellen
    const editForm = document.getElementById('EditUserForm') as HTMLFormElement;
    editForm?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const userId = (document.getElementById('FormEditUserUsername') as HTMLInputElement).value;
      const firstName = (document.getElementById('FormEditUserFirstName') as HTMLInputElement).value;
      const lastName = (document.getElementById('FormEditUserLastName') as HTMLInputElement).value;
      const password = (document.getElementById('FormEditUserPassword') as HTMLInputElement).value;

      const user: User = {
  userId,
  password,
  firstName,
  lastName,
};

const success = await this.appManager.updateUser(user);

      if (success) {
        this.appManager.showToast('User aktualisiert.', true);
        (document.getElementById('FormEditUser') as HTMLDivElement).style.display = 'none';
        await this.refreshUserTable();
      } else {
        this.appManager.showToast('Aktualisierung fehlgeschlagen.', false);
      }
    });

    document.getElementById('FormEditUserCancel')?.addEventListener('click', () => {
      const formEdit = document.getElementById('FormEditUser') as HTMLDivElement;
      if (formEdit) formEdit.style.display = 'none';
    });
  }

  private renderTopMenu(): void {
    const topMenu = document.getElementById('TopMenu');
    if (!topMenu) return;

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

  private attachEventListeners(): void {
    document.getElementById('LinkRoot')?.addEventListener('click', e => {
      e.preventDefault();
      this.appManager.showStartPage();
    });

    document.getElementById('LinkImpressum')?.addEventListener('click', e => {
      e.preventDefault();
      this.appManager.showImpressumPage();
    });

    document.getElementById('LinkUserManagement')?.addEventListener('click', e => {
      e.preventDefault();
      this.appManager.showUserManagementPage();
    });

    document.getElementById('LinkLogout')?.addEventListener('click', e => {
      e.preventDefault();
      this.appManager.logout();
    });

    const btnAddUser = document.getElementById('ButtonAddUser');
    const formAddUser = document.getElementById('FormAddUser');

    btnAddUser?.addEventListener('click', () => {
      if (formAddUser) formAddUser.style.display = 'block';
    });

    document.getElementById('FormAddUserCancel')?.addEventListener('click', () => {
      if (formAddUser) formAddUser.style.display = 'none';
      this.clearAddUserForm();
    });

    const form = document.getElementById('AddUserForm') as HTMLFormElement | null;
    form?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const userId = (document.getElementById('FormAddUserUsername') as HTMLInputElement).value.trim();
      const password = (document.getElementById('FormAddUserPassword') as HTMLInputElement).value.trim();
      const firstName = (document.getElementById('FormAddUserFirstName') as HTMLInputElement).value.trim();
      const lastName = (document.getElementById('FormAddUserLastName') as HTMLInputElement).value.trim();

      if (!userId || !password) {
        this.appManager.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
        return;
      }

      const success = await this.appManager.registerUser(userId, password, firstName, lastName);
      if (success) {
        this.appManager.showToast('User erfolgreich hinzugefügt.', true);
        if (formAddUser) formAddUser.style.display = 'none';
        this.clearAddUserForm();
        await this.refreshUserTable();
      } else {
        this.appManager.showToast('Fehler beim Hinzufügen des Users.', false);
      }
    });
  }

  private clearAddUserForm(): void {
    (document.getElementById('FormAddUserUsername') as HTMLInputElement).value = '';
    (document.getElementById('FormAddUserPassword') as HTMLInputElement).value = '';
    (document.getElementById('FormAddUserFirstName') as HTMLInputElement).value = '';
    (document.getElementById('FormAddUserLastName') as HTMLInputElement).value = '';
  }
}
