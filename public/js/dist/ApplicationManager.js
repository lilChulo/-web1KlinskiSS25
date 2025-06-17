var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LandingPagePOM } from './pages/LandingPagePOM.js';
import { StartPagePOM } from './pages/StartPagePOM.js';
import { ImpressumPagePOM } from './pages/ImpressumPagePOM.js';
import { UserManagementPOM } from './pages/UserManagementPOM.js';
// Zentrale Verwaltung der App (UI-Logik & Nutzersteuerung)
export class ApplicationManager {
    constructor() {
        this.currentUser = null;
        this.usersCache = [];
        console.log('ApplicationManager: initialisiert');
        // Seiten-Objekte erzeugen
        this.landingPagePOM = new LandingPagePOM(this);
        this.startPagePOM = new StartPagePOM(this);
        this.impressumPagePOM = new ImpressumPagePOM(this);
        this.userManagementPOM = new UserManagementPOM(this);
    }
    // Einstiegspunkt
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureDefaultAdminUserExists();
            yield this.refreshUsersCache();
            yield this.landingPagePOM.showPage();
        });
    }
    // Prüft, ob ein Admin existiert – sonst wird einer erstellt
    ensureDefaultAdminUserExists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('/api/users/admin');
                if (response.status === 404) {
                    const createResponse = yield fetch('/api/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: 'admin',
                            password: '123',
                            firstName: 'Manfred',
                            lastName: 'Mustermann',
                        }),
                    });
                    if (!createResponse.ok) {
                        console.warn('Standard-Admin konnte nicht angelegt werden.');
                    }
                    else {
                        console.log('Standard-Admin wurde automatisch angelegt.');
                    }
                }
                else if (response.ok) {
                    console.log('Standard-Admin existiert bereits.');
                }
                else {
                    console.warn('Fehler beim Überprüfen des Admin-Users.');
                }
            }
            catch (error) {
                console.error('Fehler beim Anlegen des Admin-Users:', error);
            }
        });
    }
    // Login-Funktion mit Basic Auth
    login(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !password) {
                this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
                return false;
            }
            try {
                const basicAuth = btoa(`${userId}:${password}`);
                const response = yield fetch('/api/login', {
                    method: 'GET',
                    headers: {
                        Authorization: `Basic ${basicAuth}`,
                    },
                });
                if (response.ok) {
                    this.currentUser = yield response.json();
                    yield this.refreshUsersCache();
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Login-Fehler:', error);
                return false;
            }
        });
    }
    // Logout: User wird entfernt und zur Startseite navigiert
    logout() {
        this.currentUser = null;
        this.landingPagePOM.showPage();
        this.showToast('Logout erfolgreich.', true);
    }
    // Registrierung eines neuen Users
    registerUser(userId, password, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !password) {
                this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
                return false;
            }
            try { //gpt hilfe
                const response = yield fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, password, firstName, lastName }),
                });
                if (response.ok) {
                    this.showToast('Registrierung erfolgreich.', true);
                    yield this.refreshUsersCache();
                    return true;
                }
                else {
                    const errorData = yield response.json();
                    this.showToast(errorData.message || 'Registrierung fehlgeschlagen.', false);
                    return false;
                }
            }
            catch (error) {
                console.error('Registrierungsfehler:', error);
                this.showToast('Fehler bei der Registrierung.', false);
                return false;
            }
        });
    }
    // Alle Nutzer von der API laden
    fetchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('/api/users');
                if (response.ok) {
                    const users = yield response.json();
                    return users;
                }
                else {
                    this.showToast('Fehler beim Laden der Nutzer.', false);
                    return [];
                }
            }
            catch (error) {
                console.error('Fehler beim Laden der Nutzer:', error);
                this.showToast('Fehler beim Laden der Nutzer.', false);
                return [];
            }
        });
    }
    // Aktualisiert lokalen Cache
    refreshUsersCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.usersCache = yield this.fetchUsers();
        });
    }
    // Anzahl der geladenen Nutzer (aus dem Cache)
    getUserCount() {
        return this.usersCache.length;
    }
    // Zeigt eine Benachrichtigung an (Toast)
    showToast(message, success) {
        const toast = document.getElementById('toast');
        if (!toast) {
            console.error('Toast-Element nicht gefunden');
            return;
        }
        toast.textContent = message;
        toast.className = `toast ${success ? 'success' : 'error'}`;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
    // Getter-Methoden für aktuelle Daten und Seiten
    getCurrentUser() {
        return this.currentUser;
    }
    getLandingPagePOM() {
        return this.landingPagePOM;
    }
    getStartPagePOM() {
        return this.startPagePOM;
    }
    getImpressumPagePOM() {
        return this.impressumPagePOM;
    }
    getUserManagementPOM() {
        return this.userManagementPOM;
    }
    // Navigationsmethoden für Seiten
    showLandingPage() {
        this.landingPagePOM.showPage();
    }
    showStartPage() {
        this.startPagePOM.showPage();
    }
    showImpressumPage() {
        this.impressumPagePOM.showPage();
    }
    showUserManagementPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userManagementPOM.showPage();
        });
    }
}
