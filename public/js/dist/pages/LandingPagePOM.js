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
        console.log('LandingPagePOM: Instanziert');
    }
    showPage() {
        console.log('LandingPagePOM: showPage aufgerufen');
        const app = document.getElementById('app');
        const topMenu = document.getElementById('TopMenu');
        if (!app) {
            console.error('LandingPagePOM: #app Container nicht gefunden');
            return;
        }
        if (!topMenu) {
            console.error('LandingPagePOM: #TopMenu nicht gefunden');
            return;
        }
        app.innerHTML = `
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
        console.log('LandingPagePOM: Event-Listener angehängt');
    }
    attachEventListeners() {
        var _a, _b, _c, _d, _e, _f;
        (_a = document.getElementById('LinkShowSignupDialog')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('LandingPagePOM: LinkShowSignupDialog geklickt');
            const loginForm = document.getElementById('FormLogin');
            if (loginForm)
                loginForm.style.display = 'none';
            const signupForm = document.getElementById('FormSignup');
            if (signupForm)
                signupForm.style.display = 'block';
        });
        (_b = document.getElementById('LinkShowLoginDialog')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('LandingPagePOM: LinkShowLoginDialog geklickt');
            const signupForm = document.getElementById('FormSignup');
            if (signupForm)
                signupForm.style.display = 'none';
            const loginForm = document.getElementById('FormLogin');
            if (loginForm)
                loginForm.style.display = 'block';
        });
        (_c = document.getElementById('ButtonLoginUser')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log('LandingPagePOM: ButtonLoginUser geklickt');
            const usernameInput = document.getElementById('FormLoginUsername');
            const passwordInput = document.getElementById('FormLoginPassword');
            const username = (_a = usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.value) !== null && _a !== void 0 ? _a : '';
            const password = (_b = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) !== null && _b !== void 0 ? _b : '';
            const credentials = btoa(`${username}:${password}`);
            try {
                const response = yield fetch('/api/login', {
                    method: 'GET', // oder POST, je nachdem wie dein Backend es erwartet
                    headers: {
                        'Authorization': `Basic ${credentials}`
                    }
                });
                if (response.ok) {
                    this.appManager['currentUser'] = yield response.json();
                    // Formulare leeren **vor** Seitenwechsel
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
            catch (error) {
                console.error('Login-Fehler:', error);
                this.appManager.showToast('Login-Fehler.', false);
            }
        }));
        (_d = document.getElementById('ButtonSignupUser')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            console.log('LandingPagePOM: ButtonSignupUser geklickt');
            const username = document.getElementById('FormSignupUsername').value;
            const password = document.getElementById('FormSignupPassword').value;
            const firstName = document.getElementById('FormSignupFirstName').value;
            const lastName = document.getElementById('FormSignupLastName').value;
            if (yield this.appManager.registerUser(username, password, firstName, lastName)) {
                document.getElementById('FormSignupUsername').value = '';
                document.getElementById('FormSignupPassword').value = '';
                document.getElementById('FormSignupFirstName').value = '';
                document.getElementById('FormSignupLastName').value = '';
            }
        }));
        (_e = document.getElementById('LinkRoot')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.appManager.getCurrentUser()) {
                this.appManager.showStartPage();
            }
            else {
                this.appManager.showLandingPage();
            }
        });
        (_f = document.getElementById('LinkImpressum')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (e) => {
            e.preventDefault();
            this.appManager.showImpressumPage();
        });
    }
}
