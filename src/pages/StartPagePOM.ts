// StartPagePOM.ts
import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';
import { User } from '@domain/User';

export class StartPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {

    super(appManager);
    console.log('StartPagePOM: Instanziert'); // Konstruktor wie immer
  }

  public showPage(): void {
    console.log('StartPagePOM: showPage aufgerufen');

    const app = document.getElementById('app');
    const topMenu = document.getElementById('TopMenu');
    const currentUser: User | null = this.appManager.getCurrentUser();

    let welcomeMessage = 'Willkommen!';
    if (currentUser) {

      if (currentUser.firstName && currentUser.lastName) {
        welcomeMessage = `Willkommen, ${currentUser.firstName} ${currentUser.lastName}!`;

      } else {

        welcomeMessage = `Willkommen, ${currentUser.userId}!`;
      }
    }

    // wenn beide Elemente da sind -> Inhalt rein
    if (app && topMenu)
       {
      app.innerHTML = `
        <div id="StartPage">

        <h1>Startseite</h1>

        <h2 id="StartPageWelcomeText">
          ${welcomeMessage}<br>
          <span id="UserCount">${this.appManager.getUserCount()}</span> User sind registriert!
        </h2>

        <p>
          Möchtest du die User-Daten bearbeiten?
          <a href="#" id="StartPageLinkUserManagement" class="btn btn-link">Zum User Management</a>
        </p>

        </div>
      `;

      // Menü oben setzen
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

      this.attachEventListeners(); // ganz wichtig sonst passiert nix
      console.log('StartPagePOM: HTML eingefügt und Event-Listener angehängt');
    }
  }

  private attachEventListeners(): void {
    // Link oben: zurück zur Startseite
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {    e.preventDefault();
      console.log('StartPagePOM: LinkRoot geklickt');
      this.appManager.showStartPage();
    });

    // Link oben: Impressum anzeigen
    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {     e.preventDefault();

      console.log('StartPagePOM: LinkImpressum geklickt');
      this.appManager.showImpressumPage();
    });

    // Logout (oben im Menü)
    document.getElementById('LinkLogout')?.addEventListener('click', (e) => {    e.preventDefault();


      console.log('StartPagePOM: LinkLogout geklickt');
      this.appManager.logout(); // abmelden, zurück zur LandingPage?
    });

    // Link oben: User Management
    document.getElementById('LinkUserManagement')?.addEventListener('click', (e) => {    e.preventDefault();

      console.log('StartPagePOM: LinkUserManagement geklickt');
      this.appManager.showUserManagementPage();
    }
  );

    // Link im Textkörper: User Management
    document.getElementById('StartPageLinkUserManagement')?.addEventListener('click', (e) => {   e.preventDefault();
      console.log('StartPagePOM: StartPageLinkUserManagement geklickt');
      this.appManager.showUserManagementPage();
    
    
    });
  }
}
