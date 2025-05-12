import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';

export class StartPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log('StartPagePOM: Instanziert');
  }

  public showPage(): void {
    console.log('StartPagePOM: showPage aufgerufen');
    const app = document.getElementById('app');
    const topMenu = document.getElementById('TopMenu');
    if (app && topMenu) {
      app.innerHTML = `
        <div id="StartPage">
          <h2 id="StartPageWelcomeText">Willkommen, <span id="UserCount">${this.appManager.getUserCount()}</span> User sind registriert!</h2>
          <a href="#" id="StartPageLinkUserManagement" class="btn btn-link">Zum User Management</a>
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
      console.log('StartPagePOM: HTML eingefügt und Event-Listener angehängt');
    }
  }

  private attachEventListeners(): void {
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('StartPagePOM: LinkRoot geklickt');
      this.appManager.showStartPage();
    });

    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('StartPagePOM: LinkImpressum geklickt');
      this.appManager.showImpressumPage();
    });

    document.getElementById('LinkLogout')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('StartPagePOM: LinkLogout geklickt');
      this.appManager.logout();
    });

    document.getElementById('LinkUserManagement')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('StartPagePOM: LinkUserManagement geklickt');
      this.appManager.showUserManagementPage();
    });

    document.getElementById('StartPageLinkUserManagement')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('StartPagePOM: StartPageLinkUserManagement geklickt');
      this.appManager.showUserManagementPage();
    });
  }
}