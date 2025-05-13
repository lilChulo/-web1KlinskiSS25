import { AbstractPOM } from './AbstractPOM.js';
export class StartPagePOM extends AbstractPOM {
    constructor(appManager) {
        super(appManager);
        console.log('StartPagePOM: Instanziert');
    }
    showPage() {
        console.log('StartPagePOM: showPage aufgerufen');
        const app = document.getElementById('app');
        const topMenu = document.getElementById('TopMenu');
        if (app && topMenu) {
            app.innerHTML = `
        <div id="StartPage">
        <h1>Startseite</h1>
          <h2 id="StartPageWelcomeText">Willkommen, das ist der Anfang deiner Seite, wenn alles erfolgreich war solltest du mehr als 0 User sehen.<br> <span id="UserCount">${this.appManager.getUserCount()}</span> User sind registriert!</h2>
<p>
  Möchtest du die User-Daten bearbeiten?
  <a href="#" id="StartPageLinkUserManagement" class="btn btn-link">Zum User Management</a>
</p>
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
    attachEventListeners() {
        var _a, _b, _c, _d, _e;
        (_a = document.getElementById('LinkRoot')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('StartPagePOM: LinkRoot geklickt');
            this.appManager.showStartPage();
        });
        (_b = document.getElementById('LinkImpressum')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('StartPagePOM: LinkImpressum geklickt');
            this.appManager.showImpressumPage();
        });
        (_c = document.getElementById('LinkLogout')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('StartPagePOM: LinkLogout geklickt');
            this.appManager.logout();
        });
        (_d = document.getElementById('LinkUserManagement')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('StartPagePOM: LinkUserManagement geklickt');
            this.appManager.showUserManagementPage();
        });
        (_e = document.getElementById('StartPageLinkUserManagement')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('StartPagePOM: StartPageLinkUserManagement geklickt');
            this.appManager.showUserManagementPage();
        });
    }
}
