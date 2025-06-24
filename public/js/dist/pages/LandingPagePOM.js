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
        console.log('LandingPagePOM instanziiert');
    }
    showPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = document.getElementById('app');
            const topMenu = document.getElementById('TopMenu');
            if (!app || !topMenu) {
                console.error('Fehlende Container: app oder TopMenu');
                return;
            }
            try {
                const res = yield fetch('/html/landingpage.html');
                const html = yield res.text();
                app.innerHTML = html;
            }
            catch (err) {
                console.error('Fehler beim Laden der Landingpage:', err);
                app.innerHTML = '<p>Fehler beim Laden der Seite.</p>';
                return;
            }
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
            this.attachEventListeners();
        });
    }
    attachEventListeners() {
        var _a, _b, _c, _d, _e, _f;
        // Wechsel zu Registrierung
        (_a = document.getElementById('LinkShowSignupDialog')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleForms(false);
        });
        // zurück zu Login
        (_b = document.getElementById('LinkShowLoginDialog')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleForms(true);
        });
        // Login
        (_c = document.getElementById('ButtonLoginUser')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const uname = document.getElementById('FormLoginUsername').value;
            const pw = document.getElementById('FormLoginPassword').value;
            const credentials = btoa(`${uname}:${pw}`);
            try {
                const res = yield fetch('/api/login', {
                    method: 'GET',
                    headers: { Authorization: `Basic ${credentials}` }
                });
                if (res.ok) {
                    this.appManager['currentUser'] = yield res.json();
                    this.appManager.showToast('Login erfolgreich.', true);
                    this.appManager.showStartPage();
                }
                else {
                    this.appManager.showToast('Login fehlgeschlagen.', false);
                }
            }
            catch (err) {
                console.error('Fehler beim Login:', err);
                this.appManager.showToast('Login-Fehler.', false);
            }
        }));
        // Registrierung
        (_d = document.getElementById('ButtonSignupUser')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const uname = document.getElementById('FormSignupUsername').value;
            const pw = document.getElementById('FormSignupPassword').value;
            const fname = document.getElementById('FormSignupFirstName').value;
            const lname = document.getElementById('FormSignupLastName').value;
            const success = yield this.appManager.registerUser(uname, pw, fname, lname);
            if (success) {
                this.clearSignupForm();
                this.toggleForms(true);
            }
        }));
        // Root Link
        (_e = document.getElementById('LinkRoot')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (e) => {
            e.preventDefault();
            this.appManager.getCurrentUser()
                ? this.appManager.showStartPage()
                : this.appManager.showLandingPage();
        });
        // Impressum
        (_f = document.getElementById('LinkImpressum')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (e) => {
            e.preventDefault();
            this.appManager.showImpressumPage();
        });
    }
    toggleForms(showLogin) {
        const login = document.getElementById('FormLogin');
        const signup = document.getElementById('FormSignup');
        if (login)
            login.style.display = showLogin ? 'block' : 'none';
        if (signup)
            signup.style.display = showLogin ? 'none' : 'block';
    }
    clearSignupForm() {
        ['FormSignupUsername', 'FormSignupPassword', 'FormSignupFirstName', 'FormSignupLastName']
            .forEach(id => {
            const el = document.getElementById(id);
            if (el)
                el.value = '';
        });
    }
}
