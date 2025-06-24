import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';
import { User } from '@domain/User';

export class StartPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log("StartPagePOM: Instanziert");
  }

  public async showPage(): Promise<void> {
    console.log("StartPagePOM: showPage aufgerufen");

    const app = document.getElementById("app");
    const topMenu = document.getElementById("TopMenu");
    const currentUser: User | null = this.appManager.getCurrentUser();

    if (!app || !topMenu) {
      console.error("StartPagePOM: Container fehlt");
      return;
    }

    try {
      // HTML vom Server laden
      const response = await fetch('/html/startpage.html');
      if (!response.ok) {
        throw new Error(`Fehler beim Laden der Startseite: ${response.statusText}`);
      }
      const htmlContent = await response.text();

      app.innerHTML = htmlContent;

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

      const welcomeText = document.getElementById("StartPageWelcomeText");
      if (welcomeText) {
        let welcomeMessage = "Willkommen!";
        if (currentUser) {
          if (currentUser.firstName?.trim() && currentUser.lastName?.trim()) {
            welcomeMessage = `Willkommen, ${currentUser.firstName} ${currentUser.lastName}!`;
          } else {
            welcomeMessage = `Willkommen, ${currentUser.userId}!`;
          }
        }
        welcomeText.innerHTML = `${welcomeMessage}<br><span id="UserCount">${this.appManager.getUserCount()}</span> User sind registriert!`;
      }

      this.attachEventListeners();
      console.log("StartPagePOM: HTML geladen, personalisiert & Events dran");
    } catch (error) {
      console.error("StartPagePOM:", error);
      app.innerHTML = '<p>Fehler beim Laden der Startseite.</p>';
    }
  }

  private attachEventListeners(): void {
    document.getElementById("LinkRoot")?.addEventListener("click", e => {
      e.preventDefault();
      console.log("StartPagePOM: LinkRoot geklickt");
      this.appManager.showStartPage();
    });

    document.getElementById("LinkImpressum")?.addEventListener("click", e => {
      e.preventDefault();
      console.log("StartPagePOM: LinkImpressum geklickt");
      this.appManager.showImpressumPage();
    });

    document.getElementById("LinkUserManagement")?.addEventListener("click", e => {
      e.preventDefault();
      console.log("StartPagePOM: LinkUserManagement geklickt");
      this.appManager.showUserManagementPage();
    });

    document.getElementById("LinkLogout")?.addEventListener("click", e => {
      e.preventDefault();
      console.log("StartPagePOM: LinkLogout geklickt");
      this.appManager.logout();
    });

    document.getElementById("StartPageLinkUserManagement")?.addEventListener("click", e => {
      e.preventDefault();
      console.log("StartPagePOM: StartPageLinkUserManagement geklickt");
      this.appManager.showUserManagementPage();
    });
  }
}
