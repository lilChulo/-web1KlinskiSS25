import { AbstractPOM } from './AbstractPOM';
import { ApplicationManager } from '../ApplicationManager';

export class ImpressumPagePOM extends AbstractPOM {
  constructor(appManager: ApplicationManager) {
    super(appManager);
    console.log('ImpressumPagePOM: Instanziert');
  }

  public showPage(): void {
    console.log('ImpressumPagePOM: showPage aufgerufen');
    const app = document.getElementById('app');
    const topMenu = document.getElementById('TopMenu');
    if (app && topMenu) {
      app.innerHTML = `
        <div id="ImpressumPage">
          <h2>Impressum</h2>
          <p>Verantwortlich für den Inhalt: Beispiel GmbH, Musterstraße 123, 12345 Musterstadt</p>
          <p>Kontakt: info@example.com</p>
        </div>
      `;
      topMenu.innerHTML = `
        <div class="container-fluid">
          <a class="navbar-brand" href="#" id="LinkRoot">WE-1 SPA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
      console.log('ImpressumPagePOM: HTML eingefügt und Event-Listener angehängt');
    }
  }

  private attachEventListeners(): void {
    document.getElementById('LinkRoot')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('ImpressumPagePOM: LinkRoot geklickt');
      if (this.appManager.getCurrentUser()) {
        this.appManager.getStartPagePOM().showPage();
      } else {
        this.appManager.getLandingPagePOM().showPage();
      }
    });

    document.getElementById('LinkImpressum')?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('ImpressumPagePOM: LinkImpressum geklickt');
      this.appManager.getImpressumPagePOM().showPage();
    });
  }
}