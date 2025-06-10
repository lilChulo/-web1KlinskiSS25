import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';

export class LandingPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log('LandingPagePOM instanziiert'); //zum Testen
  }

  public showPage(): void {
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

  private attachEventListeners(): void {
    // Wechsel zu Registrierung
    document.getElementById('LinkShowSignupDialog')?.addEventListener('click', (e) => {

      e.preventDefault();

      const login = document.getElementById('FormLogin');
      const signup = document.getElementById('FormSignup');

      if (login) login.style.display = 'none';
      if (signup) signup.style.display = 'block';

    });

    // zurück zu Login
    document.getElementById('LinkShowLoginDialog')?.addEventListener('click', (e) => {
      e.preventDefault();

      const login = document.getElementById('FormLogin');
      const signup = document.getElementById('FormSignup');

      if (signup) signup.style.display = 'none';
      if (login) login.style.display = 'block';
    });

    // Login-Button
    document.getElementById('ButtonLoginUser')?.addEventListener('click', async () => {
      const usernameInput = document.getElementById('FormLoginUsername') as HTMLInputElement;
      const passwordInput = document.getElementById('FormLoginPassword') as HTMLInputElement;

      const username = usernameInput?.value ?? '';
      const password = passwordInput?.value ?? '';

      const credentials = btoa(`${username}:${password}`);

      try {
        const res = await fetch('/api/login', {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        });

        if (res.ok) {
          this.appManager['currentUser'] = await res.json();
          if (usernameInput) usernameInput.value = '';
          if (passwordInput) passwordInput.value = '';
          this.appManager.showToast('Login erfolgreich.', true);
          this.appManager.showStartPage();

        } else {
          this.appManager.showToast('Login fehlerhaft.', false);
        }
      } catch (err) {


        console.error('Fehler beim Login:', err);
        this.appManager.showToast('Login-Fehler.', false);
      }
    });

    // Registrirung
    document.getElementById('ButtonSignupUser')?.addEventListener('click', async () => {

      const uname = (document.getElementById('FormSignupUsername') as HTMLInputElement).value;
      const pw = (document.getElementById('FormSignupPassword') as HTMLInputElement).value;
      const fname = (document.getElementById('FormSignupFirstName') as HTMLInputElement).value;
      const lname = (document.getElementById('FormSignupLastName') as HTMLInputElement).value;

      const success = await this.appManager.registerUser(uname, pw, fname, lname);

      if (success) 
        {
        (document.getElementById('FormSignupUsername') as HTMLInputElement).value = '';
        (document.getElementById('FormSignupPassword') as HTMLInputElement).value = '';
        (document.getElementById('FormSignupFirstName') as HTMLInputElement).value = '';
        (document.getElementById('FormSignupLastName') as HTMLInputElement).value = '';
      }
    });

    // Root Link klick (Startseite oder Landing, je nachdem)
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.appManager.getCurrentUser())
         {
        this.appManager.showStartPage();
      } else 
      {
        this.appManager.showLandingPage();
      }
    });

    // Impressum anzeigen
    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {
      e.preventDefault();

      this.appManager.showImpressumPage();
    });
  }
}
