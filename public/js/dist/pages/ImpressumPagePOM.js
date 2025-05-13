import { AbstractPOM } from './AbstractPOM.js';
export class ImpressumPagePOM extends AbstractPOM {
    constructor(appManager) {
        super(appManager);
        console.log('ImpressumPagePOM: Instanziert');
    }
    showPage() {
        console.log('ImpressumPagePOM: showPage aufgerufen');
        const app = document.getElementById('app');
        const topMenu = document.getElementById('TopMenu');
        if (app && topMenu) { //chatgpt unten zeile 13auch (Text aber selber gemacht(von moodle übernommen))
            app.innerHTML = `
        <div id="ImpressumPage">
          <h1>Impressum</h1>
          <h3>Anbieter</h3>
          <p>Max Mustermann<br>
             Musterstraße 123<br>
             12345 Musterstadt</p>
          <h3>Kontakt</h3>
          <p>
          Telefon: +49 123 456789<br>
             E-Mail: info@example.com
          </p>
          <h3>Haftungsausschluss</h3>
          <p>Haftung für Inhalte: Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt, Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewehr übernehmen.<br>
          Haftung für Links: Unsere Angebot enthält Links zu extremen Webseiten Dritter, auf deren Inhalt wir keinen Einfluss haben ...</p>
          
        </div>
      `;
            const isLoggedIn = this.appManager.getCurrentUser() !== null; //chatgpt (nicht wirklich gecheckt wieso !==null, aber funktioniert also egal)
            //struktur (Ordnung) von chatgpt weil meins nicht schön aussah und faul, aber selber gecodet
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
              ${isLoggedIn ? `
              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkUserManagement">User Management</a>
              </li> 

              <li class="nav-item">
                <a class="nav-link" href="#" id="LinkLogout">Logout</a> <!-- ganze links zu logout userM unsw. -->
              </li>
              ` : ''}
            </ul>
          </div>
        </div>
      `;
            this.attachEventListeners();
            console.log('ImpressumPagePOM: HTML eingefügt und Event-Listener angehängt');
        }
    }
    attachEventListeners() {
        var _a, _b;
        (_a = document.getElementById('LinkRoot')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('ImpressumPagePOM: LinkRoot geklickt');
            if (this.appManager.getCurrentUser()) {
                this.appManager.showStartPage(); //siehe moodle seite vergessen... auch bei anderen if else
            }
            else {
                this.appManager.showLandingPage();
            }
        });
        (_b = document.getElementById('LinkImpressum')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
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
