import { AbstractPOM } from './AbstractPOM'
import { ApplicationManager } from '../ApplicationManager'
import { User } from '@domain/User'

export class StartPagePOM extends AbstractPOM {

  constructor(appManager: ApplicationManager) {
    super(appManager)
    console.log("StartPagePOM: Instanziert") // Zum Debuggen ob die Klasse läuft
  }

  public showPage(): void {
    console.log("StartPagePOM: showPage aufgerufen")

    const app = document.getElementById("app")
    const topMenu = document.getElementById("TopMenu")
    const currentUser: User | null = this.appManager.getCurrentUser()

    let welcomeMessage = "Willkommen!" // fallback

    if (currentUser) {
      if (currentUser.firstName?.trim() && currentUser.lastName?.trim()) {
        welcomeMessage = `Willkommen, ${currentUser.firstName} ${currentUser.lastName}!`
      } else {
        welcomeMessage = `Willkommen, ${currentUser.userId}!`
      }
    }

    if (!app || !topMenu) {
      console.error("StartPagePOM: Container fehlt")
      return
    }

    app.innerHTML = `
    <div id="StartPage">
      <h1>Startseite</h1>
      <h2 id="StartPageWelcomeText">
        ${welcomeMessage}<br>
        <span id="UserCount">${this.appManager.getUserCount()}</span> User sind registriert!
      </h2>
      <p>
        Möchtest du die User-Daten bearbeiten?
        <a href="#" id="StartPageLinkUserManagement" class="btn btn-link">Zum User Management</a>
      </p>
    </div>
    `

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
    `

    this.attachEventListeners()
    console.log("StartPagePOM: HTML eingefügt & Events dran")
  }

  private attachEventListeners(): void {
    const rootLink = document.getElementById("LinkRoot")
    if (rootLink) {
      rootLink.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("StartPagePOM: LinkRoot geklickt")
        this.appManager.showStartPage()
      })
    }

    // Impressum anzeigen
    const impressumLink = document.getElementById("LinkImpressum")
    if (impressumLink) {
      impressumLink.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("StartPagePOM: LinkImpressum geklickt")
        this.appManager.showImpressumPage()
      })
    }

    // User Management oben
    const userMgmtLink = document.getElementById("LinkUserManagement")
    if (userMgmtLink) {
      userMgmtLink.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("StartPagePOM: LinkUserManagement geklickt")
        this.appManager.showUserManagementPage()
      })
    }

    // Logout
    const logoutLink = document.getElementById("LinkLogout")
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("StartPagePOM: LinkLogout geklickt")
        this.appManager.logout()
      })
    }

    // Link im Text unten
    const bottomLink = document.getElementById("StartPageLinkUserManagement")
    if (bottomLink) {
      bottomLink.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("StartPagePOM: StartPageLinkUserManagement geklickt")
        this.appManager.showUserManagementPage()
      })
    }
  }
}
