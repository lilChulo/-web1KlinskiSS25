import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';

export class LandingPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager)
   {
    super(appManager); //Konstrukto rd beimm erstellen aufgerufen

    console.log('LandingPagePOM: Instanziert'); // Konstruktor -> wird beim Erstellen aufgerufen
  }

  public showPage(): void 
  {
    console.log('LandingPagePOM: showPage aufgerufen');

    const app = document.getElementById('app'); //conteainer für seiteninhalt
    const topMenu = document.getElementById('TopMenu');





    if (!app)  //haupteelemnte geprüft, ob da
      {

      console.error('LandingPagePOM: #app Container nicht gefunden'); // fallback falls DOM nicht geladen?
      return;
    }
    if (!topMenu) 
    {
      console.error('LandingPagePOM: #TopMenu nicht gefunden');
      return;
    }

    app.innerHTML = `      <!--  code selber aber struktur bisschen mit chatgpt verschönert, meins sah schlimm aus (merke: html struktur übern!) -->
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

    // Menü oben setzen
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
    // wichtig! sonst geht nix
    console.log('LandingPagePOM: Event-Listener angehängt');
  }

  private attachEventListeners(): void {
    // Link: zeigt Registrierungsformular
    document.getElementById('LinkShowSignupDialog')?.addEventListener('click', (e) => {             e.preventDefault();
      console.log('LandingPagePOM: LinkShowSignupDialog geklickt');


      document.getElementById('FormLogin')!.style.display = 'none';
      document.getElementById('FormSignup')!.style.display = 'block';
    });

    // Link: zurück zum Login
    document.getElementById('LinkShowLoginDialog')?.addEventListener('click', (e) => {         e.preventDefault();


      console.log('LandingPagePOM: LinkShowLoginDialog geklickt');

      document.getElementById('FormSignup')!.style.display = 'none';
      document.getElementById('FormLogin')!.style.display = 'block';     });

    // Login Button gedrückt
    document.getElementById('ButtonLoginUser')?.addEventListener('click', () => {        console.log('LandingPagePOM: ButtonLoginUser geklickt');

      const username = (document.getElementById('FormLoginUsername') as HTMLInputElement).value;
      const password = (document.getElementById('FormLoginPassword') as HTMLInputElement).value;




      if (this.appManager.login(username, password)) {


        // Felder leeren wenn Login ok war
        (document.getElementById('FormLoginUsername') as HTMLInputElement).value = '';
        (document.getElementById('FormLoginPassword') as HTMLInputElement).value = '';
      }

    });

    // Registrierung absenden
    document.getElementById('ButtonSignupUser')?.addEventListener('click', () => {  console.log('LandingPagePOM: ButtonSignupUser geklickt');


      const username = (document.getElementById('FormSignupUsername') as HTMLInputElement).value;
      const password = (document.getElementById('FormSignupPassword') as HTMLInputElement).value;
      const firstName = (document.getElementById('FormSignupFirstName') as HTMLInputElement).value;
      const lastName = (document.getElementById('FormSignupLastName') as HTMLInputElement).value;

      if (this.appManager.registerUser(username, password, firstName, lastName))
         {
        // Felder zurücksetzen


        (document.getElementById('FormSignupUsername') as HTMLInputElement).value = '';
        (document.getElementById('FormSignupPassword') as HTMLInputElement).value = '';
        (document.getElementById('FormSignupFirstName') as HTMLInputElement).value = '';
        (document.getElementById('FormSignupLastName') as HTMLInputElement).value = '';
  }

    });

    // Link oben im Menü Startseite
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {   e.preventDefault();


      console.log('LandingPagePOM: LinkRoot geklickt');
if (this.appManager.getCurrentUser()) {
        this.appManager.showStartPage();
      } else {
        this.appManager.showLandingPage();
      }
        });

    // Link oben  im Menü Impressum
    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {     e.preventDefault();


      console.log('LandingPagePOM: LinkImpressum geklickt');
      this.appManager.showImpressumPage();
      
    });
  }
}
