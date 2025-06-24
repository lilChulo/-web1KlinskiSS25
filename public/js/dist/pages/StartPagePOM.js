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
export class StartPagePOM extends AbstractPOM {
    constructor(appManager) {
        super(appManager);
        console.log("StartPagePOM: Instanziert");
    }
    showPage() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log("StartPagePOM: showPage aufgerufen");
            const app = document.getElementById("app");
            const topMenu = document.getElementById("TopMenu");
            const currentUser = this.appManager.getCurrentUser();
            if (!app || !topMenu) {
                console.error("StartPagePOM: Container fehlt");
                return;
            }
            try {
                // HTML vom Server laden
                const response = yield fetch('/html/startpage.html');
                if (!response.ok) {
                    throw new Error(`Fehler beim Laden der Startseite: ${response.statusText}`);
                }
                const htmlContent = yield response.text();
                // HTML-Content in den Container einfügen
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
                        if (((_a = currentUser.firstName) === null || _a === void 0 ? void 0 : _a.trim()) && ((_b = currentUser.lastName) === null || _b === void 0 ? void 0 : _b.trim())) {
                            welcomeMessage = `Willkommen, ${currentUser.firstName} ${currentUser.lastName}!`;
                        }
                        else {
                            welcomeMessage = `Willkommen, ${currentUser.userId}!`;
                        }
                    }
                    welcomeText.innerHTML = `${welcomeMessage}<br><span id="UserCount">${this.appManager.getUserCount()}</span> User sind registriert!`;
                }
                this.attachEventListeners();
                console.log("StartPagePOM: HTML geladen, personalisiert & Events dran");
            }
            catch (error) {
                console.error("StartPagePOM:", error);
                app.innerHTML = '<p>Fehler beim Laden der Startseite.</p>';
            }
        });
    }
    attachEventListeners() {
        var _a, _b, _c, _d, _e;
        (_a = document.getElementById("LinkRoot")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => {
            e.preventDefault();
            console.log("StartPagePOM: LinkRoot geklickt");
            this.appManager.showStartPage();
        });
        (_b = document.getElementById("LinkImpressum")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", e => {
            e.preventDefault();
            console.log("StartPagePOM: LinkImpressum geklickt");
            this.appManager.showImpressumPage();
        });
        (_c = document.getElementById("LinkUserManagement")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", e => {
            e.preventDefault();
            console.log("StartPagePOM: LinkUserManagement geklickt");
            this.appManager.showUserManagementPage();
        });
        (_d = document.getElementById("LinkLogout")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", e => {
            e.preventDefault();
            console.log("StartPagePOM: LinkLogout geklickt");
            this.appManager.logout();
        });
        (_e = document.getElementById("StartPageLinkUserManagement")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", e => {
            e.preventDefault();
            console.log("StartPagePOM: StartPageLinkUserManagement geklickt");
            this.appManager.showUserManagementPage();
        });
    }
}
