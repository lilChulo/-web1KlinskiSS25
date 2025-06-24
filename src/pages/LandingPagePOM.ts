import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';

export class LandingPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log('LandingPagePOM instanziiert');
  }

  public async showPage(): Promise<void> {
    const app = document.getElementById('app');
    const topMenu = document.getElementById('TopMenu');

    if (!app || !topMenu) {
      console.error('Fehlende Container: app oder TopMenu');
      return;
    }

    // 1. HTML nachladen
    try {
      const res = await fetch('/html/landingpage.html'); 
      const html = await res.text();
      app.innerHTML = html;
    } catch (err) {
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
  }

  private attachEventListeners(): void {
    // Wechsel zu Registrierung
    document.getElementById('LinkShowSignupDialog')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleForms(false);
    });

    // zurück zu Login
    document.getElementById('LinkShowLoginDialog')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleForms(true);
    });

    // Login
    document.getElementById('ButtonLoginUser')?.addEventListener('click', async () => {
      const uname = (document.getElementById('FormLoginUsername') as HTMLInputElement).value;
      const pw = (document.getElementById('FormLoginPassword') as HTMLInputElement).value;

      const credentials = btoa(`${uname}:${pw}`);

      try {
        const res = await fetch('/api/login', {
          method: 'GET',
          headers: { Authorization: `Basic ${credentials}` }
        });

        if (res.ok) {
          this.appManager['currentUser'] = await res.json();
          this.appManager.showToast('Login erfolgreich.', true);
          this.appManager.showStartPage();
        } else {
          this.appManager.showToast('Login fehlgeschlagen.', false);
        }
      } catch (err) {
        console.error('Fehler beim Login:', err);
        this.appManager.showToast('Login-Fehler.', false);
      }
    });

    // Registrierung
    document.getElementById('ButtonSignupUser')?.addEventListener('click', async () => {
      const uname = (document.getElementById('FormSignupUsername') as HTMLInputElement).value;
      const pw = (document.getElementById('FormSignupPassword') as HTMLInputElement).value;
      const fname = (document.getElementById('FormSignupFirstName') as HTMLInputElement).value;
      const lname = (document.getElementById('FormSignupLastName') as HTMLInputElement).value;

      const success = await this.appManager.registerUser(uname, pw, fname, lname);
      if (success) {
        this.clearSignupForm();
        this.toggleForms(true);
      }
    });

    // Root Link
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.appManager.getCurrentUser()
        ? this.appManager.showStartPage()
        : this.appManager.showLandingPage();
    });

    // Impressum
    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.appManager.showImpressumPage();
    });
  }

  private toggleForms(showLogin: boolean): void {
    const login = document.getElementById('FormLogin');
    const signup = document.getElementById('FormSignup');
    if (login) login.style.display = showLogin ? 'block' : 'none';
    if (signup) signup.style.display = showLogin ? 'none' : 'block';
  }

  private clearSignupForm(): void {
    ['FormSignupUsername', 'FormSignupPassword', 'FormSignupFirstName', 'FormSignupLastName']
      .forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) el.value = '';
      });
  }
}
