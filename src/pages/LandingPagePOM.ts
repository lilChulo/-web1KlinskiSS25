import { ApplicationManager } from '../ApplicationManager';

export class LandingPagePom {
    private loginForm: HTMLFormElement;
    private registerForm: HTMLFormElement;
    private switchToRegisterLink: HTMLElement;
    private switchToLoginLink: HTMLElement;
    private toastContainer: HTMLElement;

    constructor(private appManager: ApplicationManager) {
        // DOM-Elemente holen
        this.loginForm = document.getElementById('login-form') as HTMLFormElement;
        this.registerForm = document.getElementById('register-form') as HTMLFormElement;
        this.switchToRegisterLink = document.getElementById('link-to-register')!;
        this.switchToLoginLink = document.getElementById('link-to-login')!;
        this.toastContainer = document.getElementById('toast-container')!;

        // Event-Listener setzen
        this.initEventListeners();
    }

    private initEventListeners(): void {
        this.switchToRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegisterForm();
        });

        this.switchToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = (document.getElementById('login-user-id') as HTMLInputElement).value;
            const password = (document.getElementById('login-password') as HTMLInputElement).value;

            if (!userId || !password) {
                this.showToast('Bitte User-ID und Passwort eingeben.');
                return;
            }

            if (this.appManager.login(userId, password)) {
                this.showToast('Login erfolgreich!');
                this.clearLoginForm();
                // Hier: Startseite laden (z. B. StartPagePom anzeigen)
            } else {
                this.showToast('Login fehlgeschlagen.');
            }
        });

        this.registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = (document.getElementById('register-user-id') as HTMLInputElement).value;
            const password = (document.getElementById('register-password') as HTMLInputElement).value;

            if (!userId || !password) {
                this.showToast('Bitte User-ID und Passwort eingeben.');
                return;
            }

            if (this.appManager.addUser(userId, password)) {
                this.showToast('Registrierung erfolgreich!');
                this.clearRegisterForm();
                this.showLoginForm();
            } else {
                this.showToast('Registrierung fehlgeschlagen. User-ID existiert bereits?');
            }
        });
    }

    private showRegisterForm(): void {
        this.loginForm.style.display = 'none';
        this.registerForm.style.display = 'block';
    }

    private showLoginForm(): void {
        this.registerForm.style.display = 'none';
        this.loginForm.style.display = 'block';
    }

    private clearLoginForm(): void {
        (document.getElementById('login-user-id') as HTMLInputElement).value = '';
        (document.getElementById('login-password') as HTMLInputElement).value = '';
    }

    private clearRegisterForm(): void {
        (document.getElementById('register-user-id') as HTMLInputElement).value = '';
        (document.getElementById('register-password') as HTMLInputElement).value = '';
    }

    private showToast(message: string): void {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        this.toastContainer.appendChild(toast);

        setTimeout(() => {
            this.toastContainer.removeChild(toast);
        }, 3000);
    }
}
