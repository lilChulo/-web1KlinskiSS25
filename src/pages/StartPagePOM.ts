import { AbstractPOM } from './AbstractPOM'
import { ApplicationManager } from '../ApplicationManager'
import { User } from '@domain/User'

export class StartPagePOM extends AbstractPOM {

  constructor(appManager: ApplicationManager) {
    super(appManager)
    console.log("StartPagePOM: Instanziert")
  }

  public async showPage(): Promise<void> {
    console.log("StartPagePOM: showPage aufgerufen")

    const app = document.getElementById("app")
    const currentUser: User | null = this.appManager.getCurrentUser()

    if (!app) {
      console.error("StartPagePOM: Container fehlt")
      return
    }

    try {
      // HTML vom Server laden
      const response = await fetch('/html/startpage.html')
      if (!response.ok) {
        throw new Error(`Fehler beim Laden der Startseite: ${response.statusText}`)
      }
      const htmlContent = await response.text()

      // HTML-Content in den Container einfügen
      app.innerHTML = htmlContent

      // Welcome Text dynamisch setzen
      const welcomeText = document.getElementById("StartPageWelcomeText")
      if (welcomeText) {
        let welcomeMessage = "Willkommen!"
        if (currentUser) {
          if (currentUser.firstName?.trim() && currentUser.lastName?.trim()) {
            welcomeMessage = `Willkommen, ${currentUser.firstName} ${currentUser.lastName}!`
          } else {
            welcomeMessage = `Willkommen, ${currentUser.userId}!`
          }
        }
        welcomeText.innerHTML = `${welcomeMessage}<br><span id="UserCount">${this.appManager.getUserCount()}</span> User sind registriert!`
      }

      this.attachEventListeners()
      console.log("StartPagePOM: HTML geladen, personalisiert & Events dran")
    } catch (error) {
      console.error("StartPagePOM:", error)
      app.innerHTML = '<p>Fehler beim Laden der Startseite.</p>'
    }
  }

  private attachEventListeners(): void {
    document.getElementById("LinkRoot")?.addEventListener("click", e => {
      e.preventDefault()
      console.log("StartPagePOM: LinkRoot geklickt")
      this.appManager.showStartPage()
    })

    document.getElementById("LinkImpressum")?.addEventListener("click", e => {
      e.preventDefault()
      console.log("StartPagePOM: LinkImpressum geklickt")
      this.appManager.showImpressumPage()
    })

    document.getElementById("LinkUserManagement")?.addEventListener("click", e => {
      e.preventDefault()
      console.log("StartPagePOM: LinkUserManagement geklickt")
      this.appManager.showUserManagementPage()
    })

    document.getElementById("LinkLogout")?.addEventListener("click", e => {
      e.preventDefault()
      console.log("StartPagePOM: LinkLogout geklickt")
      this.appManager.logout()
    })

    document.getElementById("StartPageLinkUserManagement")?.addEventListener("click", e => {
      e.preventDefault()
      console.log("StartPagePOM: StartPageLinkUserManagement geklickt")
      this.appManager.showUserManagementPage()
    })
  }
}
