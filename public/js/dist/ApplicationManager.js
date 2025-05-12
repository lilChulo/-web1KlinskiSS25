import { User } from './domain/User.js';
import { LandingPagePOM } from './pages/LandingPagePOM.js';
import { StartPagePOM } from './pages/StartPagePOM.js';
import { ImpressumPagePOM } from './pages/ImpressumPagePOM.js';

export class ApplicationManager {
    constructor() {
        this.users = [];
        this.currentUser = null;
        console.log('ApplicationManager: Instanziert');
        // Standard-User "admin" anlegen
        this.users.push(new User('admin', '123', 'Manfred', 'Mustermann'));
        this.landingPagePOM = new LandingPagePOM(this);
        this.startPagePOM = new StartPagePOM(this);
        this.impressumPagePOM = new ImpressumPagePOM(this);
    }
    start() {
        this.landingPagePOM.showPage();
    }
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
    logout() {
        this.currentUser = null;
        this.landingPagePOM.showPage();
    }
    showToast(message, success) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.className = `toast ${success ? 'success' : 'error'}`;
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }
    }
    getCurrentUser() {
        return this.currentUser;
    }
    getUserCount() {
        return this.users.length;
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
}
