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
export class LandingPagePOM extends AbstractPOM {
    constructor(appManager) {
        super(appManager);
        console.log('LandingPagePOM instanziiert'); //zum Testen
    }
    showPage() {
        console.log('LandingPagePOM: showPage läuft');
        const app = document.getElementById('app');
        const topMenu = document.getElementById('TopMenu');
        if (!app) {
            console.log('kein app-Container');
            return;
        }
        if (!topMenu) {
            console.log('kein TopMenu');
            return;
        }
        app.innerHTML = `
      <div id="LandingPage">
        <div id="FormLogin" class="card">
          <div class="card-body">
            <h2>Login</h2>
            <input type="text" id="FormLoginUsername" class="form-control" placeholder="Username">
            <input type="password" id="FormLoginPassword" class="form-control" placeholder="Password">
            <button id="ButtonLoginUser" class="btn btn-primary">Login</button>
            <a href="#" id="LinkShowSignupDialog">Registrieren</a>
          </div>
        </div>

        <div id="FormSignup" class="card" style="display: none;">
          <div class="card-body">
            <h2>Registrieren</h2>
            <input type="text" id="FormSignupUsername" class="form-control" placeholder="Username">
            <input type="password" id="FormSignupPassword" class="form-control" placeholder="Password">
            <input type="text" id="FormSignupFirstName" class="form-control" placeholder="Vorname">
            <input type="text" id="FormSignupLastName" class="form-control" placeholder="Nachname">
            <button id="ButtonSignupUser" class="btn btn-primary">Registrieren</button>
            <a href="#" id="LinkShowLoginDialog">Zum Login</a>
          </div>
        </div>
      </div>
    `;
        // Navbar oben (nicht hübsch, funktioniert aber)
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
        this.attachEventListeners(); // Event-Handling extra
    }
    attachEventListeners() {
        var _a, _b, _c, _d, _e, _f;
        // Wechsel zu Registrierung
        (_a = document.getElementById('LinkShowSignupDialog')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.preventDefault();
            const login = document.getElementById('FormLogin');
            const signup = document.getElementById('FormSignup');
            if (login)
                login.style.display = 'none';
            if (signup)
                signup.style.display = 'block';
        });
        // zurück zu Login
        (_b = document.getElementById('LinkShowLoginDialog')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            e.preventDefault();
            const login = document.getElementById('FormLogin');
            const signup = document.getElementById('FormSignup');
            if (signup)
                signup.style.display = 'none';
            if (login)
                login.style.display = 'block';
        });
        // Login-Button
        (_c = document.getElementById('ButtonLoginUser')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const usernameInput = document.getElementById('FormLoginUsername');
            const passwordInput = document.getElementById('FormLoginPassword');
            const username = (_a = usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.value) !== null && _a !== void 0 ? _a : '';
            const password = (_b = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) !== null && _b !== void 0 ? _b : '';
            const credentials = btoa(`${username}:${password}`);
            try {
                const res = yield fetch('/api/login', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${credentials}`
                    }
                });
                if (res.ok) {
                    this.appManager['currentUser'] = yield res.json();
                    if (usernameInput)
                        usernameInput.value = '';
                    if (passwordInput)
                        passwordInput.value = '';
                    this.appManager.showToast('Login erfolgreich.', true);
                    this.appManager.showStartPage();
                }
                else {
                    this.appManager.showToast('Login fehlerhaft.', false);
                }
            }
            catch (err) {
                console.error('Fehler beim Login:', err);
                this.appManager.showToast('Login-Fehler.', false);
            }
        }));
        // Registrirung
        (_d = document.getElementById('ButtonSignupUser')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const uname = document.getElementById('FormSignupUsername').value;
            const pw = document.getElementById('FormSignupPassword').value;
            const fname = document.getElementById('FormSignupFirstName').value;
            const lname = document.getElementById('FormSignupLastName').value;
            const success = yield this.appManager.registerUser(uname, pw, fname, lname);
            if (success) {
                document.getElementById('FormSignupUsername').value = '';
                document.getElementById('FormSignupPassword').value = '';
                document.getElementById('FormSignupFirstName').value = '';
                document.getElementById('FormSignupLastName').value = '';
            }
        }));
        // Root Link klick (Startseite oder Landing, je nachdem)
        (_e = document.getElementById('LinkRoot')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.appManager.getCurrentUser()) {
                this.appManager.showStartPage();
            }
            else {
                this.appManager.showLandingPage();
            }
        });
        // Impressum anzeigen
        (_f = document.getElementById('LinkImpressum')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (e) => {
            e.preventDefault();
            this.appManager.showImpressumPage();
        });
    }
}
