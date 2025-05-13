import { AbstractPOM } from './AbstractPOM.js';
export class LandingPagePOM extends AbstractPOM {
    constructor(appManager) {
        super(appManager);
        console.log('LandingPagePOM: Instanziert'); // Konstruktor -> wird beim Erstellen aufgerufen
    }
    showPage() {
        console.log('LandingPagePOM: showPage aufgerufen');
        const app = document.getElementById('app');
        const topMenu = document.getElementById('TopMenu');
        if (!app) {
            console.error('LandingPagePOM: #app Container nicht gefunden'); // fallback falls DOM nicht geladen?
            return;
        }
        if (!topMenu) {
            console.error('LandingPagePOM: #TopMenu nicht gefunden');
            return;
        }
        app.innerHTML = `      <!--  code selber aber struktur bisschen mit chatgpt verschönert, meins sah schlimm aus (merke: html struktur übern!) -->
      <div id="LandingPage">

        <div id="FormLogin" class="card">
          <div class="card-body">
            <h2 class="card-title">Login</h2>
            <div class="mb-3">
              <input type="text" id="FormLoginUsername" class="form-control" placeholder="Username">
            </div>
            <div class="mb-3">
              <input type="password" id="FormLoginPassword" class="form-control" placeholder="Password">
            </div>
            <button id="ButtonLoginUser" class="btn btn-primary">Login</button>
            <a href="#" id="LinkShowSignupDialog" class="d-block mt-2">Registrieren</a>
          </div>
        </div>

        <div id="FormSignup" class="card" style="display: none;">
          <div class="card-body">
            <h2 class="card-title">Registrieren</h2>
            <div class="mb-3">
              <input type="text" id="FormSignupUsername" class="form-control" placeholder="Username">
            </div>
            <div class="mb-3">
              <input type="password" id="FormSignupPassword" class="form-control" placeholder="Password">
            </div>
            <div class="mb-3">
              <input type="text" id="FormSignupFirstName" class="form-control" placeholder="Vorname">
            </div>
            <div class="mb-3">
              <input type="text" id="FormSignupLastName" class="form-control" placeholder="Nachname">
            </div>
            <button id="ButtonSignupUser" class="btn btn-primary">Registrieren</button>
            <a href="#" id="LinkShowLoginDialog" class="d-block mt-2">Zum Login</a>
          </div>
        </div>

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
        </ul>
        </div>
      </div>
    `;
        console.log('LandingPagePOM: HTML eingefügt');
        this.attachEventListeners();
        // wichtig! sonst geht nix
        console.log('LandingPagePOM: Event-Listener angehängt');
    }
    attachEventListeners() {
        var _a, _b, _c, _d, _e, _f;
        // Link: zeigt Registrierungsformular
        (_a = document.getElementById('LinkShowSignupDialog')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('LandingPagePOM: LinkShowSignupDialog geklickt');
            document.getElementById('FormLogin').style.display = 'none';
            document.getElementById('FormSignup').style.display = 'block';
        });
        // Link: zurück zum Login
        (_b = document.getElementById('LinkShowLoginDialog')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('LandingPagePOM: LinkShowLoginDialog geklickt');
            document.getElementById('FormSignup').style.display = 'none';
            document.getElementById('FormLogin').style.display = 'block';
        });
        // Login Button gedrückt
        (_c = document.getElementById('ButtonLoginUser')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            console.log('LandingPagePOM: ButtonLoginUser geklickt');
            const username = document.getElementById('FormLoginUsername').value;
            const password = document.getElementById('FormLoginPassword').value;
            if (this.appManager.login(username, password)) {
                // Felder leeren wenn Login ok war
                document.getElementById('FormLoginUsername').value = '';
                document.getElementById('FormLoginPassword').value = '';
            }
        });
        // Registrierung absenden
        (_d = document.getElementById('ButtonSignupUser')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
            console.log('LandingPagePOM: ButtonSignupUser geklickt');
            const username = document.getElementById('FormSignupUsername').value;
            const password = document.getElementById('FormSignupPassword').value;
            const firstName = document.getElementById('FormSignupFirstName').value;
            const lastName = document.getElementById('FormSignupLastName').value;
            if (this.appManager.registerUser(username, password, firstName, lastName)) {
                // Felder zurücksetzen
                document.getElementById('FormSignupUsername').value = '';
                document.getElementById('FormSignupPassword').value = '';
                document.getElementById('FormSignupFirstName').value = '';
                document.getElementById('FormSignupLastName').value = '';
            }
        });
        // Link oben im Menü Startseite
        (_e = document.getElementById('LinkRoot')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('LandingPagePOM: LinkRoot geklickt');
            this.appManager.showLandingPage(); // zeigt aktuelle Seite nochmal?
        });
        // Link oben  im Menü Impressum
        (_f = document.getElementById('LinkImpressum')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('LandingPagePOM: LinkImpressum geklickt');
            this.appManager.showImpressumPage();
        });
    }
}
