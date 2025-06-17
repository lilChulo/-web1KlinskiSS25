import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';

export class ImpressumPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log('ImpressumPagePOM: Instanziiert');
  }

  public async showPage(): Promise<void> {
    console.log('ImpressumPagePOM: showPage aufgerufen');

    const app = document.getElementById('app');
    const topMenu = document.getElementById('TopMenu');

    if (app && topMenu) {
      try {
        const res = await fetch('/html/impressum.html');
        if (!res.ok) throw new Error('Fehler beim Laden der Impressum-HTML');
        const html = await res.text();
        app.innerHTML = html;
      } catch (err) {
        console.error('Fehler beim Laden der Impressum-Seite:', err);
        app.innerHTML = '<p>Fehler beim Laden des Impressums.</p>';
        return;
      }

      const isLoggedIn = this.appManager.getCurrentUser() !== null;

      topMenu.innerHTML = `
        <div class="container-fluid">
          <a class="navbar-brand" href="#" id="LinkRoot">WE-1 SPA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkImpressum">Impressum</a>
              </li>
              ${isLoggedIn ? `
              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkUserManagement">User Management</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkLogout">Logout</a>
              </li>` : ''}
            </ul>
          </div>
        </div>
      `;

      this.attachEventListeners();
      console.log('ImpressumPagePOM: HTML eingefügt und Event-Listener angehängt');
    }
  }

  private attachEventListeners(): void {
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('ImpressumPagePOM: LinkRoot geklickt');
      if (this.appManager.getCurrentUser()) {
        this.appManager.showStartPage();
      } else {
        this.appManager.showLandingPage();
      }
    });

    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('ImpressumPagePOM: LinkImpressum geklickt');
      this.appManager.showImpressumPage();
    });

    const userManagementLink = document.getElementById('LinkUserManagement');
    if (userManagementLink) {
      userManagementLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('ImpressumPagePOM: LinkUserManagement geklickt');
        this.appManager.showUserManagementPage();
      });
    }

    const logoutLink = document.getElementById('LinkLogout');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('ImpressumPagePOM: LinkLogout geklickt');
        this.appManager.logout();
      });
    }
  }
}
