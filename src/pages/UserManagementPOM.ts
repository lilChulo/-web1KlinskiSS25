import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';

export class UserManagementPOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log('UserManagementPOM: Instanziert');
  }

  public showPage(): void {
    console.log('UserManagementPOM: showPage aufgerufen');
    const app = document.getElementById('app');
    const topMenu = document.getElementById('TopMenu');
    if (app && topMenu) {
      app.innerHTML = `
        <div id="UserManagementPage">
          <h1>User Administration</h1>
          <button class="add-button">+</button>
          <table>
            <thead>
              <tr>
                <th>User-ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>admin</td>
                <td>Udo</td>
                <td>Müller</td>
                <td>
                  <button class="edit-button">Edit</button>
                  <button class="delete-button">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button id="backButton" class="btn btn-secondary mt-2">Zurück</button>
        </div>
      `;
      topMenu.innerHTML = `
        <div class="container-fluid">
          <a class="navbar-brand" href="#" id="LinkRoot">WE-1 SPA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
      this.attachEventListeners();
      console.log('UserManagementPOM: HTML eingefügt und Event-Listener angehängt');
    }
  }

  private attachEventListeners(): void {
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('UserManagementPOM: LinkRoot geklickt');
      this.appManager.showStartPage();
    });

    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('UserManagementPOM: LinkImpressum geklickt');
      this.appManager.showImpressumPage();
    });

    document.getElementById('LinkUserManagement')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('UserManagementPOM: LinkUserManagement geklickt');
      this.appManager.showUserManagementPage();
    });

    document.getElementById('LinkLogout')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('UserManagementPOM: LinkLogout geklickt');
      this.appManager.logout();
    });

    document.getElementById('backButton')?.addEventListener('click', () => {
      console.log('UserManagementPOM: backButton geklickt');
      this.appManager.showStartPage();
    });
  }
}