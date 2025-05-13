import { User } from './domain/User.js';
import { LandingPagePOM } from './pages/LandingPagePOM.js';
import { StartPagePOM } from './pages/StartPagePOM.js';
import { ImpressumPagePOM } from './pages/ImpressumPagePOM.js';
import { UserManagementPOM } from './pages/UserManagementPOM.js';
export class ApplicationManager {
    constructor() {
        this.users = []; // Liste aller Benutzer
        this.currentUser = null; // Der aktuell eingeloggte Benutzer
        console.log('ApplicationManager: Instanziert');
        this.users.push(new User('admin', '123', 'Manfred', 'Mustermann')); // Standardbenutzer 'admin' hinzufügen
        this.landingPagePOM = new LandingPagePOM(this);
        this.startPagePOM = new StartPagePOM(this);
        this.impressumPagePOM = new ImpressumPagePOM(this);
        this.userManagementPOM = new UserManagementPOM(this);
    }
    // Startet die Landingpage
    start() {
        this.landingPagePOM.showPage();
    }
    // Registrierung eines neuen Benutzers
    registerUser(userId, password, firstName, lastName) {
        if (!userId || !password) {
            this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
            return false;
        }
        if (this.users.find(u => u.userId === userId)) {
            this.showToast('User-ID existiert bereits.', false);
            return false;
        }
        this.users.push(new User(userId, password, firstName, lastName));
        this.showToast('Registrierung erfolgreich.', true);
        return true;
    }
    // Benutzeranmeldung
    login(userId, password) {
        if (!userId || !password) {
            this.showToast('User-ID und Passwort dürfen nicht leer sein.', false);
            return false;
        }
        const user = this.users.find(u => u.userId === userId && u.password === password);
        if (user) {
            this.currentUser = user;
            this.showToast('Login erfolgreich.', true);
            this.startPagePOM.showPage();
            return true;
        }
        this.showToast('Login fehlerhaft.', false);
        return false;
    }
    // Abmeldung des aktuellen Benutzers
    logout() {
        this.currentUser = null;
        this.landingPagePOM.showPage();
        this.showToast('Logout erfolgreich.', true);
    }
    // Anzeige einer Toast-Nachricht
    showToast(message, success) {
        const toast = document.getElementById('toast');
        if (!toast) {
            console.error('ApplicationManager: Toast-Element nicht gefunden');
            return;
        }
        toast.textContent = message;
        toast.className = `toast ${success ? 'success' : 'error'}`;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
    // Getter für den aktuellen Benutzer
    getCurrentUser() {
        return this.currentUser;
    }
    // Anzahl der registrierten Benutzer
    getUserCount() {
        return this.users.length;
    }
    // Getter für LandingPage POM
    getLandingPagePOM() {
        return this.landingPagePOM;
    }
    // Getter für StartPage POM
    getStartPagePOM() {
        return this.startPagePOM;
    }
    // Getter für ImpressumPage POM
    getImpressumPagePOM() {
        return this.impressumPagePOM;
    }
    // Getter für UserManagementPage POM
    getUserManagementPOM() {
        return this.userManagementPOM;
    }
    // LandingPage anzeigen
    showLandingPage() {
        this.landingPagePOM.showPage();
    }
    // StartPage anzeigen
    showStartPage() {
        this.startPagePOM.showPage();
    }
    // ImpressumPage anzeigen
    showImpressumPage() {
        this.impressumPagePOM.showPage();
    }
    // UserManagementPage anzeigen
    showUserManagementPage() {
        this.userManagementPOM.showPage();
    }
}
